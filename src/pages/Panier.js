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
	<h1 class="Panier">Panier</h1>
	<table class="table">
		<thead>
			<tr>
				<th scope="col" class="Panier">Nom</th>
				<th scope="col" class="Panier">Prix unitaire</th>
				<th scope="col" class="Panier">Quantité</th>
				<th scope="col" class="Panier">Prix total</th>
			</tr>
		</thead>
		<tbody>
			${panier
				.map(
					(produit) => `
				<tr>
					<td class="Panier">${produit.name}</td>
					<td class="Panier">${produit.prix} €</td>
					<td class="Panier">${produit.quantite}</td>
					<td class="Panier">${produit.prix * produit.quantite} €</td>
          <td class="Panier">
            <button class="btn btn-primary ajouterProduit">+</button>
            <button class="btn btn-danger enleverProduit">-</button>
				</tr>
			`
				)
				.join("")}
		</tbody>
	</table>
	<p id="Total" >Total : <span>${total}</span> €</p>
	<button id='supprimerPanier' class='btn btn-danger'>
	Supprimer TOUT le Panier
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
