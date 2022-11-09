<template>
  <q-table title="Rooms" :rows="rows" :columns="columns" :filter="filter" row-key="id">
    <template v-slot:top-right>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-schedule dense>
      <q-btn
        size="sm"
        color="green"
        round
        dense
        @click="props.expand = !props.expand"
        :icon="props.expand ? 'remove' : 'add'"
      />
      <q-btn size="sm" color="green" round dense icon="event" />
    </template>
  </q-table>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  rooms: Array,
});
const filter = ref("");
const columns = [
  {
    name: "expand",
    align: "",
    label: "",
    field: "expand",
  },
  {
    name: "schedule",
    align: "left",
    label: "",
    field: "schedule",
  },
  {
    name: "site",
    align: "left",
    label: "Site",
    field: "site",
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
    name: "Capacity",
    align: "left",
    label: "Capacity",
    field: "capacity",
    sortable: true,
  },
  {
    name: "Available",
    align: "left",
    label: "Available",
    field: "available",
    sortable: true,
  },
];

const rows = computed(() => {
  let data = props.rooms.map((room) => {
    return {
      id: room.id,
      room_code: room.attributes.room_code,
      available: room.attributes.available,
      capacity: room.attributes.capacity,
      site: room.attributes.site,
    };
  });
  console.log(data);
  return data;
});

onMounted(() => {
  console.log("Rooms.vue have been mounted!");
  console.log(props.rooms);
});
</script>
