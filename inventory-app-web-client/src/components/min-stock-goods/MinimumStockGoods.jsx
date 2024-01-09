import React, { useState, useEffect } from 'react'
import { data } from '../../constants'
import ProgressBar from '../progress-bar/ProgressBar'
import './min-stock-goods.scss'
import axios from 'axios'

const MinimumStockGoods = () => {
    const [minimumStock, setMinimumStock] = useState([])

    useEffect(() => {
        const fetchMinimumStock = async () => {
            try {
                const response = await axios.get('http://localhost:3030/dashboard/min-stock');
                setMinimumStock(response.data.Data);
                // console.log(response.data.Data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMinimumStock();
    }, [])

    return (
        <ul className='revenue-list'>
            {
                minimumStock.map((minimum, index) => (
                    <li className='revenue-list__item' key={`${index}`}>
                        <div className="revenue-list__item__title">
                            {minimum.name}
                            <span className={
                                `${minimum.stock < 50 ? 'txt-danger' : 'txt-success'}`
                            }>
                                {minimum.stock}
                            </span>
                        </div>
                        <div>
                            <ProgressBar value={minimum.stock} />
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default MinimumStockGoods