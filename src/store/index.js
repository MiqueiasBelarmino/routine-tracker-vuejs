import { createStore } from 'vuex'
import authModule from './auth.module'

export default createStore({
    modules: {
        auth: authModule
      }
})