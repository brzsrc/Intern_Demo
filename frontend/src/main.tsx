import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Users from "./components/Users";
import MainLayout from "./layouts/MainLayout"
import {AuthProvider} from "./components/AuthContext";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import {ChakraProvider} from "@chakra-ui/react";
import {ThemeProvider} from "next-themes"
import {system} from "./theme";
// main.tsx
import "inter-ui/inter.css";
import "@fontsource/plus-jakarta-sans/500.css";       // ← 这两行必须保留
import "@fontsource/plus-jakarta-sans/600.css";
import Admins from "./components/Admins";
import {ColorModeProvider} from "./components/ui/color-mode";
import AuthLayout from "./layouts/AuthLayout";


const router = createBrowserRouter([
    // {path: "/dashboard", element: <PrivateRoute> <Dashboard/> </PrivateRoute>},

    {
        element: <PublicRoute> <AuthLayout/> </PublicRoute>,
        children: [
            {path: "/", element: <Navigate to={"/login"} replace={true}/>},
            {path: "/login", element:  <Login/> },
            {path: "/register", element: <Register/> },
        ]

    },
    {
        element: <PrivateRoute> <MainLayout/> </PrivateRoute>,
        // element: <MainLayout/>,
        children: [
            {path: "/dashboard", element: <Dashboard/>},
            {path: "/products", element: <Products/>},
            {path: "/users", element: <Users/>},
            {path: "/admins", element: <Admins/>},
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider value={system}>
            {/*<ColorModeProvider attribute="class" disableTransitionOnChange forcedTheme="light">*/}
            <ColorModeProvider>
                <AuthProvider>
                    <RouterProvider router={router}/>
                </AuthProvider>
            </ColorModeProvider>
        </ChakraProvider>
    </React.StrictMode>,
)
