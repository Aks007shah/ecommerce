import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function Register(props) {

    const {register, msg, setMsg} = useContext(AuthContext);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onHandleChange = (e) => {
        const {name, value} = e.target

        setUserData((prev)=> ({
            ...prev, [name]: value
        }))
    }

    const onHandleSubmit = (e) => {

        e.preventDefault();
        register(userData);
        setMsg(msg || "Registered Successfully")
    }

    



    return (
        <div className='container'>
            <h2 className='text-center text-danger'>Hi, Please Register</h2>
            {msg}
            <form action="" onSubmit={onHandleSubmit} className='form-control justify-content-center align-items-center hv p-2'>
                    <input onChange={onHandleChange} type="text" name='name' className='form-control my-2' placeholder='Enter Your Name'/>
                    <input onChange={onHandleChange} type="email" name='email' className='form-control my-2' placeholder='Enter Your Email Address'/>
                    <input onChange={onHandleChange} type="password" name='password' className='form-control my-2' placeholder='Enter Your Password'/>

                    <button className='btn btn-outline-danger m-1 '>Submit</button>
            </form>
        </div>
    );
}

export default Register;