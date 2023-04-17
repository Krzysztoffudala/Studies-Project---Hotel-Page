// problem jest taki, ze jak uzytkownik ma coś w koszyku i skorzysta z opcji wyczyszcenia koszyka poprzez znak X, informacje w nawigacji zmienią się, natomiast sekcja "koszyk" zmieni się dopiero po odswieżeniu strony / przeskoczeniu na inne zakładki i powrót. Nie jestem pewny jak to zmienić.

import { cartManager } from "../cart/cart-manager";
import { NavButton } from "../common/NavButton";

export function Cart() {
  const section = document.createElement("section");

  const moveToPayment = document.createElement("button");
  moveToPayment.innerText = "Przejdź do płatności ✔️💸";
  moveToPayment.id = "moveToPaymentBtn";
  moveToPayment.addEventListener("click", () => {
    cartManager.moveToPayment();
  });

  section.id = "cartSection";
  section.innerHTML = `
    <h2 class="h2section">Koszyk</br></br></h2>
    <p>Przeglądaj zawartość koszyka:</p>
    <table class="table"></table>
  `;

  const tableHead = document.createElement("tr");

  tableHead.innerHTML = `
    <th>Nazwa</th>
    <th>Ilość</th>
    <th>Cena</th>
    <th></th>
  `;

  const tableRows = cartManager.getAllItems().map((item) => {
    const tr = document.createElement("tr");

    const removeItem = NavButton(
      "❌",
      () => {
        cartManager.removeItem(item);
        return Cart();
      },
      ["btn"]
    );

    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.price.toFixed(2)} PLN</td>
      <td></td>
    `;

    tr.lastElementChild.append(removeItem);

    return tr;
  });

  const tableFooter = document.createElement("tr");

  const totalQuantity = cartManager
    .getAllItems()
    .reduce((total, item) => total + item.quantity, 0);

  tableFooter.innerHTML = `
    <td></td>
    <td><strong>${totalQuantity}</strong></td>
    <td>
      <strong>${cartManager.getTotalPrice()}</strong> PLN
    </td>
    <td></td>
  `;

  section.querySelector(".table").append(tableHead, ...tableRows, tableFooter);
  section.querySelector(".h2section").append(moveToPayment);

  return section;
}
