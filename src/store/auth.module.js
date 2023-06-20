import router from "@/router";
import { authenticate } from "@/services/auth";

export default {
  namespaced: true,
  state: {
      user: null,
      token: null
  },
  mutations: {
    setUser(state, payload){
      state.user = payload;
    },
    setToken(state, payload){
      state.token = payload;
    }

  },
  actions: {
    async doLogin({dispatch}, payload){
      console.log(payload);
      const response = await authenticate(payload.username, payload.password);
      if (response.auth) {
        const user = {
          username: payload.username,
          name: response.name,
          id: response.userId,
        };
        dispatch("setUser", user);
        dispatch("setToken", response.token);
        router.push({ path: "/" });
      }
    },
    setUser({ commit }, payload) {
      commit("setUser", payload);
    },
    setToken({ commit }, payload) {
      commit("setToken", payload);
    }
  }
}