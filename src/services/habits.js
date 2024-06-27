import api from "@/services/api"
import { getStoreToken, getUser } from "@/utils/helpers";

export async function getHabitsByDay(date) {
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

export async function toggleHabit(id, date) {
    try {
        api.defaults.headers.common['Authorization'] = `Bearer ${getStoreToken()}`;
        const { data } = await api.patch(`/habits/${id}/toggle`, {
            date: date,
            userId: getUser().id
        });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createHabit(habit) {
    try {
        api.defaults.headers.common['Authorization'] = `Bearer ${getStoreToken()}`;
        const { data } = await api.post(`/habits`, {
            "name": habit.name,
            "schedule": habit.schedule,
            "weekDays": habit.weekDays.map(day => Number(day)),
            "userId": getUser().id
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

export async function deleteHabit(id) {
    try {
        api.defaults.headers.common['Authorization'] = `Bearer ${getStoreToken()}`;
        const { data } = await api.delete(`/habits/${id}`, {
            userId: getUser().id
        });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}