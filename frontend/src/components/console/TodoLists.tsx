import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteTodoList, getAllTodoLists, getAuth} from "../../queryOptions/queries";
import {Alert, Box, Flex, Menu, Portal, Text} from "@chakra-ui/react";
import {Layout as TodoListLayout, matchesSearch, SearchBar, TableColumnProps} from "./Layout";
import {LuEllipsisVertical} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import {ReactNode, useState} from "react";
import {
    AddTodoListDialog,
    AssignTodoListDialog,
    EditTodoListDialog
} from "../../common/functions/todoList_functions";
import {TodoList, todoListKeys, userKeys} from "../../common/types";
import {formatDateTime} from "../../common/functions/common";
import {AnimatedLoading} from "../../contexts/AnimatedSplash";


const TodoListColumns: TableColumnProps<TodoList>[] = [
    {
        header: "List",
        render: (a) => (<ListNameCell listName={a.name} listId={a.id}/>),
    },
    {
        header: "Owner",
        render: (a) => a.owned_by_name,
    },
    {
        header: "Assigned to",
        render: (a) => a.assigned_to_name,
    },
    {
        header: "#Items",
        render: (a) => a.items_count,
    },
    {
        header: "Updated",
        render: (a) => formatDateTime(a.updated_at),
    },
    {
        header: "",
        render: (a) => (<MenuCell list={a}/>),
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

function MenuCell({list}: { list: TodoList }) {
    const queryClient = useQueryClient()
    const deleteList = useMutation({
        mutationFn: () => deleteTodoList(list.id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: todoListKeys.lists})
        },
        onError: (err) => alert(err.message),
    })

    const {
        data: user,
        isPending,
        isError,
        error
    } = useQuery({
        queryKey: userKeys.auth,
        queryFn: getAuth
    })

    const [editOpen, setEditOpen] = useState(false)
    const [assignOpen, setAssignOpen] = useState(false)

    if (isPending){
        // return <Text>Loading</Text>
        return <AnimatedLoading loading={true}/>
    }
    if (isError) return <Text>Sth went wrong</Text>

    const isAdmin = user.role === "admin"
    const isYours = user.id == list.owned_by


    return (
        <>
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

                            <Menu.Item value="edit" onSelect={() => setEditOpen(true)}>
                                <Menu.ItemText>Edit</Menu.ItemText>
                            </Menu.Item>


                            {
                                (isAdmin && isYours) ? (
                                    <Menu.Item value="assign" onSelect={() => setAssignOpen(true)}>
                                        <Menu.ItemText>Assign to User</Menu.ItemText>
                                    </Menu.Item>
                                ) : undefined
                            }


                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
            <EditTodoListDialog list={list} open={editOpen} onOpenChange={setEditOpen} isAdmin={isAdmin}/>
            <AssignTodoListDialog list={list} open={assignOpen} onOpenChange={setAssignOpen}/>
        </>

    )
}


function HeaderCell({title, addLabel, isAdmin}: { title: string, addLabel: ReactNode, isAdmin: boolean }) {
    return (
        <Flex direction="column" gap={2}>
            <Flex justify="space-between" alignItems="center">
                <Text textStyle="body.2xl.medium.salt" position="relative"> {title} </Text>
                <Flex>
                    {addLabel}
                </Flex>
            </Flex>
            {isAdmin && (
                <Alert.Root status="warning" borderRadius="lg">
                    <Alert.Indicator/>
                    <Alert.Title>
                        You are viewing as an admin user — notice you are only allowed to assign your own lists to other
                            users.
                    </Alert.Title>
                </Alert.Root>
            )}

        </Flex>

    )
}

export function TodoLists() {
    const {
        data: todoLists,
        isPending: listIsPending,
        isError: listIsError,
        error: listError,
    } = useQuery({
        queryKey: todoListKeys.lists,
        queryFn: getAllTodoLists
    })


    const {
        data: user,
        isPending: userIsPending,
        isError: userIsError,
        error: userError,
    } = useQuery({
        queryKey: userKeys.auth,
        queryFn: getAuth
    })

    const [search, setSearch] = useState("")

    if (listIsPending || userIsPending) {
        // return <Text>Loading</Text>
        return <AnimatedLoading loading={true}/>
    }
    if (listIsError || userIsError) return <Text>Sth went wrong</Text>

    const isAdmin = user.role === "admin"


    const filteredLists = todoLists.filter(l => matchesSearch(search, l.owned_by_name, l.name))

    return (
        <>
            <TodoListLayout
                header={
                    <HeaderCell title="Todo Lists"
                                addLabel={<AddTodoListDialog isAdmin={isAdmin}/>}
                                isAdmin={isAdmin}/>}
                tableColumns={TodoListColumns}
                rows={filteredLists}
                searchBar={<SearchBar placeholder="search by list name or owner name" value={search}
                                      onChange={(s) => setSearch(s)}/>}/>
        </>
    )
}