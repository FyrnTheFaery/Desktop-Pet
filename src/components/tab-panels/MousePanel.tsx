import { GridListLoadMoreItem, parseColor } from "react-aria-components"
import { MouseModel } from "../models/MouseModel"
import { GridList, GridListItem } from "../wrappers/GridList"
import Button from "../wrappers/Button"
import { Icon } from "@iconify/react"

// FIX_ME - Get the mouse models from the backend
export const MousePanel: React.FC<{}> = () => {

    return (
        <section className="flex flex-col w-full h-fit gap-4">
            <h2>Mouse Models</h2>
            <GridList
                // layout="grid"
                orientation="vertical"
                aria-label="Mouse Models"
                selectionMode="multiple"
                className={"flex flex-col w-full h-fit"}
            >
                <GridListItem>
                    {/* <Button slot="drag">
                        <Icon icon={"material-symbols:drag-indicator"}/>
                    </Button> */}
                    <h3>Item 1</h3>
                </GridListItem>
                <GridListItem>
                    <h3>Item 2</h3>
                </GridListItem>
                {/* <GridListLoadMoreItem /> */}
            </GridList>
            <div className="flex flex-col w-full h-fit gap-4">
                <div className="flex flex-row w-full h-fit gap-8">
                    <Button className={"flex w-full"}>Delete Model</Button>
                    <Button className={"flex w-full"}>Add Model</Button>
                </div>
                <Button className={"flex w-full"}>Launch Selected Models</Button>
            </div>
			{/* <MouseModel outlineColor={parseColor("#FFFFFF")} outlineThickness={4} 
                leftButtonOutlineColor={parseColor("#FFFFFF")} leftButtonOutlineThickness={4} 
                leftButtonColor={parseColor("#ff0000")} leftButtonPressedColor={parseColor("#6f0000")} 
                middleButtonOutlineColor={parseColor("#FFFFFF")} middleButtonOutlineThickness={4} 
                middleButtonColor={parseColor("#0dff00")} middleButtonPressedColor={parseColor("#006f06")} 
                rightButtonOutlineColor={parseColor("#FFFFFF")} rightButtonOutlineThickness={4} 
                rightButtonColor={parseColor("#000dff")} rightButtonPressedColor={parseColor("#00026f")} 
                bodyColor={parseColor("#7a7a7a")} showMouseBody={true} id={"123"} name={"Mouse"} 
                thumbnailSrc={""} width={200} height={250}
            /> */}
        </section>
    )
}