const sidebarNav = [
    {
        link: '/',
        section: 'dashboard',
        icon: <i className='bx bx-home-alt'></i>,
        text: 'Dashboard',
        allowedUserTypes: [0, 1, 2]
    },
    {
        link: '/users',
        section: 'users',
        icon: <i className='bx bx-user'></i>,
        text: 'Users',
        allowedUserTypes: [0]
    },
    {
        link: '/transactions',
        section: 'transactions',
        icon: <i className='bx bx-receipt' ></i>,
        text: 'Transactions',
        allowedUserTypes: [0, 1, 2]
    },
    {
        link: '/category-type',
        section: 'category-type',
        icon: <i className='bx bx-cube'></i>,
        text: 'Category / Type',
        allowedUserTypes: [0, 1, 2]
    },
    {
        link: '/goods',
        section: 'goods',
        icon: <i className='bx bx-cube'></i>,
        text: 'Goods',
        allowedUserTypes: [0, 1, 2]
    },
    // {
    //     link: '/report',
    //     section: 'report',
    //     icon: <i className='bx bx-line-chart'></i>,
    //     text: 'Report',
    //     allowedUserTypes: [0, 1, 2]
    // },
    // {
    //     link: '/settings',
    //     section: 'settings',
    //     icon: <i className='bx bx-cog'></i>,
    //     text: 'Settings'
    // }
]

export default sidebarNav