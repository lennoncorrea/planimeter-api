import Point from "../point/point.entity";

export default class Curve {
    constructor(points: Point[]) {
        this.points = points;
    }
    points: Point[];

    get isClosed() {
        if (this.points.length > 2) {
            return this.points.at(0).equalsTo(this.points.at(-1));
        }
        return false;
    }
    get isTruthy() {
        return this.points.length > 2;
    }
    get hasAnyPoints() {
        return this.points.length !== 0;
    }
}
