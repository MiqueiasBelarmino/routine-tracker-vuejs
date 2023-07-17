import router from "@/router";
import { authenticate, validateSession } from "@/services/auth";
import { getLocalToken, getLocalUser, removeLocalToken, removeLocalUser, setLocalToken, setLocalUser } from "@/utils/helpers";

export default {
  namespaced: true,
  state: {
    user: null,
    token: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    }

  },
  actions: {
    async doLogin({ dispatch }, payload) {
      const response = await authenticate(payload.username, payload.password);
      if (response.auth) {
        const user = {
          username: payload.username,
          name: response.name,
          id: response.userId,
        };
        dispatch("setUser", user);
        dispatch("setToken", response.token);
        setLocalUser(user);
        setLocalToken(response.token);
        setTimeout(() => {
          router.push({name: "home" });
        }, 1000);
      }
    },
    doLogout({ dispatch }) {
      dispatch("setUser", null);
      dispatch("setToken", null);
      removeLocalUser();
      removeLocalToken();
    },
    checkToken({ dispatch, getters }, state) {
      if (getters.hasToken) {
        return Promise.resolve(state.getToken);
      }

      const token = getLocalToken();
      // const user = getLocalUser();

      if (!token) {
        return Promise.reject(new Error("Token invalid!"));
      }

      // dispatch("setUser", user);
      dispatch("setToken", token);
      return dispatch("loadSession");
    },
    loadSession({ dispatch }){
      return new Promise(async (resolve, reject) => {
        try {
          const { token, user } = await validateSession();
          console.log(`DATA:USER: ${user}`);
          dispatch("setUser", user);

          resolve();
        } catch (error) {
          dispatch("doLogout");
          reject(err);
        }
      })
    },
    setUser({ commit }, payload) {
      commit("setUser", payload);
    },
    setToken({ commit }, payload) {
      commit("setToken", payload);
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    hasToken(state) {
      return !!state.token;
    }
  }
}