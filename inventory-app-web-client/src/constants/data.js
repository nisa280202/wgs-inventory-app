import images from "./images"

const data = {
    user: {
        name: 'Nisa Alivia',
        img: images.avt
    },
    summary: [
        {
            title: 'Goods',
            subtitle: 'Total all goods',
            // value: '$1.000',
            percent: 70
        },
        {
            title: 'Transactions',    
            subtitle: 'Total all transactions',
            // value: '3000',
            percent: 49
        },
        {
            title: 'User',
            subtitle: 'Total all users',
            // value: '$678',
            percent: 38
        },
        {
            title: 'Category',
            subtitle: 'Total all category',
            // value: '2345',
            percent: 55
        },
        {
            title: 'Supplier',
            subtitle: 'Active suppliers',
            // value: '2345',
            percent: 55
        },
        {
            title: 'Customer',
            subtitle: 'Active customers',
            // value: '2345',
            percent: 55
        }
    ],
    revenueSummary: {
        title: 'Revenue',
        value: '$678',
        chartData: {
            labels: ['May', 'Jun', 'July', 'Aug', 'May', 'Jun', 'July', 'Aug'],
            data: [300, 300, 280, 380, 200, 300, 280, 350]
        }
    },
    overall: [
        {
            value: '9.876K',
            title: 'Customers'
        },
        {
            value: '1.234K',
            title: 'Goods'
        },
        {
            value: '300K',
            title: 'Transactions'
        },
        {
            value: '$5678',
            title: 'Revenue'
        }
    ],
    revenueByChannel: [
        {
            title: 'Direct',
            value: 70
        },
        {
            title: 'External search',
            value: 40
        },
        {
            title: 'Referal',
            value: 60
        },
        {
            title: 'Social',
            value: 30
        }
    ],
    revenueByMonths: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
        data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350]
    }
}

export default data