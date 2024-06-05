import store from "@/store"

export default async (to, from, next) => {

    if (to.name === 'register') {
        next();
        return;
    }

    if (to.name !== "login" && !store.getters["auth/hasToken"]) {
        try {
            await store.dispatch("auth/checkToken");
            next({ name: to.name });
        } catch (error) {
            next({ name: "login" });
        }
    } else {
        if (to.name === "login" && store.getters["auth/hasToken"]) {
            try {
                await store.dispatch("auth/checkToken");
                next({ name: "home" });
            } catch (error) {
                next({ name: "login" });
            }
        } else {
            next();
        }
    }
}
