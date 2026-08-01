import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addTodoList, deleteTodoList, getAllTodoLists} from "../../queryOptions/queries";
import {
    Badge,
    Box,
    Button,
    Circle,
    CloseButton,
    Dialog,
    Flex,
    Input,
    Menu,
    Portal,
    Select,
    Text
} from "@chakra-ui/react";
import {Layout as TodoListLayout, TableColumnProps, UserCell} from "./Layout";
import {Plus} from "lucide-react";
import {LuEllipsisVertical} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import {ReactNode, useRef, useState} from "react";

interface TodoListRow {
    id: string;
    name: string;
    owned_by: string;
    assigned_to: string;
    items: number;
    updated_at: string;
    created_at: string;
}


const TodoListColumns: TableColumnProps<TodoListRow>[] = [
    {
        header: "List",
        render: (a) => (<ListNameCell listName={a.name} listId={a.id}/>),
    },
    {
        header: "Owner",
        render: (a) => a.owned_by,
    },
    {
        header: "Assigned to",
        render: (a) => a.assigned_to,
    },
    {
        header: "#Items",
        render: (a) => (
            1111111
        ),
    },
    {
        header: "updated",
        render: (a) => a.updated_at,
    },
    {
        header: "",
        render: (a) => (<MenuCell listId={a.id}/>),
    },

]

function ListNameCell({listName, listId}: { listName: string, listId: string }) {
    const navigate = useNavigate()
    return (
        <Box cursor="pointer" onClick={(e) => navigate(`/console/todoLists/${listId}`)}>
            {listName}
        </Box>
    )
}

function MenuCell({listId}: { listId: string }) {
    const queryClient = useQueryClient()
    const deleteList = useMutation({
        mutationFn: () => deleteTodoList(listId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todoLists"]})
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
                        <Menu.Item value="delete" color="fg.error" onSelect={deleteList.mutate}>
                            Delete
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}


export function AddTodoListDialog() {
    const queryClient = useQueryClient()
    const addlist = useMutation({
        mutationFn: addTodoList,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todoLists"]})
        },
        onError: (err) => alert(err.message),
    })

    const [open, setOpen] = useState(false);
    const [listName, setListName] = useState("");
    return (
        <>
            <Button onClick={() => setOpen(true)}><Plus/>Add New List</Button>

            <Dialog.Root open={open} onOpenChange={() => setOpen(false)}>
                <Portal>
                    <Dialog.Backdrop/>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Create Todo List</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <Text> List name </Text>

                                <Input placeholder="e.g. XXX YYY" value={listName}
                                       onChange={(e) => setListName(e.target.value)}/>

                                <Text> Owner </Text>
                                <Select.Root>

                                </Select.Root>
                            </Dialog.Body>


                            <Dialog.Footer>
                                <Button onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => {
                                    addlist.mutate({
                                        name: listName
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

function HeaderCell({title, addLabel}: { title: string,  addLabel: ReactNode}) {
    return (
        <Flex justify="space-between" alignItems="center">
            <Text textStyle="body.2xl.medium.salt"> {title} </Text>
            <Flex>
                {addLabel}
            </Flex>
        </Flex>
    )
}

export function TodoLists() {
    const {
        data: todoLists,
        isPending,
        isError,
        error
    } = useQuery({
        queryKey: ["todoLists"],
        queryFn: getAllTodoLists
    })

    // console.log("todoLists" + todoLists)

    if (isPending) return <Text>Loading</Text>
    if (isError) return <Text>Sth went wrong</Text>

    return (
        <>
            <TodoListLayout header={<HeaderCell title="Todo Lists" addLabel={<AddTodoListDialog/>}/>} tableColumns={TodoListColumns}
                            rows={todoLists} placeholder="search by list name or owner"/>
        </>
    )
}