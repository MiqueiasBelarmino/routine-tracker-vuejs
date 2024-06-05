import api from "@/services/api"
import { encrypt, getStoreToken } from "@/utils/helpers";

export async function authenticate(username, password) {
    try {
        const passwordAES = encrypt(password);    
        const { data } = await api.post(`/users/authenticate`, {
            username: username,
            password: passwordAES,
        });

        if(data.token && data.refreshToken.user_id){
            return { name: username, token: data.token, userId: data.refreshToken.user_id, auth: true}
        }
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createUser(user) {

    try {
        const passwordAES = encrypt(user.password);
        const { data } = await api.post(`/users`, {
            name: user.name,
            username: user.username,
            password: passwordAES
        }).catch (function ({response}) {
            response?.data?.issues.forEach(issue => {
                console.log(`${issue.path.join(', ')}: ${issue.message}`)
            });
            
        });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function validateSession() {
    try {
        api.defaults.headers.common['Authorization'] = `Bearer ${getStoreToken()}`;
        const { data } = await api.get(`/users/load-session`).catch (function ({response}) {
            response?.data?.issues.forEach(issue => {
                console.log(`${issue.path.join(', ')}: ${issue.message}`)
            });
            
        });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
