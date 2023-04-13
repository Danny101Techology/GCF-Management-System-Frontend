<template>
  <div>
    <q-table
      title="Rooms Reservation"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      row-key="id"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      php Copy code
      <template v-slot:body-cell-schedule="props" dense>
        <q-td>
          <q-btn
            size="sm"
            color="green"
            label="Approve"
            @click="$emit(moveReservationToApproved, props.row.id)"
            dense
          />
        </q-td>
        <q-td>
          <q-btn
            size="sm"
            color="red"
            label="Cancel"
            @click="removeReservation(props.row.id)"
            dense
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";

import Api from "@/api/Api";

const props = defineProps({
  roomsreservations: Array,
});

const filter = ref("");

const columns = [
  {
    name: "fullName",
    align: "left",
    label: "Full Name",
    field: "fullName",
    sortable: true,
  },
  {
    name: "RoomCode",
    align: "left",
    label: "Room Code",
    field: "room_code",
    sortable: true,
  },
  {
    name: "reservedFor",
    align: "left",
    label: "Reservation Type",
    field: "reservedFor",
    sortable: true,
  },
  {
    name: "eventType",
    align: "left",
    label: "Event Type",
    field: "eventType",
    sortable: true,
  },
  {
    name: "dateStart",
    align: "left",
    label: "Starting Date Time",
    field: "dateStart",
    sortable: true,
    format: (val) => {
      if (!val) return "N/A";
      const date = new Date(val);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return date.toLocaleString("en-US", options);
    },
  },
  {
    name: "dateEnd",
    align: "left",
    label: "Ending Date Time",
    field: "dateEnd",
    sortable: true,
    format: (val) => {
      if (!val) return "N/A";
      const date = new Date(val);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      return date.toLocaleString("en-US", options);
    },
  },

  {
    name: "schedule",
    align: "left",
    label: "",
    field: "schedule",
  },
];

const rows = computed(() => {
  let data = props.roomsreservations.map((roomsreservation) => {
    const dateStart = roomsreservation.attributes.dateStart
      ? new Date(roomsreservation.attributes.dateStart).toLocaleString()
      : null;
    const dateEnd = roomsreservation.attributes.dateEnd
      ? new Date(roomsreservation.attributes.dateEnd).toLocaleString()
      : null;
    return {
      id: roomsreservation.id,
      fullName: roomsreservation.attributes.fullName,
      room_code: roomsreservation.attributes.room_code,
      reservedFor: roomsreservation.attributes.reservedFor,
      eventType: roomsreservation.attributes.eventType,
      dateStart: dateStart,
      dateEnd: dateEnd,
    };
  });
  console.log(data);
  return data;
});

function removeReservation(room_id) {
  Api.removeReservations(room_id);
  window.location.reload();
}

async function moveReservationToApproved(room_id) {
  await Api.approveReservation(room_id);
  props.roomsreservations = props.roomsreservations.filter(
    (r) => r.id !== room_id
  );
}

onMounted(() => {
  console.log("RoomsReservationTable.vue have been mounted!");
  console.log(props.roomsreservations);
});
</script>
