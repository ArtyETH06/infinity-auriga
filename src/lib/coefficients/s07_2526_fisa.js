/**
 * Coefficients — S07 FISA 2025/2026
 *
 * Override coefficients at any level of the hierarchy:
 *   - Module:  use the module code  (e.g. '2526_I_INF_FISA_S07_AEE')
 *   - Subject: use the subject code (e.g. '2526_I_INF_FISA_S07_CS_GR')
 *   - Mark:    use the full exam code (e.g. '2526_I_INF_FISA_S07_CS_GR_WS_EX')
 *
 * Only list entries whose coefficient is NOT 1 (default).
 *
 * To find codes: open Auriga → DevTools → Network tab →
 * look for POST requests to /api/menuEntries/.../searchResult →
 * each line's 4th value is the exam code. Trim segments for subject/module.
 */
export default {
    // --- Module-level overrides ---
    // Alternance / Evaluation en entreprise (coeff 8)
    '2526_I_INF_FISA_S07_AEE': 8,

    // --- Mark-level overrides ---
    // Gérer > Windows sécurité (coeff 2, vs LAN concepts coeff 1)
    '2526_I_INF_FISA_S07_CS_GR_WS_EX': 2,

    // SAE Développement sécurisé > Projet (coeff 3)
    '2526_I_INF_FISA_S07_CS_SAE_DEVSEC_PROJ_EX': 3,

    // SAE Tests d'intrusions > Méthodes d'audit (coeff 2)
    '2526_I_INF_FISA_S07_CS_SAE_INT_MAS_EX': 2,

    // SAE Tests d'intrusions > Pentest (coeff 2)
    '2526_I_INF_FISA_S07_CS_SAE_INT_PEN_EX': 2,
};
