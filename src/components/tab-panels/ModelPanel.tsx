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
                <GridListItem>
                    <h3>Item 3</h3>
                </GridListItem>
                {/* <GridListLoadMoreItem /> */}
            </GridList>
            <section className="flex flex-row w-full h-fit gap-8">
                <div className="flex flex-row w-fit h-fit gap-4">
                    <DialogTrigger>
                        {/* Clicking this button automatically opens the modal dialog */}
                        <Button variant="secondary"><Icon icon="material-symbols:add-2-rounded"/></Button>
                        
                        <Modal>
                            <Dialog>
                                {({ close }) => (
                                    <Form
                                        action={formData => {
                                            let modelName = formData.get('name') as String
                                            let thumbnail = formData.get('thumbnail') as String
                                            handleAddClick(modelName, thumbnail)
                                        }}
                                        className="m-4"
                                    >
                                        <Heading slot="title">Create Model</Heading>
                                        <TextField isRequired name="name" label="Name" type="text" placeholder="Enter your model's name">
                                            <FieldError />
                                        </TextField>
                                        <TextField isRequired name="thumbnail" label="Model Thumbnail" type="text" placeholder="Enter your model's thumbnail">
                                            <FieldError />
                                        </TextField>
                                        <div className="flex flex-row w-full justify-end gap-4">
                                            <Button onPress={close}>Cancel</Button>
                                            <Button type="submit">Create Model</Button>
                                        </div>
                                    </Form>
                                )}
                            </Dialog>
                        </Modal>
                    </DialogTrigger>
                    {
                        selectedModels.length > 1 ? 
                        <DialogTrigger>
                            {/* Clicking this button automatically opens the modal dialog */}
                            <Button variant="secondary" isDisabled={canEdit}><Icon icon="material-symbols:edit-outline-rounded"/></Button>
                            
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
                        <Button variant="destructive" isDisabled={canDelete}><Icon icon="material-symbols:delete-outline-rounded"/></Button>
                        
                        <Modal>
                            <Dialog>
                                {({ close }) => (
                                    <>
                                        <Heading slot="title">Delete Models</Heading>
                                        <p>Are you sure you want to delete these models?</p>

                                        <p>This action cannot be undone.</p>

                                        {/* FIX_ME - put the list of selected models here */}
                                        
                                        {/* Pressing this button automatically closes it */}
                                        <Button variant="primary" onPress={close}>Cancel</Button>
                                        <Button variant="destructive" onClick={() => handleDeleteClick()}>Delete Models</Button>
                                    </>
                                )}
                            </Dialog>
                        </Modal>
                    </DialogTrigger>
                    {/* <Button className="h-full min-h-fit" onClick={()=>handleAddClick()}><Icon icon="material-symbols:add-2-rounded"/></Button> */}
                    {/* <Button isDisabled={canEdit} onClick={()=> handleEditClick()}><Icon icon="material-symbols:edit-outline-rounded"/></Button> */}
                    {/* <Button isDisabled={canDelete} onClick={()=>handleDeleteClick()}><Icon icon="material-symbols:delete-outline-rounded"/></Button> */}
                </div>
                <Button variant="primary" className={"w-full"}>Launch Models</Button>
            </section>
        </section>
    )
}