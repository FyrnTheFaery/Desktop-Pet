import { parseColor } from "react-aria-components"
import { MouseModel } from "../models/MouseModel"

export const MousePanel: React.FC<{}> = () => {
    return (
        <>
            <p>Mouse Panel</p>
			<MouseModel outlineColor={parseColor("#FFFFFF")} outlineThickness={4} 
                leftButtonOutlineColor={parseColor("#FFFFFF")} leftButtonOutlineThickness={4} 
                leftButtonColor={parseColor("#ff0000")} leftButtonPressedColor={parseColor("#6f0000")} 
                middleButtonOutlineColor={parseColor("#FFFFFF")} middleButtonOutlineThickness={4} 
                middleButtonColor={parseColor("#0dff00")} middleButtonPressedColor={parseColor("#006f06")} 
                rightButtonOutlineColor={parseColor("#FFFFFF")} rightButtonOutlineThickness={4} 
                rightButtonColor={parseColor("#000dff")} rightButtonPressedColor={parseColor("#00026f")} 
                bodyColor={parseColor("#7a7a7a")} showMouseBody={true} id={"123"} name={"Mouse"} 
                thumbnailSrc={""} width={200} height={250}
            />
        </>
    )
}