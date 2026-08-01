import {Topbar} from "./Topbar";
import Sidebar from "../console/Sidebar";
import {Box, Flex} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";


export default function ConsoleLayout() {
    return (
        <Flex minH="100vh" position="relative">
                <Sidebar/>

            <Flex direction="column" flex="1">
                <Topbar/>

                <Box flex="1" bg="bg.mainLayout">
                    <Outlet/>
                </Box>
            </Flex>

        </Flex>
    )
}
