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
        const { data } = await api.post(`/day`, {
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

export async function createHabit(habit) {
    try {
        const { data } = await api.post(`/habits`, {
            "name": habit.name,
            "schedule": habit.schedule,
            "weekDays": habit.weekDays.map(day => Number(day))
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

export async function deleteHabit(id) {
    try {
        const { data } = await api.delete(`/habits/${id}`);
        return data;
    } catch (error) {
        console.log(error?.message)
    }
}