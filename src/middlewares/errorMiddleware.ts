import { Request, Response, NextFunction } from "express";

const errorMiddleware = (
    err: Error & { status?: number; statusCode?: number },
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (res.headersSent) {
        return next(err);
    }

    const status = err.status || err.statusCode || 500;

    const message =
        status >= 500
            ? "Something went wrong"
            : err.message || "Request failed";

    console.error("ERROR OCCURRED");
    console.error("Message:", err.message);
    console.error("Status:", status);

    return res.status(status).json({
        success: false,
        message: message
    });
};

export default errorMiddleware;