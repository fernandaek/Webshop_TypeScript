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
})({"src/models/Product.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Product =
/** @class */
function () {
  function Product() {}

  return Product;
}();

exports.Product = Product;
},{}],"src/services/Service.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Product_1 = require("../models/Product");

var Service =
/** @class */
function () {
  function Service() {}

  Service.prototype.getProduct = function () {
    return __awaiter(this, void 0, Promise, function () {
      var response, json, product;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , fetch('https://products-a9119.firebaseio.com/products.json')];

          case 1:
            response = _a.sent();
            return [4
            /*yield*/
            , response.json()];

          case 2:
            json = _a.sent();
            console.log(json);
            product = json.map(function (item) {
              var p = new Product_1.Product();
              p.Title = item.Title;
              p.Description = item.Description;
              p.Image = item.Image;
              p.Price = item.Price;
              return p;
            });
            console.log("Converted list: ", product);
            return [2
            /*return*/
            , product];
        }
      });
    });
  };

  return Service;
}();

exports.Service = Service;
},{"../models/Product":"src/models/Product.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Service_1 = require("./services/Service");

window.onload = function () {
  var main = new Main(new Service_1.Service());
  main.start();
};

var Main =
/** @class */
function () {
  function Main(service) {
    this.service = service;
    this.removeCartProducts = this.removeCartProducts.bind(this);
    this.addCartProducts = this.addCartProducts.bind(this);
    this.addItemCart = this.addItemCart.bind(this);
  }

  Main.prototype.plusFunc = function () {
    var _this = this;

    var plusButton = document.getElementsByClassName("btn-plus");

    var _loop_1 = function _loop_1(i) {
      var quantityElement = document.getElementsByClassName('form-control')[i];
      var button = plusButton[i];
      var count = 1;
      button.addEventListener("click", function () {
        count++;
        quantityElement.value = "" + count;

        _this.updateCartTotal();

        _this.minusFunc(count, i, quantityElement);
      });
    };

    for (var i = 0; i < plusButton.length; i++) {
      _loop_1(i);
    }
  };

  Main.prototype.minusFunc = function (count, i, quantityElement) {
    var _this = this;

    var minusButton = document.getElementsByClassName("btn-minus");
    var button = minusButton[i];
    button.addEventListener("click", function () {
      count--;
      quantityElement.value = "" + count;

      _this.updateCartTotal();
    });
  };

  Main.prototype.updateCartTotal = function () {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var priceElement = cartRow.getElementsByClassName('cart-price')[0];
      var quantityElement = cartRow.getElementsByClassName('form-control')[0];
      var price = parseFloat(priceElement.innerText.replace('$', ''));
      var quantity = quantityElement.value;
      total = total + quantity * price;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
  };

  Main.prototype.removeCartProducts = function () {
    var _this = this;

    var removeCartItems = document.getElementsByClassName("btn-danger"); // console.log(addCartItems)

    for (var i = 0; i < removeCartItems.length; i++) {
      var button = removeCartItems[i];
      button.addEventListener("click", function (event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.parentElement.remove();

        _this.addCartProducts();

        _this.updateCartTotal();
      });
    }
  };

  Main.prototype.addCartProducts = function () {
    var _this = this;

    var addCartItems = document.getElementsByClassName("btn-primary");

    for (var i = 0; i < addCartItems.length; i++) {
      var button = addCartItems[i];
      button.addEventListener("click", function (event) {
        var buttonClicked = event.target;
        var btnClicked = buttonClicked.parentElement.parentElement;
        var title = btnClicked.getElementsByClassName("card-title")[0].innerText;
        var price = btnClicked.getElementsByClassName("price")[0].innerText;
        var imgSrc = btnClicked.getElementsByClassName("card-img-top")[0].src;

        _this.addItemCart(title, price, imgSrc);

        _this.updateCartTotal();
      });
    }
  };

  Main.prototype.addItemCart = function (title, price, imgSrc) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartRowContents = "\n        <div class=\"cart-item cart-column\">\n            <img class=\"cart-item-image\" src=\"" + imgSrc + "\" width=\"100\" height=\"100\">\n            <span class=\"cart-item-title\">" + title + "</span>\n        </div>\n        <span class=\"cart-price cart-column\">" + price + "</span>\n        <div class=\"cart-quantity cart-column\">\n            <div class=\"input-group mb-3\">\n                <div class=\"input-group-prepend\">\n                    <button class=\"btn btn-plus btn-outline-secondary\" type=\"button\"> + </button>\n                </div>\n                    <input id=\"count\" type=\"text\" class=\"form-control\" placeholder=\"\" aria-label=\"\" aria-describedby=\"basic-addon1\" value=\"1\">\n                    <div class=\"input-group-append\">\n                    <button class=\"btn btn-minus btn-outline-secondary\" type=\"button\"> - </button>\n                </div>\n                    <button class=\"btn-danger\" type=\"button\">X</button>\n                </div>\n        </div>";
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', this.removeCartProducts);
    this.removeCartProducts();
    this.updateCartTotal();
    this.plusFunc();
  };

  Main.prototype.productCounter = function () {
    var button = document.getElementsByClassName("btn");
    var counter = 0;

    for (var i = 0; i < button.length; i++) {
      button[i].addEventListener("click", function () {
        // console.log("Clicked: ", ++counter, "index: ", i)
        var antalSpan = document.getElementById("antal");
        antalSpan.innerHTML = 'Antal: ' + ++counter;
        var cart = document.getElementById("cart");
        cart.classList.remove('shake'); // reset animation

        void cart.offsetWidth; // trigger reflow

        cart.classList.add('shake'); // start animation
        //    console.log("i: ",i, "counter: ", counter)

        return counter;
      });
    }
  };

  Main.prototype.displayProducts = function (products) {
    var row = document.getElementById("row");

    for (var i in products) {
      document.createElement("div");
      row.innerHTML += "<div class=\"col-md-3 col-sm-6\">\n                                <div class=\"card\" style=\"width: 18rem;\">\n                                <img class=\"card-img-top\" id=\"img\" src=\"" + products[i].Image + "\" alt=\"Card image cap\">\n                                <span class=\"price\" id=\"price\">" + products[i].Price + ":-</span>\n                                    <div class=\"card-body text-center\">\n                                        <h5 class=\"card-title\" id=\"title\" style=\"margin-top: -50px\">" + products[i].Title + "</h5>\n                                        <p class=\"card-text\">" + products[i].Description + "</p>\n                                        <a href=\"#\" class=\"btn btn-primary\" id=\"btn\">Add to cart</a>\n                                    </div>\n                                </div>\n                            </div>";
    }

    this.addCartProducts();
    this.updateCartTotal();
  };

  Main.prototype.start = function () {
    var _this = this;

    this.service.getProduct().then(function (products) {
      console.log("In main", products);

      _this.displayProducts(products);

      _this.productCounter();

      _this.updateCartTotal();
    });
  };

  return Main;
}();

exports.Main = Main;
},{"./services/Service":"src/services/Service.ts"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49283" + '/');

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
      }); // Enable HMR for CSS by default.

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
  overlay.id = OVERLAY_ID; // html encode message and stack trace

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
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map