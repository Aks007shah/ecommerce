import React from 'react';

function Unauthorized(props) {
    return (
        <div>
            <h1 className='text-center text-danger'>You are UnAuthorized User</h1>
            <p className='text-center text-secondary'>Only Admin can access this Page</p>
        </div>
    );
}

export default Unauthorized;