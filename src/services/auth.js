import api from "@/services/api"
import { getStoreToken } from "@/utils/helpers";

export async function authenticate(username, password) {
    try {
        const { data } = await api.post(`/users/authenticate`, {
            username: username,
            password: password,
        });

        if(data.token && data.refreshToken.user_id){
            return { name: username, token: data.token, userId: data.refreshToken.user_id, auth: true}
        }
        return data;
    } catch (error) {
        console.log(error?.message)
    }
}

export async function createUser(user) {
    try {
        api.defaults.headers.common['Authorization'] = `Bearer ${getStoreToken()}`;
        const { data } = await api.post(`/users`, {
            "name": user.name,
            "username": user.username,
            "password": user.password
        }).then((response) => {
            console.log(response);
        }).catch (function ({response}) {
            console.log(response?.data);
            response?.data?.issues.forEach(issue => {
                console.log(`${issue.path.join(', ')}: ${issue.message}`)
            });
            
        });
        return data;
    } catch (error) {
        // console.log(error?.message)
    }
}

export async function validateSession() {
    try {
        api.defaults.headers.common['Authorization'] = `Bearer ${getStoreToken()}`;
        const { data } = await api.get(`/users/load-session`).catch (function ({response}) {
            console.log(response?.data);
            response?.data?.issues.forEach(issue => {
                console.log(`${issue.path.join(', ')}: ${issue.message}`)
            });
            
        });
        return data;
    } catch (error) {
        // console.log(error?.message)
    }
}
