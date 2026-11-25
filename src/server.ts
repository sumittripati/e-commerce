import dotenv from 'dotenv'
dotenv.config()
import app from './app'

const PORT = process.env.PORT || 5001;

// app.get('/product', (req: Request, res: Response)=>{
//     res.status(200).json({
//         success: true,
//         message: "get product successfully",
//         data: products
//     })
// })

// app.get('/product/:id', (req: Request, res: Response)=>{
//     const {id} = req.params;

//     const itemIndex = products.findIndex((item)=>item.id === Number(id));

//     if(itemIndex === -1){
//         return res.status(400).json({
//             success: false,
//             message: "Data nota found"
//         })
//     }
//     const singleProduct = products[itemIndex]
//     res.status(200).json({
//         success: true,
//         message: "get single product successfully",
//         data: singleProduct
//     })
// })

// app.post('/product',async (req: Request, res: Response, next: NextFunction)=>{
//     try {
//         const {name, price, stock} = req.body as CreateProductInput
//     if(!name || !price || !stock){
//     const err = new Error("all fields are require") as Error & {
//         status: number;
//     };
//     err.status = 400;
//     return next(err)
//     }
//     const newProduct: Product = {
//         id: nextId++,
//         name: name.trim(),
//         price: price,
//         stock: stock
//     }
//     products.push(newProduct);
//     res.status(201).json({
//        success: true,
//        message: "product created successfully",
//        data: newProduct
//     })
//     } catch (err) {
//     console.error("user not registered", err);
//     return next(err);  
//     }
// })

// app.put('/product/:id',(req: Request, res: Response)=>{
//     const {id} = req.params
//     const {name, price, stock} = req.body as UpdateProductInput;
//     // first find index
//     const itemIndex = products.findIndex((item)=>item.id === Number(id))
//     if(itemIndex === -1){
//         return res.status(400).json({
//             success: false,
//             message: "Data nota found"
//         })
//     }

//     const updateProduct:Product = {
//         ...products[itemIndex]
//     }
//     if(name !==undefined){
//         updateProduct.name = name.trim();
//     }
//     if(price !==undefined){
//         updateProduct.price = price;
//     }
//     if(stock !== undefined){
//         updateProduct.stock = stock
//     }

//     products[itemIndex] = updateProduct

//     res.status(200).json({
//         success: true,
//         message: "product update successfully",
//         data: updateProduct
//     })
    
// })

// app.patch('/product/:id',(req: Request, res: Response)=>{
//     const {id} = req.params
//     const {name, price, stock} = req.body as UpdateProductInput;
//     // first find index
//     const itemIndex = products.findIndex((item)=>item.id === Number(id))
//     if(itemIndex === -1){
//         return res.status(400).json({
//             success: false,
//             message: "Data nota found"
//         })
//     }

//     const updateProduct:Product = {
//         ...products[itemIndex]
//     }
//     if(name !==undefined){
//         updateProduct.name = name.trim();
//     }
//     if(price !==undefined){
//         updateProduct.price = price;
//     }
//     if(stock !== undefined){
//         updateProduct.stock = stock
//     }

//     products[itemIndex] = updateProduct

//     res.status(200).json({
//         success: true,
//         message: "product update successfully",
//         data: updateProduct
//     })
    
// })

// app.delete('/product/:id',(req: Request, res: Response)=>{
//     const {id} = req.params;

//     const itemIndex = products.findIndex((item)=>item.id === Number(id));

//     if(itemIndex === -1){
//         return res.status(400).json({
//             success: false,
//             message: "Data nota found"
//         })
//     }

//     products.splice(itemIndex, 1)

//     res.status(200).json({
//         success: true,
//         message: "product deleted successfully",
//     })

// })

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})











// require('dotenv').config();
// let app = require('./app');
// let http = require('http');
// const connectDB = require('./config/db');
// const initSocket = require("./socket/chatSocket");
// const PORT = process.env.PORT || 3000;

// connectDB();

// let server = http.createServer(app)

// initSocket(server);

// server.listen(PORT, () => {
//   console.log(`Server + socket is running on port ${PORT}`);
// });
