import { interfaces } from "inversify";
import { Precision } from "../../shared/types";
import Point from "../point/point.entity";
import Curve from "./curve.entity";

export interface ICurveService {
    getArea(curve: Curve, precision: Precision): number;
    getInterpolated(curve: Curve, precision: Precision): Point[];
}
export namespace ICurveService {
    export const $: interfaces.ServiceIdentifier<ICurveService> =
        Symbol("ICurveService");
}
