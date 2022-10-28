<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-avatar>
          <img src="@/assets/logo.svg" />
        </q-avatar>
        
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab to="{name: '/rooms}" label="Rooms" exact />
      <q-route-tab to="/equipments" label="Equipments" exact />
    </q-tabs>
  </q-header>

  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
    test
  </q-drawer>
</template>


<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>