<template>
  <div class="GMap"/>
</template>


<script>
import MarkerClusterer from '@google/markerclusterer';
import axios from 'axios';

import gmapsInit from '../utils/gmaps';

const locations = [];

export default {
	name: `GMap`,

	methods: {

		async loadItems() {
			var response;

			response = await axios.get(this.$HostName + "/list/DEVICE?token=" + this.$AdminToken);

			this.data = response.data;
			this.data.forEach(element => {
				var position = {
					lat: element.latitude,
					lng: element.longitude
				}
				if (position.lat != null) {
					locations.push({
						position
					});
				}

			});


		}
	},

	async mounted() {
		try {

			// await created() ;
			await this.loadItems();
			var socket = require("../../socket/websocket.js").socket;

			socket.on("device-disconnected", (message) => {
				this.loadItems();


			})

			const google = await gmapsInit();

			const geocoder = new google.maps.Geocoder();
			const map = new google.maps.Map(this.$el);

			geocoder.geocode({
				address: `Lebanon`
			}, (results, status) => {
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

					const marker = new google.maps.Marker({ ...location,
						map,
						title: 'Hello World!'
					});
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