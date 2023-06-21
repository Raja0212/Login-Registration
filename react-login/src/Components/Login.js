import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import emailbox from "./images/email.png";
import lock from "./images/lock.png";
import profile from "./images/icon.jpg";
import axios from 'axios';
// import Home from './Home';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();



        try {

            const apiKey = '00f42346018b1cbf01e14597a3d6687e';
            const response = await axios.get('http://localhost:8000/customers', {
                headers: {
                    Authorization: apiKey
                }
            });
            const customers = response.data;

            // Find the customer with matching email and password
            const matchedCustomer = customers.find(
                (customer) => customer.email === email && customer.password === password
            );


            if (matchedCustomer) {
               
                // navigate('/home');
                console.log('Login successful!');
                
            } else {
                // Login failed
                console.log('Invalid email or password!');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    console.log('Invalid API key');
                }
            } else {
                console.error('Error retrieving customer data', error);
            }
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <div className='imgs'>
                            <div className='container-image'>
                                <img src={profile} alt='profile' className='profile' />
                            </div>
                        </div>
                        <div>
                            <h1 className='LHeader'>Login</h1>
                            <div>
                                <img src={emailbox} alt="emial" className='email' />
                                <input type="email" placeholder='Enter Email-id' className='fill' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='second-input'>
                                <img src={lock} alt='password' className='email' />
                                <input type="password" placeholder='Enter Password' className='fill' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='login-btn'>
                                <button type="submit">Login</button>
                            </div>
                            <div className='reg-link'>
                                <Link className='link' to='/registration'>
                                    <li>Register Now</li>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Login
