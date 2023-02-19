import { inject, injectable } from "inversify";
import { Precision } from "../../shared/types";
import Curve from "../curve/curve.entity";
import { ICurveService } from "../curve/curve.interfaces";
import Point from "../point/point.entity";
import Planimeter from "./planimeter.entity";
import { IPlanimeterService } from "./planimeter.interface";

@injectable()
export default class PlanimeterService implements IPlanimeterService {
    constructor(@inject(ICurveService.$) curveService: ICurveService) {
        this.curveService = curveService;
    }
    private curveService: ICurveService;

    public getInflectionArmPoints(curve: Curve, precison: Precision) {
        const planimeter = new Planimeter(curve);
        const points = this.curveService.getInterpolated(curve, precison);
        let inflectionPoints: Point[] = [];
        if (points.length > 2) {
            const r = planimeter.r;
            const pointsLength = points.length;

            const squareFactor = (point: Point) => {
                return (
                    ((4 * r ** 2) / (point.x ** 2 + point.y ** 2) - 1) **
                    (1 / 2)
                );
            };
            const a = (point: Point) => {
                return (point.x + point.y * squareFactor(point)) / 2;
            };
            const b = (point: Point) => {
                return (point.y - point.x * squareFactor(point)) / 2;
            };
            for (let i = 0; i < pointsLength; i++) {
                inflectionPoints.push(new Point(a(points[i]), b(points[i])));
            }
        }
        return inflectionPoints;
    }
}
