import { Color } from "react-aria-components";
import { ModelProps } from "./ModelUtils";
import { useEffect, useRef } from "react";

export interface MouseModelProps extends ModelProps {
    id: String;
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


// User should adjust width and height of the buttons, margin between buttons, margin outside of buttons
// Upper radius of middle button, upper radius of left/right buttons, upper radius of mouse body, lower radius of each of the same
// Refer to how Figma handles setting radii.

export const MouseModel: React.FC<MouseModelProps> = ({
        id, width, height, outlineColor, outlineThickness, leftButtonColor, leftButtonPressedColor, 
        leftButtonOutlineColor, leftButtonOutlineThickness, middleButtonColor, middleButtonPressedColor, 
        middleButtonOutlineColor, middleButtonOutlineThickness, rightButtonColor, rightButtonPressedColor, 
        rightButtonOutlineColor, rightButtonOutlineThickness, bodyColor, showMouseBody
    }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    function draw(ctx: CanvasRenderingContext2D) {

        ctx.clearRect(0, 0, width, height);

        if(showMouseBody) {
            // Draw mouse body
            ctx.beginPath();
            ctx.moveTo(0, height/2);
            ctx.arcTo(0, 0, width/2-10, 0, Math.abs(width/2-5));
            ctx.lineTo(width/2+5, 0);
            ctx.arcTo(width, 0, width, height/2, Math.abs(width/2-5));
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();

            ctx.fillStyle = bodyColor.toString();
            ctx.fill();
        }

        // Draw left mouse button
        ctx.beginPath();
        ctx.moveTo(10, height/2);
        ctx.arcTo(10, 10, width/2-10, 10, Math.abs(width/2-5-10));
        ctx.lineTo(width/2-5, height/2-30);
        ctx.lineTo(width/2-15, height/2-30);
        ctx.lineTo(width/2-15, height/2);
        ctx.lineTo(10, height/2);
        ctx.closePath();

        ctx.save();
        ctx.clip();
        ctx.fillStyle = leftButtonColor.toString();
        ctx.strokeStyle = leftButtonOutlineColor.toString();
        ctx.lineWidth = leftButtonOutlineThickness*2;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Draw middle mouse button
        ctx.beginPath();
        ctx.moveTo(width/2-5, height/2);
        ctx.lineTo(width/2-5, height/2-20);
        ctx.lineTo(width/2+5, height/2-20);
        ctx.lineTo(width/2+5, height/2);
        ctx.lineTo(width/2-5, height/2);
        ctx.closePath();

        ctx.save();
        ctx.clip();
        ctx.fillStyle = middleButtonColor.toString();
        ctx.strokeStyle = middleButtonOutlineColor.toString();
        ctx.lineWidth = middleButtonOutlineThickness*2;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Draw right mouse button
        ctx.beginPath();
        ctx.moveTo(width-10, height/2);
        ctx.arcTo(width-10, 10, width/2+10, 10, Math.abs(width/2-5-10));
        ctx.lineTo(width/2+5, height/2-30);
        ctx.lineTo(width/2+15, height/2-30);
        ctx.lineTo(width/2+15, height/2);
        ctx.lineTo(width-10, height/2);
        ctx.closePath();

        ctx.save();
        ctx.clip();
        ctx.fillStyle = rightButtonColor.toString();
        ctx.strokeStyle = rightButtonOutlineColor.toString();
        ctx.lineWidth = rightButtonOutlineThickness*2;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        if(showMouseBody) {
            // Draw mouse outline
            ctx.beginPath();
            ctx.moveTo(0, height/2);
            ctx.arcTo(0, 0, width/2-10, 0, Math.abs(width/2-5));
            ctx.lineTo(width/2+5, 0);
            ctx.arcTo(width, 0, width, height/2, Math.abs(width/2-5));
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();

            ctx.save();
            ctx.clip();
            ctx.strokeStyle = outlineColor.toString();
            ctx.lineWidth = outlineThickness*2;
            ctx.stroke();
            ctx.restore();
        }
    }

    useEffect(() => {

        const canvas = canvasRef.current;
        if(canvas == null){return;}

        const context = canvas.getContext("2d");
        if(context == null){return;}

        draw(context);

    }, [draw]);

    return (
        <canvas ref={canvasRef} width={width} height={height}/>
    );
}