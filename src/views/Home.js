// Home.js
//zdjecie sie nie laduje -> myslalem, ze to problem z relative path, ale probowalem juz roznych sciezek, nawet przerzucilem drink.jpg do tego samego folderu co index.html, ale ciagle jest jakis problem, error konsoli nie jest jasny. Wyswietla sie error icon i alt text, wiec funkcja dziala. Probowalem wstawiac juz w roznych funkcjach i nigdzie nie dziala,

export function Home() {
  const section = document.createElement("section");

  section.className = "home";
  section.innerHTML = `
    <div class="home1"><div class="h2"><h2> Hotel IT SPA 🏩🏖️🏝️</h2></div>
    <p>Witamy!</p>
    <p>Witamy w Hotelu IT SPA - idealnym miejscu dla osób, które chcą odpocząć, zrelaksować się i zadbać o swoje zdrowie. Nasze pokoje są komfortowe i przestronne, a także wyposażone w wszystko, co potrzebne do wygodnego wypoczynku.</br></br>Mamy do zaoferowania wiele różnych rodzajów pokoi, w tym jednoosobowe, dwuosobowe oraz rodzinne. Każdy pokój jest urządzony w eleganckim stylu, a jego wystrój z pewnością spełni oczekiwania nawet najbardziej wymagających gości.</br></br>Nasz hotel oferuje wiele atrakcji, które umilą pobyt naszym gościom. Oferujemy profesjonalne spa, w którym nasi wykwalifikowani pracownicy zadbają o pełny relaks naszych gości. Nasze zabiegi dla ciała i twarzy to wspaniała okazja do odprężenia się po ciężkim dniu pracy. </p>
    </div>
    <div class="home2"><p>Nasz hotel szczególnie polecamy osobom z branży IT, które chcą zadbać o swoje zdrowie oraz odpocząć w komfortowych warunkach.</br></br>W naszym hotelu znajduje się także basen, siłownia oraz restauracja, w której podajemy wyśmienite dania kuchni międzynarodowej. Dzięki temu każdy gość z pewnością znajdzie coś dla siebie.</br></br>Zapraszamy serdecznie do Hotelu IT SPA, gdzie z pewnością spędzisz niezapomniane chwile!</p></p>
    </div>
  `;

  // const image = document.createElement('img');
  // image.src = "drink.jpg"
  // image.alt = 'drink photo'
  // section.append(image);

  return section;
}
