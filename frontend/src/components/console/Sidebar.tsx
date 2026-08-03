import {Box, Button, Flex, IconButton, Link, Menu, Portal, Text, useDisclosure} from "@chakra-ui/react";
import {useLocation} from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import {LayoutGrid, Package, Users, SquareUserRound, SquareTerminal} from "lucide-react";
import {LuMenu, LuX} from "react-icons/lu";
import { ListTodo, ListChecks, SquareCheck, ClipboardList, ArrowLeft } from "lucide-react"

const navItems = [
    {
        label: "TodoLists",
        path: "/console/todoLists",
        icon: <ListTodo/>,
    },
    {
        label: "Users",
        path: "/console/users",
        icon: <Users/>
    },
    {
        label: "Back to Intern Docs",
        path: "/dashboard",
        icon: <ArrowLeft/>,
    }
];


// const navItems = [
//     {
//         label: "Dashboard",
//         path: "/dashboard",
//         icon: <LayoutGrid/>,
//     },
//     {
//         label: "Products",
//         path: "/products",
//         icon: <Package/>,
//     },
//     {
//         label: "Users",
//         path: "/users",
//         icon: <Users/>
//     },
//     {
//         label: "Admins",
//         path: "/admins",
//         icon: <SquareUserRound/>
//     },
// ];

export function NavMenuConsole() {
    const location = useLocation();
    const { open, onToggle } = useDisclosure()


    return (
        <Box hideFrom="lg">
        <Menu.Root>
            <Menu.Trigger asChild onClick={onToggle}>
                <Button variant="ghost" size="sm">
                    {open ? <LuX size="24"/> : <LuMenu size="24"/>}
                </Button>
            </Menu.Trigger>

            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                        {
                            navItems.map(navItem => {

                                const isActive = location.pathname.startsWith(navItem.path)
                                return (
                                    <Menu.Item key={navItem.path}
                                        bg={isActive ? "bg.active" : ""}
                                        color={isActive ? "" : "fg.placeholder"}
                                        _hover={{
                                        bg: isActive ? "" : "bg.subtle",
                                    }}>
                                        <RouterLink to={navItem.path}>
                                            {navItem.label}
                                        </RouterLink>
                                    </Menu.Item>
                                )

                            })
                        }
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
            </Box>
    )
}

export default function Sidebar() {

    const location = useLocation();
    console.log(location.pathname)


    return (
        <Flex minH="100vh" w="16vw" direction="column" align="stretch" layerStyle="surface.sidebar"
              px="3" py="4" gap="6" hideBelow="lg">

            <Flex w="216px" h="48px" align="center" px="3">
                <Text textStyle="body.lg.medium.salt"> Console </Text>
            </Flex>

            <Flex direction="column" align="stretch" gap="4">
                {
                    navItems.map(
                        (item) => {
                            const isActive = location.pathname.startsWith(item.path);
                            return (
                                <Button asChild key={item.path} variant={isActive ? "active" : "ghost"} >
                                    <RouterLink to={item.path}>
                                        {item.icon} {item.label}
                                    </RouterLink>
                                </Button>
                            );
                        })
                }

            </Flex>
        </Flex>
    )
}