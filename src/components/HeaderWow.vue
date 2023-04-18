<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-avatar class="q-mr-sm">
        <img src="@/assets/logo.svg" />
      </q-avatar>
      <div class="q-pa-md">
        <q-btn-dropdown
          v-if="isAuthenticated"
          split
          color="orange"
          push
          no-caps
          icon="folder"
          label="Rooms Reservation"
          @click="onRoomsReservationClick"
        >
          <q-item clickable v-close-popup @click="onApprovedRoomsClick">
            <q-item-section avatar>
              <q-avatar
                icon="assignment"
                color="secondary"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Approved Rooms Reservations</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="amber" />
            </q-item-section>
          </q-item>
        </q-btn-dropdown>
      </div>
      <div class="q-pa-md">
        <q-btn-dropdown
          v-if="isAuthenticated"
          split
          color="orange"
          push
          no-caps
          icon="folder"
          label="Equipments Reservation"
          @click="onEquipmentsReservationClick"
        >
          <q-item clickable v-close-popup @click="onApprovedEquipmentsClick">
            <q-item-section avatar>
              <q-avatar
                icon="assignment"
                color="secondary"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Approved Equipments Reservation</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" color="amber" />
            </q-item-section>
          </q-item>
        </q-btn-dropdown>
      </div>
      <q-btn flat round dense icon="logout" @click="logout" class="q-mr-sm" />
      <div class="q-pa-md"></div>
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab to="/rooms" label="Rooms" exact />
      <q-route-tab to="/equipments" label="Equipments" exact />
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
    const isAuthenticated = computed(() => store.state.isAuthenticated);

    function onRoomsReservationClick(event) {
      const route = event.target.dataset.route;
      router.push("/roomsreservation");
    }

    function onApprovedRoomsClick(event) {
      const route = event.target.dataset.route;
      router.push("/approvedroomsreservation");
    }

    function onEquipmentsReservationClick(event) {
      const route = event.target.dataset.route;
      router.push("/equipmentsreservation");
    }

    function onApprovedEquipmentsClick(event) {
      const route = event.target.dataset.route;
      router.push("/equipmentsapprovedreservation");
    }

    function logout() {
      window.location.reload();
      store.dispatch("logout");
      router.push("/login");
    }

    watchEffect(() => {
      console.log("isAuthenticated:", isAuthenticated.value);
    });
    
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      watchEffect,
      isAuthenticated,
      logout,
      onRoomsReservationClick,
      onApprovedRoomsClick,
      onEquipmentsReservationClick,
      onApprovedEquipmentsClick,
    };
    
  },
};
</script>
