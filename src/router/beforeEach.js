import store from "@/store"

export default async (to, from, next) => {

    if (to.name !== "login" && !store.getters["auth/hasToken"]) {
        try {
            await store.dispatch("auth/checkToken");
            next({ name: to.name });
        } catch (error) {
            next({ name: "login" });
        }

    } else {
        if (to.name == "login" && store.getters["auth/hasToken"]) {
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

    // if(to.name !== "login" && !store.getters["auth/hasToken"]){
    //     try {
    //         await store.dispatch("auth/checkToken");
    //         console.log(1);
    //         next({ name: to.name});
    //     } catch (error) {
    //         console.log(error);
    //         console.log(2);
    //         next({ name: "login"});
    //     }
    // }else {
    //     if(to.name == "login" && store.getters["auth/hasToken"]){
    //         console.log(3);
    //         next({name: "home"});
    //     }else {
    //         console.log(4);
    //         next();
    //     }
    // }
}