import { PNGTuberModel } from "./models/PNGTuberModel";

export interface CollaboratorModel {
    model: PNGTuberModel | String; // Collaborator's PNGTuber Model, Mouse Model, or Keyboard Model
}

export interface Collaborator {
    name: String;
    url: String;
    customModel?: String;
}

