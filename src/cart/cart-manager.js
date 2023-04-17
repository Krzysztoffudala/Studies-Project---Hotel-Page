// cart-manager.js
const key = "it-spa-cart";

export const cartManager = {
  addItem(item) {
    const cart = localStorage.getItem(key);
    let content;

    if (cart === null) {
      content = {
        [item.name]: { price: item.price, quantity: 1 },
      };
    } else {
      content = JSON.parse(cart);
      // np. { 'Pokój unarny': { price: 170, quantity: 2 } }

      // if (content.hasOwnProperty(item.name))
      if (item.name in content) {
        content[item.name].quantity += 1;
      } else {
        const newItem = {
          [item.name]: { price: item.price, quantity: 1 },
        };

        // doklada nowy wpis (klucz: wartosc) do obiektu `content`
        Object.assign(content, newItem);
      }
    }

    localStorage.setItem(key, JSON.stringify(content));
  },

  removeItem(item) {
    const cart = localStorage.getItem(key);

    if (cart !== null) {
      const content = JSON.parse(cart);

      if (item.name in content) {
        if (content[item.name].quantity > 1) {
          content[item.name].quantity -= 1;
        } else {
          delete content[item.name];
        }
      }

      localStorage.setItem(key, JSON.stringify(content));
    }
  },

  getAllItems() {
    const cart = localStorage.getItem(key);

    if (cart === null) {
      return [];
    } else {
      const content = JSON.parse(cart);

      // entry to jest [KLUCZ, WARTOSC]
      return Object.entries(content).map((entry) => {
        const [itemName, itemDetails] = entry;

        return {
          name: itemName,
          price: itemDetails.price,
          quantity: itemDetails.quantity,
        };
      });
    }
  },

  getTotalPrice() {
    const cart = localStorage.getItem(key);

    if (cart === null) {
      return "0.00";
    } else {
      const content = JSON.parse(cart);

      // [{ price, quantity }, { price, quantity },  { price, quantity }, ...]
      return Object.values(content)
        .reduce((totalPrice, item) => {
          return totalPrice + item.price * item.quantity;
        }, 0)
        .toFixed(2);
    }
  },

  resetCart() {
    const confirmationWindow = document.createElement("div");
    confirmationWindow.id = "confirmationWindow";
    confirmationWindow.innerHTML = `
      <p></br>Na pewno chcesz wyczyścić koszyk❓</p>
      <button id="confirmButton">❌ tak, usuń wszystko</button>
      <button id="cancelButton">nie</button>
    `;
    document.body.appendChild(confirmationWindow);

    const confirmButton = confirmationWindow.querySelector("#confirmButton");
    const cancelButton = confirmationWindow.querySelector("#cancelButton");

    confirmButton.addEventListener("click", () => {
      localStorage.removeItem(key);
      confirmationWindow.remove();
      const message = document.createElement("div");
      message.id = "message";
      message.innerHTML = `✔️</br>Pomyślnie usunięto zawartość koszyka!`;

      document.body.appendChild(message);
      setTimeout(() => {
        message.remove();
      }, 2000);
    });

    cancelButton.addEventListener("click", () => {
      confirmationWindow.remove();
    });
  },

  moveToPayment() {
    const totalPrice = parseFloat(cartManager.getTotalPrice());
    if (totalPrice === 0 || isNaN(totalPrice)) {
      const emptyCartWindow = document.createElement("div");
      emptyCartWindow.id = "emptyCartWindow";
      emptyCartWindow.innerHTML = `
        <p>Ooops!</br>Koszyk jest pusty!</p>
        <button id="returnToShoppingButton">🧺 powrót do zakupów</button>
      `;
      document.body.appendChild(emptyCartWindow);

      const returnToShoppingButton = emptyCartWindow.querySelector(
        "#returnToShoppingButton"
      );

      returnToShoppingButton.addEventListener("click", () => {
        emptyCartWindow.remove();
      });
    }
    if (totalPrice > 0 || isNaN(totalPrice)) {
      const confirmationWindow = document.createElement("div");
      confirmationWindow.id = "confirmationWindow";
      confirmationWindow.innerHTML = `
      <p>Super!</br>Koniec zakupów?</p>
      <button id="confirmButtonPayment">✔️ tak, rezerwuję i płacę</button>
      <button id="cancelButtonPayment">❌ nie</button>
    `;
      document.body.appendChild(confirmationWindow);

      const confirmButton = confirmationWindow.querySelector(
        "#confirmButtonPayment"
      );
      const cancelButton = confirmationWindow.querySelector(
        "#cancelButtonPayment"
      );

      confirmButton.addEventListener("click", () => {
        confirmationWindow.remove();
        const cartSection = document.getElementById("cartSection");
        cartSection.innerHTML = "";

        const sectionNew = document.createElement("section");
        sectionNew.innerHTML = `<h1>Gratulacje!</h1><p>Prosimy przelej kwotę <strong>${cartManager.getTotalPrice()}</strong> PLN na konto 💸 <strong>PLXX XX20 2892 2276 3005 0000 0000</strong></br></br>
      W tytule przelewu prosimy podać imię i nazwisko.</br> Potwierdzenie przelewu wraz z imieniem i nazwiskiem oraz preferowaną datą przyjazdu prosimy przesłać na nasz adres mailowy: <strong></br>📧 recepcja@hotelspa.com</strong> </br></br> W razie pytań zapraszamy do kontaktu. </br></br> Dziękujemy za rezerwację i życzymy udanego pobytu!</br> Zespół IT SPA Hotel </p>`;

        const symbols = document.createElement("div");
        symbols.id = "symbols";
        symbols.innerHTML = "🏩🏖️🏝️🌅";
        sectionNew.append(symbols);

        cartSection.append(sectionNew);
      });

      cancelButton.addEventListener("click", () => {
        confirmationWindow.remove();
      });
    }
  },
};
