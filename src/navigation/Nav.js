// Nav.js

import { NavButton } from "../common/NavButton";
import { Cart, tableFooter, section, totalQuantity } from "../views/Cart";
import { Home } from "../views/Home";
import { RoomList } from "../views/RoomList";
import { Treatments } from "../views/Treatments";
import { Reservation } from "../views/Reservation";
import {
  cartManager,
  getTotalPrice,
  Object,
  content,
  cart,
  getAllItems,
} from "../cart/cart-manager";

export const navItems = [
  { name: "Hotel", component: Home },
  { name: "Pokoje", component: RoomList },
  { name: "Zabiegi", component: Treatments },
  { name: "Rezerwacja", component: Reservation },
  { name: "Koszyk", component: Cart },
];

export function Nav() {
  const nav = document.createElement("nav");

  const navButtons = navItems.map((navItem) => {
    return NavButton(navItem.name, navItem.component, ["btn"]);
  });

  nav.append(...navButtons);

  const lol1 = document.createElement("div"); //

  lol1.className = "cartJs";

  const lol2 = document.createElement("div");
  lol2.id = "resetButtonDiv";

  nav.append(lol1);
  nav.append(lol2);

  const removeAll = document.createElement("button");
  removeAll.innerText = "❌";
  removeAll.id = "resetButton";
  removeAll.addEventListener("click", () => cartManager.resetCart());

  function updateCartPrice() {
    lol1.innerHTML = `<span class="cartIcon">🛒</span></br>Cena:<strong>${Math.round(
      cartManager.getTotalPrice()
    )} PLN</strong></br>Przedmioty:<strong>${cartManager
      .getAllItems()
      .reduce((total, item) => total + item.quantity, 0)} </strong>`;
  }
  lol2.append(removeAll);

  setInterval(updateCartPrice, 1);

  return nav;
}
