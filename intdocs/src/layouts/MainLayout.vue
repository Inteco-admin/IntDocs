<template>
  <q-layout class="bg-grey-1">
    <q-header style="background: #24292e">
      <main-navbar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MainNavbar from "../components/Navbar/MainNavbar.vue";
export default {
  components: {
    MainNavbar,
  },
};
</script>