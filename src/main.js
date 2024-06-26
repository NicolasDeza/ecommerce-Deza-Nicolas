import "./style.scss";
import "remixicon/fonts/remixicon.css";

import { app } from "./framework/app";
import { Contact } from "./pages/Contact";
import { Produits } from "./pages/Produits";
import { Produit } from "./pages/Produit";
import { Panier } from "./pages/Panier";

const routes = {
  "/": Produits,
  "/contact": Contact,
  "/produit": Produit,
  "/produits": Produits,
  "/panier": Panier,
};

app("#app", routes);
