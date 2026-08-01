import {Box, Button, CloseButton, Dialog, Flex, Input, Menu, Portal, Select, Text, Textarea} from "@chakra-ui/react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    addTodoItem,
    addTodoList, deleteTodoItem,
    deleteTodoList,
    getAllTodoLists,
    getTodoItemsByListId
} from "../../queryOptions/queries";
import {TodoItem} from "./types";
import {ReactNode, useState} from "react";
import {ArrowLeft, MoveLeft, MoveRight, Plus} from "lucide-react";
import {Layout as TodoItemLayout, TableColumnProps} from "./Layout";
import {LuEllipsisVertical} from "react-icons/lu";
import {AddTodoListDialog} from "./TodoLists";


interface TodoItemRow {
    id: string;
    name: string;
    content: string;
    list_within: string;
    updated_at: string;
    created_at: string;
}

const TodoItemColumns: TableColumnProps<TodoItemRow>[] = [
    {
        header: "Item",
        render: (a) => a.name,
    },
    {
        header: "Content",
        render: (a) => a.content,
    },
    {
        header: "updated",
        render: (a) => a.updated_at,
    },
    {
        header: "",
        render: (a) => (<MenuCell itemId={a.id}/>),
    },

]

function MenuCell({itemId}: { itemId: string }) {
    const queryClient = useQueryClient()
    const deleteItem = useMutation({
        mutationFn: () => deleteTodoItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todoItems"]})
        },
        onError: (err) => alert(err.message),
    })

    return (
        <Menu.Root>
            <Menu.Trigger cursor="pointer">
                {/*<Button variant="ghost" size="sm">*/}
                <LuEllipsisVertical/>
                {/*</Button>*/}
            </Menu.Trigger>

            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        <Menu.Item value="delete" color="fg.error" onSelect={deleteItem.mutate}>
                            Delete
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

function AddTodoItemDialog({listId}: { listId: string }) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemContent, setItemContent] = useState("");

    const addItem = useMutation({
        mutationFn: (todoItem: TodoItem) => addTodoItem(todoItem),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todoItems"]})
        },
        onError: (err) => alert(err.message),
    })


    return (
        <>
            <Button onClick={() => setOpen(true)}>
                add item
            </Button>

            <Dialog.Root open={open} onOpenChange={() => setOpen(false)}>
                <Portal>
                    <Dialog.Backdrop/>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Add Todo Item</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <Text> Item name </Text>

                                <Input placeholder="e.g. XXX YYY" value={itemName}
                                       onChange={(e) => setItemName(e.target.value)}/>

                                <Text> Content </Text>
                                <Textarea placeholder="Details..." value={itemContent}
                                          onChange={(e) => setItemContent(e.target.value)} h={100}/>

                            </Dialog.Body>


                            <Dialog.Footer>
                                <Button onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => {
                                    addItem.mutate({
                                        name: itemName,
                                        content: itemContent,
                                        list_within: listId,
                                    }), setOpen(false)
                                }}>
                                    Create
                                </Button>
                            </Dialog.Footer>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm"/>
                            </Dialog.CloseTrigger>

                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

function HeaderCell({title, addLabel}: { title: string, addLabel: ReactNode }) {
    const navigate = useNavigate()

    return (
        <Flex justify="space-between" alignItems="center">
            <Flex direction="column">
                <Flex onClick={() => navigate(-1)} cursor="pointer" gap={1}>
                    <MoveLeft strokeWidth={0.9}/> <Text> Todo Lists</Text>
                </Flex>
                <Text textStyle="body.2xl.medium.salt"> {title} </Text>
            </Flex>
            <Flex>
                {addLabel}
            </Flex>
        </Flex>
    )
}

export function TodoItems() {

    const {listId} = useParams()


    const {
        data,
        isPending,
        isError,
        error
    } = useQuery({
        queryKey: ["todoItems", listId],
        queryFn: () => getTodoItemsByListId(listId),
        // enabled: !!listId,
    })


    if (isPending) return <Text>Loading</Text>
    if (isError) return <Text>Sth went wrong</Text>
    // console.log("todoItems:", {data})

    const {list_name, items: todoItems} = data


    return (
        <>

            <TodoItemLayout header={<HeaderCell title={list_name} addLabel={<AddTodoItemDialog listId={listId}/>}/>}
                            tableColumns={TodoItemColumns}
                            rows={todoItems} placeholder="search by item name or owner"/>
        </>
    )
}