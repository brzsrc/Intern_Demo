import {Layout as UserLayout, matchesSearch, SearchBar, TableColumnProps} from "./Layout";
import {Badge, Flex, Input, InputGroup, Menu, Portal, Text, Alert, VStack} from "@chakra-ui/react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    deleteUser,
    getAllUsers, getAuth,
    getUser
} from "../../queryOptions/queries";
import {LuEllipsisVertical, LuSearch} from "react-icons/lu";
import {ReactNode, useState} from "react";
import {roleProps, User, userKeys} from "../../common/types";
import {AddUserDialog, EditProfileDialog, UserCellStatic} from "../../common/functions/user_functions";
import {AnimatedLoading} from "../../contexts/AnimatedSplash";


function getUserColumns(isAdmin: boolean, uid: string): TableColumnProps<User>[] {
    const UsersColumns: TableColumnProps<User>[] = [
        {
            header: "User",
            render: (a) => <UserCellStatic name={a.name} email={a.email}
                                           avatar={a.avatar ?? "/images/topbar/avatar.png"}/>,
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
    ]
    if (isAdmin) {
        UsersColumns.push({
            header: "",
            render: (a) => (
                uid == a.id ? undefined :
                <MenuCell userId={a.id}/>),
        })
    }
    return UsersColumns
}


function MenuCell({userId}: { userId: string }) {
    const queryClient = useQueryClient()
    const [editOpen, setEditOpen] = useState(false)
    const deleteOneUser = useMutation({
        mutationFn: () => deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: userKeys.list});
        },
        onError: (err) => alert(err.message),
    })
    const {
        data: user,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: userKeys.detail(userId),
        queryFn: () => getUser(userId),
    })

    if (isPending) {
        return <AnimatedLoading loading={true}/>
        // return <Text> Loading </Text>
    }
    if (isError) {
        return <Text> Sth went wrong </Text>
    }

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
                            <Menu.Item value="delete" color="fg.error" onSelect={deleteOneUser.mutate}>
                                <Menu.ItemText>Delete</Menu.ItemText>
                            </Menu.Item>
                            <Menu.Item value="edit" onSelect={() => setEditOpen(true)}>
                                <Menu.ItemText>Edit</Menu.ItemText>
                            </Menu.Item>

                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>

            <EditProfileDialog user={user} open={editOpen} onOpenChange={setEditOpen} isAuth={false}/>
        </>

    )
}


function HeaderCell({title, addLabel, isAdmin}: { title: string, addLabel: ReactNode, isAdmin: boolean }) {
    return (
        <Flex direction="column" gap={1}>
            <Flex justify={isAdmin ? "space-between" : "flex-start"} alignItems="center">
                <Text textStyle="body.2xl.medium.salt" position="relative"> {title} </Text>
                <Flex>
                    {isAdmin ? addLabel : undefined}
                    {/*{addLabel}*/}
                </Flex>
            </Flex>
            {!isAdmin && (
                <Alert.Root status="warning" borderRadius="lg">
                    <Alert.Indicator/>
                    <Alert.Title>
                        You are viewing as a standard user — user management is available to admins only.
                    </Alert.Title>
                </Alert.Root>
            )}

        </Flex>
    )
}


export function Users() {

    const {
        data: users,
        isPending: isPendingUsers,
        isError: isErrorUsers,
        error: errorUsers,
    } = useQuery({
        queryKey: userKeys.list,
        queryFn: getAllUsers
    })

    const {
        data: user,
        isPending: isPendingUser,
        isError: isErrorUser,
        error: errorUser,
    } = useQuery({
        queryKey: userKeys.auth,
        queryFn: getAuth
    })


    const [search, setSearch] = useState("")


    if (isPendingUsers || isPendingUser) {
        // return <Text> Loading </Text>
        return <AnimatedLoading loading={true}/>
    }
    if (isErrorUsers || isErrorUser) {
        return <Text> Sth went wrong </Text>
    }


    const isAdmin = user.role === "admin"
    const filteredUsers = users.filter(u => matchesSearch(search, u.name, u.email))

    const UsersColumns = getUserColumns(isAdmin, user.id)

    return (
        <UserLayout header={<HeaderCell title="Users" addLabel={<AddUserDialog/>} isAdmin={isAdmin}/>}
                    tableColumns={UsersColumns}
                    rows={filteredUsers} searchBar={<SearchBar placeholder="search by user name or email" value={search}
                                                               onChange={(s) => setSearch(s)}/>}/>
    )
}