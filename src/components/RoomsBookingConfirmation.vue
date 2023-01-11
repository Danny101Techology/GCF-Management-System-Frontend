<template>
  <div class="q-pa-md">
    <q-btn label="Reserve" color="primary" @click="reserve = true" />

    <q-dialog v-model="reserve">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm your reservation</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ payload }}
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ room_id }}
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            label="Confirm Reservation"
            @click="createRoomsReservations()"
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
import { useRoute } from 'vue-router';
import { ref, computed, onMounted } from "vue";

const $q = useQuasar();
function createRoomsReservations() {
  let reservation = {
    room_id: useRoute().params.name,
    fullName: fullName.value,
    email: email.value,
    dateStart: dateStart.value,
    dateEnd: dateEnd.value,
    eventType: eventType.value,
    reservedFor: reservedFor.value,
  }
  $q.notify({
    message: "Room Reserved!",
    color: "teal",
  });
  Api.createRoomsReservations(reservation)
}; 

// function secondDialog() {
//   $q.notify({
//     message: "Room Reserved!",
//     color: "teal",
//   });
// };

const reserve = ref(false);

const room_id = computed(() => useRoute().params)

const props = defineProps({
  payload: Object,
});


onMounted(() => {
  console.log("RoomsBookingConfirmation.vue have been mounted!");
  console.log(useRoute().params)
});
</script>