export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: { variant: 'primary' }
    },  
    {
      title: true,
      name: 'Routing',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Routing',
      url: '/Routing',
      icon: 'fa fa-plug',
      children: [ 
        {
          name: 'Routing Ads',
          url: '/routing/ads',
          icon: 'fa fa-plug',
        },
        {
          name: 'Routing Campaigns',
          url: '/routing/campaigns',
          icon: 'fa fa-plug',
        },
        {
          name: 'Routing Graphs',
          url: '/routing/graphs',
          icon: 'fa fa-plug',
        }
      ]
    },
    {
      title: true,
      name: 'Displays',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Displays',
      url: '/base',
      icon: 'fa fa-television',
      children: [
        {
          name: 'Setup Device',
          url: '/setup-device',
          icon: 'fa fa-cog'
        }, 
        {
          name: 'Devices',
          url: '/devices',
          icon: 'fa fa-television'
        },
        {
          name: 'Hosts',
          url: '/base/Hosts',
          icon: 'fa fa-user'
        },
        {
          name: 'Sites',
          url: '/base/Sites',
          icon: 'fa fa-map-marker'
        }
      ]
    },
    {
      title: true,
      name: 'Media',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Ads',
      url: '/Ads',
      icon: 'fa fa-picture-o',
      children: [
        {
          name: 'Images',
          url: '/images',
          icon: 'fa fa-picture-o'
        },
        {
          name: 'Campaigns',
          url: '/campaigns',
          icon: 'fa fa-picture-o'
        }
      ]
    },
    {
      name: 'Graphs',
      url: '/graphs',
      icon: 'fa fa-area-chart'
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Others'
    },
    {
      name: 'PSA',
      url: '/psa',
      icon: 'fa fa-warning'
    },
    {
      name: 'Map',
      url: '/map',
      icon: 'fa fa-map',
    },
    {
      name: 'About Us',
      url: '/about',
      icon: 'fa fa-info',
      class: 'mt-auto',
      variant: 'success'
    }
  ]
}
