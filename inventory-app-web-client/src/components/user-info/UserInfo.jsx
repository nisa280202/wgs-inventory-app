import React from 'react'
import './user-info.scss'
import { images } from '../../constants'

const UserInfo = () => {
    const name = localStorage.getItem('name')
    const img = localStorage.getItem('img')

    return (
        <div className='user-info'>
            <div className="user-info__img">
                <img src={img == null ? images.defaultImage : `http://localhost:3030/uploads/${img}`} alt='user' />
            </div>
            <div className="user-info__name">
                <span>{name}</span>
            </div>
        </div>
    )
}

export default UserInfo