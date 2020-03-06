import { Product } from "./models/Product";
import { Service } from "./services/Service";
import { IService } from "./services/IService";
import { IProduct } from "./models/IProduct";

window.onload = function(){
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
    
    plusFunc(){
       
        let plusButton = document.getElementsByClassName("btn-plus");
        for(let i = 0; i < plusButton.length; i++){
            let quantityElement = (<HTMLInputElement>document.getElementsByClassName('form-control')[i]);
            let button = plusButton[i];
            let count: number = 1;
            button.addEventListener("click", () => {
                count++
                    quantityElement.value = `${count}`;
                    this.updateCartTotal()
                    this.minusFunc(count, i, quantityElement)
                })
            
    }
}

    minusFunc(count, i, quantityElement){
        let minusButton = document.getElementsByClassName("btn-minus");
            let button = minusButton[i];
            button.addEventListener("click", () => {
                    count--;
                    quantityElement.value = `${count}`;
                    this.updateCartTotal()
            })
    }


    updateCartTotal(){
        let cartItemContainer = document.getElementsByClassName('cart-items')[0];
        let cartRows = cartItemContainer.getElementsByClassName('cart-row');
        let total = 0;

        for(let i = 0; i < cartRows.length; i++){
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
    

    removeCartProducts(){
        let removeCartItems = document.getElementsByClassName("btn-danger")
        // console.log(addCartItems)
        for(let i = 0; i < removeCartItems.length; i++){
            let button = removeCartItems[i];
            button.addEventListener("click", (event) => {
                let buttonClicked = (<HTMLElement>event.target);
                buttonClicked.parentElement.parentElement.parentElement.remove();
                
                this.addCartProducts()
                this.updateCartTotal()
            })
        }
        
    }


    addCartProducts(){
        let addCartItems = document.getElementsByClassName("btn-primary")
        for(let i = 0; i < addCartItems.length; i++){
            let button = addCartItems[i];
            button.addEventListener("click", (event) => {
                let buttonClicked = (<HTMLElement>event.target);
                let btnClicked = buttonClicked.parentElement.parentElement;
                let title = (<HTMLElement>btnClicked.getElementsByClassName("card-title")[0]).innerText;
                let price =  (<HTMLElement>btnClicked.getElementsByClassName("price")[0]).innerText;
                let imgSrc =  (<HTMLImageElement>btnClicked.getElementsByClassName("card-img-top")[0]).src;

                
                this.addItemCart(title, price, imgSrc);
                this.updateCartTotal()

                
            })
        }
    }

    addItemCart(title, price, imgSrc){
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
                    <button class="btn btn-plus btn-outline-secondary" type="button"> + </button>
                </div>
                    <input id="count" type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" value="1">
                    <div class="input-group-append">
                    <button class="btn btn-minus btn-outline-secondary" type="button"> - </button>
                </div>
                    <button class="btn-danger" type="button">X</button>
                </div>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', this.removeCartProducts)


    this.removeCartProducts()
    this.updateCartTotal()
    this.plusFunc()


    }
    


    productCounter(){
        let button = document.getElementsByClassName("btn")
        let counter = 0;
        for(let i = 0; i< button.length; i++){
            button[i].addEventListener("click", () =>{
                // console.log("Clicked: ", ++counter, "index: ", i)
               let antalSpan = document.getElementById("antal");
               antalSpan.innerHTML = 'Antal: ' + ++counter

               let cart = document.getElementById("cart")
               cart.classList.remove('shake'); // reset animation
               void cart.offsetWidth; // trigger reflow
               cart.classList.add('shake'); // start animation
               
            //    console.log("i: ",i, "counter: ", counter)
               return counter;
            })
        }
    }

    displayProducts(products:Product[]){
        let row = document.getElementById("row");
        for(let i in products){
            document.createElement("div");
            row.innerHTML += `<div class="col-md-3 col-sm-6">
                                <div class="card" style="width: 18rem;">
                                <img class="card-img-top" id="img" src="${products[i].Image}" alt="Card image cap">
                                <span class="price" id="price">${products[i].Price}:-</span>
                                    <div class="card-body text-center">
                                        <h5 class="card-title" id="title" style="margin-top: -50px">${products[i].Title}</h5>
                                        <p class="card-text">${products[i].Description}</p>
                                        <a href="#" class="btn btn-primary" id="btn">Add to cart</a>
                                    </div>
                                </div>
                            </div>`
        }
        this.addCartProducts()
        this.updateCartTotal()

    }
    
    start(){
        this.service.getProduct().then((products: Product[]) => {
            console.log("In main", products)
            this.displayProducts(products)
            this.productCounter()
            this.updateCartTotal()   
        })
    }
}