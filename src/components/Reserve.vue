<template>
  <div class="q-pa-md">
    <q-btn color="teal" label="Reserve" @click="dialog = true" />

    <q-dialog v-model="dialog">
      <q-layout
        view="lhh LpR lff"
        container
        style="height: 500px"
        class="bg-grey-3"
      >
        <!--RESERVATION TAB-->
        <q-page-container>
          <q-page class="pa-md">
            <q-tabs v-model="tab" class="bg-teal text-yellow">
              <q-route-tab to="/calendar" icon="event" exact />
              <q-route-tab name="alarms" icon="alarm" exact />
              <q-route-tab name="movies" icon="movie" exact />
            </q-tabs>
          </q-page>

          <q-page-scroller position="bottom">
            <q-btn fab icon="keyboard_arrow_up" color="red" />
          </q-page-scroller>
        </q-page-container>
      </q-layout>
    </q-dialog>
  </div>
</template>

