import { inject, injectable } from "inversify";
import { Precision } from "../../shared/types";
import Planimeter from "../planimeter/planimeter.entity";
import Point from "../point/point.entity";
import { IPointService } from "../point/point.interface";
import PointService from "../point/point.service";
import Curve from "./curve.entity";
import { ICurveService } from "./curve.interfaces";

@injectable()
export default class CurveService implements ICurveService {
    constructor(@inject(IPointService.$) pointService: IPointService) {
        this.pointService = pointService;
    }
    private pointService: PointService;

    public getArea(curve: Curve, precision: Precision) {
        let partialArea = 0;
        if (curve.points.length > 2) {
            const planimeter = new Planimeter(curve);
            const points = this.getInterpolated(curve, precision);
            let b: Point;

            for (let i = 1; i < points.length - 1; i++) {
                b = planimeter.b(points.at(i), points.at(i - 1));
                let n1 =
                    b.x * planimeter.f1(points.at(i)) +
                    b.y * planimeter.f2(points.at(i));
                let d1 =
                    this.pointService.norm(b) *
                    this.pointService.norm(planimeter.field(points.at(i)));
                partialArea +=
                    (n1 / d1) *
                    this.pointService.distance(points[i], points.at(i + 1));
                if (isNaN(partialArea)) {
                    return 0;
                }
            }
            partialArea = partialArea * planimeter.r;
        }
        return Math.abs(partialArea);
    }

    public getInterpolated(curve: Curve, precision: Precision) {
        let points = curve.points;
        let interpoaltedPoints: Point[] = [];
        let temp: Point[];
        for (let i = 0; i < points.length - 1; i++) {
            temp = this.pointService.lerp(
                [points.at(i), points.at(i + 1)],
                precision
            );
            interpoaltedPoints.push(...temp.slice(1, -1));
        }
        interpoaltedPoints = [
            curve.points.at(0),
            ...interpoaltedPoints,
            curve.points.at(-1),
        ];
        return interpoaltedPoints;
    }
}
