import { Product } from "../models/Product"


export interface IService{
    getProduct():Promise<Product[]>;
}