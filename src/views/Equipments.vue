<template>
  <div class="q-pa-md">
    <q-table title="Treats" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              This is expand slot for row above: {{ props.row.name }}.
              
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "calories",
    align: "left",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
  },
];

export default {
  setup() {
    return {
      columns,
      rows,
    };
  },
};
</script>
