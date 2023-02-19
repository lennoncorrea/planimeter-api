import { interfaces } from "inversify";
import { Precision } from "../../shared/types";
import Curve from "../curve/curve.entity";

export interface IPlanimeterService {
    getInflectionArmPoints(curve: Curve, precison: Precision);
}

export namespace IPlanimeterService {
    export const $: interfaces.ServiceIdentifier<IPlanimeterService> =
        Symbol("IPlanimeterService");
}
