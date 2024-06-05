<template>
  <base-container>
    <div
      class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Creat a free account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Name</label
            >
            <div class="mt-2">
              <input
                v-model="form.name"
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required="true"
                class="block w-full outline-none px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Username</label
            >
            <div class="mt-2">
              <input
                v-model="form.username"
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                required="true"
                class="block w-full outline-none px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
            </div>
            <div class="mt-2">
              <input
                v-model="form.password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required="true"
                class="block w-full outline-none px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              :disabled="isLoading"
              @click="create"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <div v-if="isLoading" class="flex justify-center">
                <div
                  class="h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span
                  >
                </div>
              </div>

              <div v-else>Create</div>
            </button>
          </div>
        </form>

      </div>
    </div>
  </base-container>
</template>

<script>
import BaseContainer from "@/shared/BaseContainer.vue";
import { mapActions } from "vuex";
import { useNotification } from 'vue-modern-notification';
import router from "@/router";
const toast = useNotification();

const primary = ()=>{
  toast.success({
    title: "Success",
    text: "Your user has been created",
    position: 'bottom-right'
  })
}

export default {
  name: "RegisterView",
  components: {
    BaseContainer,
  },
  data() {
    return {
      form: {
        name: null,
        username: null,
        password: null,
      },
      isLoading: false
    };
  },
  methods: {
    ...mapActions("user", ['createNewUser']),
    async create() {

      if (this.form.name && this.form.username && this.form.password) {
        this.isLoading = true;
        await this.createNewUser({
            name: this.form.name,
            username: this.form.username,
            password: this.form.password
        }).then((response)=>{
          if(response){
            primary();
            setTimeout(() => {
            router.push({name: "login" });
          }, 3000);
          }
        })
          .finally(() => {
            this.isLoading = false;
          });
      }
    }
  },

};
</script>