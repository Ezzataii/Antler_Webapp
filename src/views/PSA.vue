<template>
  <div class="animated fadeIn">
    <b-card>
      <b-row>
        <b-col lg="12">
          <c-table :table-data="deviceArray" :fields="devicefields" :per-page=10 
          hover striped bordered small fixed caption="Displays" fa="fa fa-television"
          v-on:selected="updatedDS($event)" v-on:refresh="loadItems()"></c-table>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="2">
          <h4>PSA File</h4>
          <b-form-file id="psaFile" :plain="true"></b-form-file>
        </b-col>

        <b-col sm="4">
          <h4>PSA Text</h4>
          <b-form-input id="psaText"></b-form-input>
        </b-col>

        <b-col sm="4">
          <h4>PSA Duration</h4>
          <b-form-input id="psaNumber" type="number"></b-form-input>
        </b-col>
        

      </b-row>
      
      <br>
      <b-row>
        <b-col sm="10">
          <b-button size="md" variant="outline-primary" block @click="deploy">Deploy</b-button>
          <b-progress :max="100" :value="loaded" show-progress animated></b-progress>
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
import axios from "axios";
import cTable from "@/components/Table.vue";
import { loadProgress } from 'axios-progress-bar';
import { setTimeout } from 'timers';

export default {
  name: "Devies",
  components: { cTable },
  props: {},
  
  data() {
    
    return {
      loaded: 0.0,
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
        }
      },

      errors: []
    };
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
        const response = await axios.get(this.$HostName + "/list/DEVICE?status=1&token=" + this.$AdminToken);
        this.deviceArray = response.data;
    },

    updatedDS(dNew) {
      this.dSelected = dNew;
    },
    updateLoaded(loaded,total) {
      this.loaded = (loaded/total) * 100;
    },
     async deploy() {

      var deviceIds = [];
      this.dSelected.forEach(element => {
        deviceIds.push(element["id"]); 
      });


      var formData = new FormData();
      formData.append("psafile", document.querySelector('#psaFile').files[0]);
      formData.append("text", $("#psaText").val());
      formData.append("devices", JSON.stringify(deviceIds));
      formData.append("writeMode", $('input[name=writeModeRadio]:checked').val());
      formData.append("duration", $("#psaNumber").val());


      var res = await axios({
        method: "post",
        url: this.$HostName + "/deploy/psa?token=" + this.$AdminToken,
        data: formData,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            console.log(progressEvent.loaded + ' ' + progressEvent.total);
            this.updateLoaded(progressEvent.loaded,progressEvent.total);
          }
          if (progressEvent.loaded == progressEvent.total) {
           setTimeout(() => {
             this.updateLoaded(0,progressEvent.total);
           }, 2000); 
          }
        }
      });
    }

  },

  async created() {
    this.loadItems();
    var socket = require("../../socket/websocket.js").socket;

    socket.on("device-disconnected", (message)=>{
          this.loadItems();
      });
    socket.on("new-connection", (message)=>{
          this.loadItems();
      });
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