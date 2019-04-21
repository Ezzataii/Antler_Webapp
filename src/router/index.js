import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/pages/Admin'

// Containers
const DefaultContainer = () => import('@/container/DefaultContainer')

// Views
const Home = () => import('@/views/Home');
const RoutingImages = () => import('@/views/RoutingImages');
const RoutingCampaigns = () => import('@/views/RoutingCampaigns');
const RoutingGraphs = () => import('@/views/RoutingGraphs');
const Devices = () => import('@/views/Devices')
const SetupDevice = () => import("@/views/SetupDevice");
const Ads = () => import('@/views/Ads');
const Graphs = () => import('@/views/Graphs');
const Campaigns = () => import('@/views/Campaigns');
const MapG = () => import('@/views/Map');


Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      name: "Home",
      component: DefaultContainer,
      children: [
        {
          path: "",
          name: "",
          component: Home
        }, {
          path: "routing/ads",
          name: "Routing Ads",
          component: RoutingImages
        }, {
          path: "routing/campaigns",
          name: "Routing Campaigns",
          component: RoutingCampaigns
        }, {
          path: "routing/graphs",
          name: "Routing Graphs",
          component: RoutingGraphs
        }, {
          path: "devices",
          name: "Devices",
          component: Devices
        }, {
          path: "setup-device",
          name: "Setup Device",
          component: SetupDevice
        }, {   
          path: "images",
          name: "Images",
          component: Ads
        }, {   
          path: "graphs",
          name: "Graphs",
          component: Graphs
        }, {   
          path: "campaigns",
          name: "Campaigns",
          component: Campaigns
        }, {
          path: "map",
          name: "Map",
          component: MapG
        }, {
          path: "about",
          name: "About Us",
          component: Home
        }
      ]
    }
  ]
})
