import { Request, Response } from "express";
import { inject } from "inversify";
import Curve from "../../domain/curve/curve.entity";
import { ICurveService } from "../../domain/curve/curve.interfaces";
import Point from "../../domain/point/point.entity";
import ApiResponse from "../../shared/api-response.interface";
import { Precision, isPrecision } from "../../shared/types";
import PointDataDto from "../point/point.dto";

export default class CurveController {
    constructor(@inject(ICurveService.$) curveService: ICurveService) {
        this.curveService = curveService;
    }
    private curveService: ICurveService;
    public async postArea(req: Request, res: Response) {
        let response: ApiResponse<number>;
        const reqData: { points: PointDataDto[]; precision: Precision } =
            req.body;
        if (reqData && reqData.points && isPrecision(reqData.precision)) {
            const points = reqData.points.map(
                (point) => new Point(point.x, point.y)
            );
            const curve = new Curve(points);
            const area = this.curveService.getArea(curve, reqData.precision);
            response = new ApiResponse(200, area);
        } else {
            response = new ApiResponse(
                400,
                undefined,
                "The request body is invalid. Please provide valid points and precision properties."
            );
        }
        res.status(200).json(response);
    }

    public async postInterpolated(req: Request, res: Response) {
        let response: ApiResponse<Point[]>;
        const reqData: { points: PointDataDto[]; precision: Precision } =
            req.body;
        if (reqData && reqData.points && isPrecision(reqData.precision)) {
            const points = reqData.points.map(
                (point) => new Point(point.x, point.y)
            );
            const curve = new Curve(points);
            const interpolatedPoints = this.curveService.getInterpolated(
                curve,
                reqData.precision
            );
            response = new ApiResponse(200, interpolatedPoints);
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
