<template>
  {{store.state}}
  <q-form
    @submit="onSubmit"
  >
    <q-input
      filled
      v-model="email"
      label="Your email"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please type something']"
    />

    <q-input
      filled
      type="password"
      v-model="password"
      label="Your password"
    />

    <div>
      <q-btn label="Login" type="submit" color="primary"/>
    </div>
  </q-form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from 'vuex'

const store = useStore();

const email = ref("");
const password = ref("");

const onSubmit = function() {
  store.dispatch('login', {
    email: email.value, 
    password: password.value
  })
}

</script>