<template>
  <div className="threatApp">
    <div className="map" id="map-parent" style="position: 'relative'">
      <svg id="live-map"></svg>
    </div>
    <div className="map-tooltip"></div>
  </div>
</template>

<script>
import ThreatMap from "./threatmap";
export default /*#__PURE__*/ {
  name: "Threatmap", // vue component name
  data() {
    return {
      counter: 5,
      initCounter: 5,
    };
  },
  props: {},
  mounted() {
    ThreatMap();
  },
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
