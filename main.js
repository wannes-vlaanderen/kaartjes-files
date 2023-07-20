config = {
  style: "STYLE",
  accessToken: "TOKEN",
  CSV: "CSV",
  center: ["LON","LAT"],
  zoom: "ZOOM",
  popupInfo: ['PLAATS_TITEL'],
  popupInfo2: ['PLAATS_LINK'],
  popupInfo3: ['PLAATS_BESCHRIJVING'],
  // sidebar.js
  title: 'TITLE',
  description: 'BESCHRIJVING',
  sideBarInfo: ['PLAATS_TITEL','PLAATS_INFO']
  // filters.js
  filters: [
    {
      type: "checkbox",
      title: "FILTERTITEL",
      columnHeader: "KOLOMTITEL",
      listItems: [
        "ITEM1",
        "ITEM2",
        "ITEM3",
        "ITEM4",
      ]
    },
    {
      type: "dropdown",
      title: "FILTERTITEL2",
      columnHeader: "KOLOMTITEL2",
      listItems: [
        "ITEMa",
        "ITEMb",
        "ITEMc",
        "ITEMd",
      ]
    },
  ]
  // legende.js
  legende: {
    "#e8da11": "Nieuw bedrijventerrein",
    "red": "Infrastructuurproject"
  }
}

mapboxgl.accessToken = config.accessToken;

let geoJSONData = {}:
const filteredGeoJSON = {
  type: "FeatureCollection",
  features: []
};

const map = new mapboxgl.Map({
  container: 'map',
  style: config.style,
  center: config.center,
  zoom: config.zoom,
  transformRequest: transformRequest,
  attrubutionControl: false
});

function flyToLocation(currentFeature) {
  map.flyTo({
    center: currentFeature,
    zoom: 13
  })
};

function createPopup(currentFeature) {
  const popups = document.getElementsByClassName('mapboxgl-popup');
  /** Check if there is already a popup on the map and if so, remove it */
  if (popups[0]) popups[0].remove();
  new mapboxgl.Popup({ closeOnClick: true })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(`<h3 style="font-weight:700;font-size:18;">${currentFeature.properties[config.popupInfo]}</h3><br><p>${currentFeature.properties[config.popupInfo3]}</p><br><a href"${popupInfo2}">Meer info</a>`)
    .addTo(map);
};










