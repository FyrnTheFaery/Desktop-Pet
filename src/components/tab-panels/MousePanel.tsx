// import { Dialog, DialogTrigger, GridListLoadMoreItem, Header, Heading } from "react-aria-components"
// import { GridList, GridListItem } from "../wrappers/GridList"
// import Button from "../wrappers/Button"
// import { Icon } from "@iconify/react"
// import { ModelInfoProps } from "../models/ModelUtils"
// import { useState } from "react"
// import { Modal } from "../wrappers/Modal"
// import Form from "../wrappers/Form"

// // FIX_ME - Get the mouse models from the backend instead of relying on the frontend mockup
// export const MousePanel: React.FC<{}> = () => {

//     let models: Array<ModelInfoProps> = []
//     let selectedModels: Array<ModelInfoProps> = [];
//     let [canEdit, setCanEdit] = useState<boolean>(true);
//     let [canDelete, setCanDelete] = useState<boolean>(true);

//     function handleAddClick(modelInfo: ModelInfoProps) {
//         models.push(modelInfo);
//         // FIX_ME - Open an editor for the new model
//     }

//     function handleEditClick() {
//         selectedModels.forEach((model) => {
//             // FIX_ME - For each selected model, open a new editor window for that model
//         });
//     }

//     function handleDeleteClick() {
//         let modelIndex = 0;
//         selectedModels.forEach((model) => {
//             modelIndex = models.indexOf(model);
//             models.splice(modelIndex, 0);
//         });
//         selectedModels = [];
//         if(models.length == 0) {
//             setCanEdit(false);
//             setCanDelete(false);
//         }
//     }

//     return (
//         <section className="flex flex-col w-full h-full gap-4 px-4 py-4">
//             <Header className="flex flex-row w-full h-fit justify-between">
//                 Mouse Models
//             </Header>
//             <GridList
//                 // layout="grid"
//                 orientation="vertical"
//                 aria-label="Mouse Models"
//                 selectionMode="multiple"
//                 className={"flex flex-col w-full h-{100}"}
//             >
//                 <GridListItem>
//                     {/* <Button slot="drag">
//                         <Icon icon={"material-symbols:drag-indicator"}/>
//                     </Button> */}
//                     <h3>Item 1</h3>
//                 </GridListItem>
//                 <GridListItem>
//                     <h3>Item 2</h3>
//                 </GridListItem>
//                 {/* <GridListLoadMoreItem /> */}
//             </GridList>
//             <section className="flex flex-row w-full h-fit gap-8">
//                 <div className="flex flex-row w-fit h-fit gap-4">
//                     <DialogTrigger>
//                         {/* Clicking this button automatically opens the modal dialog */}
//                         <Button><Icon icon="material-symbols:add-2-rounded"/></Button>
                        
//                         <Modal>
//                             <Dialog>
//                                 {({ close }) => (
//                                     <>
//                                         <Heading slot="title">Create Model</Heading>
//                                         <Form>

//                                         </Form>
//                                         <p>This is the contents of the modal dialog.</p>
                                        
//                                         {/* Pressing this button automatically closes it */}
//                                         <Button onPress={close}>Cancel</Button>
//                                         <Button onPress={() => handleAddClick()}>Create Model</Button>
//                                     </>
//                                 )}
//                             </Dialog>
//                         </Modal>
//                     </DialogTrigger>
//                     {
//                         selectedModels.length > 1 ? 
//                         <DialogTrigger>
//                             {/* Clicking this button automatically opens the modal dialog */}
//                             <Button isDisabled={canEdit}><Icon icon="material-symbols:edit-outline-rounded"/></Button>
                            
//                             <Modal>
//                                 <Dialog>
//                                     {({ close }) => (
//                                         <>
//                                             <Heading slot="title">Edit Models</Heading>
//                                             <p>Are you sure you want to edit multiple models at once?</p>
                                            
//                                             {/* Pressing this button automatically closes it */}
//                                             <Button onPress={close}>Cancel</Button>
//                                             <Button isDisabled={canEdit} onClick={() => handleEditClick()}>Edit Models</Button>
//                                         </>
//                                     )}
//                                 </Dialog>
//                             </Modal>
//                         </DialogTrigger>
//                         : <Button isDisabled={canEdit} onClick={() => handleEditClick()}><Icon icon="material-symbols:edit-outline-rounded"/></Button>
//                     }
//                     <DialogTrigger>
//                         {/* Clicking this button automatically opens the modal dialog */}
//                         <Button isDisabled={canDelete}><Icon icon="material-symbols:delete-outline-rounded"/></Button>
                        
//                         <Modal>
//                             <Dialog>
//                                 {({ close }) => (
//                                     <>
//                                         <Heading slot="title">Delete Models</Heading>
//                                         <p>Are you sure you want to delete these models?</p>

//                                         <p>This action cannot be undone.</p>

//                                         {/* FIX_ME - put the list of selected models here */}
                                        
//                                         {/* Pressing this button automatically closes it */}
//                                         <Button onPress={close}>Cancel</Button>
//                                         <Button onClick={() => handleDeleteClick()}>Delete Models</Button>
//                                     </>
//                                 )}
//                             </Dialog>
//                         </Modal>
//                     </DialogTrigger>
//                     {/* <Button className="h-full min-h-fit" onClick={()=>handleAddClick()}><Icon icon="material-symbols:add-2-rounded"/></Button> */}
//                     {/* <Button isDisabled={canEdit} onClick={()=> handleEditClick()}><Icon icon="material-symbols:edit-outline-rounded"/></Button> */}
//                     {/* <Button isDisabled={canDelete} onClick={()=>handleDeleteClick()}><Icon icon="material-symbols:delete-outline-rounded"/></Button> */}
//                 </div>
//                 <Button className={"w-full"}>Launch Models</Button>
//             </section>
// 			{/* <MouseModel outlineColor={parseColor("#FFFFFF")} outlineThickness={4} 
//                 leftButtonOutlineColor={parseColor("#FFFFFF")} leftButtonOutlineThickness={4} 
//                 leftButtonColor={parseColor("#ff0000")} leftButtonPressedColor={parseColor("#6f0000")} 
//                 middleButtonOutlineColor={parseColor("#FFFFFF")} middleButtonOutlineThickness={4} 
//                 middleButtonColor={parseColor("#0dff00")} middleButtonPressedColor={parseColor("#006f06")} 
//                 rightButtonOutlineColor={parseColor("#FFFFFF")} rightButtonOutlineThickness={4} 
//                 rightButtonColor={parseColor("#000dff")} rightButtonPressedColor={parseColor("#00026f")} 
//                 bodyColor={parseColor("#7a7a7a")} showMouseBody={true} id={"123"} name={"Mouse"} 
//                 thumbnailSrc={""} width={200} height={250}
//             /> */}
//         </section>
//     )
// }