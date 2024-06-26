/**
 * Badge de categorie produit
 *
 * @param {string} categorie
 * @returns {string} HTML string
 */
export const CategorieBadge = (categorie) => {
  const categories = {
    HomeDecor: "text-bg-warning", // Jaune
    PersonalCare: "text-bg-info", // Bleu clair
    Fitness: "text-bg-success", // Vert
    Electronics: "text-bg-primary", // Bleu foncé
    Clothing: "text-bg-dark", // Noir
    Furniture: "text-bg-secondary", // Gris
    Outdoors: "text-bg-success", // Vert
    Kitchen: "text-bg-danger", // Rouge
    HomeAppliances: "text-bg-primary", // Bleu foncé
  };

  const categorieBadge = categories[categorie] || "text-bg-secondary";

  return `
      <span class="badge ${categorieBadge}">${categorie}</span>
    `;
};
