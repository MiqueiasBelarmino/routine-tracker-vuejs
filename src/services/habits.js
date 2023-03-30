import api from "@/services/api"

export async function getHabits() {
    try {
        const { data } = await api.get('/habits');
        return data.data;
    } catch (error) {
        console.log(error?.message)
    }
}
