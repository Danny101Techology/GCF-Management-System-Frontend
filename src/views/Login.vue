<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit">
      <q-input
        filled
        v-model="email"
        label="Your email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input filled type="password" v-model="password" label="Your password" />

      <div class="q-pa-md">
        <q-btn label="Login" type="submit" color="primary" />
        <div v-if="loginFailed">Login credentials incorrect. Please try again.</div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const loginFailed = ref();

const onSubmit = function () {
  store
    .dispatch("login", {
      email: email.value,
      password: password.value,
    })
    .then((success) => {
      loginFailed.value = !success;
      router.push("/");s
      if (success) {
        window.location.reload();
      }
    });
};
</script>
