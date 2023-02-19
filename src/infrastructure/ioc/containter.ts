import { Container } from "inversify";
import { ICurveService } from "../../domain/curve/curve.interfaces";
import CurveService from "../../domain/curve/curve.service";
import { IPlanimeterService } from "../../domain/planimeter/planimeter.interface";
import PlanimeterService from "../../domain/planimeter/planimeter.service";
import { IPointService } from "../../domain/point/point.interface";
import PointService from "../../domain/point/point.service";

export default class IoCContainer {
    get container() {
        const container = new Container();
        container.bind(IPlanimeterService.$).to(PlanimeterService);
        container.bind(ICurveService.$).to(CurveService);
        container.bind(IPointService.$).to(PointService);
        return container;
    }
}
