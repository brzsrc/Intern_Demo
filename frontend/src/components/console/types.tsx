

export type TodoList = {
    id?: string,
    name: string,
    owned_by?: string,
    assigned_to?: string,
    created_at?: string,
    updated_at?: string,
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
    id?: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
}
