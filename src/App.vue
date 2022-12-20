<template>
 <q-layout view="hHh lpR fFf">
    <PageLoader />
    <HeaderWow />

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
 </q-layout>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import PageLoader from "@/components/PageLoader.vue";
import HeaderWow from "@/components/HeaderWow.vue";


export default {
  setup () {
    return {
      slide: ref(1),
      autoplay: ref(true)
    }
  },
  components: { PageLoader, HeaderWow }



    


  }

</script>
