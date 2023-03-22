<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-avatar>
        <img src="@/assets/logo.svg" />
      </q-avatar>
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab to="/rooms" label="Rooms" exact />
      <q-route-tab to="/equipments" label="Equipments" exact />
      <q-route-tab
        v-if="isAuthenticated"
        to="/reservation"
        label="Reservations"
        exact
      />
    </q-tabs>
  </q-header>
</template>

<script>
import { ref, computed } from "vue";
import { mapState } from "vuex";


export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
};
</script>
