<template>
  <b-card> 
    <div slot="header"><i :class="fa"></i> {{caption}}
    </div>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"/>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>

        <b-button variant="outline-primary" @click="refresh">Refresh List</b-button>
      </b-row>
    </b-container>

    <br>

    <b-table
      :dark="dark" :hover="hover" :striped="striped" :bordered="bordered" :small="small"
      :fixed="fixed"
      responsive="sm"
      :items="items"
      :fields="fields"
      :filter="filter"
      @filtered="onFiltered"
      :current-page="currentPage"
      :per-page="perPage"
      selectable
      @row-selected="rowSelected"
      :select-mode="selectMode"
      selectedVariant="primary"
    >>
      <template slot="status" slot-scope="data">
        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
      </template>
    </b-table>

    <nav>
      <b-pagination
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
        prev-text="Prev"
        next-text="Next"
        hide-goto-end-buttons
      />
    </nav>

    <!-- {{ selected }} -->
  </b-card>
</template>

<script>


export default {
  name: 'c-table',
  inheritAttrs: false,
  props: {
    fa: {
      type: String
    },
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      required: true
    },
    fields: {
      type: Object,
      required: true
    },
    perPage: {
      type: Number,
      default: 5
    },
    dark: {
      type: Boolean,
      default: false
    },


  },

  data: () => {
    return {
      selected: [],
      selectMode: 'Mode',

      filter: null,
      
      currentPage: 1,
      

      errors: []
    }
  },
  computed: {
    items: function() {
      const items =  this.tableData
      return Array.isArray(items) ? items : items()
    },
    totalRows: function () { return this.getRowCount() },
    captions: function() { return this.fields },

    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },

  methods: {
    refresh() {
      this.$emit("refresh");
    },
    rowSelected(items) {
      this.selected = items;
      this.$emit("selected", this.selected);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount: function () {
      return this.items.length
    }
  }
}
</script>
