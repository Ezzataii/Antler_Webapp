<template>
  <div class="animated fadeIn">
    <!-- :table-data vs :data -->
    <b-row>
      <b-col lg="6" sm="12">
        <c-table :table-data="deviceArray" :fields="devicefields" :per-page=10 
        hover striped bordered small fixed caption="Displays" fa="fa fa-television"
        v-on:selected="updatedDS($event)" v-on:refresh="loadItems()"></c-table>
      </b-col>

      <b-col lg="6" sm="12">
        <c-table :table-data="adArray" :fields="Adfields" :per-page=10 
        hover striped bordered small fixed caption="Ads" fa="fa fa-picture-o"
        v-on:selected="updatedAS($event)" v-on:refresh="loadItems()"></c-table>
      </b-col>
    </b-row> 

    <b-card>
      <div slot="header">
        <strong>Control</strong>
      </div>
      <b-button size="lg" variant="outline-primary" block @click="deploy">Deploy</b-button>
    </b-card>

    

  </div>
</template>

<script>
import axios from 'axios';
import cTable from '@/components/Table.vue'
//import { shuffleArray } from '@/shared/utils'

//you can do _rowVariant: 'danger'
//_cellVariants: {status: 'danger'}
//_cellVariants: {status: 'danger', username: 'danger', registered: 'danger', role: 'danger'}



export default {
  name: 'Routing',
  components: {cTable},
  props: {

  },

  data: () => {
    return {
      deviceArray: [],
      adArray: [],

      dSelected: [],
      aSelected: [],

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
      Adfields: {
        id: {
          label: 'Ad ID',
          sortable: true
        },
        name: {
          label: 'Ad Name',
          sortable: true
        },
        user: {
          label: 'Ad Company',
          sortable: true
        }
      }
    }
  },



  methods: {
    async loadItems() {
      var response;
      response = await axios.get(this.$HostName + "/list/DEVICE?status=1&token=" + this.$AdminToken);
      this.deviceArray = response.data;

      response = await axios.get(this.$HostName + "/list/ADS?token=" + this.$AdminToken);
      this.adArray = response.data;

    },

    updatedDS(dNew) {
      this.dSelected = dNew;
    },
    updatedAS(aNew) {
      this.aSelected = aNew;
    },
    async deploy() {


      var deviceIds = [];
      this.dSelected.forEach(element => {
        deviceIds.push(element["id"]); 
      });

      var adIds = [];
      this.aSelected.forEach(element => {
        adIds.push(element["id"]); 
      });

      var json = {
        parameters: {
          devices: deviceIds,
          images: adIds
        }
      }
      const response = await axios({
        method: "post",
        url: this.$HostName + "/deploy?token=" + this.$AdminToken,
        data: json,
        config: { headers: {'Content-Type': 'application/json' }}
      })
    
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
}
</script>


<style>

</style>
