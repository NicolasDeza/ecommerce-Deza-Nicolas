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

const AjouterProduit = (produitId) => {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  let produitPanier = panier.find((p) => p.id === produitId);
  if (produitPanier) {
    produitPanier.quantite++;
  }
  localStorage.setItem("panier", JSON.stringify(panier));
};

const EnleverProduit = (produitId) => {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  let produitPanier = panier.find((p) => p.id === produitId);
  if (produitPanier) {
    produitPanier.quantite--;
    if (produitPanier.quantite === 0) {
      panier = panier.filter((p) => p.id !== produitId);
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
          <td class="Panier align-middle">${(
            produit.prix * produit.quantite
          ).toFixed(2)} €</td>
          <td class="Panier align-middle">
            <button class="btn btn-sm btn-primary ajouterProduit" data-id="${
              produit.id
            }">+</button>
            <button class="btn btn-sm btn-danger enleverProduit" data-id="${
              produit.id
            }">-</button>
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

  document.querySelectorAll(".ajouterProduit").forEach((button) => {
    button.addEventListener("click", () => {
      const produitId = parseInt(button.getAttribute("data-id"));
      AjouterProduit(produitId);
      Panier(element); // Met à jour la page après modification
    });
  });

  document.querySelectorAll(".enleverProduit").forEach((button) => {
    button.addEventListener("click", () => {
      const produitId = parseInt(button.getAttribute("data-id"));
      EnleverProduit(produitId);
      Panier(element); // Met à jour la page après modification
    });
  });
};
