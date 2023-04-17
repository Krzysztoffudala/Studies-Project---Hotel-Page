// TreatmentDetails.js
import { cartManager } from '../cart/cart-manager';
export function TreatmentDetails(treatmentId) {

  const section = document.createElement('section');
  
  section.innerHTML = `
  <div class=rooms><h2>Zabieg</h2>
    <p class="loading">Ładuję zabieg...</p>
  `;

  // pobieramy wybrany zabieg z serwera
  fetch(`http://localhost:3000/treatments/${treatmentId}`)
    .then(response => response.json())
    .then(treatment => {
        const details = document.createElement('article');

        details.innerHTML = `
          <h3>${treatment.name}</h3>
          <p>Partia ciała: ${treatment.area}</p>
          <p>Czas zabiegu: ${treatment.time} min</p>
          <p>${treatment.description}</p>
          <p>
            <strong>${treatment.price.toFixed(2)} PLN</strong>
          </p>
        `;
        details.className = 'itemLi'

        const addToCartButton = document.createElement('button');
          addToCartButton.innerText = '✔️ Dodaj do koszyka';
          addToCartButton.classList.add('btn');
          addToCartButton.addEventListener('click', () => cartManager.addItem(treatment));

          const removeFromCartButton = document.createElement('button');
          removeFromCartButton.innerText = '❌ Usuń z koszyka';
          removeFromCartButton.classList.add('btn');
          removeFromCartButton.addEventListener('click', () => cartManager.removeItem(treatment));


        section.querySelector('.loading').remove();

        section.append(details);
        details.append(addToCartButton, removeFromCartButton);
    });

  return section;
}
