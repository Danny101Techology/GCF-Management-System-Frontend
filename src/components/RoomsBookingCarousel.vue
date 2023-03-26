<template>
    <q-sticky position="top">
      <div class="q-pa-md">
        <template v-if="loading">
          <!-- Skeleton loading effect -->
          <q-skeleton class="my-card" height="300px" />
        </template>
        <template v-else>
          <!-- Actual content -->
          <q-card class="my-card" flat bordered>
            <!-- ... card content ... -->
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
                <q-carousel-slide :name="img.name" :img-src="img.url" />
              </template>
            </q-carousel>
          </q-card>
        </template>
      </div>
    </q-sticky>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const slide = ref(1);
const autoplay = ref(true);
const image = ref();
const loading = ref(true);

const reserve = ref(false);

const props = defineProps({
  room: Object,
});

const name = computed(() => props.room.name);
const capacity = computed(() => props.room.capacity);
const site = computed(() => props.room.site);
const available = computed(() => props.room.available);
const images = computed(() => props.room.images);

onMounted(() => {
  console.log("RoomsDialog.vue have been mounted!");
  console.log(props.room);
  setTimeout(() => {
    loading.value = false;
  }, 5000);
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 950px
</style>
