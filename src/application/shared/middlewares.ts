import { NextFunction, Request, Response } from "express";

export function ensureJson(req: Request, res: Response, next: NextFunction) {
  const contentType = req.headers["content-type"];
  if (!contentType || !contentType.includes("application/json")) {
    return res.status(400).json({ error: "Request must be in JSON format" });
  }
  next();
}

export function authenticateApp(req: Request, res:Response, next: NextFunction) {
  const appSecret = req.headers['secret'];
  if (!appSecret || appSecret !== process.env.SECRET_KEY) {
    return res.status(401).send('Unauthorized');
  }
  next();
}