<template>
  {{ roomsapproved }} }}
  <q-table
    title="Approved Reservations"
    :rows="roomsapproved"
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
  </q-table>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, defineProps, computed, onMounted } from "vue";


const props = defineProps({
  roomsapproved: Array,
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
];

const rows = computed(() => {
  let data = props.roomsapproveds.map((roomsapproveds) => {
    const dateStart = roomsapproveds.attributes.dateStart
      ? new Date(roomsapproveds.attributes.dateStart).toLocaleString()
      : null;
    const dateEnd = roomsapproveds.attributes.dateEnd
      ? new Date(roomsapproveds.attributes.dateEnd).toLocaleString()
      : null;
    return {
      id: roomsapproveds.id,
      fullName: roomsapproveds.attributes.fullName,
      room_code: roomsapproveds.attributes.room_code,
      reservedFor: roomsapproveds.attributes.reservedFor,
      eventType: roomsapproveds.attributes.eventType,
      dateStart: dateStart,
      dateEnd: dateEnd,
    };
  });
  console.log(data);
  return data;
});

onMounted(() => {
  console.log("RoomsApprovedTable.vue has been mounted!");
  console.log(props.roomsapproved);
});
</script>
