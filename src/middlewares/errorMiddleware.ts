
import { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: Error  & { status?: number; statusCode?: number }, req: Request, res: Response, next: NextFunction)=>{
  const status: number = err.status || err.statusCode || 500;
  const message: string = err.message || "Something went wrong";

  console.error("ERROR OCCURRED");
  console.error("Message:", message);
  console.error("Status:", status);

  return res.status(status).json({
    success: false,
    message: message
  });
}

export default errorMiddleware;