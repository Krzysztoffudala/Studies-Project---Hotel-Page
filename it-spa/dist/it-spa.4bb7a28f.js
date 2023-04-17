// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/bootstrap/dist/css/bootstrap.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/it-spa.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./assets\\ITbanner1.jpg":[["ITbanner1.2a93be82.jpg","src/assets/ITbanner1.jpg"],"src/assets/ITbanner1.jpg"],"./assets\\ITbanner1v3.jpg":[["ITbanner1v3.84df73e3.jpg","src/assets/ITbanner1v3.jpg"],"src/assets/ITbanner1v3.jpg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/views/Home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = Home;
// Home.js
//zdjecie sie nie laduje -> myslalem, ze to problem z relative path, ale probowalem juz roznych sciezek, nawet przerzucilem drink.jpg do tego samego folderu co index.html, ale ciagle jest jakis problem, error konsoli nie jest jasny. Wyswietla sie error icon i alt text, wiec funkcja dziala. Probowalem wstawiac juz w roznych funkcjach i nigdzie nie dziala,

function Home() {
  var section = document.createElement("section");
  section.className = "home";
  section.innerHTML = "\n    <div class=\"home1\"><div class=\"h2\"><h2> Hotel IT SPA \uD83C\uDFE9\uD83C\uDFD6\uFE0F\uD83C\uDFDD\uFE0F</h2></div>\n    <p>Witamy!</p>\n    <p>Witamy w Hotelu IT SPA - idealnym miejscu dla os\xF3b, kt\xF3re chc\u0105 odpocz\u0105\u0107, zrelaksowa\u0107 si\u0119 i zadba\u0107 o swoje zdrowie. Nasze pokoje s\u0105 komfortowe i przestronne, a tak\u017Ce wyposa\u017Cone w wszystko, co potrzebne do wygodnego wypoczynku.</br></br>Mamy do zaoferowania wiele r\xF3\u017Cnych rodzaj\xF3w pokoi, w tym jednoosobowe, dwuosobowe oraz rodzinne. Ka\u017Cdy pok\xF3j jest urz\u0105dzony w eleganckim stylu, a jego wystr\xF3j z pewno\u015Bci\u0105 spe\u0142ni oczekiwania nawet najbardziej wymagaj\u0105cych go\u015Bci.</br></br>Nasz hotel oferuje wiele atrakcji, kt\xF3re umil\u0105 pobyt naszym go\u015Bciom. Oferujemy profesjonalne spa, w kt\xF3rym nasi wykwalifikowani pracownicy zadbaj\u0105 o pe\u0142ny relaks naszych go\u015Bci. Nasze zabiegi dla cia\u0142a i twarzy to wspania\u0142a okazja do odpr\u0119\u017Cenia si\u0119 po ci\u0119\u017Ckim dniu pracy. </p>\n    </div>\n    <div class=\"home2\"><p>Nasz hotel szczeg\xF3lnie polecamy osobom z bran\u017Cy IT, kt\xF3re chc\u0105 zadba\u0107 o swoje zdrowie oraz odpocz\u0105\u0107 w komfortowych warunkach.</br></br>W naszym hotelu znajduje si\u0119 tak\u017Ce basen, si\u0142ownia oraz restauracja, w kt\xF3rej podajemy wy\u015Bmienite dania kuchni mi\u0119dzynarodowej. Dzi\u0119ki temu ka\u017Cdy go\u015B\u0107 z pewno\u015Bci\u0105 znajdzie co\u015B dla siebie.</br></br>Zapraszamy serdecznie do Hotelu IT SPA, gdzie z pewno\u015Bci\u0105 sp\u0119dzisz niezapomniane chwile!</p></p>\n    </div>\n  ";

  // const image = document.createElement('img');
  // image.src = "drink.jpg"
  // image.alt = 'drink photo'
  // section.append(image);

  return section;
}
},{}],"src/common/NavButton.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavButton = NavButton;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// NavButton.js

