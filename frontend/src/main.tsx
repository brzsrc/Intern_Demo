import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/intern_docs/dashboard/Dashboard";
import Products from "./components/intern_docs/products/Products";
import Users from "./components/intern_docs/usersAdmins/Users";
import MainLayout from "./components/layouts/MainLayout"
import {AuthProvider} from "./contexts/AuthContext";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import {ChakraProvider, Flex} from "@chakra-ui/react";
import {system} from "./theme";
import "inter-ui/inter.css";
import "@fontsource/plus-jakarta-sans/500.css";       // ← 这两行必须保留
import "@fontsource/plus-jakarta-sans/600.css";
import Admins from "./components/intern_docs/usersAdmins/Admins";
import {ColorModeProvider} from "./components/ui/color-mode";
import AuthLayout from "./components/layouts/AuthLayout";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ConsoleLayout from "./components/layouts/ConsoleLayout";
import {Users as ConsoleUsers} from "./components/console/Users";
import {TodoLists} from "./components/console/TodoLists";
import {TodoItems} from "./components/console/TodoItems";
import { Capacitor } from '@capacitor/core';
import { SafeArea } from 'capacitor-plugin-safe-area';

const router = createBrowserRouter([
    // {path: "/dashboard", element: <PrivateRoute> <Dashboard/> </PrivateRoute>},

    {
        element: <PublicRoute> <AuthLayout/> </PublicRoute>,
        children: [
            {path: "/", element: <Navigate to={"/login"} replace={true}/>},
            {path: "/login", element: <Login/>},
            {path: "/register", element: <Register/>},
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
    },
    {
        path: "/console",
        element: <PrivateRoute> <ConsoleLayout/> </PrivateRoute>,
        children: [
            {index: true, element: <Navigate to="todoLists" replace/>},
            {path: "users", element: <ConsoleUsers/>},
            {path: "todoLists", element: <TodoLists/>},
            {path: "todoLists/:listId", element: <TodoItems/>},
        ]
    },
])

async function initSafeArea() {
  if (!Capacitor.isNativePlatform()) return;   // 浏览器直接跳过

  const { insets } = await SafeArea.getSafeAreaInsets();
  for (const [key, value] of Object.entries(insets)) {
    document.documentElement.style.setProperty(
      `--safe-area-inset-${key}`,
      `${value}px`,
    );
  }

  await SafeArea.removeAllListeners();
  await SafeArea.addListener('safeAreaChanged', ({ insets }) => {
    for (const [key, value] of Object.entries(insets)) {
      document.documentElement.style.setProperty(
        `--safe-area-inset-${key}`,
        `${value}px`,
      );
    }
  });
}

const queryClient = new QueryClient();

initSafeArea();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider value={system}>
            {/*<ColorModeProvider attribute="class" disableTransitionOnChange forcedTheme="light">*/}
            <ColorModeProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <RouterProvider router={router}/>
                    </AuthProvider>
                    <ReactQueryDevtools initialIsOpen={true}/>
                </QueryClientProvider>
            </ColorModeProvider>
        </ChakraProvider>
    </React.StrictMode>
)

