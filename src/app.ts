import express from "express";
const app = express();
import pool from './config/db'
import productRouter from "./product/routes/product.routes";
import userRouter from "./users/routes/user.routes";
import orderRouter from './orders/routes/order.routes'
import notFound from "./middlewares/notFound";
import errorMiddleware from "./middlewares/errorMiddleware";
import logger from "./middlewares/logor";

// Middleware
app.use(logger)
app.use(express.json());

//cors

app.get('',(req, res)=>{
   res.status(200).json({success: true, message: "backend is runnig successfully"});
})

app.get('/health', async (req, res)=>{
   try {
        await pool.query('SELECT 1')
        res.status(200).json({
            success: true,
            message: "Database connected successfully"
        })
    } catch (error) {
        res.status(503).json({
            success: false,
            message: 'Database connection failed'
        });
    }
})

app.get('/api', (req, res) => {
    res.status(200).json({ message: "hello world" });
});

// routes
app.use('/api/products', productRouter)
app.use("/api/users", userRouter);
app.use('/api/orders', orderRouter)

app.use(notFound)
app.use(errorMiddleware)
export default app