<!-- <template>
  <div class="fit row wrap items-start content-start">
    <div class="col-8" style="overflow: auto;">
      <EquipmentsInfo :equipment="equipment" />
    </div>
    <div class="col-4" style="overflow: auto;">
      <EquipmentsBooking />
    </div>
  </div>
</template>
   -->

<template>
  <q-stepper
    v-model="step"
    ref="stepper"
    alternative-labels
    color="primary"
    animated
  >
    <q-step
      :name="1"
      :title="`${equipments} > ${type}`"
      :caption="`${subtype} pax`"
      icon="settings"
      :done="step > 1"
    >
      <q-splitter v-model="splitterModel" :limits="[50, 100]">
        <template v-slot:before>
          <div>
            <EquipmentsBookingCarousel :equipment="equipment" />
          </div>
        </template>

        <template v-slot:after>
          <div style="width: 100%; overflow: auto">
            <EquipmentsBookingDownload />
          </div>
        </template>
      </q-splitter>
    </q-step>
    <q-step
      :name="2"
      title="Specify your reservation details"
      icon="create_new_folder"
      :done="step > 2"
    >
      <q-splitter v-model="splitterModel" :limits="[50, 100]">
        <template v-slot:after>
          <div>
            <div class="q-pa-md">
              <q-card>
                <q-card-section>
                  <div class="text-h6">Confirm your reservation</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
              
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn
                    flat
                    label="Confirm Reservation"
                    @click="confirmReservation()"
                    v-close-popup
                  />
                  <q-btn flat label="Close" v-close-popup />
                </q-card-actions>
              </q-card>
            </div>
            <!-- <RoomsBookingConfirmation
                :payload="payload"
                @create-reservation="createRoomReservation()"
              /> -->
          </div>
        </template>

        <template v-slot:before>
          <div>
            <EquipmentsBookingUpload />
          </div>
        </template>
      </q-splitter>
    </q-step>
    <q-step :name="3" title="Create an ad" icon="add_comment">
      Try out different ad text to see what brings in the most customers, and
      learn how to enhance your ads using features like ad extensions. If you
      run into any problems with your ads, find out how to tell if they're
      running and how to resolve approval issues.
    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          @click="$refs.stepper.next()"
          color="primary"
          :label="step === 3 ? 'Finish' : 'Continue'"
        />
        <q-btn
          v-if="step > 1"
          flat
          color="primary"
          @click="$refs.stepper.previous()"
          label="Back"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import Api from "@/api/Api";

import EquipmentsBookingCarousel from "@/components/EquipmentsBookingCarousel.vue";
import EquipmentsBookingDownload from "@/components/EquipmentsBookingDownload.vue";
import EquipmentsBookingUpload from "@/components/EquipmentsBookingUpload.vue";

const equipment = ref([]);
const route = useRoute();
const equipment_id = route.params.equipment;
//Components
const step = ref(1);
const splitterModel = ref(50);

const equipments = computed(() => equipment.value.equipment);
const subtype = computed(() => equipment.value.subtype);
const type = computed(() => equipment.value.type);

function retrieveFromAPI() {
  Api.getEquipmentById(equipment_id)
    .then((response) => {
      console.log(response.data.data.attributes);
      let id = response.data.data.id;
      let attributes = response.data.data.attributes;
      let images;
      if (response.data.data.attributes.images.data) {
        images = response.data.data.attributes.images.data.map((img) => {
          let data = {
            name: img.attributes.name,
            url: `${process.env.VUE_APP_API_URI}${img.attributes.url}`,
          };
          return data;
        });
      }


      equipment.value = {
        id: id,
        equipment: attributes.equipment,
        type: attributes.equipment_type,
        subtype: attributes.equipment_subtype,
        images: images,
      };
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(() => {
  retrieveFromAPI();
});
</script>
