<template>
  <div class="q-pa-md">
    <!-- Search -->
    <div class="q-pa-md">
      <q-input ref="filterRef" filled v-model="filter" label="Search">
        <template v-slot:append>
          <q-icon
            v-if="filter !== ''"
            name="clear"
            class="cursor-pointer"
            @click="resetFilter"
          />
        </template>
      </q-input>
    </div>
    <!-- Tree -->
    <q-tree
      class="col-12 col-sm-6"
      :nodes="checkboxes"
      :filter="filter"
      :filter-method="myfilterMethod"
      node-key="label"
      tick-strategy="leaf"
      v-model:ticked="ticked"
      v-model:expanded="expanded"
      :node="{ render: renderNode }"
    />
    <div class="col-12 col-sm-6 q-gutter-sm">
      <div class="text-h6">Ticked</div>
      <div>
        <div v-for="tick in ticked" :key="`ticked-${tick}`">
          {{ tick }}
        </div>
      </div>
      <!-- Food Arrangements Input
      <div v-if="ticked.includes('Food Arrangements')">
        <q-input
          filled
          v-model="specialRequests"
          label="Special Requests"
          placeholder="Enter special requests"
          class="q-mt-md"
        />
        <q-input
          filled
          v-model="foodArrangement"
          label="Food Arrangements"
          placeholder="Enter food arrangement"
          class="q-mt-md"
        />
      </div> -->

      <q-separator spaced />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

// const showFoodArrangementInput = ref(false);

export default {
  setup() {
    const filter = ref("");
    const filterRef = ref(null);
    const selected = ref([]);
    const ticked = ref([]);
    const expanded = ref([
      "Things Needed",
      "Physical Arrangements / Layout (with tables and chairs)",
      "Food Arrangements",
      "Cafeteria Supplies Needed",
    ]);
    const checkboxes = [
      {
        label: "Things Needed",
        children: [
          {
            label: "A/V Equipment",
            disabled: false,
            children: [
              { label: "Projector & Screen" },
              { label: "Microphone & Speaker System" },
              { label: "TV" },
              { label: "Audio Player" },
              { label: "Video Camera" },
            ],
          },
          {
            label: "Musical Instruments",
            children: [
              { label: "Acoustic/Bass Guitar" },
              { label: "Keyboard" },
              { label: "Piano" },
              { label: "Drum Set" },
              { label: "Other (*)" },
            ],
          },
          {
            label: "Furniture",
            children: [
              { label: "Lectern" },
              { label: "White Board & Markers" },
              { label: "Cross" },
              { label: "Risers" },
              { label: "Sofa Set" },
            ],
          },
          {
            label: "Sports Equipment",
            children: [
              { label: "Electronic Score Board & Timer" },
              { label: "Badminton Net" },
              { label: "Volleyball Net" },
              { label: "Ping-pong Table & Surrounds" },
              { label: "Gym Equipment" },
            ],
          },
          {
            label: "IT Equipment",
            children: [
              { label: "Wifi Access" },
              { label: "Zoom Support" },
              { label: "Hybrid set-up" },
              { label: "Livestreaming" },
            ],
          },
          {
            label: "Maintenance Equipment",
            children: [
              { label: "Extension Cord" },
              { label: "Aircon" },
              { label: "Air-purifier" },
              { label: "Iwata Fan" },
              { label: "Ceiling fan & Exhaust fan" },
            ],
          },
        ],
      },
      {
        label: "Physical Arrangements / Layout (with tables and chairs)",
        children: [
          {
            label: "Classroom Set-up (armchairs)",
            disabled: false,
          },
          {
            label: "Classroom Set-up (tables & chairs)",
            disabled: false,
          },
          {
            label: "Classroom Set-up (boardroom)",
            disabled: false,
          },
          {
            label: "Rectangular Table Set-up (20-50pax)",
            disabled: false,
          },
          {
            label: "Round Table Set-up (20-50pax)",
            disabled: false,
          },
          {
            label: "Round Table Set-up (50-100pax)",
            disabled: false,
          },
          {
            label: "Theater Type Set-up (20-50pax)",
            disabled: false,
          },
          {
            label: "Theater Type Set-up (50-100pax)",
            disabled: false,
          },
          {
            label: "Theater Type Set-up (>200pax)",
            disabled: false,
          },
          {
            label: "Registration Set-up",
            disabled: false,
          },
        ],
      },
      {
        label: "Food Arrangements",
        children: [
          {
            label: "Packed Food",
            disabled: false,
          },
          {
            label: "Catered Buffet",
            disabled: false,
          },
          {
            label: "Pot-blessed",
            disabled: false,
          },
        ],
      },
      {
        label: "Cafeteria Supplies Needed",
        children: [
          {
            label: "Brewed Coffee",
            disabled: false,
          },
          {
            label: "Creamer",
            disabled: false,
          },
          {
            label: "Sugar",
            disabled: false,
          },
          {
            label: "Coffee Stirrer",
            disabled: false,
          },
          {
            label: "Table Napkins",
            disabled: false,
          },
          {
            label: "Percolator",
            disabled: false,
          },
          {
            label: "Coffee Maker",
            disabled: false,
          },
          {
            label: "Paper Plates",
            disabled: false,
          },
          {
            label: "Paper Cups",
            disabled: false,
          },
          {
            label: "Plastic Spoons",
            disabled: false,
          },
          {
            label: "Plastic Fork",
            disabled: false,
          },
          {
            label: "Cutlery/Breakable Tablewares",
            disabled: false,
          },
          {
            label: "Water Dispenser",
            disabled: false,
          },
        ],
      },
    ];

    watch(
      ticked,
      (newVal, oldVal) => {
        // check if the parent node is ticked
        const parentTicked = checkboxes.some(
          (node) => node.label === "Things Needed" && node.checked
        );

        // check if the parent node or any of its children is ticked
        const isParentOrChildTicked = checkboxes.some((node) => {
          if (node.label === "Things Needed") {
            return node.checked;
          }
          const parent = checkboxes.find(
            (parent) => parent.label === "Things Needed"
          );
          const parentChildren = parent.children || [];
          return parentChildren.some(
            (child) => child.label === node.label && child.checked
          );
        });

        // if the parent node is ticked, tick all its children
        if (parentTicked) {
          const parent = checkboxes.find(
            (node) => node.label === "Things Needed"
          );
          parent.children.forEach((child) => (child.checked = true));
        }

        // if a child node is ticked, tick the parent node
        if (isParentOrChildTicked) {
          const parent = checkboxes.find(
            (node) => node.label === "Things Needed"
          );
          parent.checked = true;
        }

        // do something when ticked changes
        console.log("ticked changed from", oldVal, "to", newVal);
      },
      { deep: true, immediate: true }
    );

    const resetFilter = () => {
      filter.value = "";
      filterRef.value.focus();
    };

    const myfilterMethod = (node, filter) => {
      // filter nodes based on their label
      const label = node.label.toLowerCase();
      return label.includes(filter.toLowerCase());
    };

    const renderNode = (node) => {
      // render nodes with checkboxes
      return <q-checkbox v-model={node.checked} label={node.label} />;
    };

    const updatedThingsNeeded = (newThingsNeeded) => {
      ticked.value = newThingsNeeded;
    };

    return {
      filter,
      filterRef,
      selected,
      ticked,
      expanded,
      checkboxes,
      resetFilter,
      myfilterMethod,
      renderNode,
      updatedThingsNeeded,
    };
  },
};
</script>
