<template>
    <div>
      <q-table
        title="Equipments Reservation"
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
    equipmentsreservations: Array,
  });
  
  const filter = ref("");
  
  const columns = [
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
  ];
  
  const rows = computed(() => {
    let data = props.equipmentsreservations.map((equipmentsreservations) => {

      return {
        equipment_names: equipmentsreservations.equipment_names,
        equipment_type: equipmentsreservations.attributes.equipment_type,
        equipment_subtype: equipmentsreservations.attributes.equipment_subtype,
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
    props.equipmentsreservations = props.equipmentsreservations.filter(
      (r) => r.id !== room_id
    );
  }
  
  onMounted(() => {
    console.log("EquipmentsReservationTable.vue have been mounted!");
    console.log(props.equipmentsreservations);
  });
  </script>
  