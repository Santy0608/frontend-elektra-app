import { Engine } from "./Engine";
import { Model } from "./Model";

export class Vehicle{

    idVehicle!: number;
    model?: Model;
    engine?: Engine;
    year?: number;
    modelId?: number;
    engineId?: number;

}