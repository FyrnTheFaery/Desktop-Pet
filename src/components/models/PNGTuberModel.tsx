export interface Layer {
    src: String;
    rotation: number;
    rotationInput: String;
    xPosition: number;
    xMovementInput: String;
    yPosition: String;
    yMovementInput: String;
    zIndex: number;
    parent: Layer | null;
}

export interface PNGTuberModel {
    name: String;
    width: number;
    height: number;
    layers: Layer[];
}