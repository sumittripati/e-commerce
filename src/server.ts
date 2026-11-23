import dotenv from 'dotenv'
dotenv.config()

import express from "express";
const app = express();
import { Request, Response } from 'express';
import type {Product, CreateProductInput, UpdateProductInput} from './types/product/product.types'

const PORT = process.env.PORT || 5001;

app.use(express.json())

app.get('/health',(req, res)=>{
   res.status(200).json({success: true, message: "backend health is good"});
})

app.get('',(req, res)=>{
   res.status(200).json({success: true, message: "backend is runnig successfully"});
})

const products: Product[]= [];

let nextId:number = 1;
app.get('/product', (req: Request, res: Response)=>{
    res.status(200).json({
        success: true,
        message: "get product successfully",
        data: products
    })
})

app.post('/product',(req: Request, res: Response)=>{
    const {name, price, stock} = req.body as CreateProductInput
    if(!name || !price || !stock){
       return res.status(400).json({success: false, message: "All fields are require"})
    }
    const newProduct: Product = {
        id: nextId++,
        name: name.trim(),
        price: price,
        stock: stock
    }
    products.push(newProduct);
    res.status(201).json({
       success: true,
       message: "product created successfully",
       data: newProduct
    })
})

app.put('/product/:id',(req: Request, res: Response)=>{
    const {id} = req.params
    const {name, price, stock} = req.body as UpdateProductInput;
    // first find index
    const itemIndex = products.findIndex((item)=>item.id === Number(id))
    if(itemIndex === -1){
        return res.status(400).json({
            success: false,
            message: "Data nota found"
        })
    }

    const updateProduct:Product = {
        ...products[itemIndex]
    }
    if(name !==undefined){
        updateProduct.name = name.trim();
    }
    if(price !==undefined){
        updateProduct.price = price;
    }
    if(stock !== undefined){
        updateProduct.stock = stock
    }

    products[itemIndex] = updateProduct

    res.status(200).json({
        success: true,
        message: "product update successfully",
        data: updateProduct
    })
    
})

app.patch('',(req: Request, res: Response)=>{

})

app.delete('',(req: Request, res: Response)=>{

})

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})
