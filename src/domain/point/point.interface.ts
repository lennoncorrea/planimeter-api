import { interfaces } from "inversify";
import { Precision } from "../../shared/types";
import Point from "./point.entity";

export interface IPointService {
    norm(point: Point): number;
    distance(p1: Point, p2: Point): number;
    lerp([p1, p2]: [Point, Point], precision: Precision): Point[];
}

export namespace IPointService {
    export const $: interfaces.ServiceIdentifier<IPointService> =
        Symbol("IPointService");
}
