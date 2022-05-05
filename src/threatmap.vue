<template>
  <div class="threatApp">
    <div class="map" id="map-parent" style="position: 'relative'">
      <svg id="live-map"></svg>
    </div>
    <div class="map-tooltip"></div>
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
/* Threat Map ToolTip */
.map-tooltip {
  display: none;
  background: #1e214262;
  margin-left: 15px;
  padding: 3px;
  padding-bottom: 6px;
  font-family: "Segoe UI", Tahoma, Verdana, sans-serif;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  color: #d6e5f8;
  position: absolute;
  width: auto;
  border-style: solid;
  border-width: 1.5px;
  border-radius: 2px;
  box-shadow: 0px 0px 0.1rem, 0px 0px 0.2rem;
}
</style>
