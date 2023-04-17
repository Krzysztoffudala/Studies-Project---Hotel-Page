// RoomList.js

import { RoomDetails } from "./RoomDetails";
import { NavButton } from "../common/NavButton";
import { cartManager } from "../cart/cart-manager";

export function RoomList() {
  const section = document.createElement("section");
  const ul = document.createElement("ul");

  section.innerHTML = `
    <div class=rooms><h2>Lista pokoi</h2>
    <p>Kup <strong>voucher</strong> na dowolny poniższy <strong>pokój</strong>, następnie Ty lub osoba, której przekażesz voucher będzie mogla go wykorzystać w ciągu <Strong>2 lat</Strong>.</p>
    <p class="loading">Ładuję listę pokoi...</p></div>
  `;

  // pobieramy liste pokoi z serwera
  fetch("http://localhost:3000/rooms")
    .then((response) => response.json())
    .then((rooms) => {
      const lis = rooms.map((room) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <h4>${room.name}</h4>
            <p>
              <strong>${room.price.toFixed(2)} PLN</strong>
            </p>
            <footer></footer>
          `;
        li.className = "itemLi";
        const addToCartButton = document.createElement("button");
        addToCartButton.innerText = "✔️ Dodaj do koszyka";
        addToCartButton.classList.add("btn");
        addToCartButton.addEventListener("click", () =>
          cartManager.addItem(room)
        );

        //
        const removeFromCartButton = document.createElement("button");
        removeFromCartButton.innerText = "❌ Usuń z koszyka";
        removeFromCartButton.classList.add("btn");
        removeFromCartButton.addEventListener("click", () =>
          cartManager.removeItem(room)
        );

        const detailsButton = NavButton(
          "ℹ️ Więcej informacji...",
          () => RoomDetails(room.id),
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
