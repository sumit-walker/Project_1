mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v9",
  center:[coordinate_1,coordinate_2], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
  
});
console.log(coordinate_1)
console.log(coordinate_2)

const marker1= new mapboxgl.Marker({color:"red"})
  .setLngLat([coordinate_1,coordinate_2])
  .setPopup(new mapboxgl.Popup({offset:25})
  .setHTML("<p>Exact location provided after booking</p>"))
  .addTo(map);


