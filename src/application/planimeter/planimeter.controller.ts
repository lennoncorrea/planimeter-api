import { Request, Response } from "express";
import { inject } from "inversify";
import Curve from "../../domain/curve/curve.entity";
import { IPlanimeterService } from "../../domain/planimeter/planimeter.interface";
import Point from "../../domain/point/point.entity";
import ApiResponse from "../../shared/api-response.interface";
import { Precision, isPrecision } from "../../shared/types";
import PointDataDto from "../point/point.dto";

export default class PlanimeterController {
    constructor(
        @inject(IPlanimeterService.$) planimeterService: IPlanimeterService
    ) {
        this.planimeterService = planimeterService;
    }
    private planimeterService: IPlanimeterService;

    public async postInflectionPoints(req: Request, res: Response) {
        let response: ApiResponse<Point[]>;
        const reqData: { points: PointDataDto[]; precision: Precision } =
            req.body;
        if (reqData && reqData.points && isPrecision(reqData.precision)) {
            const points = reqData.points.map(
                (point) => new Point(point.x, point.y)
            );
            const curve = new Curve(points);
            const inflectionPoints =
                this.planimeterService.getInflectionArmPoints(
                    curve,
                    reqData.precision
                );
            response = new ApiResponse(200, inflectionPoints);
        } else {
            response = new ApiResponse(
                400,
                undefined,
                "The request body is invalid. Please provide valid points and precision properties."
            );
        }
        res.status(200).json(response);
    }
}
