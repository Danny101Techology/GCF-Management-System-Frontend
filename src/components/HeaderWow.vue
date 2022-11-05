<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

      <q-avatar>
        <img src="@/assets/logo.svg" />
      </q-avatar>
      <button @click="authStore.logout()" class="btn btn-link nav-item nav-link">Logout</button>
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab to="/rooms" label="Rooms" exact />
      <q-route-tab to="/equipments" label="Equipments" exact />
    </q-tabs>
  </q-header>

  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
    <div class="q-pa-md" style="max-width: 350px">
      <q-list bordered padding>
        <q-item>
          <q-item-section>
            <q-item-label overline>OVERLINE</q-item-label>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-drawer>

</template>

<script>
import { ref } from "vue";

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
};
</script>
