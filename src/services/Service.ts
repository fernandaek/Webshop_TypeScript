import { IService } from "./IService";
import { Product } from "../models/Product"

export class Service implements IService {

    async getProduct():Promise<Product[]> {
        const response = await fetch('https://products-a9119.firebaseio.com/products.json');
        const json = await response.json();
        console.log(json);

        let product = json.map(item => {
            let p = new Product();
            p.Title = item.Title;
            p.Description = item.Description;
            p.Image = item.Image;
            p.Price = item.Price;
            
            return p;
        })
        console.log("Converted list: ", product)
        return product;
    }
}

