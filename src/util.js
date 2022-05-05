export async function getPlaylog(url = "", fields = {}) {
  try {
    const request = createRequest(url, fields);
    const data = await fetch(request);
    if (!data.ok) {
      throw new Error("There is an error");
    }
    const response = await data.text();
    return response;
  } catch (error) {
    return error.message || error;
  }
}

export function getNameFromCode(code) {
  for (let i = 0; i < countries.data.length; i++) {
    if (countries.data[i].code === code) {
      return countries.data[i].name;
    }
  }
}

export function fixSegmentKeys(obj) {
  let newObj = {
    "Critical Infrastructure": 0,
    Finance: 0,
    "Health Care": 0,
    General: 0,
    Government: 0,
    Enterprise: 0,
    Municipality: 0,
    Startups: 0,
    Telecom: 0,
    Banks: 0,
    he: 0,
  };
  Object.values(obj).forEach((n) => {
    console.log(n);
    let name = n.name.toLowerCase();
    newObj[segments[name]] += n.value;
  });
  Object.entries(newObj).forEach(([name, val]) => {
    if (val === 0) {
      delete newObj[name];
    }
  });
  return newObj;
}

export function fixSegmentSimple(str) {
  return segments[str];
}

export function getLatLon(code) {
  for (let i = 0; i < countries.data.length; i++) {
    if (countries.data[i].code === code) {
      return countries.data[i].lnglat;
    }
  }
}

export const getKeyStartsWith = (part, o) =>
  Object.entries(o).find(([k, v]) => k.startsWith(part))?.[1];

export const calls = {
  nucleoncyber: "https://api.nucleoncyber.com",
  cysight: "https://gui.cysight.co",
  apiv6: "https://apiv6.nucleoncyber.com",
};

let segments = {
  ci: "Critical Infrastructure",
  fi: "Finance",
  fin: "Finance",
  fintech: "Finance",
  hc: "Health Care",
  go: "Government",
  en: "Enterprise",
  mn: "Municipality",
  st: "Startups",
  te: "Telecom",
  ba: "Banks",
  ge: "General",
  he: "he",
};

