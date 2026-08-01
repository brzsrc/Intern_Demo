import {useAuth} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {Layout as UserLayout, TableColumnProps, UserCell} from "./Layout";
import {Badge, Button, CloseButton, Dialog, Flex, Input, Menu, Portal, Select, Text} from "@chakra-ui/react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addTodoList, addUser, deleteTodoList, deleteUser, getAllUsers} from "../../queryOptions/queries";
import {LuEllipsisVertical} from "react-icons/lu";
import {ReactNode, useState} from "react";
import {Plus} from "lucide-react";
import {User} from "./types";
import {AddTodoListDialog} from "./TodoLists";


const roleProps: { [k: string]: { variant: string; role: string } } = {
    "admin": {variant: "brand", role: "Admin"},
    "standard": {variant: "standard", role: "Standard"},
}


const UsersColumns: TableColumnProps<User>[] = [
    {
        header: "User",
        render: (a) => <UserCell name={a.name} email={a.email} avatar={a.avatar ?? "/images/topbar/avatar.png"}/>,
    },
    {
        header: "Role",
        render: (a) => (
            <Badge borderRadius="xl" variant={roleProps[a.role].variant}>{roleProps[a.role].role}</Badge>
        ),
    },
    {
        header: "Status",
        render: (a) => (a.is_active ?
                <Badge borderRadius="xl" variant="success">Active</Badge> :
                <Badge borderRadius="xl" variant="danger">Disabled</Badge>
        ),
    },
    {
        header: "",
        render: (a) => (<MenuCell userId={a.id}/>),
    },

]

function MenuCell({userId}: { userId: string }) {
    const queryClient = useQueryClient()
    const deleteOneUser = useMutation({
        mutationFn: () => deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
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
                        <Menu.Item value="delete" color="fg.error" onSelect={deleteOneUser.mutate}>
                            Delete
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    )
}

function AddUserDialog() {
    const queryClient = useQueryClient()
    const addOneUser = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
        },
        onError: (err) => alert(err.message),
    })

    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    return (
        <>
            <Button onClick={() => setOpen(true)}><Plus/>Add New User</Button>

            <Dialog.Root open={open} onOpenChange={() => setOpen(false)}>
                <Portal>
                    <Dialog.Backdrop/>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Create Todo List</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <Text> Full name </Text>

                                <Input placeholder="e.g. Xxx Yyy" value={userName}
                                       onChange={(e) => setUserName(e.target.value)}/>

                                <Text> Email </Text>
                                <Input placeholder="e.g. xxx@yyy.com" value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>


                                <Text> Role </Text>
                                <Select.Root>

                                </Select.Root>
                            </Dialog.Body>


                            <Dialog.Footer>
                                <Button onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => {
                                    addOneUser.mutate({
                                        name: userName,
                                        email: email,
                                        role: ""
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



export function Users() {

    const {
        data: users,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers
    })
    if (isPending) {
        return <Text> Loading </Text>
    }
    if (isError) {
        return <Text> Sth went wrong </Text>
    }



    return (
        <UserLayout header={<HeaderCell title="Users" addLabel={<AddUserDialog/>}/>} tableColumns={UsersColumns}
                            rows={users} placeholder="search by user name"/>
    )
}