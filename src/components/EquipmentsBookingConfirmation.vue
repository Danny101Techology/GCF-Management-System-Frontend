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
  
          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              label="Open another dialog"
              @click="secondDialog = true"
            />
            <q-btn flat label="Close" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { ref, computed, onMounted } from "vue";
  
  const reserve = ref(false);
  
  const payload = computed(() => {
    return {
      equipment_id: useRoute().params.name,
      fullName: fullName.value,
      email: email.value,
      dateStart: dateStart.value,
      dateEnd: dateEnd.value,
      eventType: eventType.value,
      reservedFor: reservedFor.value,
    };
  });
  
  
  
  
  onMounted(() => {
    console.log("EquipmentsBookingConfirmation.vue have been mounted!");
  });
  </script>