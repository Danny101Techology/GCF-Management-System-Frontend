<template>
    <div class="q-pa-md">
      <q-card class="my-card" flat bordered>
        <q-item>
          <q-item-section>
            <q-item-label>{{ equipment }} > {{ type }}</q-item-label>
            <q-item-label caption>Equipment subtype: {{ subtype }} </q-item-label>
          </q-item-section>
        </q-item>
  
        <q-separator />
  
        <q-card-section vertical>
          <div>
            <q-carousel
              animated
              v-model="slide"
              navigation
              infinite  
              :autoplay="autoplay"
              arrows
              transition-prev="slide-right"
              transition-next="slide-left"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
            >
              <template v-for="img in images">
                <q-carousel-slide
                  :name="img.name"
                  :img-src="img.url"
                />
              </template>
            </q-carousel>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  <style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 950px
  </style>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  
  const slide = ref(1);
  const autoplay = ref(true);
  const image = ref();
  
  const reserve = ref(false);
  
  const props = defineProps({
    equipment: Object,
  });

  const equipment = computed(() => props.equipment);
  const subtype = computed(() => props.equipmentsubtype);
  const type = computed(() => props.equipmenttype);
  const images = computed(() => props.images);
  
  onMounted(() => {
    console.log("EquipmentsDialog.vue have been mounted!");
    console.log(props.equipment);
  });
  </script>
  