function NavButton(text, componentFn) {
  var _button$classList;
  var classes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var button = document.createElement("button");
  button.setAttribute("type", "button");
  (_button$classList = button.classList).add.apply(_button$classList, _toConsumableArray(classes));
  button.innerText = text;
  button.addEventListener("click", function () {
    var navigationEvent = new CustomEvent("navigate", {
      detail: componentFn
    });
    document.body.dispatchEvent(navigationEvent);
  });
  return button;
}
},{}],"src/cart/cart-manager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cartManager = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// cart-manager.js
var key = "it-spa-cart";
var cartManager = {
  addItem: function addItem(item) {
    var cart = localStorage.getItem(key);
    var content;
    if (cart === null) {
      content = _defineProperty({}, item.name, {
        price: item.price,
        quantity: 1
      });
    } else {
      content = JSON.parse(cart);
      // np. { 'Pokój unarny': { price: 170, quantity: 2 } }

      // if (content.hasOwnProperty(item.name))
      if (item.name in content) {
        content[item.name].quantity += 1;
      } else {
        var newItem = _defineProperty({}, item.name, {
          price: item.price,
          quantity: 1
        });

        // doklada nowy wpis (klucz: wartosc) do obiektu `content`
        Object.assign(content, newItem);
      }
    }
    localStorage.setItem(key, JSON.stringify(content));
  },
  removeItem: function removeItem(item) {
    var cart = localStorage.getItem(key);
    if (cart !== null) {
      var content = JSON.parse(cart);
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
  getAllItems: function getAllItems() {
    var cart = localStorage.getItem(key);
    if (cart === null) {
      return [];
    } else {
      var content = JSON.parse(cart);

      // entry to jest [KLUCZ, WARTOSC]
      return Object.entries(content).map(function (entry) {
        var _entry = _slicedToArray(entry, 2),
          itemName = _entry[0],
          itemDetails = _entry[1];
        return {
          name: itemName,
          price: itemDetails.price,
          quantity: itemDetails.quantity
        };
      });
    }
  },
  getTotalPrice: function getTotalPrice() {
    var cart = localStorage.getItem(key);
    if (cart === null) {
      return "0.00";
    } else {
      var content = JSON.parse(cart);

      // [{ price, quantity }, { price, quantity },  { price, quantity }, ...]
      return Object.values(content).reduce(function (totalPrice, item) {
        return totalPrice + item.price * item.quantity;
      }, 0).toFixed(2);
    }
  },
  resetCart: function resetCart() {
    var confirmationWindow = document.createElement("div");
    confirmationWindow.id = "confirmationWindow";
    confirmationWindow.innerHTML = "\n      <p></br>Na pewno chcesz wyczy\u015Bci\u0107 koszyk\u2753</p>\n      <button id=\"confirmButton\">\u274C tak, usu\u0144 wszystko</button>\n      <button id=\"cancelButton\">nie</button>\n    ";
    document.body.appendChild(confirmationWindow);
    var confirmButton = confirmationWindow.querySelector("#confirmButton");
    var cancelButton = confirmationWindow.querySelector("#cancelButton");
    confirmButton.addEventListener("click", function () {
      localStorage.removeItem(key);
      confirmationWindow.remove();
      var message = document.createElement("div");
      message.id = "message";
      message.innerHTML = "\u2714\uFE0F</br>Pomy\u015Blnie usuni\u0119to zawarto\u015B\u0107 koszyka!";
      document.body.appendChild(message);
      setTimeout(function () {
        message.remove();
      }, 2000);
    });
    cancelButton.addEventListener("click", function () {
      confirmationWindow.remove();
    });
  },
  moveToPayment: function moveToPayment() {
    var totalPrice = parseFloat(cartManager.getTotalPrice());
    if (totalPrice === 0 || isNaN(totalPrice)) {
      var emptyCartWindow = document.createElement("div");
      emptyCartWindow.id = "emptyCartWindow";
      emptyCartWindow.innerHTML = "\n        <p>Ooops!</br>Koszyk jest pusty!</p>\n        <button id=\"returnToShoppingButton\">\uD83E\uDDFA powr\xF3t do zakup\xF3w</button>\n      ";
      document.body.appendChild(emptyCartWindow);
      var returnToShoppingButton = emptyCartWindow.querySelector("#returnToShoppingButton");
      returnToShoppingButton.addEventListener("click", function () {
        emptyCartWindow.remove();
      });
    }
    if (totalPrice > 0 || isNaN(totalPrice)) {
      var confirmationWindow = document.createElement("div");
      confirmationWindow.id = "confirmationWindow";
      confirmationWindow.innerHTML = "\n      <p>Super!</br>Koniec zakup\xF3w?</p>\n      <button id=\"confirmButtonPayment\">\u2714\uFE0F tak, rezerwuj\u0119 i p\u0142ac\u0119</button>\n      <button id=\"cancelButtonPayment\">\u274C nie</button>\n    ";
      document.body.appendChild(confirmationWindow);
      var confirmButton = confirmationWindow.querySelector("#confirmButtonPayment");
      var cancelButton = confirmationWindow.querySelector("#cancelButtonPayment");
      confirmButton.addEventListener("click", function () {
        confirmationWindow.remove();
        var cartSection = document.getElementById("cartSection");
        cartSection.innerHTML = "";
        var sectionNew = document.createElement("section");
        sectionNew.innerHTML = "<h1>Gratulacje!</h1><p>Prosimy przelej kwot\u0119 <strong>".concat(cartManager.getTotalPrice(), "</strong> PLN na konto \uD83D\uDCB8 <strong>PLXX XX20 2892 2276 3005 0000 0000</strong></br></br>\n      W tytule przelewu prosimy poda\u0107 imi\u0119 i nazwisko.</br> Potwierdzenie przelewu wraz z imieniem i nazwiskiem oraz preferowan\u0105 dat\u0105 przyjazdu prosimy przes\u0142a\u0107 na nasz adres mailowy: <strong></br>\uD83D\uDCE7 recepcja@hotelspa.com</strong> </br></br> W razie pyta\u0144 zapraszamy do kontaktu. </br></br> Dzi\u0119kujemy za rezerwacj\u0119 i \u017Cyczymy udanego pobytu!</br> Zesp\xF3\u0142 IT SPA Hotel </p>");
        var symbols = document.createElement("div");
        symbols.id = "symbols";
        symbols.innerHTML = "🏩🏖️🏝️🌅";
        sectionNew.append(symbols);
        cartSection.append(sectionNew);
      });
      cancelButton.addEventListener("click", function () {
        confirmationWindow.remove();
      });
    }
  }
};
exports.cartManager = cartManager;
},{}],"src/views/Cart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cart = Cart;
var _cartManager = require("../cart/cart-manager");
var _NavButton = require("../common/NavButton");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Cart() {
  var _section$querySelecto;
  var section = document.createElement("section");
  var moveToPayment = document.createElement("button");
  moveToPayment.innerText = "Przejdź do płatności ✔️💸";
  moveToPayment.id = "moveToPaymentBtn";
  moveToPayment.addEventListener("click", function () {
    _cartManager.cartManager.moveToPayment();
  });
  section.id = "cartSection";
  section.innerHTML = "\n    <h2 class=\"h2section\">Koszyk</br></br></h2>\n    <p>Przegl\u0105daj zawarto\u015B\u0107 koszyka:</p>\n    <table class=\"table\"></table>\n  ";
  var tableHead = document.createElement("tr");
  tableHead.innerHTML = "\n    <th>Nazwa</th>\n    <th>Ilo\u015B\u0107</th>\n    <th>Cena</th>\n    <th></th>\n  ";
  var tableRows = _cartManager.cartManager.getAllItems().map(function (item) {
    var tr = document.createElement("tr");
    var removeItem = (0, _NavButton.NavButton)("❌", function () {
      _cartManager.cartManager.removeItem(item);
      return Cart();
    }, ["btn"]);
    tr.innerHTML = "\n      <td>".concat(item.name, "</td>\n      <td>").concat(item.quantity, "</td>\n      <td>").concat(item.price.toFixed(2), " PLN</td>\n      <td></td>\n    ");
    tr.lastElementChild.append(removeItem);
    return tr;
  });
  var tableFooter = document.createElement("tr");
  var totalQuantity = _cartManager.cartManager.getAllItems().reduce(function (total, item) {
    return total + item.quantity;
  }, 0);
  tableFooter.innerHTML = "\n    <td></td>\n    <td><strong>".concat(totalQuantity, "</strong></td>\n    <td>\n      <strong>").concat(_cartManager.cartManager.getTotalPrice(), "</strong> PLN\n    </td>\n    <td></td>\n  ");
  (_section$querySelecto = section.querySelector(".table")).append.apply(_section$querySelecto, [tableHead].concat(_toConsumableArray(tableRows), [tableFooter]));
  section.querySelector(".h2section").append(moveToPayment);
  return section;
}
},{"../cart/cart-manager":"src/cart/cart-manager.js","../common/NavButton":"src/common/NavButton.js"}],"src/views/RoomDetails.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoomDetails = RoomDetails;
var _cartManager = require("../cart/cart-manager");
// RoomDetails.js

