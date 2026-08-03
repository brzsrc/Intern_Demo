import {roles, todoListKeys, User, userKeys} from "../types";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addUser, updateAuth, updateUser} from "../../queryOptions/queries";
import {
    Button,
    Circle,
    CloseButton,
    Dialog,
    Field,
    Flex,
    Image,
    Input,
    Portal,
    Select,
    Stack,
    Text
} from "@chakra-ui/react";
import {Plus} from "lucide-react";


// function useEditAuth({name, email, role, user}: { name: string, email: string, role: string, user: User }) {
//     const queryClient = useQueryClient();
//
//     return (
//         useMutation({
//             mutationFn: () => updateAuth({name: name, email: email, role: role}),
//             onSuccess: () => {
//                 queryClient.invalidateQueries({queryKey: userKeys.auth});
//                 queryClient.invalidateQueries({queryKey: userKeys.list});
//                 queryClient.invalidateQueries({queryKey: todoListKeys.lists})
//             },
//             onError: (err) => alert(err.message),
//         })
//     )
// }
//
// function useEditUser({name, email, role, user}: { name: string, email: string, role: string, user: User }) {
//     const queryClient = useQueryClient();
//
//     return (
//         useMutation({
//             mutationFn: () => updateUser(user.id, {name: name, email: email, role: role}),
//             onSuccess: () => {
//                 queryClient.invalidateQueries({queryKey: userKeys.list});
//                 queryClient.invalidateQueries({queryKey: userKeys.detail(user.id)});
//                 queryClient.invalidateQueries({queryKey: todoListKeys.lists})
//             },
//             onError: (err) => alert(err.message),
//         })
//     )
// }


function useEditAuth({name, role, user}: { name: string, role: string, user: User }) {
    const queryClient = useQueryClient();

    return (
        useMutation({
            mutationFn: () => updateAuth({name: name, role: role}),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: userKeys.auth});
                queryClient.invalidateQueries({queryKey: userKeys.list});
                queryClient.invalidateQueries({queryKey: todoListKeys.lists})
            },
            onError: (err) => alert(err.message),
        })
    )
}

function useEditUser({name, role, user}: { name: string, role: string, user: User }) {
    const queryClient = useQueryClient();

    return (
        useMutation({
            mutationFn: () => updateUser(user.id, {name: name, role: role}),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: userKeys.list});
                queryClient.invalidateQueries({queryKey: userKeys.detail(user.id)});
                queryClient.invalidateQueries({queryKey: todoListKeys.lists})
            },
            onError: (err) => alert(err.message),
        })
    )
}


export function EditProfileDialog({user, open, onOpenChange, isAuth}: {
    user: User
    open: boolean
    onOpenChange: (open: boolean) => void,
    isAuth: boolean
}) {
    const [name, setName] = useState(user.name)
    // const [email, setEmail] = useState(user.email)
    const [role, setRole] = useState<string[]>([user.role])
    // const args = {name: name, email: email, role: role[0], user: user}
    const args = {name: name, role: role[0], user: user}

    const useEdit = isAuth ? useEditAuth(args) : useEditUser(args)

    console.log(user)


    return (
        <>
            <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)}>
                <Portal>
                    <Dialog.Backdrop/>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Edit User</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <Stack gap="4">
                                    <Field.Root>
                                        <Field.Label>Name</Field.Label>
                                        <Input value={name}
                                               onChange={(e) => setName(e.target.value)}/>
                                    </Field.Root>

                                    {/*<Field.Root>*/}
                                    {/*    <Field.Label>Email</Field.Label>*/}
                                    {/*    <Input type="email" value={email}*/}
                                    {/*           onChange={(e) => setEmail(e.target.value)}/>*/}
                                    {/*</Field.Root>*/}

                                    <Select.Root collection={roles} value={role}
                                                 onValueChange={(e) => setRole(e.value)}>
                                        <Select.HiddenSelect/>
                                        <Select.Label>Role</Select.Label>
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
                                                {roles.items.map((item) => (
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
                                            useEdit.mutate();
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


export function AddUserDialog() {
    const queryClient = useQueryClient()
    const addOneUser = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: userKeys.list});
        },
        onError: (err) => alert(err.message),
    })

    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<string[]>(["standard"])
    const [submitted, setSubmitted] = useState<boolean>(false)
    const args = {name: userName, email: email, role: role[0], password: password}

    return (
        <>
            <Button onClick={() => setOpen(true)}><Plus/>Add New User</Button>

            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} closeOnInteractOutside={false}>
                <Portal>
                    <Dialog.Backdrop/>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Add New User</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <Stack gap="4">
                                    <Field.Root required invalid={!userName && submitted}>
                                        <Field.Label>Name <Field.RequiredIndicator/> </Field.Label>
                                        <Input placeholder="e.g. Xxx Yyy" value={userName}
                                               onChange={(e) => setUserName(e.target.value)}/>
                                    </Field.Root>

                                    <Field.Root required invalid={!email && submitted}>
                                        <Field.Label>Email <Field.RequiredIndicator/> </Field.Label>
                                        <Input placeholder="e.g. xxx@yyy.com" value={email}
                                               onChange={(e) => setEmail(e.target.value)}/>
                                    </Field.Root>

                                    <Field.Root required invalid={!password && submitted}>
                                        <Field.Label>Initial Password <Field.RequiredIndicator/> </Field.Label>
                                        <Input placeholder="e.g. xxxyyy" value={password}
                                               onChange={(e) => setPassword(e.target.value)}/>
                                    </Field.Root>

                                    <Select.Root collection={roles} value={role}
                                                 onValueChange={(e) => setRole(e.value)}>
                                        <Select.HiddenSelect/>
                                        <Select.Label>Role</Select.Label>
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
                                                {roles.items.map((item) => (
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
                                            setSubmitted(true);
                                            if (!userName || !email || !password) {
                                                return
                                            }
                                            addOneUser.mutate(args);
                                            setOpen(false);
                                            setSubmitted(false);
                                            setPassword("");
                                            setUserName("");
                                            setRole(["standard"]);
                                            setEmail("");
                                            setPassword("");
                                        }}>
                                    Save
                                </Button>
                            </Dialog.Footer>

                            <Dialog.CloseTrigger asChild>
                                <CloseButton justifyContent="center" size="sm" onClick={() => {
                                    setOpen(false);
                                    setSubmitted(false);
                                    setPassword("");
                                    setUserName("");
                                    setRole(["standard"]);
                                    setEmail("");
                                    setPassword("");
                                }}/>
                            </Dialog.CloseTrigger>

                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

export function UserCellStatic({name, email, avatar}: { name: string, email: string, avatar: string }) {
    return (
        <Flex gap="3">
            <Circle size="40px" overflow="hidden">
                <Image src={avatar} alt="" aspectRatio="1" objectFit="cover"/>
            </Circle>

            <Flex direction="column">
                <Text cursor="default" textStyle="body.sm.medium"> {name} </Text>
                <Text cursor="default" fontSize="xs" color="fg.placeholder"> {email}</Text>
            </Flex>
        </Flex>
    )
}