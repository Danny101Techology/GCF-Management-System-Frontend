<template>
  <q-dialog
    v-model="secondDialog"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Confirm Reservation</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ props.date }}
        {{ props.time }}
        {{ props.row.name }}
        {{ props.row.RoomCode }}
        {{ props.row.RoomName }}
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
