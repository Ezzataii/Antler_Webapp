<template>
  <div class="GMap"/>
</template>


<script>
import MarkerClusterer from '@google/markerclusterer';


import gmapsInit from '../utils/gmaps';


const locations = [
  {
    position: {
      lat: 33.888630,
      lng: 35.495480
    },
  },
  {
    position: {
         lat: 33.888630,
      lng: 35.495300
    },
  },
  {
    position: {
      lat: 48.146140,
      lng: 16.297030,
    },
  },
  {
    position: {
      lat: 48.135830,
      lng: 16.194460,
    },
  },
  {
    position: {
      lat: 48.306091,
      lng: 14.286440,
    },
  },
  {
    position: {
      lat: 47.503040,
      lng: 9.747070,
    },
  },
];

export default {
  name: `GMap`,
  async mounted() {
    try {
      const google = await gmapsInit();
      const geocoder = new google.maps.Geocoder();
      const map = new google.maps.Map(this.$el);

      geocoder.geocode({ address: `Lebanon` }, (results, status) => {
        if (status !== `OK` || !results[0]) {
          throw new Error(status);
        }
       

        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.viewport);
      });

      const markerClickHandler = (marker) => {
        map.setZoom(13);
        map.setCenter(marker.getPosition());
      };
            //  var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

      const markers = locations
        .map((location) => {
        var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
        };
          const marker = new google.maps.Marker({ ...location, map, title: 'Hello World!' ,shape:shape});
          marker.addListener(`click`, () => markerClickHandler(marker));

          return marker;
        });

      // eslint-disable-next-line no-new
      new MarkerClusterer(map, markers, {
        imagePath: `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m`,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  },
};

</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
.GMap {
  width: 100vw;
  height: 100vh;
}
</style>