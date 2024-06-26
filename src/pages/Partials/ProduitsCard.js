import { CategorieBadge } from "./CategorieBadge";

/**
 * @typedef {Object} Produit
 * @property {number} id - L'identifiant du Produit.
 * @property {string} name - Le nom du Produit.
 * @property {string} photo - La photo du produit.
 * @property {string} categorie - La categorie du produit.
 */

/**
 * Affiche une carte du Produit
 *
 * @param {Produit} produit
 * @returns {string} HTML string
 */
export const ProduitCard = (produit) => {
  return `
    <div class="col-md-4 col-lg-3 mb-4">
      <div class="card h-100 shadow-sm border-0">
        <a class="card-link" href="/produit?id=${produit.id}">
          <img src="${produit.photo}" class="card-img-top rounded-top" alt="${
    produit.name
  }">
        </a>
        <div class="card-body text-center">
          <h5 class="card-title font-weight-bold">${produit.name}</h5>
          <p class="card-text text-muted">${produit.description}</p>
          <p class="card-text prix">${produit.prix} €</p>
          ${CategorieBadge(produit.categorie)}
        </div>
      </div>
    </div>
  `;
};
