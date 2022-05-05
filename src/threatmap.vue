<template>
  <div class="threatmap">
    {{ counter }}
  </div>
</template>

<script>
export default /*#__PURE__*/ {
  name: "Threatmap", // vue component name
  data() {
    return {
      counter: 5,
      initCounter: 5,
    };
  },
  props: {},
  created: {},
};
</script>

<style scoped>
.threatmap {
  display: block;
  width: 400px;
  margin: 25px auto;
  border: 1px solid #ccc;
  background: #eaeaea;
  text-align: center;
  padding: 25px;
}
.threatmap p {
  margin: 0 0 1em;
}
</style>
