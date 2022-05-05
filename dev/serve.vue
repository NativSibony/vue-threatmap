<script>
import Vue from "vue";
// import Threatmap from "@/threatmap.vue";
import Threatmap from "vue-test-threatmap";

export default Vue.extend({
  name: "ServeDev",
  components: {
    Threatmap,
  },
});
</script>

<template>
  <div id="app">
    <threatmap />
  </div>
</template>
