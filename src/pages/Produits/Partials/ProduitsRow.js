import { CategorieBadge } from "./CategorieBadge";

/**
 * @typedef {Object} Produit
 * @property {number} id - L'identifiant du produit.
 * @property {string} name - Le nom du produit.
 * @property {string} photo - La photo du produit.
 * @property {string} categorie - La catégorie du produit.
 */

/**
 * Affiche une ligne d'un tableau d'produits
 *
 * @param {Produit} produit
 * @returns {string} HTML string
 */
export const ProduitRow = (produit) => {
  return `
    <tr>
      <td class="rowcarte">${produit.name}</td>
      <td class="rowcarte">${produit.description}</td>
      <td>${CategorieBadge(produit.categorie)}</td>
      <td class="prix">${produit.prix} €</td>
      <td><a class="btn btn-primary btn-sm" href="/produit?id=${
        produit.id
      }"><i class="ri-search-eye-line"></i></a></td>
    </tr>
    `;
};
