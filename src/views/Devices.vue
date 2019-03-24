<template>
  <div class="animated fadeIn">
    <!-- Table -->
    <b-row>
      <b-col lg="12">
        <c-table :table-data="deviceArray" :fields="devicefields" :per-page=10 
        hover striped bordered small fixed caption="Displays" fa="fa fa-television"
        v-on:selected="updatedDS($event)" v-on:refresh="loadItems()"></c-table>
      </b-col>
    </b-row>
   
   
    <b-card>
      <div slot="header">
        <strong>Control</strong>
      </div>
      <b-button size="lg" variant="outline-danger" block @click="deleteDevices">Delete Devices</b-button>
    </b-card>

  </div>
</template>
<script>
import axios from "axios";
import cTable from "@/components/Table.vue";



export default {
  name: "Devies",
  components: { cTable },
  props: {},

  data() {
    return {
      dSelected: [], 
      show: true,

      deviceArray: [],

      devicefields: {
        id: {
          label: 'Device ID',
          sortable: true
        },
        deviceName: {
          label: 'Device Name',
          sortable: true
        },
        hostName: {
          label: 'Host',
          sortable: true
        },
        site: {
          label: 'Site',
          sortable: true
        },
        auth: {
          label: 'Authentication Status',
          sortable: true
        }, 
        status: {
          label: 'Status',
          sortable: true
        }
      },

      errors: []
    };
  },
  methods: {
    async loadItems() {
        const response = await axios.get(this.$HostName + "/list/DEVICE?&token=" + this.$AdminToken);
        this.deviceArray = response.data;
    },

    updatedDS(dNew) {
      this.dSelected = dNew;
    },

    async deleteDevices() {
      var deviceIds = [];
      this.dSelected.forEach(element => {
        deviceIds.push(element["id"]); 
      });

      var json = {
        parameters: {
          devices: deviceIds
        }
      }

      const response = await axios({
        method: "post",
        url: this.$HostName + "/delete/DEVICE?token=" + this.$AdminToken,
        data: json,
        config: { headers: {'Content-Type': 'application/json' }}
      })

      this.loadItems();
    }
  },

  async created() {
    this.loadItems();
    var socket = require("../../socket/websocket.js").socket;

  socket.on("device-disconnected",(message)=>{
        this.loadItems();
    })
    socket.on("new-connection",(message)=>{
        this.loadItems();
    })
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
