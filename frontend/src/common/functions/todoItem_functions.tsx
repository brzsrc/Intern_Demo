import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {TodoItem, todoItemKeys, todoListKeys} from "../types";
import {addTodoItem, updateTodoItem} from "../../queryOptions/queries";
import {Button, CloseButton, Dialog, Field, Input, Portal, Stack, Textarea} from "@chakra-ui/react";


export function AddTodoItemDialog({listId}: { listId: string }) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemContent, setItemContent] = useState("");
    const [submitted, setSubmitted] = useState<boolean>(false)

    const addItem = useMutation({
        mutationFn: (todoItem: TodoItem) => addTodoItem(todoItem),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: todoItemKeys.items})
            queryClient.invalidateQueries({queryKey: todoListKeys.lists})
            queryClient.invalidateQueries({queryKey: todoListKeys.detail(listId)})
        },
        onError: (err) => alert(err.message),
    })


    return (
        <>
            <Button onClick={() => setOpen(true)}>
                add item
            </Button>

            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} size="80%"
             closeOnInteractOutside={false}>
                <Portal>
                    <Dialog.Backdrop/>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Add Todo Item</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <Stack gap="4">
                                    <Field.Root required invalid={!itemName && submitted}>
                                        <Field.Label>Item name <Field.RequiredIndicator/></Field.Label>
                                        <Input placeholder="e.g. XXX YYY" value={itemName}
                                               onChange={(e) => setItemName(e.target.value)}/>
                                    </Field.Root>

                                    <Field.Root>
                                        <Field.Label>Content</Field.Label>
                                        <Textarea placeholder="Details..." value={itemContent}
                                                  onChange={(e) => setItemContent(e.target.value)} h={300}/>
                                    </Field.Root>

                                </Stack>
                            </Dialog.Body>


                            <Dialog.Footer>
                                <Button onClick={() => {
                                    setSubmitted(true);
                                    if (!itemName) return
                                    addItem.mutate({
                                        name: itemName,
                                        content: itemContent,
                                        list_within: listId,
                                    });
                                    setSubmitted(false)
                                    setOpen(false);
                                    setItemName("");
                                    setItemContent("");
                                }}>
                                    Create
                                </Button>
                            </Dialog.Footer>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton justifyContent="center" size="sm" onClick={() => {
                                    setSubmitted(false)
                                    setOpen(false);
                                    setItemName("");
                                    setItemContent("");
                                }}/>
                            </Dialog.CloseTrigger>

                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}


export function EditTodoItemDialog({item, open, onOpenChange}: {
    item: TodoItem,
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const itemId = item.id
    const queryClient = useQueryClient()
    const editItem = useMutation({
        mutationFn: ({itemId, payload}: {
            itemId: string
            payload: { name:string, content: string,  list_within: string}
        }) => updateTodoItem(itemId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: todoListKeys.lists})
            queryClient.invalidateQueries({queryKey: todoListKeys.detail(item.list_within)})
            queryClient.invalidateQueries({queryKey: todoItemKeys.detail(itemId)})
        },
        onError: (err) => alert(err.message),
    })

    const [itemName, setItemName] = useState(item.name);
    const [itemContent, setItemContent] = item.content ? useState(item.content) : useState("");

    return (
        <>
            <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} size="80%"
             closeOnInteractOutside={false}>
                <Portal>
                    <Dialog.Backdrop/>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>View & Edit Todo Item</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <Stack gap="4">
                                    <Field.Root>
                                        <Field.Label>Item name</Field.Label>
                                        <Input value={itemName}
                                               onChange={(e) => setItemName(e.target.value)}/>
                                    </Field.Root>

                                    <Field.Root>
                                        <Field.Label>Content</Field.Label>
                                        <Textarea value={itemContent}
                                                  onChange={(e) => setItemContent(e.target.value)} h={300}/>
                                    </Field.Root>

                                </Stack>
                            </Dialog.Body>

                            <Dialog.Footer>
                                <Button colorPalette="green"
                                    // loading={useEdit.isPending}
                                        onClick={() => {
                                            editItem.mutate({
                                                itemId,
                                                payload: {
                                                    name: itemName,
                                                    content: itemContent,
                                                    list_within: item.list_within,
                                                }
                                            });
                                            onOpenChange(false);
                                        }}>
                                    Save
                                </Button>
                            </Dialog.Footer>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton justifyContent="center" size="sm"/>
                            </Dialog.CloseTrigger>
                        </Dialog.Content>

                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}
