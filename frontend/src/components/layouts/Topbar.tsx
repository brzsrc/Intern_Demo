import {Box, Button, Card, Circle, Dialog, Flex, Icon, Menu, Portal, Square, Text} from "@chakra-ui/react";
import {ChevronDown, LogOut} from "lucide-react";
import {useAuth} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import {ColorModeButton} from "../ui/color-mode";
import {NavMenu} from "../console/Sidebar";
import {updateUserAvatar} from "../../queryOptions/queries";


export function Topbar() {
    const auth = useAuth()

    if (!auth.user) return null

    async function LogoutHandler() {
        try {
            await auth.logout()
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
            }
        }
    }

    function UserCell({name, email, avatar}: { name: string, email: string, avatar: string }) {
        const [open, setOpen] = useState(false);
        const refreshUser = useAuth().refreshUser
        const fileInputRef = useRef<HTMLInputElement>(null);

        async function ProfilePictureHandler(e: React.ChangeEvent<HTMLInputElement>) {
            console.log("inside ProfilePictureHandler")
            const file = e.target.files?.[0]
            console.log(e.target.files?.[0])
            if (!file) {
                console.log("No image uplaoded")
                return
            }
            try {
                console.log("image uplaoding")
                await updateUserAvatar(file)
                const user = await refreshUser()
                console.log(user)
            } catch (error) {
                console.error(error)
            }
            return
        }

        return (
            <>
                <Flex gap="3">
                    <Circle size="40px" overflow="hidden" cursor="pointer"
                            onClick={() => setOpen(true)}>
                        <img src={avatar} alt=""/>
                    </Circle>

                    <Flex direction="column">
                        <Text textStyle="body.sm.medium"> {name} </Text>
                        <Text fontSize="xs" color="fg.placeholder"> {email}</Text>
                    </Flex>
                </Flex>

                <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={fileInputRef}
                    onChange={(e) => ProfilePictureHandler(e)}
                />
                <Dialog.Root open={open} onOpenChange={() => setOpen(false)}>
                    <Portal>
                        <Dialog.Backdrop/>
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <Flex direction="column" alignItems="center" px={10} py={10} gap={4}>
                                    <Square size="400px" overflow="hidden">
                                        <img src={avatar} alt=""/>
                                    </Square>
                                    <Button onClick={() => fileInputRef.current?.click()}>
                                        Upload Profile Picture
                                    </Button>

                                </Flex>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </>

        )
    }


    return (
        <Flex layerStyle="surface.topbar" h="72px" px="6" align="center" gap="3" justify="space-between">
            <Flex align="center">
                <NavMenu/>
                <ColorModeButton/>
            </Flex>

            <Flex justify="flex-end">

                <UserCell name={auth.user.fullName} email={auth.user.email}
                          avatar={auth.user.avatar ?? "/images/topbar/avatar.png"}/>
                {/*<UserCell name="Jane Cooper" email="janecooper@gmail.com" avatar="/images/topbar/avatar.png"/>*/}

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
                            </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>

            </Flex>

        </Flex>
    )
}