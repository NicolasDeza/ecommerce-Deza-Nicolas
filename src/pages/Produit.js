import Produits from "../storage/produits.json";
import { CategorieBadge } from "./Partials/CategorieBadge";

/**
 * Page des détails d'un produit
 *
 * @param {HTMLElement} element
 * @returns {void}
 */

function escapeHTML(str) {
  return str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[tag] || tag)
  );
}

export const Produit = (element) => {
  // on récupère l'identifiant du Produit depuis l'URL
  const url = new URL(window.location.href);
  const produitId = parseInt(url.searchParams.get("id"));
  console.log("Produit ID:", produitId);

  // on récupère le produit correspondant à l'identifiant
  const produit = Produits.find((produit) => produit.id === produitId);
  console.log("Produit trouvé:", produit);

  // si le produit n'existe pas, on affiche un message d'erreur
  if (
    produit &&
    produit.name &&
    produit.photo &&
    produit.description &&
    produit.prix &&
    produit.categorie // Utilisez 'categorie' sans accent aigu
  ) {
    element.innerHTML = `
      <h1 class="presentation">${escapeHTML(produit.name)}</h1>
      <figure class="presentation">
      <img src="${escapeHTML(
        produit.photo
      )}" id="affichage" class="card-img-top" alt="${escapeHTML(produit.name)}">
      </figure>
      <p class="presentation">${escapeHTML(produit.description)}</p>
      <p id="prix" class="presentation">${escapeHTML(
        produit.prix.toString()
      )} €</p>
      <p class="presentation">${CategorieBadge(
        escapeHTML(produit.categorie)
      )}</p> <!-- Utilisez 'categorie' sans accent aigu -->
      <p class="presentation"><input id="quantite"  type="number" name="quantity" value="1" min="1" max="10">
      <button id="envoyer" class="btn btn-success presentation">Ajouter au panier</button></p>
      <div id="messageConfirmation" class="presentation" style="color: red; display: none;"></div>
    `;

    let baliseQuantite = document.getElementById("quantite");
    let baliseEnvoyer = document.getElementById("envoyer");
    if (baliseEnvoyer && baliseQuantite) {
      baliseEnvoyer.addEventListener("click", () => {
        let quantite = parseInt(baliseQuantite.value);
        if (!isNaN(quantite) && quantite > 0) {
          try {
            let panier = JSON.parse(localStorage.getItem("panier")) || [];
            let produitPanier = panier.find(
              (produit) => produit.id === produitId
            );
            if (produitPanier) {
              produitPanier.quantite += quantite;
            } else {
              panier.push({ ...produit, quantite });
            }
            localStorage.setItem("panier", JSON.stringify(panier));

            let messageConfirmation = document.getElementById(
              "messageConfirmation"
            );
            messageConfirmation.textContent =
              "Le produit a bien été ajouté à votre panier.";
            messageConfirmation.style.display = "block";
          } catch (e) {
            console.error("Erreur lors de la manipulation du panier", e);
          }
        }
      });
    }
  } else {
    element.innerHTML = "<p>Produit non trouvé ou informations manquantes.</p>";
  }
};
