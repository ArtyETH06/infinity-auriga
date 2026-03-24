/**
 * Coefficients — S07 FISA 2025/2026
 *
 * Only list exams whose coefficient is NOT 1.
 * The key is the full exam code from Auriga's API.
 * The value is the coefficient (weight) for that exam.
 *
 * To find exam codes: open Auriga → DevTools → Network tab →
 * look for POST requests to /api/menuEntries/.../searchResult →
 * each line's 4th value is the exam code.
 */
export default {
    // Evaluation en entreprise
    `2526_I_INF_FISA_S07_AEE_EAE3_EX`:8, 
    
    // Gérer > Windows sécurité (coeff 2, vs LAN concepts coeff 1)
    '2526_I_INF_FISA_S07_CS_GR_WS_EX': 2,

    // SAE Développement sécurisé > Projet (coeff 3)
    '2526_I_INF_FISA_S07_CS_SAE_DEVSEC_PROJ_EX': 3,

    // SAE Tests d'intrusions > Méthodes d'audit (coeff 2)
    '2526_I_INF_FISA_S07_CS_SAE_INT_MAS_EX': 2,

    // SAE Tests d'intrusions > Pentest (coeff 2)
    '2526_I_INF_FISA_S07_CS_SAE_INT_PEN_EX': 2,
};
