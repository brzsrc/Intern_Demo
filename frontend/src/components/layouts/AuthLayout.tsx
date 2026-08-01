import {Flex} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import {ColorModeButton} from "../ui/color-mode";
import {Toaster} from "../ui/toaster";
import React from "react";


export default function AuthLayout() {
    return (

        <Flex minH="100vh" align="center" justify="center" px="4">
            <ColorModeButton position="absolute" top="4" left="4"/>
            <Outlet/>
            <Toaster/>
        </Flex>

    )
}