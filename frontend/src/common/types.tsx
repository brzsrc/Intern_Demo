import {createListCollection} from "@chakra-ui/react";

export type TodoList = {
    id?: string,
    name: string,
    owned_by?: string,
    assigned_to?: string,
    created_at?: string,
    updated_at?: string,
    "owned_by_name"?: string,
    "assigned_to_name"?: string,
    "items_count"?: number,
}

export type TodoItem = {
    id?: string,
    name: string,
    list_within?: string,
    // list_within_name?: string,
    content?: string,
    created_at?: string,
    updated_at?: string,
}

export type User = {
    firebase_uid?: string,
    id?: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
    password?: string;
}


export const roleProps: { [k: string]: { variant: string; role: string } } = {
    "admin": {variant: "brand", role: "Admin"},
    "standard": {variant: "standard", role: "Standard"},
}

export const roles = createListCollection({
    items: [
        {label: "Admin", value: "admin"},
        {label: "Standard", value: "standard"},
    ],
})


export const userKeys = {
    auth: ['user', 'auth'] as const,
    list: ['users'] as const,
    detail: (id: string) => ['user', id] as const,
}


export const todoListKeys = {
    cur: ['list', 'cur'] as const,
    lists: ['lists'] as const,
    detail: (id: string) => ['list', id] as const,
}

export const todoItemKeys = {
    cur: ['item', 'cur'] as const,
    items: ['items'] as const,
    detail: (id: string) => ['item', id] as const,
}