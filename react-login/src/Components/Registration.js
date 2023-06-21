import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import mail from "./images/email.png";
import lock from "./images/lock.png";
import profile from "./images/icon.jpg";
import axios from 'axios';

function Registration() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const newCustomer = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        address,
        password,
      };
  
      try {
        const apiKey = '00f42346018b1cbf01e14597a3d6687e';
        const response = await axios.post('http://localhost:8000/customers', newCustomer,{
            headers: {
                Authorization: apiKey
            }
        });
        console.log('Customer registered successfully:', response.data);
        // Optionally, you can redirect the user to a different page after successful registration.
        // For example:
        // history.push('/login');
      } catch (error) {
        console.error('Error registering customer:', error);
      }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='main'>
                <div className='sub-main'>
                    <div>
                        <div>
                            <img src='https://media.licdn.com/dms/image/C560BAQG7B1BRq8jC0Q/company-logo_200_200/0/1678377072323?e=1693440000&v=beta&t=WzuH-7oIjl6cuGHpfGtc206_ANTcBZItfI68V0QJvsA' alt='Linkedin' className='logo' />
                            <h1 className='register'>Registration</h1>
                            <div>
                                <img src={profile} alt="emial" className='email' />
                                <input type="text" placeholder='Enter Name' className='fill' onChange={(e) => setFirstName(e.target.value)} />
                            </div>

                            <br />
                            <div>
                                <img src={profile} alt="emial" className='email' />
                                <input type="text" placeholder='Last Name' className='fill' onChange={(e) => setLastName(e.target.value)} />
                            </div>



                            <div className='mail-id'>
                                <img src={mail} alt="emial" className='email' />
                                <input type="email" placeholder='Enter Email-id' className='fill' onChange={(e) => setEmail(e.target.value)} />
                            </div>



                            <div className='mail-id'>
                                <img src={profile} alt="emial" className='email' />
                                <input type="number" placeholder='Enter Phone Number' className='fill' onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>



                            <div className='mail-id'>
                                <img src={mail} alt="emial" className='email' />
                                <input type="text" placeholder='Enter address' className='fill' onChange={(e) => setAddress(e.target.value)} />
                            </div>

                        

                            <div className='mail-id'>
                                <img src={lock} alt="emial" className='email' />
                                <input type="password" placeholder='Enter New Password' className='fill' onChange={(e) => setPassword(e.target.value)} />
                            </div>



                            <div className='login-btn'>
                                <button type="submit">Register</button>
                            </div>
                            <div className='reg-link'>
                                <p>If Account exist then</p><Link className='link' to='/login'><li>Login!!!</li></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Registration
