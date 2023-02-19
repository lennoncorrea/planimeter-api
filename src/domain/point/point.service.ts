import { injectable } from "inversify";
import { Precision } from "../../shared/types";
import Point from "./point.entity";
import { IPointService } from "./point.interface";

@injectable()
class PointService implements IPointService {
    public norm(point: Point) {
        return (point.x ** 2 + point.y ** 2) ** (1 / 2);
    }

    public distance(p1: Point, p2: Point) {
        return ((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2) ** (1 / 2);
    }

    public lerp([p1, p2]: [Point, Point], precision: Precision) {
        const points: Point[] = [];
        let n: number;
        switch (precision) {
            case "high":
                n = 5000;
                break;
            case "medium":
                n = 1000;
                break;
            case "low":
                n = 100;
            default:
                break;
        }
        if (!p1.equalsTo(p2)) {
            const stepX = (p2.x - p1.x) / (n - 1);
            const stepY = (p2.y - p1.y) / (n - 1);

            for (let i = 0; i < n; i++) {
                points.push(new Point(p1.x + i * stepX, p1.y + i * stepY));
            }
        }
        return points;
    }
}

export default PointService;
