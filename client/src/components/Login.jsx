import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function Login(props) {

    const {login, msg, setMsg} = useContext(AuthContext)

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    })



    const onHandleChange = (e) => {
            const {name, value} = e.target

            setUserData((prev)=> ({
                ...prev, [name]: value
            }))
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        login(userData);
        setMsg(msg || "Login Successful")
    }


    return (
        <div className='container'>
            <h2 className='text-center text-success'>Welcome Back, Please Login!</h2>
            {msg}
            <form action="" onSubmit={onHandleSubmit} className='form-control hv p-2'>
                    <input onChange={onHandleChange} type="text" name='name' className='form-control my-2' placeholder='Enter Your Name'/>
                    <input onChange={onHandleChange} type="email" name='email' className='form-control my-2' placeholder='Enter Your Email Address'/>
                    <input onChange={onHandleChange} type="password" name='password' className='form-control my-2' placeholder='Enter Your Password'/>
                    <button className='btn btn-outline-success m-1'>Submit</button>
            </form>
        </div>
    );
}

export default Login;