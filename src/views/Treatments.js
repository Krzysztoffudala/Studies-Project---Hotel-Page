// Treatments.js

import { TreatmentDetails } from "./TreatmentDetails";
import { NavButton } from "../common/NavButton";
import { cartManager } from "../cart/cart-manager";

export function Treatments() {
  const section = document.createElement("section");
  const ul = document.createElement("ul");

  section.innerHTML = `
  <div class=rooms><h2>Lista zabiegów</h2>
    <p>Kup <strong>voucher</strong> na dowolny poniższy <strong>zabieg</strong>, następnie Ty lub osoba, której przekażesz voucher będzie mogla go wykorzystać w ciągu <Strong>2 lat</Strong>.</p>
    <p class="loading">Ładuję listę zabiegów...</p></div>
  `;

  // pobieramy liste pokoi z serwera
  fetch("http://localhost:3000/treatments")
    .then((response) => response.json())
    .then((treatments) => {
      const lis = treatments.map((treatment) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <h4>${treatment.name}</h4>
            <p>
              <strong>${treatment.price.toFixed(2)} PLN</strong>
            </p>
            <footer></footer>
          `;
        li.className = "itemLi";
        const addToCartButton = document.createElement("button");
        addToCartButton.innerText = "✔️ Dodaj do koszyka";
        addToCartButton.classList.add("btn");
        addToCartButton.addEventListener("click", () =>
          cartManager.addItem(treatment)
        );

        // usuwamy cos z koszyka
        const removeFromCartButton = document.createElement("button");
        removeFromCartButton.innerText = "❌ Usuń z koszyka";
        removeFromCartButton.classList.add("btn");
        removeFromCartButton.addEventListener("click", () =>
          cartManager.removeItem(treatment)
        );
        //

        const detailsButton = NavButton(
          "ℹ️ Więcej informacji...",
          () => TreatmentDetails(treatment.id),
          ["btn"]
        );

        li.querySelector("footer").append(
          addToCartButton,
          removeFromCartButton,
          detailsButton
        );

        return li;
      });

      ul.append(...lis);

      // usuwamy element mowiacy o ladowaniu
      section.querySelector(".loading").remove();
      // podstawiamy gotowa liste z pokojami
      section.append(ul);
    });

  return section;
}
