<template>
  <div class="animated fadeIn">
    <b-card no-body>
      <b-row>
        <b-col lg="6">
          <c-table :table-data="groupArray" :fields="GroupFields" :per-page="10"
          hover striped bordered small fixed caption="Campaigns" fa="fa fa-picture-o"
          v-on:selected="updatedGS($event)" v-on:refresh="loadItems()"></c-table>
          <b-button size="lg" variant="primary" block @click="getAdsInGroup">Show Ads</b-button>  
        </b-col>

        <b-col lg="6">
          <c-table :table-data="adGroupArray" :fields="Adfields" :per-page="10"
          hover striped bordered small fixed caption="Ads in Campaign" fa="fa fa-picture-o"
          v-on:refresh="loadItems()"></c-table>
        </b-col>
      </b-row>
    </b-card> 

    <b-row>
      <b-col lg="12">
      <b-card>
          <b-collapse visible id="collapse3">   
            <c-table :table-data="adArray" :fields="Adfields" :per-page="10"
            hover striped bordered small fixed caption="Ads" fa="fa fa-picture-o"
            v-on:selected="updatedAS($event)" v-on:refresh="loadItems()"></c-table>    
          </b-collapse>

          <b-container-fluid>
            <b-form-group label="Enter Campaign Name" label-for="adsDuration" :label-cols="1" :horizontal="true">
              <b-form-input id="groupNameInput" type="text" autocomplete="name"></b-form-input>
            </b-form-group>
            <b-button size="lg" variant="primary" block @click="putAdsInGroup">Add to Campaign</b-button>
          </b-container-fluid>       
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>

<script>
import axios from "axios";
import cTable from "@/components/Table.vue";

export default {
  name: "Campaigns",
  components: { cTable },
  props: {},

  data() {
    return {
      aSelected: [], 
      gSelected: [],
      show: true,

      adArray: [],
      adGroupArray: [],
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

    updatedGS(gNew) {
      this.gSelected = gNew;
    },

    async loadItems() {
      var response;
      response = await axios.get(this.$HostName + "/list/ADS?token=" + this.$AdminToken);
      this.adArray = response.data;

      response = await axios.get(this.$HostName + "/get/groups?userid=45&token=" + this.$AdminToken);
      this.groupArray = response.data;
    },


    async getAdsInGroup(e) {
      e.preventDefault();
      var response = await axios.get(this.$HostName + "/get/ads?groupid=" + this.gSelected[0].groupid + "&token=" + this.$AdminToken);
      this.adGroupArray = response.data;
      
      console.log(response.data);
      //this.loadItems();
    },
    
    async putAdsInGroup(e) {
      e.preventDefault();
  
      var adIds = [];
      this.aSelected.forEach(element => {
        adIds.push(element["id"]); 
      });

      var json = {
        parameters: {
          ads: adIds,
          group: document.querySelector("#groupNameInput").value
        }
      }

      console.log(json);

      var res = await axios({
        method: "post",
        data: json,
        url: this.$HostName + "/add/group?userid=45&token=" + this.$AdminToken,
        config: { headers: {'Content-Type': 'application/json' }}
      })


      this.loadItems();
    },

    onReset(e) {
      e.preventDefault;
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
