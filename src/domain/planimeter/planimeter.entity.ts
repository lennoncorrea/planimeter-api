import { norm, number } from "mathjs";
import Curve from "../curve/curve.entity";
import Point from "../point/point.entity";

export default class Planimeter {
    constructor(curve: Curve) {
        this.curve = curve;
    }
    public curve: Curve;
    public get r() {
        let maxDistance: number = 0;
        let tempDistance: number;
        for (const point of this.curve.points) {
            tempDistance = number(norm([point.x, point.y]));
            if (tempDistance > maxDistance) {
                maxDistance = tempDistance;
            }
        }
        return maxDistance / 2;
    }

    public field(point: Point) {
        return new Point(this.f1(point), this.f2(point));
    }

    public f1(point: Point) {
        return (
            ((1 / this.r) * (-point.y - point.x * this.squareFactor(point))) / 2
        );
    }

    public f2(point: Point) {
        return (
            ((1 / this.r) * (point.x - point.y * this.squareFactor(point))) / 2
        );
    }

    public b(p1: Point, p2: Point) {
        return new Point(p1.x - p2.x, p1.y - p2.y);
    }

    private squareFactor(point: Point) {
        return (
            ((4 * this.r ** 2) / (point.x ** 2 + point.y ** 2) - 1) ** (1 / 2)
        );
    }
}
