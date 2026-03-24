const UPDATE_EXPIRATION_DELAY = 1000 * 60 * 60 * 24 * 7; // 7 days

export function getUpdates(filters, marks)
{
    const save = JSON.parse(localStorage.getItem('auriga_marks_save') || '{}');
    const updates = JSON.parse(localStorage.getItem('auriga_updates') || '{}');

    const key = JSON.stringify(filters);
    const previous = save[key];
    if (!previous) {
        save[key] = marks;
        localStorage.setItem('auriga_marks_save', JSON.stringify(save));

        return [];
    }

    // Skip if all marks have no values (can happen briefly after login)
    if (marks.every(m => m.subjects.every(s => s.marks.every(m => m.value === undefined)))) {
        return [];
    }

    let result = updates[key] || [];
    for (const module of marks) {
        const otherModule = previous.find(m => m.name === module.name);
        if (!otherModule) {
            continue;
        }

        for (const subject of module.subjects) {
            const otherSubject = otherModule.subjects.find(s => s.name === subject.name);
            if (!otherSubject) {
                continue;
            }

            function pushUpdate(type, id, name, value, old)
            {
                const existing = result.find(u => u.subject === subject.id && u.id === id && u.name === name);

                if (existing && (!(existing.type === 'average-update' || type === 'average-update') || existing.type === type)) {
                    existing.type = type;
                    existing.date = new Date();
                    existing.value = value;
                    existing.old = old;
                } else {
                    result.push({
                        date: new Date(),
                        type,
                        subject: subject.id,
                        id,
                        name,
                        ...(value !== undefined && value !== null ? { value } : {}),
                        ...(old !== undefined && old !== null ? { old } : {})
                    });
                }
            }

            for (const { id, name, value, classAverage } of subject.marks) {
                const otherMark = otherSubject.marks.find(m => m.id === id && m.name === name);
                if (!otherMark) {
                    if (value !== null) {
                        pushUpdate('add', id, name, value);
                    }
                } else if (otherMark.value !== value) {
                    let type = 'update';
                    if (otherMark.value === undefined) {
                        type = 'add';
                    } else if (value === undefined) {
                        type = 'remove';
                    }

                    pushUpdate(type, id, name, value, otherMark.value);
                } else if (otherMark.classAverage !== classAverage) {
                    pushUpdate('average-update', id, name, classAverage, otherMark.classAverage);
                }
            }

            for (const mark of otherSubject.marks) {
                const otherMark = subject.marks.find(m => m.name === mark.name);
                if (!otherMark) {
                    pushUpdate('remove', mark.id, mark.name, undefined, mark.value);
                }
            }
        }
    }

    result = purge(result).sort((a, b) => new Date(b.date) - new Date(a.date));

    save[key] = marks;
    updates[key] = result;

    localStorage.setItem('auriga_marks_save', JSON.stringify(save));
    localStorage.setItem('auriga_updates', JSON.stringify(updates));

    return result;
}

function purge(updates)
{
    const now = new Date();
    const result = [];
    for (const update of updates) {
        if (now - new Date(update.date) < UPDATE_EXPIRATION_DELAY) {
            result.push(update);
        }
    }

    return result;
}
