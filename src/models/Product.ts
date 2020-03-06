import { IProduct } from "./IProduct";

export class Product implements IProduct{
    Title: string;
    Description: string;
    Price: number;
    Image: string

    // constructor(title: string, description: string, price: number, image: string){
    //     this.Title = title;
    //     this.Description = description;
    //     this.Price = price;
    //     this.Image = image
    // }
    
}