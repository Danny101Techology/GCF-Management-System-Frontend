<template>
  <div>
    <q-table
      title="Equipments Reservations"
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
    </q-table>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";

import Api from "@/api/Api";

const props = defineProps({
  equipmentsreservations: Array,
});

const filter = ref("");

const columns = [
  {
    name: "fullName",
    align: "left",
    label: "Borrower's Name",
    field: "fullName",
    sortable: true,
  },
  {
    name: "equipment_name",
    align: "left",
    label: "Equipment Name",
    field: "equipment_name",
    sortable: true,
  },
  {
    name: "equipment_type",
    align: "left",
    label: "Equipment Type",
    field: "equipment_type",
    sortable: true,
  },
  {
    name: "equipment_subtype",
    align: "left",
    label: "Equipment Subtype",
    field: "equipment_subtype",
    sortable: true,
  },
  {
    name: "date_borrowed",
    align: "left",
    label: "Date Borrowed",
    field: "date_borrowed",
    sortable: true,
    format: (val) => {
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
    name: "date_returned",
    align: "left",
    label: "Date Returned",
    field: "date_returned",
    sortable: true,
    format: (val) => {
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
  let data = props.equipmentsreservations.map((equipmentsreservations) => {
    const date_borrowed = equipmentsreservations.attributes.dateStart
      ? new Date(equipmentsreservations.attributes.dateStart).toLocaleString()
      : null;
    const date_returned = equipmentsreservations.attributes.dateEnd
      ? new Date(equipmentsreservations.attributes.dateEnd).toLocaleString()
      : null;
    return {
      id: equipmentsreservations.id,
      fullName: equipmentsreservations.fullName,
      equipment_name: equipmentsreservations.attributes.equipment_name,
      equipment_type: equipmentsreservations.attributes.equipment_type,
      equipment_subtype: equipmentsreservations.attributes.equipment_subtype,
      date_borrowed: date_borrowed,
      date_returned: date_returned,
    };
  });
  console.log(data);
  return data;
});

onMounted(() => {
  console.log("EquipmentsReservationsTable.vue have been mounted!");
  console.log(props.equipmentsreservations);
});
</script>
