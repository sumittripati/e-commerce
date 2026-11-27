// import { Request, Response, NextFunction } from "express";

// const logger = (req: Request, _res: Response, next: NextFunction) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
// };

// export default logger;



import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
                const start = process.hrtime.bigint();

  res.on("finish", () => {
    const durationNs = process.hrtime.bigint() - start;
    const durationMs = Number(durationNs) / 1_000_000;

    console.log(
      `${req.method} ${req.originalUrl} ` +
      `${res.statusCode} ${durationMs.toFixed(2)}ms`
    );
  });

  next();
 };

 export default logger;
