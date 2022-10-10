<template>
  <div v-if="appReady">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { ref } from "vue";
import { supabase } from "./supabase/init";
import store from "./store/index";

export default {
  components: {
    Navigation,
  },
  setup() {
    // Create data / vars
    const appReady = ref(null);

    // Check to see if user is already logged in
    const user = supabase.auth.user();

    // If user does not exist, need to make app ready
    if (!user) {
      appReady.value = true;
    }

    // Runs when there is a auth state change
    supabase.auth.onAuthStateChange((_, session) => {
      console.log("Auth state is changed");
      // if user is logged in, set into store
      store.methods.setUser(session);
      appReady.value = true;
    });

    return { appReady };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
