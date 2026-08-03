import {
    Badge,
    Box,
    Button,
    Card,
    Circle, CloseButton, Select,
    Dialog,
    Flex, Field,
    Icon,
    Image, Input,
    Menu,
    Portal,
    Square, Stack,
    Text, Textarea
} from "@chakra-ui/react";
import {ChevronDown, LogOut} from "lucide-react";
import {useAuth} from "../../contexts/AuthContext";
import {useRef, useState} from "react";
import {ColorModeButton} from "../ui/color-mode";
import {NavMenu, NavMenuConsole} from "../console/Sidebar";
import {deleteTodoItem, getAuth, updateAuth, updateAuthAvatar} from "../../queryOptions/queries";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {roleProps, roles, todoListKeys, User, userKeys} from "../../common/types";
import {EditProfileDialog} from "../../common/functions/user_functions";
import {useLocation} from "react-router-dom";
import {NavMenuDocs} from "../intern_docs/Sidebar";

function UserCell({user}: { user: User }) {

    console.log(user)
    console.log(user.name)

    const queryClient = useQueryClient()
    const updateAvatar = useMutation({
        mutationFn: (file: File) => updateAuthAvatar(file),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: userKeys.auth})
            queryClient.invalidateQueries({queryKey: userKeys.list})
        },
        onError: (err) => alert(err.message),
    })

    const [open, setOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function ProfilePictureHandler(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("inside ProfilePictureHandler")
        const file = e.target.files?.[0]
        console.log(e.target.files?.[0])
        if (!file) {
            console.log("No image uplaoded")
            return
        }
        updateAvatar.mutate(file)
        return
    }

    return (
        <>
            <Flex gap="3">
                <Circle size="40px" overflow="hidden" cursor="pointer"
                        onClick={() => setOpen(true)}>
                    <Image src={user.avatar ?? "/images/topbar/avatar.png"} alt="" aspectRatio="1" objectFit="cover"/>
                </Circle>

                <Flex direction="column">
                    <Text cursor="default" textStyle="body.sm.medium"> {user.name} </Text>
                    <Text cursor="default" fontSize="xs" color="fg.placeholder"> {user.email}</Text>
                </Flex>
            </Flex>

            <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={(e) => ProfilePictureHandler(e)}
            />
            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Portal>
                    <Dialog.Backdrop/>
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                               <Dialog.Title>Profile Picture</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Square size="400px" overflow="hidden">
                                    <Image src={user.avatar ?? "/images/topbar/avatar.png"} alt="" aspectRatio="1"
                                           objectFit="cover"/>
                                </Square>

                            </Dialog.Body>

                            <Dialog.Footer>
                                <Button onClick={() => fileInputRef.current?.click()}>
                                    Upload New Picture
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


export function Topbar() {
    const auth = useAuth()
    const [editOpen, setEditOpen] = useState(false)
    const {
        data: user,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: userKeys.auth,
        queryFn: getAuth,
        enabled: !!auth.user,
    })

    console.log("user:", user)

    if (!auth.user) return null
    if (isPending) {
        return <Text> Loading </Text>
    }
    if (isError) {
        return <Text> Sth went wrong </Text>
    }


    async function LogoutHandler() {
        try {
            await auth.logout()
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
            }
        }
    }

    const location = useLocation();
    console.log(location.pathname)


    return (
        <Flex layerStyle="surface.topbar" h="72px" px="6" align="center" gap="3" justify="space-between">
            <Flex align="center">
                {
                    location.pathname.startsWith("/console") ? <NavMenuConsole/> : <NavMenuDocs/>
                }
                <ColorModeButton/>
            </Flex>

            <Flex justify="flex-end" gap={3}>

                <Badge borderRadius="xl" variant={roleProps[user.role].variant}>{roleProps[user.role].role}</Badge>

                <UserCell user={user}/>

                <Menu.Root>
                    <Menu.Trigger asChild>
                        <Icon
                            boxSize="4"
                            color="gray.400"
                            _hover={{color: "gray.600"}}
                            // transition="transform 0.2s"
                            _open={{transform: "rotate(180deg)"}}
                        >
                            <ChevronDown/>
                        </Icon>
                    </Menu.Trigger>

                    <Portal>
                        <Menu.Positioner>
                            <Menu.Content>
                                <Menu.Item value="Logout" onSelect={() => {
                                    (LogoutHandler())
                                }}>
                                    <Menu.ItemText> Logout </Menu.ItemText>
                                </Menu.Item>
                                <Menu.Item value="edit" onSelect={() => setEditOpen(true)}>
                                    <Menu.ItemText>Edit profile</Menu.ItemText>
                                </Menu.Item>
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>

                <EditProfileDialog user={user} open={editOpen} onOpenChange={setEditOpen} isAuth={true}/>

            </Flex>

        </Flex>
    )
}