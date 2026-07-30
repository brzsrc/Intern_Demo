import {Box, Card, Circle, Flex, Icon, Menu, Portal, Text} from "@chakra-ui/react";
import {ChevronDown, LogOut} from "lucide-react";
import {UserCell} from "./usersAdmins/Layout";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ColorModeButton} from "./ui/color-mode";
import {NavMenu} from "./Sidebar";


export default function Topbar() {
    const auth = useAuth()
    const navigate = useNavigate()

    if (!auth.user) return null

    async function LogoutHandler() {
        try {
            await auth.logout()
            navigate("/login")
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
            }
        }
    }

    return (
        <Flex layerStyle="surface.topbar" h="72px" px="6" align="center" gap="3" justify="space-between">
            <Flex align="center">
                <NavMenu/>
                <ColorModeButton />
            </Flex>

            <Flex justify="flex-end">

                <UserCell name={auth.user.fullName} email={auth.user.email} avatar={auth.user.avatar ?? "/images/topbar/avatar.png"}/>
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