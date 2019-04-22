import Vue from "vue";
import Router from "vue-router";

//pages
const Login = () => import("@/pages/Login");
const Register = () => import("@/pages/Register");
const Page404 = () => import("@/pages/Page404");
const Page500 = () => import("@/pages/Page500");
// Containers
const DefaultContainer = () => import("@/container/DefaultContainer");

// Views
const Home = () => import("@/views/Home");
const RoutingImages = () => import("@/views/RoutingImages");
const RoutingCampaigns = () => import("@/views/RoutingCampaigns");
const RoutingGraphs = () => import("@/views/RoutingGraphs");
const Devices = () => import("@/views/Devices");
const SetupDevice = () => import("@/views/SetupDevice");
const Ads = () => import("@/views/Ads");
const Graphs = () => import("@/views/Graphs");
const Campaigns = () => import("@/views/Campaigns");
const MapG = () => import("@/views/Map");

Vue.use(Router);

let router = new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  // linkActiveClass: "open active",
  // base: __dirname,
  // scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login

    }
    ,
    {
      path: "/login",
      name: "login",
      component: Login
   
    },
    {
      path: "/register",
      name: "register",
      component: Register,

    },
    {
      path: "/home",
      name: "Home",
      component: DefaultContainer,
     
      children: [
        {
          path: "",
          name: "",
          component: Home
        },
        {
          path:"/routing/ads",
     
          name: "Routing Ads",
          
          component: RoutingImages
        },
        {
          path: "/routing/campaigns",
          name: "Routing Campaigns",
          component: RoutingCampaigns
        },
        {
          path: "/routing/graphs",
          name: "Routing Graphs",
          component: RoutingGraphs
        },
        {
          path: "/devices",
          name: "Devices",
          component: Devices
        },
        {
          path: "/setup-device",
          name: "Setup Device",
          component: SetupDevice
        },
        {
          path: "/images",
          name: "Images",
          component: Ads
        },
        {
          path: "/graphs",
          name: "Graphs",
          component: Graphs
        },
        {
          path: "/campaigns",
          name: "Campaigns",
          component: Campaigns
        },
        {
          path: "/map",
          name: "Map",
          component: MapG
        },
        {
          path: "/about",
          name: "About Us",
          component: Home
        },
        {
          name: 'Hosts',
          path: '/base/Hosts',
          component:Page404
        },
        {
          name: 'Sites',
          path: '/base/Sites',
          component:Page500
        },
        {
          name: 'Alerts',
          path: '/notifications/alerts',
          component:Page404
        },
        {
          name: 'Badges',
          path: '/notifications/badges',
          component:Page404
        },
        {
          name: 'Modals',
          path: '/notifications/modals',
          component:Page404
        }
      ]
    }
  ]
});


export default router;
