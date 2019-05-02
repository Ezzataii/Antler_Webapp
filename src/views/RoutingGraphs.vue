<template>
  <div class="animated fadeIn">
    <!-- :table-data vs :data -->
    <b-row>
      <b-col lg="6" sm="12">
        <c-table :table-data="deviceArray" :fields="deviceFields" :per-page="10" 
        hover striped bordered small fixed caption="Displays" fa="fa fa-television"
        v-on:selected="updatedDS($event)" v-on:refresh="loadItems()"></c-table>
      </b-col>

      <b-col lg="6" sm="12">
        <c-table :table-data="graphArray" :fields="graphFields" :per-page="10" 
        hover striped bordered small fixed caption="Graphs" fa="fa fa-picture-o"
        v-on:selected="updatedGS($event)" v-on:refresh="loadItems()"></c-table>
      </b-col>
    </b-row> 

    <b-card>
      <div slot="header">
        <strong>Control</strong>
      </div>
      <b-row>
        <b-col sm="10">
          <b-button size="md" variant="outline-primary" block @click="deploy">Deploy</b-button>
        </b-col>
        <b-col sm="2">
          <div class="form-check">
            <input class="form-check-input" type="radio" name="writeModeRadio" id="overwriteRadio" value="o" checked>
            <label class="form-check-label" for="overwriteRadio">
              Overwrite
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="writeModeRadio" id="appendRadio" value="a">
            <label class="form-check-label" for="appendRadio">
              Append
            </label>
          </div>
        </b-col>
      </b-row>   
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
  name: 'RoutingGraphs',
  components: {cTable},
  props: {

  },

  data: () => {
    return {
      deviceArray: [],
      graphArray: [],

      dSelected: [],
      gSelected: [],

      deviceFields: {
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
        }
      }, 
      graphFields: {
        id: {
          label: 'Ad ID',
          sortable: true
        },
        name: {
          label: 'Ad Name',
          sortable: true
        },
        user: {
          label: 'User',
          sortable: true
        }, 
        duration: {
          label: 'Duration',
          sortable: true
        }
      }
    }
  },

 mounted() {
    let jqueryScript = document.createElement('script');
    jqueryScript.setAttribute('src', 'https://code.jquery.com/jquery-3.4.0.min.js');
    jqueryScript.setAttribute('integrity', 'sha256-BJeo0qm959uMBGb65z40ejJYGSgR7REI4+CW1fNKwOg=');
    jqueryScript.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(jqueryScript);
  },

  methods: {
    async loadItems() {
      var response;
      response = await axios.get(this.$HostName + "/list/DEVICE?status=1&token=" + this.$AdminToken);
      this.deviceArray = response.data;

      response = await axios.get(this.$HostName + "/list/GRAPHS?token=" + this.$AdminToken);
      this.graphArray = response.data;

    },

    updatedDS(dNew) {
      this.dSelected = dNew;
    },
    updatedGS(gNew) {
      this.gSelected =gNew;
    },
    async deploy() {


      var deviceIds = [];
      this.dSelected.forEach(element => {
        deviceIds.push(element["id"]); 
      });

      var graphIds = [];
      this.gSelected.forEach(element => {
        graphIds.push(element["id"]); 
      });

      var json = {
        parameters: {
          devices: deviceIds,
          graphs: graphIds,
          writeMode: $('input[name=writeModeRadio]:checked').val()
        }
      }
      console.log(json);
      var res = await axios({
        method: "post",
        url: this.$HostName + "/deploy/graphs?token=" + this.$AdminToken,
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
