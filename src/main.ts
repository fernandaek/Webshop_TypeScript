import { Product } from "./models/Product";
import { Service } from "./services/Service";
import { IService } from "./services/IService";

window.onload = function () {
    let main = new Main(new Service);
    main.start()

}

export class Main {
    service: IService;
    constructor(service: IService) {
        this.service = service;
        this.removeCartProducts = this.removeCartProducts.bind(this);
        this.addCartProducts = this.addCartProducts.bind(this)
        this.addItemCart = this.addItemCart.bind(this);
    }
    products: Product[];
    counter: number;

    plusFunc(i, plusButton, formControl) {
        plusButton.addEventListener("click", () => {
            this.products[i].Count++
            formControl.value = `${this.products[i].Count}`;
            this.updateCartTotal()
        })
    }

    minusFunc(i, minusButton, formControl) {
        minusButton.addEventListener("click", () => {
            this.products[i].Count--
            formControl.value = `${this.products[i].Count}`;
            this.updateCartTotal()
        })
    }


    updateCartTotal() {
        let cartItemContainer = document.getElementsByClassName('cart-items')[0];
        let cartRows = cartItemContainer.getElementsByClassName('cart-row');
        let total = 0;

        for (let i = 0; i < cartRows.length; i++) {
            let cartRow = cartRows[i];
            let priceElement = (<HTMLElement>cartRow.getElementsByClassName('cart-price')[0]);
            let quantityElement = (<HTMLInputElement>cartRow.getElementsByClassName('form-control')[0]);
            let price = parseFloat(priceElement.innerText.replace('$', ''));
            let quantity = (<any>quantityElement.value);

            total = total + (quantity * price)
        }
        total = Math.round(total * 100) / 100;
        (<HTMLElement>document.getElementsByClassName('cart-total-price')[0]).innerText = '$' + total
    }


    removeCartProducts(j) {
        let removeCartItems = document.getElementsByClassName("btn-danger")

        for (let i = 0; i < removeCartItems.length; i++) {
            let button = removeCartItems[i];
            if (button.classList.contains("listening") === false) {
                button.classList.add("listening")
                button.addEventListener("click", (event) => {
                    let buttonClicked = (<HTMLElement>event.target);
                    buttonClicked.parentElement.parentElement.parentElement.remove();
                    this.counter--
                    this.products[j].Count = 0;
                    this.productCounterAnimation();
                    this.updateCartTotal()
                })
            }
        }

    }


    addCartProducts() {
        let addCartItems = document.getElementsByClassName("btn-primary")
        for (let i = 0; i < addCartItems.length; i++) {
            let button = addCartItems[i];
            button.addEventListener("click", (event) => {
                let buttonClicked = (<HTMLElement>event.target);
                let btnClicked = buttonClicked.parentElement.parentElement;
                let title = (<HTMLElement>btnClicked.getElementsByClassName("card-title")[0]).innerText;
                let price = (<HTMLElement>btnClicked.getElementsByClassName("price")[0]).innerText;
                let imgSrc = (<HTMLImageElement>btnClicked.getElementsByClassName("card-img-top")[0]).src;
                let idMinus = `minus${i}`
                let idPlus = `plus${i}`
                let idFormControl = `formControl${i}`

                this.addItemCart(title, price, imgSrc, i, idMinus, idPlus, idFormControl);
                this.updateCartTotal()


            })
        }
    }

    addItemCart(title, price, imgSrc, i, idMinus, idPlus, idFormControl) {
        let cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");
        let cartItems = (<HTMLElement>document.getElementsByClassName("cart-items")[0])

        var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <button id="${idPlus}" class="btn btn-plus btn-outline-secondary" type="button"> + </button>
                </div>
                    <input id="${idFormControl}" type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" value="1">
                    <div class="input-group-append">
                    <button id="${idMinus}" class="btn btn-minus btn-outline-secondary" type="button"> - </button>
                </div>
                    <button class="btn-danger" type="button">X</button>
                </div>
        </div>`
        this.products[i].Count += 1;
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', this.removeCartProducts)
        let minusButton = document.getElementById(`${idMinus}`)
        let plusButton = document.getElementById(`${idPlus}`)
        let formControl = document.getElementById(`${idFormControl}`)

        this.removeCartProducts(i)
        this.updateCartTotal()
        this.plusFunc(i, plusButton, formControl);
        this.minusFunc(i, minusButton, formControl);

    }

    productCounter() {
        let button = document.getElementsByClassName("btn")
        this.counter = 0;
        for (let i = 0; i < button.length; i++) {
            button[i].addEventListener("click", () => {
                this.counter++
                this.productCounterAnimation()
            })
        }
    }
    productCounterAnimation() {
        let antalSpan = document.getElementById("antal");

        antalSpan.innerHTML = 'Antal: ' + this.counter

        let cart = document.getElementById("cart")
        cart.classList.remove('shake'); // reset animation
        void cart.offsetWidth; // trigger reflow
        cart.classList.add('shake'); // start animation
    }

    displayProducts() {
        let row = document.getElementById("row");
        for (let i in this.products) {
            document.createElement("div");
            row.innerHTML += `<div class="col-md-3 col-sm-6">
                                <div class="card" style="width: 18rem;">
                                <img class="card-img-top" id="img" src="${this.products[i].Image}" alt="Card image cap">
                                <span class="price" id="price">${this.products[i].Price}:-</span>
                                    <div class="card-body text-center">
                                        <h5 class="card-title" id="title" style="margin-top: -50px">${this.products[i].Title}</h5>
                                        <p class="card-text">${this.products[i].Description}</p>
                                        <a href="#" class="btn btn-primary" id="btn">Add to cart</a>
                                    </div>
                                </div>
                            </div>`
        }
        this.addCartProducts()
        this.updateCartTotal()

    }

    async start() {
        this.products = await this.service.getProduct();
        this.displayProducts()
        this.productCounter()
        this.updateCartTotal()
    }
}