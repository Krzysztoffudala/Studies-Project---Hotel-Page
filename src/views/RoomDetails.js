// RoomDetails.js
import { cartManager } from "../cart/cart-manager";

export function RoomDetails(roomId) {
  const section = document.createElement("section");

  section.innerHTML = `
  <div class=rooms><h2>Pokój</h2>
    <p class="loading">Ładuję pokój...</p>
  `;

  // pobieramy wybrany pokoj z serwera
  fetch(`http://localhost:3000/rooms/${roomId}`)
    .then((response) => response.json())
    .then((room) => {
      const details = document.createElement("article");

      details.innerHTML = `
          <h3>${room.name}</h3>
          <p>Liczba łóżek: ${room.beds}</p>
          <p>Liczba gości: ${room.guests}</p>
          <p>${room.description}</p>
          <p>
            <strong>${room.price.toFixed(2)} PLN</strong>
          </p>
        `;
      details.className = "itemLi";

      const addToCartButton = document.createElement("button");
      addToCartButton.innerText = "✔️ Dodaj do koszyka";
      addToCartButton.className = "btn";
      addToCartButton.addEventListener("click", () =>
        cartManager.addItem(room)
      );

      const removeFromCartButton = document.createElement("button");
      removeFromCartButton.innerText = "❌ Usuń z koszyka";
      removeFromCartButton.classList.add("btn");
      removeFromCartButton.addEventListener("click", () =>
        cartManager.removeItem(room)
      );

      // usuwamy element mowiacy o ladowaniu
      section.querySelector(".loading").remove();
      // podstawiamy gotowa liste z pokojami
      section.append(details);
      details.append(addToCartButton, removeFromCartButton);
    });

  return section;
}
