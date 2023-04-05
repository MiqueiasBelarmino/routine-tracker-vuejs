import api from "@/services/api"

export async function getHabits() {
    try {
        const { data } = await api.get('/habits');
        return data;
    } catch (error) {
        console.log(error?.message)
    }
}

export async function getHabitsByDay(date) {
    try {
        const { data } = await api.post(`/day`,{
            date: date
        });
        return data;
    } catch (error) {
        console.log(error?.message)
    }
}

export async function toggleHabit(id, date) {
    try {
        const { data } = await api.patch(`/habits/${id}/toggle`, { date: date });
        return data;
    } catch (error) {
        console.log(error?.message)
    }
}