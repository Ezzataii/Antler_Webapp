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
      <b-button size="lg" variant="outline-primary" block @click="addDevice">AddDevice</b-button>
    </b-card>

  </div>
</template>

<script>
import axios from "axios";
import cTable from "@/components/Table.vue";

export default {
  name: "SetupDevice",
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
        auth: {
          label: 'Authentication Status',
          sortable: true
        }
      },

      errors: []
    };
  },
  methods: {
    async loadItems() {
        const response = await axios.get(this.$HostName + "/list/DEVICE?auth=0&token=" + this.$AdminToken);
        this.deviceArray = response.data;
    },

    async addDevice() {
      const response = await axios.get(this.$HostName + "/insert/DEVICE?&token=" + this.$AdminToken);
      
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