let countries = {
  data: [
    {
      code: "SA",
      lnglat: [-22.268764, 139.748848],
      name: "South America",
    },
    {
      code: "OC",
      lnglat: [-8.779225, -55.492619],
      name: "South America",
    },
    {
      name: "North America",
      code: "NA",
      lnglat: [54.977614, -105.555255],
    },
    {
      name: "Africa",
      code: "AF",
      lnglat: [34.051522, 100.618984],
    },
    {
      name: "Asia",
      code: "AS",
      lnglat: [34.051522, 100.618984],
    },
    {
      name: "Europe",
      code: "EU",
      lnglat: [46.202646, 1.264125],
    },
    {
      code: "AD",
      lnglat: [42.546245, 1.601554],
      name: "Andorra",
    },
    {
      code: "AE",
      lnglat: [23.424076, 53.847818],
      name: "United Arab Emirates",
    },
    {
      code: "AF",
      lnglat: [33.93911, 67.709953],
      name: "Afghanistan",
    },
    {
      code: "AG",
      lnglat: [17.060816, -61.796428],
      name: "Antigua and Barbuda",
    },
    {
      code: "AI",
      lnglat: [18.220554, -63.068615],
      name: "Anguilla",
    },
    {
      code: "AL",
      lnglat: [41.153332, 20.168331],
      name: "Albania",
    },
    {
      code: "AM",
      lnglat: [40.069099, 45.038189],
      name: "Armenia",
    },
    {
      code: "AO",
      lnglat: [-11.202692, 17.873887],
      name: "Angola",
    },
    {
      code: "AQ",
      lnglat: [-75.250973, -0.071389],
      name: "Antarctica",
    },
    {
      code: "AR",
      lnglat: [-38.416097, -63.616672],
      name: "Argentina",
    },
    {
      code: "AS",
      lnglat: [-14.270972, -170.132217],
      name: "American Samoa",
    },
    {
      code: "AT",
      lnglat: [47.516231, 14.550072],
      name: "Austria",
    },
    {
      code: "AU",
      lnglat: [-25.274398, 133.775136],
      name: "Australia",
    },
    {
      code: "AW",
      lnglat: [12.52111, -69.968338],
      name: "Aruba",
    },
    {
      code: "AZ",
      lnglat: [40.143105, 47.576927],
      name: "Azerbaijan",
    },
    {
      code: "BA",
      lnglat: [43.915886, 17.679076],
      name: "Bosnia and Herzegovina",
    },
    {
      code: "BB",
      lnglat: [13.193887, -59.543198],
      name: "Barbados",
    },
    {
      code: "BD",
      lnglat: [23.684994, 90.356331],
      name: "Bangladesh",
    },
    {
      code: "BE",
      lnglat: [50.503887, 4.469936],
      name: "Belgium",
    },
    {
      code: "BF",
      lnglat: [12.238333, -1.561593],
      name: "Burkina Faso",
    },
    {
      code: "BG",
      lnglat: [42.733883, 25.48583],
      name: "Bulgaria",
    },
    {
      code: "BH",
      lnglat: [25.930414, 50.637772],
      name: "Bahrain",
    },
    {
      code: "BI",
      lnglat: [-3.373056, 29.918886],
      name: "Burundi",
    },
    {
      code: "BJ",
      lnglat: [9.30769, 2.315834],
      name: "Benin",
    },
    {
      code: "BM",
      lnglat: [32.321384, -64.75737],
      name: "Bermuda",
    },
    {
      code: "BN",
      lnglat: [4.535277, 114.727669],
      name: "Brunei",
    },
    {
      code: "BO",
      lnglat: [-16.290154, -63.588653],
      name: "Bolivia",
    },
    {
      code: "BR",
      lnglat: [-14.235004, -51.92528],
      name: "Brazil",
    },
    {
      code: "BS",
      lnglat: [25.03428, -77.39628],
      name: "Bahamas",
    },
    {
      code: "BT",
      lnglat: [27.514162, 90.433601],
      name: "Bhutan",
    },
    {
      code: "BV",
      lnglat: [-54.423199, 3.413194],
      name: "Bouvet Island",
    },
    {
      code: "BW",
      lnglat: [-22.328474, 24.684866],
      name: "Botswana",
    },
    {
      code: "BY",
      lnglat: [53.709807, 27.953389],
      name: "Belarus",
    },
    {
      code: "BZ",
      lnglat: [17.189877, -88.49765],
      name: "Belize",
    },
    {
      code: "CA",
      lnglat: [56.130366, -106.346771],
      name: "Canada",
    },
    {
      code: "CC",
      lnglat: [-12.164165, 96.870956],
      name: "Cocos Islands",
    },
    {
      code: "CD",
      lnglat: [-4.038333, 21.758664],
      name: "Congo",
    },
    {
      code: "CF",
      lnglat: [6.611111, 20.939444],
      name: "Central African Republic",
    },
    {
      code: "CG",
      lnglat: [-0.228021, 15.827659],
      name: "Congo",
    },
    {
      code: "CH",
      lnglat: [46.818188, 8.227512],
      name: "Switzerland",
    },
    {
      code: "CI",
      lnglat: [7.539989, -5.54708],
      name: "Cote d'Ivoire",
    },
    {
      code: "CK",
      lnglat: [-21.236736, -159.777671],
      name: "Cook Islands",
    },
    {
      code: "CL",
      lnglat: [-35.675147, -71.542969],
      name: "Chile",
    },
    {
      code: "CM",
      lnglat: [7.369722, 12.354722],
      name: "Cameroon",
    },
    {
      code: "CN",
      lnglat: [35.86166, 104.195397],
      name: "China",
    },
    {
      code: "CO",
      lnglat: [4.570868, -74.297333],
      name: "Colombia",
    },
    {
      code: "CR",
      lnglat: [9.748917, -83.753428],
      name: "Costa Rica",
    },
    {
      code: "CU",
      lnglat: [21.521757, -77.781167],
      name: "Cuba",
    },
    {
      code: "CV",
      lnglat: [16.002082, -24.013197],
      name: "Cape Verde",
    },
    {
      code: "CX",
      lnglat: [-10.447525, 105.690449],
      name: "Christmas Island",
    },
    {
      code: "CY",
      lnglat: [35.126413, 33.429859],
      name: "Cyprus",
    },
    {
      code: "CZ",
      lnglat: [49.817492, 15.472962],
      name: "Czech Republic",
    },
    {
      code: "DE",
      lnglat: [51.165691, 10.451526],
      name: "Germany",
    },
    {
      code: "DJ",
      lnglat: [11.825138, 42.590275],
      name: "Djibouti",
    },
    {
      code: "DK",
      lnglat: [56.26392, 9.501785],
      name: "Denmark",
    },
    {
      code: "DM",
      lnglat: [15.414999, -61.370976],
      name: "Dominica",
    },
    {
      code: "DO",
      lnglat: [18.735693, -70.162651],
      name: "Dominican Republic",
    },
    {
      code: "DZ",
      lnglat: [28.033886, 1.659626],
      name: "Algeria",
    },
    {
      code: "EC",
      lnglat: [-1.831239, -78.183406],
      name: "Ecuador",
    },
    {
      code: "EE",
      lnglat: [58.595272, 25.013607],
      name: "Estonia",
    },
    {
      code: "EG",
      lnglat: [26.820553, 30.802498],
      name: "Egypt",
    },
    {
      code: "EH",
      lnglat: [24.215527, -12.885834],
      name: "Western Sahara",
    },
    {
      code: "ER",
      lnglat: [15.179384, 39.782334],
      name: "Eritrea",
    },
    {
      code: "ES",
      lnglat: [40.463667, -3.74922],
      name: "Spain",
    },
    {
      code: "ET",
      lnglat: [9.145, 40.489673],
      name: "Ethiopia",
    },
    {
      code: "FI",
      lnglat: [61.92411, 25.748151],
      name: "Finland",
    },
    {
      code: "FJ",
      lnglat: [-16.578193, 179.414413],
      name: "Fiji",
    },
    {
      code: "FK",
      lnglat: [-51.796253, -59.523613],
      name: "Falkland Islands",
    },
    {
      code: "FM",
      lnglat: [7.425554, 150.550812],
      name: "Micronesia",
    },
    {
      code: "FO",
      lnglat: [61.892635, -6.911806],
      name: "Faroe Islands",
    },
    {
      code: "FR",
      lnglat: [46.227638, 2.213749],
      name: "France",
    },
    {
      code: "GA",
      lnglat: [-0.803689, 11.609444],
      name: "Gabon",
    },
    {
      code: "GB",
      lnglat: [55.378051, -3.435973],
      name: "United Kingdom",
    },
    {
      code: "UK",
      lnglat: [55.378051, -3.435973],
      name: "United Kingdom",
    },
    {
      code: "GD",
      lnglat: [12.262776, -61.604171],
      name: "Grenada",
    },
    {
      code: "GE",
      lnglat: [42.315407, 43.356892],
      name: "Georgia",
    },
    {
      code: "GF",
      lnglat: [3.933889, -53.125782],
      name: "French Guiana",
    },
    {
      code: "GG",
      lnglat: [49.465691, -2.585278],
      name: "Guernsey",
    },
    {
      code: "GH",
      lnglat: [7.946527, -1.023194],
      name: "Ghana",
    },
    {
      code: "GI",
      lnglat: [36.137741, -5.345374],
      name: "Gibraltar",
    },
    {
      code: "GL",
      lnglat: [71.706936, -42.604303],
      name: "Greenland",
    },
    {
      code: "GM",
      lnglat: [13.443182, -15.310139],
      name: "Gambia",
    },
    {
      code: "GN",
      lnglat: [9.945587, -9.696645],
      name: "Guinea",
    },
    {
      code: "GP",
      lnglat: [16.995971, -62.067641],
      name: "Guadeloupe",
    },
    {
      code: "GQ",
      lnglat: [1.650801, 10.267895],
      name: "Equatorial Guinea",
    },
    {
      code: "GR",
      lnglat: [39.074208, 21.824312],
      name: "Greece",
    },
    {
      code: "GT",
      lnglat: [15.783471, -90.230759],
      name: "Guatemala",
    },
    {
      code: "GU",
      lnglat: [13.444304, 144.793731],
      name: "Guam",
    },
    {
      code: "GW",
      lnglat: [11.803749, -15.180413],
      name: "Guinea-Bissau",
    },
    {
      code: "GY",
      lnglat: [4.860416, -58.93018],
      name: "Guyana",
    },
    {
      code: "HK",
      lnglat: [22.396428, 114.109497],
      name: "Hong Kong",
    },
    {
      code: "HN",
      lnglat: [15.199999, -86.241905],
      name: "Honduras",
    },
    {
      code: "HR",
      lnglat: [45.1, 15.2],
      name: "Croatia",
    },
    {
      code: "HT",
      lnglat: [18.971187, -72.285215],
      name: "Haiti",
    },
    {
      code: "HU",
      lnglat: [47.162494, 19.503304],
      name: "Hungary",
    },
    {
      code: "ID",
      lnglat: [-0.789275, 113.921327],
      name: "Indonesia",
    },
    {
      code: "IE",
      lnglat: [53.41291, -8.24389],
      name: "Ireland",
    },
    {
      code: "IL",
      lnglat: [31.046051, 34.851612],
      name: "Israel",
    },
    {
      code: "IM",
      lnglat: [54.236107, -4.548056],
      name: "Isle of Man",
    },
    {
      code: "IN",
      lnglat: [20.593684, 78.96288],
      name: "India",
    },
    {
      code: "IQ",
      lnglat: [33.223191, 43.679291],
      name: "Iraq",
    },
    {
      code: "IR",
      lnglat: [32.427908, 53.688046],
      name: "Iran",
    },
    {
      code: "IS",
      lnglat: [64.963051, -19.020835],
      name: "Iceland",
    },
    {
      code: "IT",
      lnglat: [41.87194, 12.56738],
      name: "Italy",
    },
    {
      code: "JE",
      lnglat: [49.214439, -2.13125],
      name: "Jersey",
    },
    {
      code: "JM",
      lnglat: [18.109581, -77.297508],
      name: "Jamaica",
    },
    {
      code: "JO",
      lnglat: [30.585164, 36.238414],
      name: "Jordan",
    },
    {
      code: "JP",
      lnglat: [36.204824, 138.252924],
      name: "Japan",
    },
    {
      code: "KE",
      lnglat: [-0.023559, 37.906193],
      name: "Kenya",
    },
    {
      code: "KG",
      lnglat: [41.20438, 74.766098],
      name: "Kyrgyzstan",
    },
    {
      code: "KH",
      lnglat: [12.565679, 104.990963],
      name: "Cambodia",
    },
    {
      code: "KI",
      lnglat: [-3.370417, -168.734039],
      name: "Kiribati",
    },
    {
      code: "KM",
      lnglat: [-11.875001, 43.872219],
      name: "Comoros",
    },
    {
      code: "KP",
      lnglat: [40.339852, 127.510093],
      name: "North Korea",
    },
    {
      code: "KR",
      lnglat: [35.907757, 127.766922],
      name: "South Korea",
    },
    {
      code: "KW",
      lnglat: [29.31166, 47.481766],
      name: "Kuwait",
    },
    {
      code: "KY",
      lnglat: [19.513469, -80.566956],
      name: "Cayman Islands",
    },
    {
      code: "KZ",
      lnglat: [48.019573, 66.923684],
      name: "Kazakhstan",
    },
    {
      code: "LA",
      lnglat: [19.85627, 102.495496],
      name: "Laos",
    },
    {
      code: "LB",
      lnglat: [33.854721, 35.862285],
      name: "Lebanon",
    },
    {
      code: "LC",
      lnglat: [13.909444, -60.978893],
      name: "Saint Lucia",
    },
    {
      code: "LI",
      lnglat: [47.166, 9.555373],
      name: "Liechtenstein",
    },
    {
      code: "LK",
      lnglat: [7.873054, 80.771797],
      name: "Sri Lanka",
    },
    {
      code: "LR",
      lnglat: [6.428055, -9.429499],
      name: "Liberia",
    },
    {
      code: "LS",
      lnglat: [-29.609988, 28.233608],
      name: "Lesotho",
    },
    {
      code: "LT",
      lnglat: [55.169438, 23.881275],
      name: "Lithuania",
    },
    {
      code: "LU",
      lnglat: [49.815273, 6.129583],
      name: "Luxembourg",
    },
    {
      code: "LV",
      lnglat: [56.879635, 24.603189],
      name: "Latvia",
    },
    {
      code: "LY",
      lnglat: [26.3351, 17.228331],
      name: "Libya",
    },
    {
      code: "MA",
      lnglat: [31.791702, -7.09262],
      name: "Morocco",
    },
    {
      code: "MC",
      lnglat: [43.750298, 7.412841],
      name: "Monaco",
    },
    {
      code: "MD",
      lnglat: [47.411631, 28.369885],
      name: "Moldova",
    },
    {
      code: "ME",
      lnglat: [42.708678, 19.37439],
      name: "Montenegro",
    },
    {
      code: "MG",
      lnglat: [-18.766947, 46.869107],
      name: "Madagascar",
    },
    {
      code: "MH",
      lnglat: [7.131474, 171.184478],
      name: "Marshall Islands",
    },
    {
      code: "MK",
      lnglat: [41.608635, 21.745275],
      name: "Macedonia",
    },
    {
      code: "ML",
      lnglat: [17.570692, -3.996166],
      name: "Mali",
    },
    {
      code: "MM",
      lnglat: [21.913965, 95.956223],
      name: "Myanmar",
    },
    {
      code: "MN",
      lnglat: [46.862496, 103.846656],
      name: "Mongolia",
    },
    {
      code: "MO",
      lnglat: [22.198745, 113.543873],
      name: "Macau",
    },
    {
      code: "MQ",
      lnglat: [14.641528, -61.024174],
      name: "Martinique",
    },
    {
      code: "MR",
      lnglat: [21.00789, -10.940835],
      name: "Mauritania",
    },
    {
      code: "MS",
      lnglat: [16.742498, -62.187366],
      name: "Montserrat",
    },
    {
      code: "MT",
      lnglat: [35.937496, 14.375416],
      name: "Malta",
    },
    {
      code: "MU",
      lnglat: [-20.348404, 57.552152],
      name: "Mauritius",
    },
    {
      code: "MV",
      lnglat: [3.202778, 73.22068],
      name: "Maldives",
    },
    {
      code: "MW",
      lnglat: [-13.254308, 34.301525],
      name: "Malawi",
    },
    {
      code: "MX",
      lnglat: [23.634501, -102.552784],
      name: "Mexico",
    },
    {
      code: "MY",
      lnglat: [4.210484, 101.975766],
      name: "Malaysia",
    },
    {
      code: "MZ",
      lnglat: [-18.665695, 35.529562],
      name: "Mozambique",
    },
    {
      code: "NA",
      lnglat: [-22.95764, 18.49041],
      name: "Namibia",
    },
    {
      code: "NC",
      lnglat: [-20.904305, 165.618042],
      name: "New Caledonia",
    },
    {
      code: "NE",
      lnglat: [17.607789, 8.081666],
      name: "Niger",
    },
    {
      code: "NF",
      lnglat: [-29.040835, 167.954712],
      name: "Norfolk Island",
    },
    {
      code: "NG",
      lnglat: [9.081999, 8.675277],
      name: "Nigeria",
    },
    {
      code: "NI",
      lnglat: [12.865416, -85.207229],
      name: "Nicaragua",
    },
    {
      code: "NL",
      lnglat: [52.132633, 5.291266],
      name: "Netherlands",
    },
    {
      code: "NO",
      lnglat: [60.472024, 8.468946],
      name: "Norway",
    },
    {
      code: "NP",
      lnglat: [28.394857, 84.124008],
      name: "Nepal",
    },
    {
      code: "NR",
      lnglat: [-0.522778, 166.931503],
      name: "Nauru",
    },
    {
      code: "NU",
      lnglat: [-19.054445, -169.867233],
      name: "Niue",
    },
    {
      code: "NZ",
      lnglat: [-40.900557, 174.885971],
      name: "New Zealand",
    },
    {
      code: "OM",
      lnglat: [21.512583, 55.923255],
      name: "Oman",
    },
    {
      code: "PA",
      lnglat: [8.537981, -80.782127],
      name: "Panama",
    },
    {
      code: "PE",
      lnglat: [-9.189967, -75.015152],
      name: "Peru",
    },
    {
      code: "PF",
      lnglat: [-17.679742, -149.406843],
      name: "French Polynesia",
    },
    {
      code: "PG",
      lnglat: [-6.314993, 143.95555],
      name: "Papua New Guinea",
    },
    {
      code: "PH",
      lnglat: [12.879721, 121.774017],
      name: "Philippines",
    },
    {
      code: "PK",
      lnglat: [30.375321, 69.345116],
      name: "Pakistan",
    },
    {
      code: "PL",
      lnglat: [51.919438, 19.145136],
      name: "Poland",
    },
    {
      code: "PN",
      lnglat: [-24.703615, -127.439308],
      name: "Pitcairn Islands",
    },
    {
      code: "PR",
      lnglat: [18.220833, -66.590149],
      name: "Puerto Rico",
    },
    {
      code: "PS",
      lnglat: [31.952162, 35.233154],
      name: "Palestinian Territories",
    },
    {
      code: "PT",
      lnglat: [39.399872, -8.224454],
      name: "Portugal",
    },
    {
      code: "PW",
      lnglat: [7.51498, 134.58252],
      name: "Palau",
    },
    {
      code: "PY",
      lnglat: [-23.442503, -58.443832],
      name: "Paraguay",
    },
    {
      code: "QA",
      lnglat: [25.354826, 51.183884],
      name: "Qatar",
    },
    {
      code: "RO",
      lnglat: [45.943161, 24.96676],
      name: "Romania",
    },
    {
      code: "RS",
      lnglat: [44.016521, 21.005859],
      name: "Serbia",
    },
    {
      code: "RU",
      lnglat: [61.52401, 105.318756],
      name: "Russia",
    },
    {
      code: "RW",
      lnglat: [-1.940278, 29.873888],
      name: "Rwanda",
    },
    {
      code: "SA",
      lnglat: [23.885942, 45.079162],
      name: "Saudi Arabia",
    },
    {
      code: "SB",
      lnglat: [-9.64571, 160.156194],
      name: "Solomon Islands",
    },
    {
      code: "SC",
      lnglat: [-4.679574, 55.491977],
      name: "Seychelles",
    },
    {
      code: "SD",
      lnglat: [12.862807, 30.217636],
      name: "Sudan",
    },
    {
      code: "SE",
      lnglat: [60.128161, 18.643501],
      name: "Sweden",
    },
    {
      code: "SG",
      lnglat: [1.352083, 103.819836],
      name: "Singapore",
    },
    {
      code: "SH",
      lnglat: [-24.143474, -10.030696],
      name: "Saint Helena",
    },
    {
      code: "SI",
      lnglat: [46.151241, 14.995463],
      name: "Slovenia",
    },
    {
      code: "SK",
      lnglat: [48.669026, 19.699024],
      name: "Slovakia",
    },
    {
      code: "SL",
      lnglat: [8.460555, -11.779889],
      name: "Sierra Leone",
    },
    {
      code: "SM",
      lnglat: [43.94236, 12.457777],
      name: "San Marino",
    },
    {
      code: "SN",
      lnglat: [14.497401, -14.452362],
      name: "Senegal",
    },
    {
      code: "SO",
      lnglat: [5.152149, 46.199616],
      name: "Somalia",
    },
    {
      code: "SR",
      lnglat: [3.919305, -56.027783],
      name: "Suriname",
    },
    {
      code: "SV",
      lnglat: [13.794185, -88.89653],
      name: "El Salvador",
    },
    {
      code: "SY",
      lnglat: [34.802075, 38.996815],
      name: "Syria",
    },
    {
      code: "SZ",
      lnglat: [-26.522503, 31.465866],
      name: "Swaziland",
    },
    {
      code: "TD",
      lnglat: [15.454166, 18.732207],
      name: "Chad",
    },
    {
      code: "TG",
      lnglat: [8.619543, 0.824782],
      name: "Togo",
    },
    {
      code: "TH",
      lnglat: [15.870032, 100.992541],
      name: "Thailand",
    },
    {
      code: "TJ",
      lnglat: [38.861034, 71.276093],
      name: "Tajikistan",
    },
    {
      code: "TK",
      lnglat: [-8.967363, -171.855881],
      name: "Tokelau",
    },
    {
      code: "TL",
      lnglat: [-8.874217, 125.727539],
      name: "Timor-Leste",
    },
    {
      code: "TM",
      lnglat: [38.969719, 59.556278],
      name: "Turkmenistan",
    },
    {
      code: "TN",
      lnglat: [33.886917, 9.537499],
      name: "Tunisia",
    },
    {
      code: "TO",
      lnglat: [-21.178986, -175.198242],
      name: "Tonga",
    },
    {
      code: "TR",
      lnglat: [38.963745, 35.243322],
      name: "Turkey",
    },
    {
      code: "TT",
      lnglat: [10.691803, -61.222503],
      name: "Trinidad and Tobago",
    },
    {
      code: "TV",
      lnglat: [-7.109535, 177.64933],
      name: "Tuvalu",
    },
    {
      code: "TW",
      lnglat: [23.69781, 120.960515],
      name: "Taiwan",
    },
    {
      code: "TZ",
      lnglat: [-6.369028, 34.888822],
      name: "Tanzania",
    },
    {
      code: "UA",
      lnglat: [48.379433, 31.16558],
      name: "Ukraine",
    },
    {
      code: "UG",
      lnglat: [1.373333, 32.290275],
      name: "Uganda",
    },
    {
      code: "US",
      lnglat: [37.09024, -95.712891],
      name: "United States",
    },
    {
      code: "USA",
      lnglat: [37.09024, -95.712891],
      name: "United States",
    },
    {
      code: "UY",
      lnglat: [-32.522779, -55.765835],
      name: "Uruguay",
    },
    {
      code: "UZ",
      lnglat: [41.377491, 64.585262],
      name: "Uzbekistan",
    },
    {
      code: "VA",
      lnglat: [41.902916, 12.453389],
      name: "Vatican City",
    },
    {
      code: "VE",
      lnglat: [6.42375, -66.58973],
      name: "Venezuela",
    },
    {
      code: "VG",
      lnglat: [18.420695, -64.639968],
      name: "British Virgin Islands",
    },
    {
      code: "VI",
      lnglat: [18.335765, -64.896335],
      name: "U.S. Virgin Islands",
    },
    {
      code: "VN",
      lnglat: [14.058324, 108.277199],
      name: "Vietnam",
    },
    {
      code: "VU",
      lnglat: [-15.376706, 166.959158],
      name: "Vanuatu",
    },
    {
      code: "WF",
      lnglat: [-13.768752, -177.156097],
      name: "Wallis and Futuna",
    },
    {
      code: "WS",
      lnglat: [-13.759029, -172.104629],
      name: "Samoa",
    },
    {
      code: "YE",
      lnglat: [15.552727, 48.516388],
      name: "Yemen",
    },
    {
      code: "YT",
      lnglat: [-12.8275, 45.166244],
      name: "Mayotte",
    },
    {
      code: "ZA",
      lnglat: [-30.559482, 22.937506],
      name: "South Africa",
    },
    {
      code: "ZM",
      lnglat: [-13.133897, 27.849332],
      name: "Zambia",
    },
    {
      code: "ZW",
      lnglat: [-19.015438, 29.154857],
      name: "Zimbabwe",
    },
  ],
};
