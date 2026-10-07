export interface Trigger {}

export interface SpriteSheet {
    id: String;
    images: String[];
    fps: number;
}

export interface AnimTransition {
    id: String;
    prevState: AnimState;
    nextState: AnimState;
    sprites: String[];
    trigger: Trigger;
}

export interface AnimState {
    id: String;
    transitions: AnimTransition[];
    sprites: String[];
}

export interface Layer {
    id: String;
    states: AnimState[];
    rotation: number;
    rotationInput: String;
    xPosition: number;
    xMovementInput: String;
    yPosition: String;
    yMovementInput: String;
    zIndex: number;
    parent: Layer | null;
}

export interface ModelProps {
    id: String;
    name: String;
    thumbnailSrc: String;
    width: number;
    height: number;
}