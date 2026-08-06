import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addTodoList, assignTodoList, getAllUsers, updateTodoList} from "../../queryOptions/queries";
import {useState} from "react";
import {
    Button,
    CloseButton,
    createListCollection,
    Dialog,
    Field,
    Input,
    Portal,
    Select,
    Stack,
    Text
} from "@chakra-ui/react";
import {Plus} from "lucide-react";
import {TodoList, todoListKeys, userKeys} from "../types";
import {AnimatedLoading} from "../../contexts/AnimatedSplash";


export function AddTodoListDialog({isAdmin}: { isAdmin: boolean }) {
    const queryClient = useQueryClient()
    const addlist = useMutation({
        mutationFn: addTodoList,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: todoListKeys.lists})
        },
        onError: (err) => alert(err.message),
    })

    const [open, setOpen] = useState(false);
    const [listName, setListName] = useState("");
    const [submitted, setSubmitted] = useState<boolean>(false)
    const [owner, setOwner] = useState<string[]>([])

    const {
        data: users,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: userKeys.list,
        queryFn: getAllUsers
    })

    if (isPending) {
        // return <Text> Loading </Text>
        return <AnimatedLoading loading={true}/>
    }
    if (isError) {
        return <Text> Sth went wrong </Text>
    }

    const owners = createListCollection({
        items: users.map((u) => ({label: u.name, value: u.id})),
    })

    return (
        <>
            <Button onClick={() => setOpen(true)}><Plus/>Add New List</Button>

            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} closeOnInteractOutside={false}>
                <Portal>
                    <Dialog.Backdrop/>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Create Todo List</Dialog.Title>
                            </Dialog.Header>


                            <Dialog.Body>
                                <Stack gap="4">
                                    <Field.Root required invalid={!listName && submitted}>
                                        <Field.Label>List name <Field.RequiredIndicator/> </Field.Label>
                                        <Input placeholder="e.g. XXX YYY" value={listName}
                                               onChange={(e) => setListName(e.target.value)}/>
                                    </Field.Root>


                                    {isAdmin ?
                                        <Select.Root collection={owners} value={owner}
                                                     onValueChange={(e) => setOwner(e.value)}>
                                            <Select.HiddenSelect/>
                                            <Select.Label>Owner</Select.Label>
                                            <Select.Control>
                                                <Select.Trigger>
                                                    <Select.ValueText placeholder="Not selecting an owner will create a list for yourself"/>
                                                </Select.Trigger>
                                                <Select.IndicatorGroup>
                                                    <Select.Indicator/>
                                                </Select.IndicatorGroup>
                                            </Select.Control>
                                            <Select.Positioner>
                                                <Select.Content>
                                                    {owners.items.map((item) => (
                                                        <Select.Item item={item} key={item.value}>
                                                            {item.label}
                                                            <Select.ItemIndicator/>
                                                        </Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select.Positioner>
                                        </Select.Root> : undefined}
                                </Stack>
                            </Dialog.Body>


                            <Dialog.Footer>
                                <Button onClick={() => {
                                    setSubmitted(true);
                                    if (!listName) return
                                    isAdmin ?
                                        addlist.mutate({
                                            name: listName,
                                            owned_by: owner[0]
                                        }) : addlist.mutate({
                                            name: listName
                                        });
                                    setSubmitted(false);
                                    setOpen(false);
                                    setListName("");
                                    setOwner([""])
                                }}>
                                    Create
                                </Button>
                            </Dialog.Footer>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton justifyContent="center" size="sm" onClick={() => {
                                    setOpen(false);
                                    setSubmitted(false);
                                    setListName("");
                                    setOwner([""])
                                }}/>
                            </Dialog.CloseTrigger>

                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}


export function EditTodoListDialog({list, open, onOpenChange, isAdmin}: {
    list: TodoList
    open: boolean
    onOpenChange: (open: boolean) => void,
    isAdmin: boolean
}) {
    const listId = list.id
    const queryClient = useQueryClient()
    const editList = useMutation({
        mutationFn: ({listId, payload}: {
            listId: string
            payload: { name: string; owned_by?: string }
        }) => updateTodoList(listId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: todoListKeys.lists})
            queryClient.invalidateQueries({queryKey: todoListKeys.detail(listId)})
        },
        onError: (err) => alert(err.message),
    })

    const [listName, setListName] = useState(list.name);

    const [owner, setOwner] = useState<string[]>([list.owned_by])

    const {
        data: users,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: userKeys.list,
        queryFn: getAllUsers
    })

    if (isPending) {
        // return <Text> Loading </Text>
        return <AnimatedLoading loading={true}/>
    }
    if (isError) {
        return <Text> Sth went wrong </Text>
    }

    const owners = createListCollection({
        items: users.map((u) => ({label: u.name, value: u.id})),
    })

    return (
        <>
            <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)}>
                <Portal>
                    <Dialog.Backdrop/>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Edit Todo List</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <Stack gap="4">
                                    <Field.Root>
                                        <Field.Label>List name</Field.Label>
                                        <Input value={listName}
                                               onChange={(e) => setListName(e.target.value)}/>
                                    </Field.Root>

                                    {
                                        isAdmin ? (
                                            <Select.Root collection={owners} value={owner}
                                                         onValueChange={(e) => setOwner(e.value)}>
                                                <Select.HiddenSelect/>
                                                <Select.Label>Owner</Select.Label>
                                                <Select.Control>
                                                    <Select.Trigger>
                                                        <Select.ValueText/>
                                                    </Select.Trigger>
                                                    <Select.IndicatorGroup>
                                                        <Select.Indicator/>
                                                    </Select.IndicatorGroup>
                                                </Select.Control>
                                                <Select.Positioner>
                                                    <Select.Content>
                                                        {owners.items.map((item) => (
                                                            <Select.Item item={item} key={item.value}>
                                                                {item.label}
                                                                <Select.ItemIndicator/>
                                                            </Select.Item>
                                                        ))}
                                                    </Select.Content>
                                                </Select.Positioner>
                                            </Select.Root>
                                        ) : undefined
                                    }

                                </Stack>
                            </Dialog.Body>

                            <Dialog.Footer>
                                <Button colorPalette="green"
                                    // loading={useEdit.isPending}
                                        onClick={() => {
                                            isAdmin ?
                                                editList.mutate({
                                                    listId,
                                                    payload: {
                                                        name: listName,
                                                        owned_by: owner[0]
                                                    }
                                                }) : editList.mutate({
                                                    listId,
                                                    payload: {
                                                        name: listName,
                                                    }
                                                })
                                            ;
                                            onOpenChange(false)
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


export function AssignTodoListDialog({list, open, onOpenChange}: {
    list: TodoList
    open: boolean
    onOpenChange: (open: boolean) => void,
}) {
    const listId = list.id
    const queryClient = useQueryClient()
    const editList = useMutation({
        mutationFn: ({listId, payload}: {
            listId: string,
            payload: { assigned_to: string }
        }) => assignTodoList(listId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: todoListKeys.lists})
            queryClient.invalidateQueries({queryKey: todoListKeys.detail(listId)})
        },
        onError: (err) => alert(err.message),
    })


    const [assigned, setAssigned] = useState<string[]>(list.assigned_to ? [list.assigned_to] : [""])

    const {
        data: users,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: userKeys.list,
        queryFn: getAllUsers
    })

    if (isPending) {
        // return <Text> Loading </Text>
        return <AnimatedLoading loading={true}/>
    }
    if (isError) {
        return <Text> Sth went wrong </Text>
    }

    const assigneds = createListCollection({
        items: users.map((u) => ({label: u.name, value: u.id})),
    })

    return (
        <>
            <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)}>
                <Portal>
                    <Dialog.Backdrop/>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header flexDirection="column" alignItems="flex-start" gap="1">
                                <Dialog.Title>Assign List</Dialog.Title>
                                <Dialog.Description>Assign this list to a user. They will see it under their Todo
                                    Lists</Dialog.Description>
                            </Dialog.Header>

                            <Dialog.Body>
                                <Stack gap="4">

                                    <Select.Root collection={assigneds} value={assigned}
                                                 onValueChange={(e) => setAssigned(e.value)}>
                                        <Select.HiddenSelect/>
                                        <Select.Label>Assigned to</Select.Label>
                                        <Select.Control>
                                            <Select.Trigger>
                                                <Select.ValueText/>
                                            </Select.Trigger>
                                            <Select.IndicatorGroup>
                                                <Select.Indicator/>
                                            </Select.IndicatorGroup>
                                        </Select.Control>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {assigneds.items.map((item) => (
                                                    <Select.Item item={item} key={item.value}>
                                                        {item.label}
                                                        <Select.ItemIndicator/>
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Select.Root>
                                </Stack>
                            </Dialog.Body>

                            <Dialog.Footer>
                                <Button colorPalette="green"
                                    // loading={useEdit.isPending}
                                        onClick={() => {
                                            editList.mutate({
                                                listId,
                                                payload: {assigned_to: assigned[0]}
                                            });
                                            onOpenChange(false)
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