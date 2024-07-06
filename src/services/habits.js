import api from "@/services/api"
import { getStoreToken, getUser } from "@/utils/helpers";
import { error, success } from "@/utils/toasts";

function setAuthorizationHeader() {
    api.defaults.headers.common['Authorization'] = `Bearer ${getStoreToken()}`;
}

export async function getHabitsByDay(date) {
    try {
        setAuthorizationHeader();
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
        setAuthorizationHeader();
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
        setAuthorizationHeader();
        const data = await api.post(`/habits`, {
            "name": habit.name,
            "schedule": habit.schedule,
            "weekDays": habit.weekDays.map(day => Number(day)),
            "userId": getUser().id
        }).then((response) => {
            return response.data;
        }).catch(function ({ response }) {
            let msg = `${response?.data?.issues[0].path.join(', ')}: ${response?.data?.issues[0].message}` ?? 'Something gone wrong.'
            error({ text: msg });
        });
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteHabit(id) {
    try {
        const userId = getUser().id;
        setAuthorizationHeader();
        const { data } = await api.delete(`/habits/${id}`);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}