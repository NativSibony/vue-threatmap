import * as d3 from "d3/build/d3";
import * as pr from "d3-geo-projection";
import { getNameFromCode } from "./util";
import $ from "jquery";

const ThreatMap = () => {
  //   document.getElementById("live-map").innerHTML = "";
  // For Quick Switching
  const bend = 0.6; // arch bend
  const enableGlow = false; // glow on arch animation
  const runApp = true; // run app animation
  const duration = 400; // speed control
  const arcDuration = duration * 1.8; //duration for each starting arc
  const mrkrLblDuration = arcDuration * 1.5; //duration for each ending arc, marker & label
  // const url = calls.apiv6 + "/gui/threatmap";
  const url =
    "http://apiv6-test-lb-2146777017.us-east-1.elb.amazonaws.com/gui/threatmap";
  // Set Tooltip
  const tip = document.querySelector(".map-tooltip");

  // Map Data & Coloring array
  let parent = document.getElementById("map-parent"),
    dimentions = parent.getClientRects(),
    width = dimentions[0].width / 1.2,
    height = dimentions[0].width / 2.6,
    // worldJson = "../static/world.json",
    worldPopulation = "../csv/world_population.csv",
    colorScheme = [
      ["#4387B1", "#3E7CA3", "#387194", "#326585", "#2D5A76", "#274F68"],
      ["#7C99B6", "#6F8FAE", "#6285A7", "#587A9D", "#517090", "#496683"],
      ["#7199AD", "#6490A6", "#59859B", "#527A8E", "#4A6F82", "#436475"],
      ["#759DA9", "#6894A1", "#5E8A97", "#567F8A", "#4F737D", "#476871"],
      ["#004d85", "#004475", "#00406e", "#004c82", "#00497d", "#004576"],
      ["#004576"],
    ],
    /*
     * "FI"/"FIN":Finance,
     * "GO":Government,
     * "EN":Enterprise,
     * "CI":Critical Infrastructure,
     * "TE": Telecom,
     * "EG": Energy
     * "ST": Startups
     * "HC": Health Care
     * */
    setup = {
      threats: {
        FIN: {
          strokeColor: "#FF885B",
          strokeWidth: 2.4,
        },
        FI: {
          strokeColor: "#FF885B",
          strokeWidth: 2.4,
        },
        GO: {
          strokeColor: "#D9FF1B",
          strokeWidth: 2.4,
        },
        EN: {
          strokeColor: "#2DE5B2",
          strokeWidth: 2.4,
        },
        CI: {
          strokeColor: "#57D4DB",
          strokeWidth: 2.4,
        },
        TE: {
          strokeColor: "#FF885B",
          strokeWidth: 2.4,
        },
        EG: {
          strokeColor: "#D9FF1B",
          strokeWidth: 2.4,
        },
        HC: {
          strokeColor: "#EFBF9A",
          strokeWidth: 2.4,
        },
        ST: {
          strokeColor: "#EFBF9A",
          strokeWidth: 2.4,
        },
        MN: {
          strokeColor: "#EFBF9A",
          strokeWidth: 2.4,
        },
        BA: {
          strokeColor: "#2DE5B2",
          strokeWidth: 2.4,
        },
        GE: {
          strokeColor: "#d08bda",
          strokeWidth: 2.4,
        },
      },
    },
    backUpData = {
      status: 1,
      ts: "2021-03-16 13:25:38",
      data: [
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:25:35.632086:0",
        "US 47.5287 -121.8254 DE 51.165691 10.451526 FI 2021-03-16 13:25:35.669927:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:35.672805:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:25:35.694437:0",
        "DE 50.1167 8.6833 FR 46.227638 2.213749 GO 2021-03-16 13:25:35.696705:0",
        "TR 41.0214 28.9684 FR 46.227638 2.213749 TE 2021-03-16 13:25:35.717911:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:35.766303:0",
        "NP 27.7167 85.3167 FR 46.227638 2.213749 GO 2021-03-16 13:25:35.772592:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:35.783538:0",
        "GB 51.4964 -0.1224 IN 20.593684 78.96288 TE 2021-03-16 13:25:35.805619:0",
        "CN 36.6683 116.9972 DE 51.165691 10.451526 FI 2021-03-16 13:25:35.812716:0",
        "BG 42.6833 23.3167 DE 51.165691 10.451526 FI 2021-03-16 13:25:35.824379:0",
        "RU 59.8944 30.2642 FR 46.227638 2.213749 TE 2021-03-16 13:25:35.857429:0",
        "US 47.6145 -122.348 DE 51.165691 10.451526 FI 2021-03-16 13:25:35.871936:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:35.927225:0",
        "RU 59.8944 30.2642 FR 46.227638 2.213749 TE 2021-03-16 13:25:35.927909:0",
        "CN 23.0333 113.7167 DE 51.165691 10.451526 FI 2021-03-16 13:25:35.936646:0",
        "KR 37.5111 126.9743 DE 51.165691 10.451526 FI 2021-03-16 13:25:35.937166:0",
        "US 40.8875 -73.2501 FR 46.227638 2.213749 GO 2021-03-16 13:25:35.954948:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:25:35.964656:0",
        "KR 37.4536 126.7317 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.016819:0",
        "US 30.1438 -81.5401 IN 20.593684 78.96288 GO 2021-03-16 13:25:36.062421:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.068402:0",
        "MY 2.5 112.5 IN 20.593684 78.96288 GO 2021-03-16 13:25:36.068799:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.081979:0",
        "RU 59.8944 30.2642 FR 46.227638 2.213749 GO 2021-03-16 13:25:36.088004:0",
        "US 32.8731 -96.7459 FR 46.227638 2.213749 GO 2021-03-16 13:25:36.088660:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 TE 2021-03-16 13:25:36.115487:0",
        "US 42.0166 -71.2231 IN 20.593684 78.96288 GO 2021-03-16 13:25:36.223517:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.231895:0",
        "US 47.6145 -122.348 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.234852:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.270292:0",
        "IR 36.6736 48.4787 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.275123:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:25:36.281793:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:25:36.297703:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:25:36.299922:0",
        "US 41.5159 -81.6815 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.311921:0",
        "RU 59.8944 30.2642 FR 46.227638 2.213749 TE 2021-03-16 13:25:36.356079:0",
        "HK 22.291 114.15 IN 20.593684 78.96288 GO 2021-03-16 13:25:36.379618:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.397738:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.397773:0",
        "CA 45.504 -73.5747 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.409724:0",
        "ID -6.1744 106.8294 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.412623:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:25:36.422929:0",
        "US 40.7584 -73.9794 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.441292:0",
        "CN 31.0456 121.3997 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.465392:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.520077:0",
        "RU 59.8944 30.2642 FR 46.227638 2.213749 GO 2021-03-16 13:25:36.533486:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.534953:0",
        "US 37.0448 -122.1021 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.547915:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.548078:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.548653:0",
        "CA 43.6555 -79.3626 IN 20.593684 78.96288 GO 2021-03-16 13:25:36.572187:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.575125:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.637664:0",
        "CN 36.6683 116.9972 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.669788:0",
        "CN 39.9289 116.3883 FR 46.227638 2.213749 TE 2021-03-16 13:25:36.669797:0",
        "US 42.7305 -71.4958 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.670000:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:25:36.683828:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.697880:0",
        "CA 45.504 -73.5747 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.760941:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.772619:0",
        "CN 28.9594 118.8686 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.809498:0",
        "RU 59.8944 30.2642 FR 46.227638 2.213749 GO 2021-03-16 13:25:36.812942:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.814895:0",
        "CN 22.8167 108.3167 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.840570:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.846309:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.887401:0",
        "JP 35.6593 139.7054 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.890494:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.892284:0",
        "RU 59.8944 30.2642 FR 46.227638 2.213749 GO 2021-03-16 13:25:36.892377:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:25:36.895170:0",
        "US 39.1068 -94.566 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.931643:0",
        "BR -23.2667 -47.3167 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.984856:0",
        "US 42.2734 -83.7133 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.989244:0",
        "IT 45.4667 9.2 DE 51.165691 10.451526 FI 2021-03-16 13:25:36.992287:0",
        "BR -26.9833 -48.6333 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.025834:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.071905:0",
        "NL 52.857 6.3185 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.075048:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.098300:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.104598:0",
        "US 42.2734 -83.7133 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.107404:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:25:37.111737:0",
        "IN 12.9833 77.5833 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.171496:0",
        "RU 55.7485 37.6184 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.195377:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.225657:0",
        "GB 51.4964 -0.1224 IN 20.593684 78.96288 GO 2021-03-16 13:25:37.267161:0",
        "CN 36.6683 116.9972 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.269367:0",
        "US 41.1306 -85.1289 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.277808:0",
        "RU 59.8944 30.2642 FR 46.227638 2.213749 GO 2021-03-16 13:25:37.281457:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.364968:0",
        "US 40.5525 -74.2915 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.815217:0",
        "US 40.7308 -73.9975 DE 51.165691 10.451526 FI 2021-03-16 13:25:37.866459:0",
        "CN 41.7922 123.4328 DE 51.165691 10.451526 FI 2021-03-16 13:25:38.075652:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:38.110883:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:38.113333:0",
        "HK 22.25 114.1667 DE 51.165691 10.451526 FI 2021-03-16 13:25:38.124355:0",
        "MY 3.0757 101.6198 DE 51.165691 10.451526 FI 2021-03-16 13:25:38.141225:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:25:38.164712:0",
        "CA 45.504 -73.5747 IN 20.593684 78.96288 TE 2021-03-16 13:25:38.164942:0",
        "AR -24.2028 -65.175 IN 20.593684 78.96288 TE 2021-03-16 13:25:38.176138:0",
        "GB 51.4964 -0.1224 DE 51.165691 10.451526 FI 2021-03-16 13:32:50.317778:0",
        "US 40.7308 -73.9975 DE 51.165691 10.451526 FI 2021-03-16 13:32:50.341711:0",
        "KR 37.5111 126.9743 DE 51.165691 10.451526 FI 2021-03-16 13:32:50.482434:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:50.543007:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:32:50.566814:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:32:50.645346:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:32:50.669307:0",
        "CN 39.9289 116.3883 FR 46.227638 2.213749 GO 2021-03-16 13:32:50.706890:0",
        "US 40.7214 -74.0052 DE 51.165691 10.451526 FI 2021-03-16 13:32:50.729832:0",
        "US 34.0544 -118.244 FR 46.227638 2.213749 GO 2021-03-16 13:32:50.906435:0",
        "CN 31.0456 121.3997 IN 20.593684 78.96288 GO 2021-03-16 13:32:50.892527:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 TE 2021-03-16 13:32:50.971308:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 TE 2021-03-16 13:32:50.994289:0",
        "CN 39.9289 116.3883 IN 20.593684 78.96288 GO 2021-03-16 13:32:51.058896:0",
        "US 30.1438 -81.5401 FR 46.227638 2.213749 GO 2021-03-16 13:32:51.075936:0",
        "CA 43.6555 -79.3626 IN 20.593684 78.96288 GO 2021-03-16 13:32:51.078502:0",
        "GB 51.9167 -0.2167 IN 20.593684 78.96288 GO 2021-03-16 13:32:51.098412:0",
        "CN 39.9289 116.3883 FR 46.227638 2.213749 GO 2021-03-16 13:32:51.131937:0",
        "BR -22.4333 -45.45 DE 51.165691 10.451526 FI 2021-03-16 13:32:51.206510:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:51.188506:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:32:51.268367:0",
        "IN 15.8333 78.05 DE 51.165691 10.451526 FI 2021-03-16 13:32:51.348585:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:51.451354:0",
        "EE 59.0 26.0 DE 51.165691 10.451526 FI 2021-03-16 13:32:51.510123:0",
        "US 42.5384 -71.4853 IN 20.593684 78.96288 GO 2021-03-16 13:32:51.733492:0",
        "TH 13.7594 100.4889 DE 51.165691 10.451526 FI 2021-03-16 13:32:51.775898:0",
        "KR 37.5111 126.9743 DE 51.165691 10.451526 FI 2021-03-16 13:32:51.816645:0",
        "US 41.3832 -89.1461 DE 51.165691 10.451526 FI 2021-03-16 13:32:51.830397:0",
        "US 40.7214 -74.0052 DE 51.165691 10.451526 FI 2021-03-16 13:32:51.830317:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:51.849951:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:32:51.855876:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:52.872764:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:52.987518:0",
        "MY 3.0833 101.5333 DE 51.165691 10.451526 FI 2021-03-16 13:32:54.039255:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:54.076955:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:54.058845:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:54.097513:0",
        "US 47.6344 -122.3422 DE 51.165691 10.451526 FI 2021-03-16 13:32:54.113623:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:32:54.117973:0",
        "US 47.6344 -122.3422 DE 51.165691 10.451526 FI 2021-03-16 13:32:54.163386:0",
        "RU 55.7679 49.1631 IN 20.593684 78.96288 GO 2021-03-16 13:32:54.797115:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:54.846402:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:54.847944:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:55.474201:0",
        "CN 39.9289 116.3883 FR 46.227638 2.213749 GO 2021-03-16 13:32:55.495509:0",
        "US 39.772 -89.6859 DE 51.165691 10.451526 FI 2021-03-16 13:32:55.514239:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:32:55.515949:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:32:55.534256:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:55.537434:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:56.113126:0",
        "GB 51.9167 -0.2167 IN 20.593684 78.96288 GO 2021-03-16 13:32:56.151486:0",
        "IN 12.9833 77.5833 DE 51.165691 10.451526 FI 2021-03-16 13:32:56.169748:0",
        "RU 59.8944 30.2642 FR 46.227638 2.213749 GO 2021-03-16 13:32:56.169780:0",
        "RU 52.6186 39.5689 IN 20.593684 78.96288 GO 2021-03-16 13:32:56.191330:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:56.436912:0",
        "CN 39.9289 116.3883 IN 20.593684 78.96288 GO 2021-03-16 13:32:56.496980:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:56.514846:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:56.540658:0",
        "DE 50.1167 8.6833 FR 46.227638 2.213749 GO 2021-03-16 13:32:56.739319:0",
        "TR 39.923 32.8378 IN 20.593684 78.96288 GO 2021-03-16 13:32:56.774033:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:56.778139:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:32:56.778390:0",
        "KR 35.2281 128.6811 DE 51.165691 10.451526 FI 2021-03-16 13:32:56.899752:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:32:57.192319:0",
        "RU 59.8944 30.2642 FR 46.227638 2.213749 TE 2021-03-16 13:32:57.210618:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:57.233546:0",
        "NL 52.2964 4.9541 DE 51.165691 10.451526 FI 2021-03-16 13:32:57.234554:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:57.233848:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:32:57.252778:0",
        "SG 1.2855 103.8565 DE 51.165691 10.451526 FI 2021-03-16 13:32:57.274695:0",
        "CA 45.504 -73.5747 IN 20.593684 78.96288 TE 2021-03-16 13:32:57.330586:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:57.534604:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:57.573176:0",
        "HU 47.5 19.0833 IN 20.593684 78.96288 TE 2021-03-16 13:32:57.591648:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:57.591781:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:32:57.633580:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:32:57.633974:0",
        "KR 37.5111 126.9743 DE 51.165691 10.451526 FI 2021-03-16 13:32:57.708569:0",
        "BR -19.9553 -43.8988 DE 51.165691 10.451526 FI 2021-03-16 13:32:57.822218:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:32:57.942797:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:32:58.044999:0",
        "US 40.7308 -73.9975 DE 51.165691 10.451526 FI 2021-03-16 13:32:58.106950:0",
        "CN 39.9289 116.3883 IN 20.593684 78.96288 GO 2021-03-16 13:32:58.129069:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:58.167939:0",
        "RU 59.8944 30.2642 IN 20.593684 78.96288 GO 2021-03-16 13:32:58.190079:0",
        "GB 51.9167 -0.2167 IN 20.593684 78.96288 GO 2021-03-16 13:32:58.230274:0",
        "RU 59.8944 30.2642 FR 46.227638 2.213749 TE 2021-03-16 13:32:58.373179:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:58.394512:0",
        "IN 15.8333 78.05 DE 51.165691 10.451526 FI 2021-03-16 13:32:58.454107:0",
        "CN 39.9289 116.3883 DE 51.165691 10.451526 FI 2021-03-16 13:32:58.455438:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:58.493348:0",
        "AL 41.3275 19.8189 DE 51.165691 10.451526 FI 2021-03-16 13:32:58.615706:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:58.726806:0",
        "RU 59.8944 30.2642 DE 51.165691 10.451526 FI 2021-03-16 13:32:58.728628:0",
        "US 47.5287 -121.8254 IN 20.593684 78.96288 TE 2021-03-16 13:32:58.806390:0",
        "RU 52.6186 39.5689 IN 20.593684 78.96288 GO 2021-03-16 13:32:58.806792:0",
        "US 37.0448 -122.1021 IN 20.593684 78.96288 GO 2021-03-16 13:32:58.891402:0",
        "CA 43.745 -79.359 DE 51.165691 10.451526 FI 2021-03-16 13:32:58.904549:0",
        "GB 51.4964 -0.1224 DE 51.165691 10.451526 FI 2021-03-16 13:32:58.944204:0",
        "CN 39.9289 116.3883 IN 20.593684 78.96288 GO 2021-03-16 13:32:59.084568:0",
        "NL 51.989 4.5033 DE 51.165691 10.451526 FI 2021-03-16 13:32:59.089487:0",
      ],
    };

  // SVG & Defs
  let svg = d3
    .select("#live-map")
    .attr("viewBox", "0 0 " + width + " " + height);
  let defs = svg.append("svg:defs");

  // Data Holder & Color Scale
  let data = d3.map(); //data holder for population coloring
  let colorScale = d3
    .scaleThreshold()
    .domain([1, 6, 11, 26, 101, 1001])
    .range(colorScheme[0]); //pick color scheme out of an array (if no pattern supplied already)

  // Map and projection
  let projection = pr
    .geoTimes()
    .scale(width / 1.7 / Math.PI)
    .translate([width / 2.1, height / 1.6]);
  let path = d3.geoPath().projection(projection);

  // Initialized defs for svg extra design
  const initDefs = () => {
    defs
      .append("pattern")
      .attr("id", "target_GE")
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "25px")
      .attr("width", "25px")
      .attr("xlink:href", "/svg/target_GE.svg");
    defs
      .append("pattern")
      .attr("id", "target_CI")
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "25px")
      .attr("width", "25px")
      .attr("xlink:href", "/svg/target_CI.svg");
    defs
      .append("pattern")
      .attr("id", "target_ST")
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "25px")
      .attr("width", "25px")
      .attr("xlink:href", "/svg/target_ST.svg");
    defs
      .append("pattern")
      .attr("id", "target_EG")
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "25px")
      .attr("width", "25px")
      .attr("xlink:href", "/svg/target_EG.svg");
    defs
      .append("pattern")
      .attr("id", "target_EN")
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "25px")
      .attr("width", "25px")
      .attr("xlink:href", "/svg/target_EN.svg");
    defs
      .append("pattern")
      .attr("id", "target_FIN")
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "25px")
      .attr("width", "25px")
      .attr("xlink:href", "/svg/target_FIN.svg");
    defs
      .append("pattern")
      .attr("id", "target_GO")
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "25px")
      .attr("width", "25px")
      .attr("xlink:href", "/svg/target_GO.svg");
    defs
      .append("pattern")
      .attr("id", "target_TE")
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "25px")
      .attr("width", "25px")
      .attr("xlink:href", "/svg/target_TE.svg");
    defs
      .append("pattern")
      .attr("id", "target_FI")
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "25px")
      .attr("width", "25px")
      .attr("xlink:href", "/svg/target_FI.svg");
    defs
      .append("pattern")
      .attr("id", "target_HC")
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "25px")
      .attr("width", "25px")
      .attr("xlink:href", "/svg/target_HC.svg");
    defs
      .append("pattern")
      .attr("id", "target_MN")
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "25px")
      .attr("width", "25px")
      .attr("xlink:href", "/svg/target_MN.svg");
    defs
      .append("pattern")
      .attr("id", "target_BA")
      .attr("class", "svg-image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "1")
      .attr("width", "1")
      .append("image")
      .attr("x", "0")
      .attr("y", "0")
      .attr("height", "25px")
      .attr("width", "25px")
      .attr("xlink:href", "/svg/target_BA.svg");
    defs
      .append("pattern")
      .attr("id", "hash")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", 10)
      .attr("height", 10)
      .append("rect")
      .attr("width", "2")
      .attr("height", "2")
      .attr("fill", "#738896")
      .attr("opacity", "0.2")
      .attr("transform", "translate(0,0)");
  };

  // When map finish load then arch lines
  const ready = (error, map) => {
    if (error) throw error;

    initDefs();

    // Enable outer glow
    enableGlow && createGlows();

    // Draw map
    drawMap(map);

    //  single instance of arch container
    window.archContainer = svg.append("svg").attr("class", "arch-container");

    // Start animation application
    runApp && window.requestAnimationFrame(startApp);
  };

  const parseData = (threatData) => {
    let threats = threatData.data;
    let json = [],
      splitStr;
    for (let i = 0; i < threats.length; i++) {
      splitStr = threats[i].split(" ");
      json.push({
        origin: {
          code: splitStr[0].toUpperCase(),
          name: getNameFromCode(splitStr[0]),
          coordinates: [splitStr[2], splitStr[1]],
        },
        destination: {
          code: splitStr[3].toUpperCase(),
          name: getNameFromCode(splitStr[3]),
          coordinates: [splitStr[5], splitStr[4]],
        },
        options:
          typeof setup.threats[splitStr[6]] != "undefined"
            ? setup.threats[splitStr[6]]
            : setup.threats["CI"],
        seg:
          typeof setup.threats[splitStr[6]] != "undefined" ? splitStr[6] : "CI",
        date: splitStr[7] || new Date().toLocaleDateString(),
        ts: splitStr[8] || new Date().toLocaleTimeString(),
      });
    }
    return json;
  };

  // When map done start animation process
  const startApp = async () => {
    let threatData;
    let indicator;
    try {
      threatData = parseData(backUpData);
      appCore(threatData, indicator);
    } catch (err) {}
  };

  const appCore = (threatData, indicator) => {
    //   threatLog(duration, threatData);
    indicator = 0; //Restart animation indicator
    for (let i = 0; i < threatData.length; i++) {
      // https://github.com/d3/d3-timer#timeout
      d3.timeout(() => {
        drawAttack(window.archContainer, threatData[i]);
        indicator++;
        // when all of the data is mapped...
        if (indicator === threatData.length) {
          d3.timeout(() => {
            runApp && startApp();
          }, duration * 2);
        }
      }, (i / 1.5) * duration); // this creates a gap between each line
    }
  };

  // First drawing the map
  const drawMap = (map) => {
    // Draw the map
    svg
      .append("svg")
      .attr("class", "countries")
      .selectAll("path")
      .data(map.features)
      .enter()
      .append("path")
      .attr("d", path)
      /* 
      Comment This if you'd like not to see country fills by population 
      Also Needed to UnComment the url(#hash)
    */
      .attr("fill", function (d) {
        // Pull data for this country
        d.total = data.get(d.id) || 0;
        // Set the state color
        return colorScale(d.total);
      })
      .attr("stroke", function (d) {
        // Pull data for this country
        d.total = data.get(d.id) || 0;
        // Set the stroke
        return colorScale(d.total);
      })
      // .style("opacity", 1)
      // .attr("fill", "url(#hash)")
      .attr("stroke-width", 1)
      .attr("stroke-opacity", 1)
      // tooltip
      .on("mouseover", function (d) {
        doTip(tip, "block", d.properties.name);

        d3.select(this).style("fill-opacity", 0.2);
        d3.select(this).style("stroke-opacity", 0);
      })
      .on("mouseout", function () {
        doTip(tip, "none", null);

        d3.select(this).style("fill-opacity", 1);
        d3.select(this).style("stroke-opacity", 1);
      });
  };

  const drawAttack = (archContainer, data) => {
    // Append new arch into DOM
    let arch = createArchLine(archContainer, data);

    // Total len of current arch for animation
    let totalLength = arch.node().getTotalLength();

    // Arch fade in-out animation
    archAnimation(arch, totalLength, data);

    // Add glow onto archs
    enableGlow &&
      svg.selectAll(".arch-container").style("filter", "url(#glow)");
  };

  const archAnimation = (arch, totalLength, data) => {
    let coords = [
      projection(data.origin.coordinates),
      projection(data.destination.coordinates),
    ];
    // Label Origin
    labelAndMarker(coords[0], data.origin.name, arcDuration * 2, false);

    arch
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(arcDuration)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .on("end", () => {
        labelAndMarker(
          coords[1],
          data.destination.name,
          mrkrLblDuration,
          data.seg
        ); // Label Destination & Target Marker
        archFade(arch, totalLength, mrkrLblDuration);
      });
  };

  // Create Origin & Destination Label with Marker
  const labelAndMarker = (markerCords, label, duration, threat) => {
    svg
      .selectAll(".arch-container")
      .append("text")
      .attr("class", "marker-label")
      .attr("x", markerCords[0] + 15)
      .attr("y", markerCords[1] + 10)
      .style("font-size", 14)
      .style("fill", "#ffd")
      .text(label)
      .transition()
      .duration(duration)
      .style("fill-opacity", 0)
      .style("stroke-opacity", 0)
      .remove();

    if (threat) {
      // So target marker will appear only at the end of the animation
      svg
        .selectAll(".arch-container")
        .append("circle")
        .attr("class", "point")
        .attr("r", 12.5)
        .attr("cx", markerCords[0])
        .attr("cy", markerCords[1])
        .attr("fill", "url(#target_" + threat + ")")
        .transition()
        .duration(duration)
        .style("fill-opacity", 0)
        .style("stroke-opacity", 0)
        .remove();
    }
  };

  // Call back function for line fading
  const archFade = (arch, len, duration) => {
    arch
      .attr("stroke-dasharray", len + " " + len)
      .attr("stroke-dashoffset", 0)
      .transition()
      .duration(duration)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", -len)
      .style("fill-opacity", 0)
      .style("stroke-opacity", 0)
      .remove();
  };

  // Create arch Line
  const createArchLine = (archContainer, data) => {
    return (
      archContainer
        // .append("g")
        // .attr("class", "arches")
        .append("path")
        .attr("d", () => {
          let res = lngLatToArch(
            data.origin.coordinates,
            data.destination.coordinates,
            bend
          );
          return res;
        })
        .style("stroke", () => {
          return data.options.strokeColor;
        })
        .style("stroke-width", () => {
          return data.options.strokeWidth;
        })
        .style("fill", "none")
    );
  };

  // Transform longitude and latitude into arcs
  const lngLatToArch = (source, target, sharpness) => {
    // Random bend each line
    sharpness = sharpness + Math.random();

    // If source sum equal to target then draw the cubic Bézier curve
    let sumXY = [
      Math.abs(projection(source).reduce((pv, cv) => pv + cv, 0)),
      Math.abs(projection(target).reduce((pv, cv) => pv + cv, 0)),
    ];
    if (source && target) {
      const sourceXY = projection(source),
        targetXY = projection(target);

      const sourceX = sourceXY[0],
        sourceY = sourceXY[1];

      const targetX = targetXY[0],
        targetY = targetXY[1];

      const midXY = [(sourceX + targetX) / 2, (sourceY + targetY) / 2];
      if (
        sumXY[0] !== sumXY[1] &&
        Math.floor(Math.abs(sumXY[0] - sumXY[1])) > 2
      ) {
        return (
          "M" +
          sourceX +
          "," +
          sourceY +
          "S" +
          (midXY[0] + 50 * sharpness) +
          "," +
          (midXY[1] - 75 * sharpness) +
          "," +
          targetX +
          "," +
          targetY
        );
      } else {
        // Random height
        let height =
          sourceY > 200
            ? sourceY - getRndInteger(50, 70)
            : sourceY - getRndInteger(40, 60);
        let diamond =
          "M" +
          sourceX +
          "," +
          sourceY +
          " C " +
          // top left
          ((sourceX + targetX) / 2 - 50) +
          "," +
          height +
          " " +
          //top right
          ((sourceX + targetX) / 2 + 50) +
          "," +
          height +
          " " +
          targetX +
          "," +
          targetY;
        return diamond; // Example M100,200 C175,50 325,50 100,200
      }
    } else {
      return "M0,0,l0,0z";
    }
  };

  // Archs outer glow
  const createGlows = () => {
    // Create filter from global variable 'defs'
    const filter = defs.append("filter").attr("id", "glow");

    filter
      .append("feGaussianBlur")
      .attr("class", "blur")
      .attr("stdDeviation", ".7")
      .attr("result", "coloredBlur");

    const feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
  };

  // tooltip handler with JQUERY
  const doTip = (tip, show, country) => {
    if (show === "block") {
      $("body").mousemove(function (e) {
        tip.style.left = e.pageX + "px";
        tip.style.top = e.pageY + "px";
        tip.style.display = show;
        tip.textContent = country;
      });
    } else {
      tip.style.display = show;
      $("body").off();
    }
  };

  // Generate random num between min and max
  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // Load external data and boot
  const loader = d3.queue();
  loader.defer(
    d3.json,
    "https://raw.githubusercontent.com/NativSibony/vue-threatmap/main/static/world.json"
  );
  loader.defer(
    d3.csv,
    "https://raw.githubusercontent.com/NativSibony/vue-threatmap/main/static/world_population.csv",
    (d) => {
      data.set(d.code, +d.total);
    }
  );
  loader.await(ready); //Async
};

export default ThreatMap;
