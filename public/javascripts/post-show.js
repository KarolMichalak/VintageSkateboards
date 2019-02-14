mapboxgl.accessToken = 'pk.eyJ1Ijoia2FqbzcyIiwiYSI6ImNqb2g0ZG5iMTBrOGkza211N2lsdWMzMnMifQ.EhYPwo83KVpsXbrdT2WVPA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9',
  center: post.geometry.coordinates,
  zoom: 8
});

// create a HTML element for each feature
var el = document.createElement('div');
el.className = 'marker';

// make a marker for location and add to the map
new mapboxgl.Marker(el)
.setLngLat(post.geometry.coordinates)
.setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
.setHTML('<h3>' + post.title + '</h3><p>' + post.location + '</p>'))
.addTo(map);

// Toggle edit review form
$('.toggle-edit-form').on('click', function() {
  // toggle the edit button text on click
  $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
  //toggle visibility of the edit review form
  $(this).siblings('.edit-review-form').toggle();
}); 