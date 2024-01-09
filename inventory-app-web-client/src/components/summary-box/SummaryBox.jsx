import React, { useState, useEffect } from 'react'
import './summary-box.scss'
import Box from '../box/Box'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import { colors, data } from '../../constants'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import { FaBox, FaMoneyBillWave, FaUsers, FaStore, FaTools, FaUserFriends } from 'react-icons/fa';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register (
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const SummaryBox = () => {
    const [countGoods, setCountGoods] = useState([])
    const [countTransaction, setCountTransaction] = useState([])
    const [countUser, setCountUser] = useState([])
    const [countCategory, setCountCategory] = useState([])
    const [countSender, setCountSender] = useState([])
    const [countRecipient, setCountRecipient] = useState([])

    useEffect(() => {
        const fetchGoods = async () => {
            try {
                const response = await axios.get('http://localhost:3030/dashboard/goods');
                setCountGoods(response.data.Data[0]);
                // console.log(response.data.Data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchGoods();
    }, [])

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await axios.get('http://localhost:3030/dashboard/transaction');
                setCountTransaction(response.data.Data[0]);
                // console.log(response.data.Data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTransaction();
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3030/dashboard/user');
                setCountUser(response.data.Data[0]);
                // console.log(response.data.Data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [])

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get('http://localhost:3030/dashboard/category');
                setCountCategory(response.data.Data[0]);
                // console.log(response.data.Data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategory();
    }, [])

    useEffect(() => {
        const fetchSender = async () => {
            try {
                const response = await axios.get('http://localhost:3030/dashboard/sender');
                setCountSender(response.data.Data[0]);
                // console.log(response.data.Data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchSender();
    }, [])

    useEffect(() => {
        const fetchRecipient = async () => {
            try {
                const response = await axios.get('http://localhost:3030/dashboard/recipient');
                setCountRecipient(response.data.Data[0]);
                // console.log(response.data.Data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecipient();
    }, [])

    return (
        <div className='box-container'>
            <div className="row">
                <Box>
                    <div className='summary-box'>
                        <div className="summary-box__icon">
                            <FaBox size={30} />
                        </div>
                        <div className="summary-box__info">
                            <div className="summary-box__info__title">
                                <div>{data.summary[0].title}</div>
                                <span>{data.summary[0].subtitle}</span>
                            </div>

                            <div className="summary-box__info__value">
                                {countGoods.count}
                            </div>
                        </div>
                    </div>
                </Box>

                <Box>
                    <div className='summary-box'>
                        <div className="summary-box__icon">
                            <FaMoneyBillWave size={30} />
                        </div>
                        <div className="summary-box__info">
                            <div className="summary-box__info__title">
                                <div>{data.summary[1].title}</div>
                                <span>{data.summary[1].subtitle}</span>
                            </div>

                            <div className="summary-box__info__value">
                                {countTransaction.count}
                            </div>
                        </div>
                    </div>
                </Box>

                <Box>
                    <div className='summary-box'>
                        <div className="summary-box__icon">
                            <FaStore size={30} />
                        </div>
                        <div className="summary-box__info">
                            <div className="summary-box__info__title">
                                <div>{data.summary[4].title}</div>
                                <span>{data.summary[4].subtitle}</span>
                            </div>

                            <div className="summary-box__info__value" style={{ fontSize: '15px' }}>
                                {countSender.sender}
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
            
            <div className="row">
                <Box>
                    <div className='summary-box'>
                        <div className="summary-box__icon">
                            <FaUsers size={30} />
                        </div>
                        <div className="summary-box__info">
                            <div className="summary-box__info__title">
                                <div>{data.summary[2].title}</div>
                                <span>{data.summary[2].subtitle}</span>
                            </div>

                            <div className="summary-box__info__value">
                                {countUser.count}
                            </div>
                        </div>
                    </div>
                </Box>

                <Box>
                    <div className='summary-box'>
                        <div className="summary-box__icon">
                            <FaTools size={30} />
                        </div>
                        <div className="summary-box__info">
                            <div className="summary-box__info__title">
                                <div>{data.summary[3].title}</div>
                                <span>{data.summary[3].subtitle}</span>
                            </div>

                            <div className="summary-box__info__value">
                                {countCategory.count}
                            </div>
                        </div>
                    </div>
                </Box>

                <Box>
                    <div className='summary-box'>
                        <div className="summary-box__icon">
                            <FaUserFriends size={30} />
                        </div>
                        <div className="summary-box__info">
                            <div className="summary-box__info__title">
                                <div>{data.summary[5].title}</div>
                                <span>{data.summary[5].subtitle}</span>
                            </div>

                            <div className="summary-box__info__value" style={{ fontSize: '15px' }}>
                                {countRecipient.recipient}
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    )
}
                
            {/* </div> */}
        {/* </Box> */}


export default SummaryBox

export const SummaryBoxSpecial = ({ item }) => {
    const chartOptions = {
        responsive: true,
        scales: {
            xAxis: {
                display: false
            },
            yAxis: {
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        elements: {
            point: {
                radius: 0
            }
        }
    }

    const chartData = {
        labels: item.chartData.labels,
        datasets: [
            {
                label: 'Revenue',
                data: item.chartData.data,
                borderColor: '#fff',
                tension: 0.5
            }
        ]
    }

    return (
        <Box purple fullheight>
            <div className="summary-box-special">
                <div className="summary-box-special__title">
                    {item.title}
                </div>
                <div className="summary-box-special__value">
                    {item.value}
                </div>
                <div className="summary-box-special__chart">
                    <Line options={chartOptions} data={chartData} width={`250px`} />
                </div>
            </div>
        </Box>
    )
}