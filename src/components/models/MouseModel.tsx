import { Color } from "react-aria-components";
import { ModelProps } from "./ModelUtils";
import { useEffect, useRef } from "react";

export interface MouseModelProps extends ModelProps {
    outlineColor: Color;
    outlineThickness: number;
    leftButtonOutlineColor: Color;
    leftButtonOutlineThickness: number;
    leftButtonColor: Color;
    leftButtonPressedColor: Color;
    middleButtonOutlineColor: Color;
    middleButtonOutlineThickness: number;
    middleButtonColor: Color;
    middleButtonPressedColor: Color;
    rightButtonOutlineColor: Color;
    rightButtonOutlineThickness: number;
    rightButtonColor: Color;
    rightButtonPressedColor: Color;
    bodyColor: Color;
    showMouseBody: boolean;
}

export const MouseModel: React.FC<MouseModelProps> = ({
        id, width, height, outlineColor, outlineThickness, leftButtonColor, leftButtonPressedColor, middleButtonColor, 
        middleButtonPressedColor, rightButtonColor, rightButtonPressedColor,
        bodyColor, showMouseBody
    }) => {

    const canvasRef = useRef(null);

    useEffect(() => {

    }, []);

    return (
        <canvas ref={canvasRef} width={width} height={height}/>
    );
}