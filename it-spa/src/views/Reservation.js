//Reservation.js, niestety funkcja "atrapa", ponieważ nie jest połączona z JSONem w taki sposób, żeby blokować możliwość wyboru jakiegoś elementu ponownie i przekazywać te wartości do koszyka. Nie wiem, jak mógłbym to zbudować.

export function Reservation() {
  const section = document.createElement("section");

  section.className = "home";
  section.innerHTML = `
    <div class="home1"><div class="h2"><h2> Sprawdź dostępne terminy </br>🏨🕐</h2></div>
    <p>Witamy w naszym kalendarzu! W bardzo prosty sposób możesz sprawdzić czy wybrany termin i usługa są dostępne. Wybierz datę, pokój/zabieg i zatwierdź wybór.</p>
  
    </div>
    <div class="home2"><p>
    <form>
<label for="date">Wybierz datę przyjazdu</label>
<input type="date" class = "formReservation" id="date" name="date"><br><br>
<label for="date2">Wybierz datę wyjazdu</label>
<input type="date" class = "formReservation" id="date2" name="date2"><br><br>
<label for="room">Wybierz pokój/lub zabieg:</label>
<select id="room" name="room" class = "formReservation">
</select><br><br>
<input type="button" id="reservationButton" class = "formReservation" value="Zatwierdź ✔️">
</form>
    </p></div>
  `;

  const dateInput = section.querySelector("#date");
  dateInput.addEventListener("change", () => {
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    if (selectedDate < today) {
      dateInput.value = today.toISOString().slice(0, 10);

      const message = document.createElement("div");
      message.id = "message1";
      message.innerHTML = `⛔</br>Nie możesz wybrać daty w przeszłości!</br>
      <button id="cancelButton1">Powrót</button>`;
      section.appendChild(message);

      const cancelButton = message.querySelector("#cancelButton1");
      cancelButton.addEventListener("click", () => {
        message.remove();
        date2Input.value = "";
        dateInput.value = "";
      });
    }
  });

  const date2Input = section.querySelector("#date2");
  date2Input.disabled = true;

  dateInput.addEventListener("change", () => {
    const startDate = new Date(dateInput.value);
    date2Input.disabled = false;
    date2Input.min = startDate.toISOString().split("T")[0];
  });

  date2Input.addEventListener("change", () => {
    const selectedDate = new Date(date2Input.value);
    const startDate = new Date(dateInput.value);
    const oneYearAfter = new Date(
      startDate.getFullYear() + 1,
      startDate.getMonth(),
      startDate.getDate()
    );

    if (
      dateInput.value &&
      selectedDate.getTime() - startDate.getTime() > 31536000000
    ) {
      const message2 = document.createElement("div");
      message2.id = "message2";
      message2.innerHTML = `⚠️</br>Wybrana data wyjazdu nie może być dalsza niż rok od daty przyjazdu!</br><button id="cancelButton2">Powrót</button>`;
      const cancelButton2 = message2.querySelector("#cancelButton2");
      message2.appendChild(cancelButton2);
      section.appendChild(message2);
      cancelButton2.addEventListener("click", () => {
        message2.remove();
        date2Input.value = "";
        dateInput.value = "";
      });
    } else {
      const message2 = document.querySelector("#message2");
      if (message2) message2.remove();
    }
  });

  fetch("http://localhost:3000/rooms")
    .then((response) => response.json())
    .then((rooms) => {
      const roomSelect = document.querySelector("#room");
      rooms.forEach((room) => {
        const option = document.createElement("option");
        option.value = room.name;
        option.text = "Hotel: " + room.name;
        roomSelect.appendChild(option);
      });
    });

  fetch("http://localhost:3000/treatments")
    .then((response) => response.json())
    .then((treatments) => {
      const option = section.querySelector("#room");
      treatments.forEach((treatment) => {
        const newOption = document.createElement("option");
        newOption.value = treatment.name;
        newOption.text = "Zabieg: " + treatment.name;
        option.appendChild(newOption);
      });
    });

  const button = section.querySelector("#reservationButton");

  button.addEventListener("click", () => {
    const newSection = document.createElement("section");
    section.replaceWith(newSection);

    newSection.className = "home";
    newSection.innerHTML = `<div class="home1"><div class="h2"><h2> Termin wolny! 🏨🕐</h2></div><p>Dziękujemy za skorzystanie z naszego systemu! Wygląda na to, że wybrany termin i usługa są dostępne. Zapraszamy do wyboru wybranej usługi poprzez zakładkę Pokoje / Zabiegi a następnie o dokonanie płatności w sekcji Koszyk.</p></div>`;

    const goBack = document.createElement("div");
    goBack.innerHTML = `<button id="goBack">Powrót do systemu rezerwacji 🔙</button>`;

    newSection.appendChild(goBack);

    const buttonBack = document.querySelector("#goBack");
    buttonBack.addEventListener("click", () => {
      newSection.replaceWith(section);
    });
  });

  return section;
}

