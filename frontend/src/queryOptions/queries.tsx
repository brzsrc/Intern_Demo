import {api} from "../apis/api";


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

