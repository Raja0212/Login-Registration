import React from 'react'
import 'react-router-dom'
import Logo from "./images/Logo.png";

function Home() {
    return (
        <div className='padding'>
            <p style={{color:"teal", fontFamily:"serif",fontSize:"30px"}}>Welcome to !!! </p>
            <img src={Logo} alt='profile' className='image'/>
            <p style={{color:"teal", fontFamily:"serif",fontSize:"30px"}}>Technology</p>
        </div>
    )
}

export default Home