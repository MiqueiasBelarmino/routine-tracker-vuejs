import { createStore } from 'vuex'
import authModule from './auth.module'
import userModule from './user.module'

export default createStore({
    modules: {
        auth: authModule,
        user: userModule
      }
})