<template>
  <div class="q-pa-md">
    <!-- <RoomsBookingConfirmation @lazy-rules="allLazyRulesTriggered = true" /> -->
    <q-btn
      label="Reserve"
      color="primary"
      @click="reserve = true"
    />

    <q-dialog v-model="reserve">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm your reservation</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list>
            <q-item v-for="(value, key) in filteredPayload" :key="key">
              <q-item-label>{{ key }}:</q-item-label>
              <q-item-label caption>{{ value }}</q-item-label>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Confirm Reservation"
            @click="confirmReservation()"
            v-close-popup
          />
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import RoomsBookingConfirmation from './RoomsBookingConfirmation.vue';
import store from "../store/index.js";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, computed, defineProps, defineEmits, onMounted } from "vue";



const props = defineProps({
  payload: Object,
});

const lazyRules = computed(() => store.state.lazyRules);

const allLazyRulesTriggered = computed(() => store.state.allLazyRulesTriggered);

console.log("lazyRules:", lazyRules.value);
console.log("allLazyRulesTriggered:", allLazyRulesTriggered.value);

const emit = defineEmits(["createReservation"]);

const $q = useQuasar();

const confirmReservation = function () {
  emit("create-reservation");
  window.location.reload();
  $q.notify({
    message: "Room Reserved!",
    color: "teal",
  });
};

const reserve = ref(false);

const room_id = computed(() => useRoute().params);

const filteredPayload = computed(() => {
  const filtered = {};
  for (const [key, value] of Object.entries(props.payload)) {
    if (key !== "room_id") {
      filtered[key] = value;
    }
  }
  return filtered;
});

onMounted(() => {
  console.log("RoomsBookingConfirmation.vue have been mounted!");
  console.log(useRoute().params);
});
</script>
