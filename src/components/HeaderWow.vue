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
        v-for="route in filteredRoutes"
        :key="route.to"
        :to="route.to"
        :label="route.label"
        :exact="route.exact"
      />
    </q-tabs>
  </q-header>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    function logout() {
      window.location.reload();
      store.dispatch("logout");
      router.push("/login");
    }

    // Define all the routes, hidden or not
    const routes = [
      {
        to: "/rooms",
        label: "Rooms",
        exact: true,
        hidden: false,
      },
      {
        to: "/equipments",
        label: "Equipments",
        exact: true,
        hidden: false,
      },
      {
        to: "/reservation",
        label: "Reservations",
        exact: true,
        hidden: false,
      },
      {
        to: "/approved",
        label: "Approved Reservations",
        exact: true,
        hidden: false,
      },
    ];

    // Filter routes based on authentication state
    const filteredRoutes = computed(() =>
      routes.filter((route) => !route.hidden || isAuthenticated.value)
    );

    // Watch for changes to isAuthenticated and recompute the filtered routes
    watchEffect(() => {
      filteredRoutes.value = routes.filter(
        (route) => !route.hidden || isAuthenticated.value
      );
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout,
      filteredRoutes,
    };
  },
};
</script>
