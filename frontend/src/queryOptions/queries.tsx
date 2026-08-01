import {api} from "../apis/api";
import {TodoItem, TodoList, User} from "../components/console/types";


export async function getCurrentUser() {

    const res = await api.get('/auth/')
    console.log(res.status)
    return res.data
}

export async function updateUserAvatar(avatar: File) {
    const form = new FormData()
    form.append('avatar', avatar)
    const res = await api.patch('auth/', form)
    console.log("res.status: " + res.status)
    return res.data
}


export async function getAllUsers() {
    const res = await api.get('users/')
    console.log(res.status)
    return res.data
}

export async function deleteUser(userId: string) {
    const res = await api.delete(`users/${userId}/`)
    console.log("res.status: " + res.status)
    return res.data
}

export async function addUser(user: User) {
    const res = await api.post('users/', user)
    console.log("res.status: " + res.status)
    return res.data
}


export async function getAllTodoLists() {
    const res = await api.get('todoLists/')
    console.log(res.status)
    return res.data
}

export async function addTodoList(todoList: TodoList) {
    const res = await api.post('todoLists/', todoList)
    console.log("res.status: " + res.status)
    return res.data
}

export async function updateTodoList(listId: string, todoList: TodoList) {
    const res = await api.patch(`todoLists/${listId}`, todoList)
    console.log("res.status: " + res.status)
    return res.data
}

export async function deleteTodoList(listId: string) {
    const res = await api.delete(`todoLists/${listId}/`)
    console.log("res.status: " + res.status)
    return res.data
}

export async function getTodoItemsByListId(listId: string) {
    const res = await api.get(`todoLists/${listId}/items/`)
    console.log("res.data: ", res.status)
    console.log("res.data: ", res.data)
    return res.data
}


export async function addTodoItem(todoItem: TodoItem) {
    const res = await api.post(`todoItems/`, todoItem)
    console.log(res.status)
    return res.data
}

export async function deleteTodoItem(itemId: string) {
    const res = await api.delete(`todoItems/${itemId}/`)
    console.log("res.status: " + res.status)
    return res.data
}