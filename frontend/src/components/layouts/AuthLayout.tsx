import {Flex} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import {ColorModeButton, useColorMode} from "../ui/color-mode";
import {Toaster} from "../ui/toaster";
import React from "react";
import {hapticsImpactLight} from "../../common/functions/common";


export default function AuthLayout() {
    const { toggleColorMode } = useColorMode();

    return (

        <Flex minH="100vh" align="center" justify="center" px="4">
            <ColorModeButton position="absolute" top="4" left="4"
                             style={{paddingTop: 'var(--safe-area-inset-top, 0px)'}}
                             onClick={() => {
                                 hapticsImpactLight();
                                 toggleColorMode();
                             }}
            />
            <Outlet/>
            <Toaster/>
        </Flex>

    )
}