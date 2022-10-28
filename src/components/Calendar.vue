<template>
  <q-dialog v-model="dialog">
    <q-layout view="lhh LpR lff" container style="height: 500px" class="bg-grey-3">
      <q-page-container>
        <q-page class="pa-md">
          <q-tabs v-model="tab" class="bg-teal text-yellow">
            <q-route-tab to="/calendar" icon="event" exact />
            <q-layout
              view="lhh LpR lff"
              container
              style="height: 500px"
              class="bg-grey-3"
            >
              <q-date v-model="date" :options="optionsFn2" />
            </q-layout>
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
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      date: ref("2019/02/01"),

      optionsFn2(date) {
        const parts = date.split("/");
        return parts[2] % 2 === 0;
      },
    };
  },
};
</script>
