<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-avatar>
        <img src="@/assets/logo.svg" />
      </q-avatar>
      <q-btn flat round dense icon="logout" @click="logout" />
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab to="/rooms" label="Rooms" exact />
      <q-route-tab to="/equipments" label="Equipments" exact />
      <q-route-tab to="/reservation" label="Reservations" exact />
    </q-tabs>
  </q-header>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.dispatch("logout");
      router.push("/login");
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout,
    };
  },
};
</script>
