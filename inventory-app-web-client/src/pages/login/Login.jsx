import React, { useState } from 'react'
import axios from 'axios'
import './login.scss'
import { images } from '../../constants'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setError('Email and password are required.');
                return false;
            }

            // Kirim permintaan login ke backend API
            const response = await axios.post('http://localhost:3030/auth/login', {
                email: email,
                password: password,
            });

            // Log seluruh respons untuk melihat strukturnya
            console.log(response.data);

            // Dapatkan informasi peran dari respons backend
            const userRole = response.data.Data.type
            const message = response.Message
            const token = response.data.Data.accessToken
            const name = response.data.Data.name
            const img = response.data.Data.picture
            
            if (userRole === 0 || userRole === 1 || userRole === 2 || userRole === 3) {
                console.log('Login Successful', response.data);
                
                // Jika login berhasil, mungkin Anda ingin menyimpan token atau informasi lainnya
                // Contoh: menyimpan token di localStorage
                localStorage.setItem('token', token)
                localStorage.setItem('type', userRole)
                localStorage.setItem('name', name)
                localStorage.setItem('img', img)

                // Redirect atau lakukan tindakan setelah login berhasil
                navigate('/')
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'You have successfully logged in.',
                });
            } else {
                // Tampilkan pesan kesalahan jika peran tidak valid
                setError('Unauthorized access. Invalid role.');
            }
            } catch (error) {
                // Tangani kesalahan yang mungkin terjadi selama proses login
                console.error('Login Error', error.response.data);

                // Tampilkan pesan kesalahan yang diterima dari backend
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed!',
                    text: 'Invalid username or password. Please try again.',
                });
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className='login'>
            <div className='container'>
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    <div className="input">
                        <img src={images.email} alt="" className="img-icon" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div className="input">
                        <img src={images.password} alt="" className="img-icon" />
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <span className="password-toggle" onClick={toggleShowPassword}>
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{ marginRight: '50px', color: '#D0D4CA' }} />
                        </span>
                    </div>
                </div>

                <div className="submit-container">
                    <div className="submit" onClick={handleLogin}>Login</div>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Login;