function RoomDetails(roomId) {
  var section = document.createElement("section");
  section.innerHTML = "\n  <div class=rooms><h2>Pok\xF3j</h2>\n    <p class=\"loading\">\u0141aduj\u0119 pok\xF3j...</p>\n  ";

  // pobieramy wybrany pokoj z serwera
  fetch("http://localhost:3000/rooms/".concat(roomId)).then(function (response) {
    return response.json();
  }).then(function (room) {
    var details = document.createElement("article");
    details.innerHTML = "\n          <h3>".concat(room.name, "</h3>\n          <p>Liczba \u0142\xF3\u017Cek: ").concat(room.beds, "</p>\n          <p>Liczba go\u015Bci: ").concat(room.guests, "</p>\n          <p>").concat(room.description, "</p>\n          <p>\n            <strong>").concat(room.price.toFixed(2), " PLN</strong>\n          </p>\n        ");
    details.className = "itemLi";
    var addToCartButton = document.createElement("button");
    addToCartButton.innerText = "✔️ Dodaj do koszyka";
    addToCartButton.className = "btn";
    addToCartButton.addEventListener("click", function () {
      return _cartManager.cartManager.addItem(room);
    });
    var removeFromCartButton = document.createElement("button");
    removeFromCartButton.innerText = "❌ Usuń z koszyka";
    removeFromCartButton.classList.add("btn");
    removeFromCartButton.addEventListener("click", function () {
      return _cartManager.cartManager.removeItem(room);
    });

    // usuwamy element mowiacy o ladowaniu
    section.querySelector(".loading").remove();
    // podstawiamy gotowa liste z pokojami
    section.append(details);
    details.append(addToCartButton, removeFromCartButton);
  });
  return section;
}
},{"../cart/cart-manager":"src/cart/cart-manager.js"}],"src/views/RoomList.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoomList = RoomList;
var _RoomDetails = require("./RoomDetails");
var _NavButton = require("../common/NavButton");
var _cartManager = require("../cart/cart-manager");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function RoomList() {
  var section = document.createElement("section");
  var ul = document.createElement("ul");
  section.innerHTML = "\n    <div class=rooms><h2>Lista pokoi</h2>\n    <p>Kup <strong>voucher</strong> na dowolny poni\u017Cszy <strong>pok\xF3j</strong>, nast\u0119pnie Ty lub osoba, kt\xF3rej przeka\u017Cesz voucher b\u0119dzie mogla go wykorzysta\u0107 w ci\u0105gu <Strong>2 lat</Strong>.</p>\n    <p class=\"loading\">\u0141aduj\u0119 list\u0119 pokoi...</p></div>\n  ";

  // pobieramy liste pokoi z serwera
  fetch("http://localhost:3000/rooms").then(function (response) {
    return response.json();
  }).then(function (rooms) {
    var lis = rooms.map(function (room) {
      var li = document.createElement("li");
      li.innerHTML = "\n            <h4>".concat(room.name, "</h4>\n            <p>\n              <strong>").concat(room.price.toFixed(2), " PLN</strong>\n            </p>\n            <footer></footer>\n          ");
      li.className = "itemLi";
      var addToCartButton = document.createElement("button");
      addToCartButton.innerText = "✔️ Dodaj do koszyka";
      addToCartButton.classList.add("btn");
      addToCartButton.addEventListener("click", function () {
        return _cartManager.cartManager.addItem(room);
      });

      //
      var removeFromCartButton = document.createElement("button");
      removeFromCartButton.innerText = "❌ Usuń z koszyka";
      removeFromCartButton.classList.add("btn");
      removeFromCartButton.addEventListener("click", function () {
        return _cartManager.cartManager.removeItem(room);
      });
      var detailsButton = (0, _NavButton.NavButton)("ℹ️ Więcej informacji...", function () {
        return (0, _RoomDetails.RoomDetails)(room.id);
      }, ["btn"]);
      li.querySelector("footer").append(addToCartButton, removeFromCartButton, detailsButton);
      return li;
    });
    ul.append.apply(ul, _toConsumableArray(lis));

    // usuwamy element mowiacy o ladowaniu
    section.querySelector(".loading").remove();
    // podstawiamy gotowa liste z pokojami
    section.append(ul);
  });
  return section;
}
},{"./RoomDetails":"src/views/RoomDetails.js","../common/NavButton":"src/common/NavButton.js","../cart/cart-manager":"src/cart/cart-manager.js"}],"src/views/TreatmentDetails.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreatmentDetails = TreatmentDetails;
var _cartManager = require("../cart/cart-manager");
// TreatmentDetails.js

