<template>
  <q-input
    ref="nameRef"
    color="primary"
    v-model="fullName"
    label="Full name"
    lazy-rules
    :rules="nameRules"
  >
    <template v-slot:prepend>
      <q-icon name="person" />
    </template>
  </q-input>

  <q-input color="primary" v-model="email" label="Email">
    <template v-slot:prepend>
      <q-icon name="mail" />
    </template>
  </q-input>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";

const fullName = ref();
const email = ref();

const nameRef = ref();

const nameRules = [(val) => (val && val.length > 0) || "Please type something"];

const accept = ref();

// const onSubmit = ref();
// const onReset = ref();

// onSubmit(() => {
//   nameRef.value.validate()

//   if (nameRef.value.hasError) {
//           // form has error
//   }

//   else if (accept.value !== true) {
//     q.notify({
//       color: 'negative',
//       message: 'You need to accept the license and terms first'
//     })
//   }
//   else {
//     $q.notify({
//       icon: 'done',
//       color: 'positive',
//       message: 'Submitted'
//     })
//   }
// });

// onReset(() => {
//   name.value = null

//   nameRef.value.resetValidation()
// });

onMounted(() => {
  console.log("RoomsBookingInput.vue have been mounted!");
  retrieveEventTypesFromAPI();
  retrieveReservedForFromAPI();
});
</script>
