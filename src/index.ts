import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import "reflect-metadata";
import CurveController from "./application/curve/curve.controller";
import PlanimeterController from "./application/planimeter/planimeter.controller";
import { authenticateApp, ensureJson } from "./application/shared/middlewares";
import { ICurveService } from "./domain/curve/curve.interfaces";
import { IPlanimeterService } from "./domain/planimeter/planimeter.interface";
import IoCContainer from "./infrastructure/ioc/containter";

dotenv.config();
const { container } = new IoCContainer();
const port = process.env.PORT;
const app = express();

const curveController = new CurveController(container.get(ICurveService.$));
const planimeterController = new PlanimeterController(
    container.get(IPlanimeterService.$)
);

app.use(
    bodyParser.json(),
    cors({
        origin: true,
    })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/", async (req: Request, res: Response) =>
    res.json("Server is working.")
);

app.post(
    "/curve/area",
    ensureJson,
    authenticateApp,
    async (req: Request, res: Response) => curveController.postArea(req, res)
);

app.post(
    "/curve/points/interpolated",
    ensureJson,
    authenticateApp,
    async (req: Request, res: Response) =>
        curveController.postInterpolated(req, res)
);

app.post(
    "/planimeter/inflection-points",
    ensureJson,
    authenticateApp,
    async (req: Request, res: Response) =>
        planimeterController.postInflectionPoints(req, res)
);

app.listen(parseInt(port), () => {
    console.log(`Server started on port ${port}`);
});