function TreatmentDetails(treatmentId) {
  var section = document.createElement('section');
  section.innerHTML = "\n  <div class=rooms><h2>Zabieg</h2>\n    <p class=\"loading\">\u0141aduj\u0119 zabieg...</p>\n  ";

  // pobieramy wybrany zabieg z serwera
  fetch("http://localhost:3000/treatments/".concat(treatmentId)).then(function (response) {
    return response.json();
  }).then(function (treatment) {
    var details = document.createElement('article');
    details.innerHTML = "\n          <h3>".concat(treatment.name, "</h3>\n          <p>Partia cia\u0142a: ").concat(treatment.area, "</p>\n          <p>Czas zabiegu: ").concat(treatment.time, " min</p>\n          <p>").concat(treatment.description, "</p>\n          <p>\n            <strong>").concat(treatment.price.toFixed(2), " PLN</strong>\n          </p>\n        ");
    details.className = 'itemLi';
    var addToCartButton = document.createElement('button');
    addToCartButton.innerText = '✔️ Dodaj do koszyka';
    addToCartButton.classList.add('btn');
    addToCartButton.addEventListener('click', function () {
      return _cartManager.cartManager.addItem(treatment);
    });
    var removeFromCartButton = document.createElement('button');
    removeFromCartButton.innerText = '❌ Usuń z koszyka';
    removeFromCartButton.classList.add('btn');
    removeFromCartButton.addEventListener('click', function () {
      return _cartManager.cartManager.removeItem(treatment);
    });
    section.querySelector('.loading').remove();
    section.append(details);
    details.append(addToCartButton, removeFromCartButton);
  });
  return section;
}
},{"../cart/cart-manager":"src/cart/cart-manager.js"}],"src/views/Treatments.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Treatments = Treatments;
var _TreatmentDetails = require("./TreatmentDetails");
var _NavButton = require("../common/NavButton");
var _cartManager = require("../cart/cart-manager");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function Treatments() {
  var section = document.createElement("section");
  var ul = document.createElement("ul");
  section.innerHTML = "\n  <div class=rooms><h2>Lista zabieg\xF3w</h2>\n    <p>Kup <strong>voucher</strong> na dowolny poni\u017Cszy <strong>zabieg</strong>, nast\u0119pnie Ty lub osoba, kt\xF3rej przeka\u017Cesz voucher b\u0119dzie mogla go wykorzysta\u0107 w ci\u0105gu <Strong>2 lat</Strong>.</p>\n    <p class=\"loading\">\u0141aduj\u0119 list\u0119 zabieg\xF3w...</p></div>\n  ";

  // pobieramy liste pokoi z serwera
  fetch("http://localhost:3000/treatments").then(function (response) {
    return response.json();
  }).then(function (treatments) {
    var lis = treatments.map(function (treatment) {
      var li = document.createElement("li");
      li.innerHTML = "\n            <h4>".concat(treatment.name, "</h4>\n            <p>\n              <strong>").concat(treatment.price.toFixed(2), " PLN</strong>\n            </p>\n            <footer></footer>\n          ");
      li.className = "itemLi";
      var addToCartButton = document.createElement("button");
      addToCartButton.innerText = "✔️ Dodaj do koszyka";
      addToCartButton.classList.add("btn");
      addToCartButton.addEventListener("click", function () {
        return _cartManager.cartManager.addItem(treatment);
      });

      // usuwamy cos z koszyka
      var removeFromCartButton = document.createElement("button");
      removeFromCartButton.innerText = "❌ Usuń z koszyka";
      removeFromCartButton.classList.add("btn");
      removeFromCartButton.addEventListener("click", function () {
        return _cartManager.cartManager.removeItem(treatment);
      });
      //

      var detailsButton = (0, _NavButton.NavButton)("ℹ️ Więcej informacji...", function () {
        return (0, _TreatmentDetails.TreatmentDetails)(treatment.id);
      }, ["btn"]);
      li.querySelector("footer").append(addToCartButton, removeFromCartButton, detailsButton);
      return li;
    });
    ul.append.apply(ul, _toConsumableArray(lis));

    // usuwamy element mowiacy o ladowaniu
    section.querySelector(".loading").remove();
    // podstawiamy gotowa liste z pokojami
    section.append(ul);
  });
  return section;
}
},{"./TreatmentDetails":"src/views/TreatmentDetails.js","../common/NavButton":"src/common/NavButton.js","../cart/cart-manager":"src/cart/cart-manager.js"}],"src/views/Reservation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Reservation = Reservation;
//Reservation.js, niestety funkcja "atrapa", ponieważ nie jest połączona z JSONem w taki sposób, żeby blokować możliwość wyboru jakiegoś elementu ponownie i przekazywać te wartości do koszyka. Nie wiem, jak mógłbym to zbudować.

