export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: { variant: 'primary' }
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
      name: 'Displays & Ads',
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
      name: 'Other'
    },
    {
      name: 'Map',
      url: '/map',
      icon: 'fa fa-map',
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell'
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell'
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell'
        }
      ]
    },
    {
      name: 'About Us',
      url: '#',
      icon: 'fa fa-info',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: 'noopener' }
    }
  ]
}
