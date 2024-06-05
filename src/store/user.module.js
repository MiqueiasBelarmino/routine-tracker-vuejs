import { createUser } from "@/services/auth";

export default {
  namespaced: true,
  state: {
    user: null,
    token: null
  },
  actions: {
    async createNewUser({ dispatch }, payload) {
      const response = await createUser(payload);

      return response.createdUser?.id? true : false;
    },
  },
} 