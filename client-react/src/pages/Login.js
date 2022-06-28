import React from 'react';

const Login = () => {
    return (
        <div>
            <form>
                <input type={'text'} placeholder={'Write your email'}/>
                <input type={'password'} placeholder={'Write your password'}/>
            </form>
        </div>
    );
};

export default Login;