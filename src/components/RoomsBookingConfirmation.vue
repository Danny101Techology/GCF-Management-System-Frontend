<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Confirm your reservation</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list>
          <q-item>
            <q-item-section>Full Name</q-item-section>
            <q-item-section side>
              <q-item-label>{{ payload.fullName }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-label>Email:</q-item-label>
            <q-item-section side>
              <q-item-label>{{ payload.email }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-label>Date start:</q-item-label>
            <q-item-section side>
              <q-item-label>{{ payload.dateStart }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-label>Date End:</q-item-label>
            <q-item-section side>
              <q-item-label>{{ payload.dateEnd }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-label>Event Type:</q-item-label>
            <q-item-section side>
              <q-item-label>{{ payload.eventType }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-label>Reserved For:</q-item-label>
            <q-item-section side>
              <q-item-label>{{ payload.reservedFor }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import store from "../store/index.js";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  onMounted,
  reactive,
} from "vue";

const route = useRoute();

const props = defineProps({
  payload: {
    type: Object,
    required: true,
  },
});

const payload = ref(props.payload);
console.log("PAYLOAD CHECK SA ROOMSCONFIRMATION", props.payload);

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

const reactivePayload = reactive(props.payload);

const filteredPayload = computed(() => {
  const filtered = {};
  for (const [key, value] of Object.entries(reactivePayload)) {
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