// funkcja, ktora przenosi do koszyka -> niestety nie wiem, jak moznaby ją połączyć, żeby po wybraniu przedmiotu dodawało go do koszyka. Dodatkowo, z pozycji Pokoje / Zabiegi nie ma możliwości wybrania daty, więc wtedy musiałbym dodać tę opcję do wyboru z koszyka, dla każdego z przedmiotów oddzielnie bądź dla wszystkich zbiorczo. To wszystko wychodzi ponad mój aktualny poziom zaawansowania w JS.

// //import { cartManager } from '../cart/cart-manager';
// import { NavButton } from '../common/NavButton';
// import { dateManager } from '../cart/date-manager';
// import { Home } from './Home';
// import { Cart } from './Cart';
// import { RoomList } from './RoomList';
// import { RoomDetails } from './RoomDetails';

// export function Reservation() {

//   const section = document.createElement('section');

//   section.className ='home';
//   section.innerHTML = `
//     <div class="home1"><div class="h2"><h2> System rezerwacyjny 🏨🕐</h2></div>
//     <p>Witamy w naszym systemie rezerwacyjnym! W bardzo prosty sposób możesz zarezerwować dogodny termin. Wybierz datę, pokój/zabieg i zatwierdź wybór.</p>

//     </div>
//     <div class="home2"><p>
//     <form>
// <label for="date">Wybierz datę:</label>
// <input type="date" id="date" name="date"><br><br>
// <label for="room">Wybierz pokój/lub zabieg:</label>
// <select id="room" name="room">
// </select><br><br>
// <input type="button" id="reservationButton"value="Zatwierdź ✔️">
// </form>
//     </p></div>
//   `;

//   const dateInput = section.querySelector('#date');
//   dateInput.addEventListener('change', () => {
//     const selectedDate = new Date(dateInput.value);
//     const today = new Date();
//     if (selectedDate < today) {

//       dateInput.value = today.toISOString().slice(0,10);

//       const message = document.createElement('div');
//       message.id = "message1"
//       message.innerHTML = `⛔</br>Nie możesz wybrać daty w przeszłości!</br>
//       <button id="cancelButton1">Powrót</button>`;
//       section.appendChild(message);

//       const cancelButton = message.querySelector('#cancelButton1');
//       cancelButton.addEventListener("click", () => {
//       message.remove();
//       });

//     }
//   });

//   fetch('http://localhost:3000/rooms')
//   .then(response => response.json())
//   .then(rooms => {
//       const roomSelect = section.querySelector('#room');
//       rooms.forEach(room => {
//         const option = document.createElement('option');
//         option.value = room.name;
//         option.text = 'Hotel: ' + room.name;
//         roomSelect.appendChild(option);
//       });
//   });

//   fetch('http://localhost:3000/treatments')
//   .then(response => response.json())
//   .then(treatments => {
//       const option = section.querySelector('#room');
//       treatments.forEach(treatment => {
//         const newOption = document.createElement('option');
//         newOption.value = treatment.name;
//         newOption.text = 'Zabieg: ' + treatment.name;
//         option.appendChild(newOption);
//       });
//   });

//   const button = section.querySelector('#reservationButton');

//   button.addEventListener("click", () => {

//     const cartSection = Cart();
//     section.replaceWith(cartSection);

//     const goBack = document.createElement('div')
//     goBack.innerHTML = `<button id="goBack">Powrót do systemu rezerwacji 🔙</button>`;

//     cartSection.insertBefore(goBack, cartSection.firstChild);

//     const buttonBack = document.querySelector('#goBack');
//     buttonBack.addEventListener("click", () => {
//       cartSection.replaceWith(section);
//     });

//   });

//   return section;
// }
