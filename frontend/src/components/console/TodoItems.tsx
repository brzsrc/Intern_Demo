import {Flex, Menu, Portal, Text} from "@chakra-ui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteTodoItem, getTodoItemsByListId} from "../../queryOptions/queries";
import {TodoItem, todoItemKeys, todoListKeys} from "../../common/types";
import {ReactNode, useState} from "react";
import {MoveLeft} from "lucide-react";
import {Layout as TodoItemLayout, matchesSearch, SearchBar, TableColumnProps} from "./Layout";
import {LuEllipsisVertical} from "react-icons/lu";

import {AddTodoItemDialog, EditTodoItemDialog} from "../../common/functions/todoItem_functions";
import {formatDateTime, truncate} from "../../common/functions/common";
import {AnimatedLoading} from "../../contexts/AnimatedSplash";


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
        render: (a) => truncate(a.content),
    },
    {
        header: "updated",
        render: (a) => formatDateTime(a.updated_at),
    },
    {
        header: "",
        render: (a) => (<MenuCell item={a}/>),
    },

]

function MenuCell({item}: { item: TodoItem }) {
    const queryClient = useQueryClient()
    const deleteItem = useMutation({
        mutationFn: () => deleteTodoItem(item.id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: todoItemKeys.items})
            queryClient.invalidateQueries({queryKey: todoListKeys.lists})
            queryClient.invalidateQueries({queryKey: todoListKeys.detail(item.list_within)})
        },
        onError: (err) => alert(err.message),
    })
    const [editOpen, setEditOpen] = useState(false)

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
                            <Menu.Item value="delete" color="fg.error" onSelect={deleteItem.mutate}>
                                Delete
                            </Menu.Item>

                            <Menu.Item value="edit" onSelect={() => setEditOpen(true)}>
                                <Menu.ItemText>View & Edit</Menu.ItemText>
                            </Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
            <EditTodoItemDialog item={item} open={editOpen} onOpenChange={setEditOpen}/>
        </>

    )
}

function HeaderCell({title, addLabel}: { title: string, addLabel: ReactNode }) {
    const navigate = useNavigate()

    return (
        <Flex justify="space-between" alignItems="center">
            <Flex direction="column" gap={2}>
                <Flex onClick={() => navigate(-1)} cursor="pointer" gap={2}>
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
        queryKey: todoListKeys.detail(listId),
        queryFn: () => getTodoItemsByListId(listId),
        // enabled: !!listId,
    })

    const [search, setSearch] = useState("")
    if (isPending) {
        // return <Text>Loading</Text>
        return <AnimatedLoading loading={true}/>
    }
    if (isError) return <Text>Sth went wrong</Text>
    // console.log("todoItems:", {data})


    const {list_name, items: todoItems} = data
    const filteredItems = todoItems.filter(i => matchesSearch(search, i.name))


    return (
        <>

            <TodoItemLayout header={<HeaderCell title={list_name} addLabel={<AddTodoItemDialog listId={listId}/>}/>}
                            tableColumns={TodoItemColumns}
                            rows={filteredItems} searchBar={<SearchBar placeholder="search by item name" value={search}
                                                                       onChange={(s) => setSearch(s)}/>}/>
        </>
    )


}