function Reservation() {
  var section = document.createElement("section");
  section.className = "home";
  section.innerHTML = "\n    <div class=\"home1\"><div class=\"h2\"><h2> Sprawd\u017A dost\u0119pne terminy </br>\uD83C\uDFE8\uD83D\uDD50</h2></div>\n    <p>Witamy w naszym kalendarzu! W bardzo prosty spos\xF3b mo\u017Cesz sprawdzi\u0107 czy wybrany termin i us\u0142uga s\u0105 dost\u0119pne. Wybierz dat\u0119, pok\xF3j/zabieg i zatwierd\u017A wyb\xF3r.</p>\n  \n    </div>\n    <div class=\"home2\"><p>\n    <form>\n<label for=\"date\">Wybierz dat\u0119 przyjazdu</label>\n<input type=\"date\" class = \"formReservation\" id=\"date\" name=\"date\"><br><br>\n<label for=\"date2\">Wybierz dat\u0119 wyjazdu</label>\n<input type=\"date\" class = \"formReservation\" id=\"date2\" name=\"date2\"><br><br>\n<label for=\"room\">Wybierz pok\xF3j/lub zabieg:</label>\n<select id=\"room\" name=\"room\" class = \"formReservation\">\n</select><br><br>\n<input type=\"button\" id=\"reservationButton\" class = \"formReservation\" value=\"Zatwierd\u017A \u2714\uFE0F\">\n</form>\n    </p></div>\n  ";
  var dateInput = section.querySelector("#date");
  dateInput.addEventListener("change", function () {
    var selectedDate = new Date(dateInput.value);
    var today = new Date();
    if (selectedDate < today) {
      dateInput.value = today.toISOString().slice(0, 10);
      var message = document.createElement("div");
      message.id = "message1";
      message.innerHTML = "\u26D4</br>Nie mo\u017Cesz wybra\u0107 daty w przesz\u0142o\u015Bci!</br>\n      <button id=\"cancelButton1\">Powr\xF3t</button>";
      section.appendChild(message);
      var cancelButton = message.querySelector("#cancelButton1");
      cancelButton.addEventListener("click", function () {
        message.remove();
        date2Input.value = "";
        dateInput.value = "";
      });
    }
  });
  var date2Input = section.querySelector("#date2");
  date2Input.disabled = true;
  dateInput.addEventListener("change", function () {
    var startDate = new Date(dateInput.value);
    date2Input.disabled = false;
    date2Input.min = startDate.toISOString().split("T")[0];
  });
  date2Input.addEventListener("change", function () {
    var selectedDate = new Date(date2Input.value);
    var startDate = new Date(dateInput.value);
    var oneYearAfter = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
    if (dateInput.value && selectedDate.getTime() - startDate.getTime() > 31536000000) {
      var message2 = document.createElement("div");
      message2.id = "message2";
      message2.innerHTML = "\u26A0\uFE0F</br>Wybrana data wyjazdu nie mo\u017Ce by\u0107 dalsza ni\u017C rok od daty przyjazdu!</br><button id=\"cancelButton2\">Powr\xF3t</button>";
      var cancelButton2 = message2.querySelector("#cancelButton2");
      message2.appendChild(cancelButton2);
      section.appendChild(message2);
      cancelButton2.addEventListener("click", function () {
        message2.remove();
        date2Input.value = "";
        dateInput.value = "";
      });
    } else {
      var _message = document.querySelector("#message2");
      if (_message) _message.remove();
    }
  });
  fetch("http://localhost:3000/rooms").then(function (response) {
    return response.json();
  }).then(function (rooms) {
    var roomSelect = document.querySelector("#room");
    rooms.forEach(function (room) {
      var option = document.createElement("option");
      option.value = room.name;
      option.text = "Hotel: " + room.name;
      roomSelect.appendChild(option);
    });
  });
  fetch("http://localhost:3000/treatments").then(function (response) {
    return response.json();
  }).then(function (treatments) {
    var option = section.querySelector("#room");
    treatments.forEach(function (treatment) {
      var newOption = document.createElement("option");
      newOption.value = treatment.name;
      newOption.text = "Zabieg: " + treatment.name;
      option.appendChild(newOption);
    });
  });
  var button = section.querySelector("#reservationButton");
  button.addEventListener("click", function () {
    var newSection = document.createElement("section");
    section.replaceWith(newSection);
    newSection.className = "home";
    newSection.innerHTML = "<div class=\"home1\"><div class=\"h2\"><h2> Termin wolny! \uD83C\uDFE8\uD83D\uDD50</h2></div><p>Dzi\u0119kujemy za skorzystanie z naszego systemu! Wygl\u0105da na to, \u017Ce wybrany termin i us\u0142uga s\u0105 dost\u0119pne. Zapraszamy do wyboru wybranej us\u0142ugi poprzez zak\u0142adk\u0119 Pokoje / Zabiegi a nast\u0119pnie o dokonanie p\u0142atno\u015Bci w sekcji Koszyk.</p></div>";
    var goBack = document.createElement("div");
    goBack.innerHTML = "<button id=\"goBack\">Powr\xF3t do systemu rezerwacji \uD83D\uDD19</button>";
    newSection.appendChild(goBack);
    var buttonBack = document.querySelector("#goBack");
    buttonBack.addEventListener("click", function () {
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
},{}],"src/navigation/Nav.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Nav = Nav;
exports.navItems = void 0;
var _NavButton = require("../common/NavButton");
var _Cart = require("../views/Cart");
var _Home = require("../views/Home");
var _RoomList = require("../views/RoomList");
var _Treatments = require("../views/Treatments");
var _Reservation = require("../views/Reservation");
var _cartManager = require("../cart/cart-manager");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var navItems = [{
  name: "Hotel",
  component: _Home.Home
}, {
  name: "Pokoje",
  component: _RoomList.RoomList
}, {
  name: "Zabiegi",
  component: _Treatments.Treatments
}, {
  name: "Rezerwacja",
  component: _Reservation.Reservation
}, {
  name: "Koszyk",
  component: _Cart.Cart
}];
exports.navItems = navItems;
function Nav() {
  var nav = document.createElement("nav");
  var navButtons = navItems.map(function (navItem) {
    return (0, _NavButton.NavButton)(navItem.name, navItem.component, ["btn"]);
  });
  nav.append.apply(nav, _toConsumableArray(navButtons));
  var lol1 = document.createElement("div"); //

  lol1.className = "cartJs";
  var lol2 = document.createElement("div");
  lol2.id = "resetButtonDiv";
  nav.append(lol1);
  nav.append(lol2);
  var removeAll = document.createElement("button");
  removeAll.innerText = "❌";
  removeAll.id = "resetButton";
  removeAll.addEventListener("click", function () {
    return _cartManager.cartManager.resetCart();
  });
  function updateCartPrice() {
    lol1.innerHTML = "<span class=\"cartIcon\">\uD83D\uDED2</span></br>Cena:<strong>".concat(Math.round(_cartManager.cartManager.getTotalPrice()), " PLN</strong></br>Przedmioty:<strong>").concat(_cartManager.cartManager.getAllItems().reduce(function (total, item) {
      return total + item.quantity;
    }, 0), " </strong>");
  }
  lol2.append(removeAll);
  setInterval(updateCartPrice, 1);
  return nav;
}
},{"../common/NavButton":"src/common/NavButton.js","../views/Cart":"src/views/Cart.js","../views/Home":"src/views/Home.js","../views/RoomList":"src/views/RoomList.js","../views/Treatments":"src/views/Treatments.js","../views/Reservation":"src/views/Reservation.js","../cart/cart-manager":"src/cart/cart-manager.js"}],"src/it-spa.js":[function(require,module,exports) {
"use strict";

require("bootstrap/dist/css/bootstrap.css");
require("./it-spa.scss");
var _Home = require("./views/Home");
var _Nav = require("./navigation/Nav");
var main = document.querySelector("main");
// przyczepiamy nawigacje PRZED elementem main
main.before((0, _Nav.Nav)());

// reagujemy na zdarzenie `navigate`
document.body.addEventListener("navigate", function (event) {
  var Component = event.detail;

  //czyscimy zawartosc elementu main
  main.innerHTML = "";
  // nastepnie podstawiamy nowy komponent
  main.append(Component());
});

// uzytkownik wystartuje na Home
main.append((0, _Home.Home)());
},{"bootstrap/dist/css/bootstrap.css":"node_modules/bootstrap/dist/css/bootstrap.css","./it-spa.scss":"src/it-spa.scss","./views/Home":"src/views/Home.js","./navigation/Nav":"src/navigation/Nav.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55177" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/it-spa.js"], null)
//# sourceMappingURL=/it-spa.4bb7a28f.js.map