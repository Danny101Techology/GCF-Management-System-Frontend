<template>
  <div class="q-pa-md">
    <q-btn label="Reserve" color="primary" @click="reserve = true" />

    <q-dialog v-model="reserve">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm your reservation</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <ul>
            <li v-for="room in formattedPayload" :key="room.id">{{ room }}</li>
          </ul>
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
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { ref, computed, onMounted, defineProps } from "vue";

const props = defineProps({
  payload: Object,
});

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

const formattedPayload = computed(() => {
  return this.payload.map(room => `Room ${room.id} - ${room.name} - ${room.description}`);
});

onMounted(() => {
  console.log("RoomsBookingConfirmation.vue have been mounted!");
  console.log(useRoute().params);
  console.log(payload);
});
</script>
