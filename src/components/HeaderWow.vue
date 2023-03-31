<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-avatar class="q-mr-sm">
        <img src="@/assets/logo.svg" />
      </q-avatar>
      <q-btn flat round dense icon="logout" @click="logout" class="q-mr-sm" />
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab
        v-for="route in routes"
        :key="route.to"
        :to="route.to"
        :label="route.label"
        :exact="route.exact"
      />
    </q-tabs>
  </q-header>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();
    const router = useRouter();
    const isLoggedIn = computed(() => {
      return store.state.isLoggedIn;
    });

    function logout() {
      store.dispatch("logout");
      router.push("/login");
    }

    // Filter routes based on authentication state
    const routes = computed(() => {
      const isAuthenticated = store.getters.isAuthenticated;
      return [
        {
          to: "/rooms",
          label: "Rooms",
          exact: true,
          hidden: !isAuthenticated,
        },
        {
          to: "/equipments",
          label: "Equipments",
          exact: true,
          hidden: !isAuthenticated,
        },
        {
          to: "/reservation",
          label: "Reservations",
          exact: true,
          hidden: !isAuthenticated,
        },
      ].filter((route) => !route.hidden);
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout,
      routes,
    };
  },
};
</script>
