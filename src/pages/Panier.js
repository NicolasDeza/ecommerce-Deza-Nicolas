// import { Panier } from "../pages/Produits/Produit.js";
// import { SupprimerPanier } from "./Produits/Produit.js";
// import { EnleverProduit } from "./Produits/Produit.js";
// import { ProduitPanier } from "./Produits/Produit.js";

// Panier();

// ProduitPanier();

function recupPanier() {
  try {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let total = 0;
    panier.forEach((produit) => {
      total += parseFloat(produit.prix) * produit.quantite;
    });
    return { panier, total: total.toFixed(2) };
  } catch (e) {
    console.error("Erreur lors de la récupération du panier", e);
    return { panier: [], total: 0 };
  }
}

const SupprimerPanier = () => {
  localStorage.removeItem("panier");
};

const AjouterProduit = (produit) => {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  let produitPanier = panier.find((p) => p.id === produit.id);
  if (produitPanier) {
    produitPanier.quantite++;
  } else {
    panier.push({ ...produit, quantite: 1 });
  }
  localStorage.setItem("panier", JSON.stringify(panier));
};

const EnleverProduit = (produit) => {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  let produitPanier = panier.find((p) => p.id === produit.id);
  if (produitPanier) {
    produitPanier.quantite--;
    if (produitPanier.quantite === 0) {
      panier = panier.filter((p) => p.id !== produit.id);
    }
  }
  localStorage.setItem("panier", JSON.stringify(panier));
};

export const Panier = (element) => {
  let { panier, total } = recupPanier();
  element.innerHTML = `
<h1 class="Panier mb-4">Panier</h1>
<div class="table-responsive">
  <table class="table table-striped table-bordered">
    <thead class="table-dark">
      <tr>
        <th scope="col" class="Panier">Article</th>
        <th scope="col" class="Panier">Prix unitaire</th>
        <th scope="col" class="Panier">Quantité</th>
        <th scope="col" class="Panier">Prix total (TTC)</th>
        <th scope="col" class="Panier">Actions</th>
      </tr>
    </thead>
    <tbody>
      ${panier
        .map(
          (produit) => `
        <tr>
          <td class="Panier align-middle">${produit.name}</td>
          <td class="Panier align-middle">${produit.prix} €</td>
          <td class="Panier align-middle">${produit.quantite}</td>
          <td class="Panier align-middle">${
            produit.prix * produit.quantite
          } €</td>
          <td class="Panier align-middle">
            <button class="btn btn-sm btn-primary ajouterProduit">+</button>
            <button class="btn btn-sm btn-danger enleverProduit">-</button>
          </td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>
</div>
<p id="Total" class="fs-5 mt-3">Total : <span class="fw-bold">${total}</span> €</p>
<button id="supprimerPanier" class="btn btn-danger mt-3">
  Supprimer le Panier
</button>
	`;
  document.querySelector("#supprimerPanier").addEventListener("click", () => {
    SupprimerPanier();
    Panier(element); // Permet de mettre automatiquement à jour la page
  });
  element.querySelector(".ajouterProduit").addEventListener("click", () => {
    AjouterProduit(produit);
    ProduitPanier(element, produit);
  });
  element.querySelector(".enleverProduit").addEventListener("click", () => {
    EnleverProduit(produit);
    Panier();
  });
};
