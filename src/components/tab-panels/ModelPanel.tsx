import { Dialog, DialogTrigger, GridListLoadMoreItem, Header, Heading } from "react-aria-components"
import { GridList, GridListItem } from "../wrappers/GridList"
import Button from "../wrappers/Button"
import { Icon } from "@iconify/react"
import { ModelInfoProps } from "../models/ModelUtils"
import { useState } from "react"
import { Modal } from "../wrappers/Modal"
import Form from "../wrappers/Form"
import { TextField } from "../wrappers/Textfield"
import { FieldError, Input, Label } from "../wrappers/Field"

export interface ModelPanelProps {
    type: "Mouse" | "Keyboard" | "PNGTuber";
}

// FIX_ME - Get the mouse models from the backend instead of relying on the frontend mockup
export const ModelPanel: React.FC<ModelPanelProps> = ({ type }) => {

    let models: Array<ModelInfoProps> = []
    let selectedModels: Array<ModelInfoProps> = [];
    let [canEdit, setCanEdit] = useState<boolean>(true);
    let [canDelete, setCanDelete] = useState<boolean>(true);

    function handleAddClick(modelName: ModelInfoProps["name"], thumbnailSrc: ModelInfoProps["thumbnailSrc"]) {
        // FIX_ME - create a new model file in the backend as soon as the user finishes filling out the form
        let modelFile = "";
        let modelInfo: ModelInfoProps = {
            id: modelName.toLowerCase(),
            name: modelName,
            thumbnailSrc: thumbnailSrc,
            modelFile: modelFile
        };
        models.push(modelInfo);
        // FIX_ME - Open an editor for the new model
    }

    function handleEditClick() {
        selectedModels.forEach((model) => {
            // FIX_ME - For each selected model, open a new editor window for that model
        });
    }

    function handleDeleteClick() {
        // FIX_ME - Remove the models from the backend
        let modelIndex = 0;
        selectedModels.forEach((model) => {
            modelIndex = models.indexOf(model);
            models.splice(modelIndex, 0);
        });
        selectedModels = [];
        if(models.length == 0) {
            setCanEdit(false);
            setCanDelete(false);
        }
    }

    return (
        <section className="flex flex-col w-full h-full gap-4 px-4 py-4">
            <Header className="flex flex-row w-full h-fit justify-between">
                {type + " Models"} 
            </Header>
            <GridList
                // layout="grid"
                orientation="vertical"
                aria-label="Mouse Models"
                selectionMode="multiple"
                className={"flex flex-col w-full h-{100}"}
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
            <section className="flex flex-row w-full h-fit gap-8">
                <div className="flex flex-row w-fit h-fit gap-4">
                    <DialogTrigger>
                        {/* Clicking this button automatically opens the modal dialog */}
                        <Button><Icon icon="material-symbols:add-2-rounded"/></Button>
                        
                        <Modal>
                            <Dialog>
                                {({ close }) => (
                                    <>
                                        <Heading slot="title">Create Model</Heading>
                                        <Form
                                            action={formData => {
                                                let modelName = formData.get('name') as String
                                                let thumbnail = formData.get('thumbnail') as String
                                                handleAddClick(modelName, thumbnail)
                                            }}
                                        >
                                            <TextField isRequired name="name" type="text">
                                                <Label>Name</Label>
                                                <Input className="react-aria-Input inset" placeholder="Enter your model's name" />
                                                <FieldError />
                                            </TextField>
                                            {/* FIX_ME - Update the thumbnail to take in a default or use a user-specified image */}
                                            <TextField isRequired name="thumbnail" type="text">
                                                <Label>Name</Label>
                                                <Input className="react-aria-Input inset" placeholder="Enter your model's name" />
                                                <FieldError />
                                            </TextField>
                                            <Button onPress={close}>Cancel</Button>
                                            <Button type="submit">Create Model</Button>
                                        </Form>
                                    </>
                                )}
                            </Dialog>
                        </Modal>
                    </DialogTrigger>
                    {
                        selectedModels.length > 1 ? 
                        <DialogTrigger>
                            {/* Clicking this button automatically opens the modal dialog */}
                            <Button isDisabled={canEdit}><Icon icon="material-symbols:edit-outline-rounded"/></Button>
                            
                            <Modal>
                                <Dialog>
                                    {({ close }) => (
                                        <>
                                            <Heading slot="title">Edit Models</Heading>
                                            <p>Are you sure you want to edit multiple models at once?</p>
                                            
                                            {/* Pressing this button automatically closes it */}
                                            <Button onPress={close}>Cancel</Button>
                                            <Button isDisabled={canEdit} onClick={() => handleEditClick()}>Edit Models</Button>
                                        </>
                                    )}
                                </Dialog>
                            </Modal>
                        </DialogTrigger>
                        : <Button isDisabled={canEdit} onClick={() => handleEditClick()}><Icon icon="material-symbols:edit-outline-rounded"/></Button>
                    }
                    <DialogTrigger>
                        {/* Clicking this button automatically opens the modal dialog */}
                        <Button isDisabled={canDelete}><Icon icon="material-symbols:delete-outline-rounded"/></Button>
                        
                        <Modal>
                            <Dialog>
                                {({ close }) => (
                                    <>
                                        <Heading slot="title">Delete Models</Heading>
                                        <p>Are you sure you want to delete these models?</p>

                                        <p>This action cannot be undone.</p>

                                        {/* FIX_ME - put the list of selected models here */}
                                        
                                        {/* Pressing this button automatically closes it */}
                                        <Button onPress={close}>Cancel</Button>
                                        <Button onClick={() => handleDeleteClick()}>Delete Models</Button>
                                    </>
                                )}
                            </Dialog>
                        </Modal>
                    </DialogTrigger>
                    {/* <Button className="h-full min-h-fit" onClick={()=>handleAddClick()}><Icon icon="material-symbols:add-2-rounded"/></Button> */}
                    {/* <Button isDisabled={canEdit} onClick={()=> handleEditClick()}><Icon icon="material-symbols:edit-outline-rounded"/></Button> */}
                    {/* <Button isDisabled={canDelete} onClick={()=>handleDeleteClick()}><Icon icon="material-symbols:delete-outline-rounded"/></Button> */}
                </div>
                <Button className={"w-full"}>Launch Models</Button>
            </section>
        </section>
    )
}