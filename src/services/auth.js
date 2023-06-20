import api from "@/services/api"


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
