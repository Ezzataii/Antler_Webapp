<template>
  <div class="animated fadeIn">
    <!-- Table -->
    <b-row>
      <b-col lg="12">
        <c-table :table-data="graphArray" :fields="graphfields" :per-page="10"
        hover striped bordered small fixed caption="Graphs" fa="fa fa-picture-o"
        v-on:selected="updatedGS($event)" v-on:refresh="loadItems()"></c-table>
      </b-col>
    </b-row>
   
    <!-- Update Duration -->
    <b-row>
      <b-col lg="6" sm="6">
        <b-card no-body v-if="show">
          <div slot="header">
            <i class="fa fa-clock-o"></i> Change Selected Graphs' Duration
            <div class="card-header-actions">
              <b-link class="card-header-action btn-minimize" v-b-toggle.collapse2>
                <i class="icon-arrow-up"></i>
              </b-link>
            </div>
          </div>

          <b-collapse visible id="collapse2">
            <b-card-body>
              <b-form @submit="onChangeDurationSubmit" @reset="onReset" v-if="show">

                <b-form-group label="Enter Graphs' Duration" label-for="graphsDuration" :label-cols="3" :horizontal="true">
                  <b-form-input id="graphDuration" type="number" autocomplete="name"></b-form-input>
                </b-form-group>
                
                <div slot="footer">
                  <b-button type="submit" size="sm" variant="primary">
                    <i class="fa fa-dot-circle-o"></i> Upload
                  </b-button>

                  <b-button type="reset" size="sm" variant="danger">
                    <i class="fa fa-ban"></i> Reset
                  </b-button>
                </div>
              </b-form>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
    



     <!-- Upload Graph -->
    
      <b-col lg="6" sm="6">
        <b-card no-body v-if="show">
          <div slot="header">
            <i class="fa fa-upload"></i> Upload Graph
            <div class="card-header-actions">
              <b-link class="card-header-action btn-minimize" v-b-toggle.collapse1>
                <i class="icon-arrow-up"></i>
              </b-link>
            </div>
          </div>

          <b-collapse visible id="collapse1">
            <b-card-body>
              <b-form @submit="onUploadGraphSubmit" @reset="onReset" v-if="show">
                <b-form-group label="File input (CSV)" label-for="fileInput" :label-cols="3" :horizontal="true">
                  <b-form-file id="fileInput" :plain="true"></b-form-file>
                </b-form-group>

                <div slot="footer">
                  <b-button type="submit" size="sm" variant="primary">
                    <i class="fa fa-dot-circle-o"></i> Upload
                  </b-button>

                  <b-button type="reset" size="sm" variant="danger">
                    <i class="fa fa-ban"></i> Reset
                  </b-button>
                  <b-progress :max="100" :value="loaded" show-progress animated></b-progress>
                </div>
              </b-form>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>


    <b-card>
      <div slot="header">
        <strong>Control</strong>
      </div>
      <b-button size="lg" variant="outline-danger" block @click="deleteGraphs">Delete Graphs</b-button>
    </b-card>


  </div>
</template>

<script>
import axios from "axios";
import cTable from "@/components/Table.vue";

export default {
  name: "Graph",
  components: { cTable },
  props: {},

  data() {
    return {
      loaded: 0.0,
      gSelected: [], 
      show: true,

      graphArray: [],

      graphfields: {
        id: {
          label: "Graph ID",
          sortable: true
        },
        name: {
          label: "Graph Name",
          sortable: true
        },
        user: {
          label: "Graph Company",
          sortable: true
        },
        duration: {
          label: 'Duration',
          sortable: true
        }
      }    
    };
  },
  methods: {
    updatedGS(aNew) {
      this.gSelected = aNew;
    },
    updateLoaded(loaded,total) {
      this.loaded = (loaded/total) * 100;
    },
    async loadItems() {
      const response = await axios.get(this.$HostName + "/list/GRAPHS?token=" + this.$AdminToken);
      this.graphArray = response.data;
    },


    
    async onUploadGraphSubmit(e) {
      e.preventDefault();
      var url = this.$HostName + "/upload/csv?user=45&token=" + this.$AdminToken;

      var formData = new FormData();
      var imagefile = document.querySelector('#fileInput');
      formData.append("csvfile", imagefile.files[0]);
      var res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
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
      })

      this.loadItems();
    },

    onReset(e) {
      e.preventDefault;
    },



    async onChangeDurationSubmit(e) {
      var graphIds = [];
      this.gSelected.forEach(element => {
        graphIds.push(element["id"]); 
      });

      var json = {
        parameters: {
          graphs: graphIds,
          duration: document.querySelector("#graphDuration").value
        }
      }
      console.log(json);
      var res = await axios({
        method: "put",
        url: this.$HostName + "/update/graphs/duration?token=" + this.$AdminToken,
        data: json,
        config: { headers: {'Content-Type': 'application/json' }}
      })

      this.loadItems();
    },


    async deleteGraphs() {
      var graphIds = [];
      this.gSelected.forEach(element => {
        graphIds.push(element["id"]); 
      });

      var json = {
        parameters: {
          graphs: graphIds
        }
      }

      const res = await axios({
        method: "post",
        url: this.$HostName + "/delete/GRAPH?token=" + this.$AdminToken,
        data: json,
        config: { headers: {'Content-Type': 'application/json' }}
      })

      this.loadItems();
    }
  },

  async created() {
    this.loadItems();
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
