import api from "@/services/api"
import { getStoreToken, getUser } from "@/utils/helpers";

export async function getTasksByDay(date) {
    try {
        api.defaults.headers.common['Authorization'] = `Bearer ${getStoreToken()}`;
        const { data } = await api.post(`/day`, {
            date: date,
            userId: getUser().id
        });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function toggleTask(id, date) {
    try {
        api.defaults.headers.common['Authorization'] = `Bearer ${getStoreToken()}`;
        const { data } = await api.patch(`/tasks/${id}/toggle`, {
            date: date,
            userId: getUser().id
        });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createTask(task) {
    try {
        api.defaults.headers.common['Authorization'] = `Bearer ${getStoreToken()}`;
        const { data } = await api.post(`/tasks`, {
            name: task.name,
            targetDate: task.date,
            priority: task.priority,
            userId: getUser().id
        }).then((response) => {
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

export async function deleteTask(id) {
    try {
        api.defaults.headers.common['Authorization'] = `Bearer ${getStoreToken()}`;
        const { data } = await api.delete(`/tasks/${id}`, {
            userId: getUser().id
        });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}