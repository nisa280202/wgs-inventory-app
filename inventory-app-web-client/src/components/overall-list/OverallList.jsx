import React, { useState, useEffect } from 'react'
import './overall-list.scss'
import { data } from '../../constants'
import axios from 'axios'

const icons = [
    <i className='bx bx-receipt'></i>,
    <i className='bx bx-user'></i>,
    <i className='bx bx-cube'></i>,
    <i className='bx bx-dollar'></i>
]

const OverallList = () => {
    const [totalSenderRecipient, setTotalSenderRecipient] = useState([])

    useEffect(() => {
        const fetchTotalSenderRecipient = async () => {
            try {
                const response = await axios.get('http://localhost:3030/dashboard/total-sender-recipient');
                setTotalSenderRecipient(response.data.Data[0]);
                // console.log(response.data.Data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTotalSenderRecipient();
    }, [])

    return (
        <ul className='overall-list'>
            <li className='overall-list__item'>
                <div className="overall-list__item__icon">
                    {icons[1]}
                </div>
                <div className="overall-list__item__info">
                    <div className="title">
                        {totalSenderRecipient.total_recipients}
                    </div>
                    <span>Customers</span>
                </div>
            </li>

            <li className='overall-list__item'>
                <div className="overall-list__item__icon">
                    {icons[0]}
                </div>
                <div className="overall-list__item__info">
                    <div className="title">
                        {totalSenderRecipient.total_senders}
                    </div>
                    <span>Suppliers</span>
                </div>
            </li>
        </ul>
    )
}

export default OverallList