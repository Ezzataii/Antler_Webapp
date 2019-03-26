<template>
  <div class="animated fadeIn">
    <!-- Table -->
    <b-row>
      <b-col lg="12">
      <b-card no-body v-if="show">
        <div slot="header">
          <i class="fa fa-clock-o"></i> Ads
          <div class="card-header-actions">
            <b-link class="card-header-action btn-minimize" v-b-toggle.collapse3>
              <i class="icon-arrow-up"></i>
            </b-link>
          </div>
        </div>

          <b-collapse visible id="collapse3">   
            <c-table :table-data="adArray" :fields="Adfields" :per-page="10"
            hover striped bordered small fixed caption="Ads" fa="fa fa-picture-o"
            v-on:selected="updatedAS($event)" v-on:refresh="loadItems()"></c-table>    
          </b-collapse>

        </b-card>
      </b-col>
    </b-row>



    <b-row>
      <b-col lg="6">
        <c-table :table-data="adArray" :fields="Adfields" :per-page="10"
        hover striped bordered small fixed caption="Ads" fa="fa fa-picture-o"
        v-on:selected="updatedAS($event)" v-on:refresh="loadItems()"></c-table>
      </b-col>

      <b-col lg="6">
        <c-table :table-data="groupArray" :fields="GroupFields" :per-page="10"
        hover striped bordered small fixed caption="Groups" fa="fa fa-picture-o"
        v-on:selected="updatedAS($event)" v-on:refresh="loadItems()"></c-table>
      </b-col>
    </b-row>
   
    <!-- Update Duration -->
    <b-row>
      <b-col lg="6" sm="6">
        <b-card no-body v-if="show">
          <div slot="header">
            <i class="fa fa-clock-o"></i> Change Selected Ads' Duration
            <div class="card-header-actions">
              <b-link class="card-header-action btn-minimize" v-b-toggle.collapse2>
                <i class="icon-arrow-up"></i>
              </b-link>
            </div>
          </div>

          <b-collapse visible id="collapse2">
            <b-card-body>
              <b-form @submit="onChangeDurationSubmit" @reset="onReset" v-if="show">

                <b-form-group label="Enter Ads' Duration" label-for="adsDuration" :label-cols="3" :horizontal="true">
                  <b-form-input id="adDuration" type="number" autocomplete="name"></b-form-input>
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
    



     <!-- Upload Image -->
    
      <b-col lg="6" sm="6">
        <b-card no-body v-if="show">
          <div slot="header">
            <i class="fa fa-upload"></i> Upload Ad
            <div class="card-header-actions">
              <b-link class="card-header-action btn-minimize" v-b-toggle.collapse1>
                <i class="icon-arrow-up"></i>
              </b-link>
            </div>
          </div>

          <b-collapse visible id="collapse1">
            <b-card-body>
              <b-form @submit="onUploadAdSubmit" @reset="onReset" v-if="show">
                <!-- AD NAME -->
                <!-- <b-form-group label="Enter Ad Name" label-for="adName" :label-cols="3" :horizontal="true">
                <b-form-input id="adName" type="text" autocomplete="name"></b-form-input>
                </b-form-group>-->
                <b-form-group label="File input" label-for="fileInput" :label-cols="3" :horizontal="true">
                  <b-form-file id="fileInput" :plain="true"></b-form-file>
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
    </b-row>


    <b-card>
      <div slot="header">
        <strong>Control</strong>
      </div>
      <b-button size="lg" variant="outline-danger" block @click="deleteAds">Delete Ads</b-button>
    </b-card>


  </div>
</template>

<script>
import axios from "axios";
import cTable from "@/components/Table.vue";

export default {
  name: "Ads",
  components: { cTable },
  props: {},

  data() {
    return {
      aSelected: [], 
      show: true,

      adArray: [],
      groupArray: [],

      Adfields: {
        id: {
          label: "Ad ID",
          sortable: true
        },
        name: {
          label: "Ad Name",
          sortable: true
        },
        user: {
          label: "Ad Company",
          sortable: true
        },
        duration: {
          label: 'Duration',
          sortable: true
        }
      },   

      GroupFields: {
        groupid: {
          label: "Group ID",
          sortable: true
        },
        name: {
          label: "name",
          sortable: true
        }
      }
    };
  },
  methods: {
    updatedAS(aNew) {
      this.aSelected = aNew;
    },

    async loadItems() {
      var response;
      response = await axios.get(this.$HostName + "/list/ADS?token=" + this.$AdminToken);
      this.adArray = response.data;

      response = await axios.get(this.$HostName + "/get/groups?userid=45&token=" + this.$AdminToken);
      this.groupArray = response.data;
    },


    
    async onUploadAdSubmit(e) {
      e.preventDefault();
      var url = this.$HostName + "/upload/ad?user=45&token=" + this.$AdminToken;

      var formData = new FormData();
      var imagefile = document.querySelector('#fileInput');
      formData.append("filetoupload", imagefile.files[0]);
      var res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      this.loadItems();
    },

    onReset(e) {
      e.preventDefault;
    },



    async onChangeDurationSubmit(e) {
      console.log("test");
      var adIds = [];
      this.aSelected.forEach(element => {
        adIds.push(element["id"]); 
      });

      var json = {
        parameters: {
          images: adIds,
          duration: document.querySelector("#adDuration").value
        }
      }
      console.log(json);
      var res = await axios({
        method: "put",
        url: this.$HostName + "/update/ads/duration?token=" + this.$AdminToken,
        data: json,
        config: { headers: {'Content-Type': 'application/json' }}
      })

      this.loadItems();
    },


    async deleteAds() {
      var adIds = [];
      this.aSelected.forEach(element => {
        adIds.push(element["id"]); 
      });

      var json = {
        parameters: {
          ads: adIds
        }
      }

      const res = await axios({
        method: "post",
        url: this.$HostName + "/delete/AD?token=" + this.$AdminToken,
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
