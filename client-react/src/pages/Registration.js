import React from 'react';

const Registration = () => {
    return (
        <div>
            <form>
                <input type={'text'} placeholder={'Write your email'}/>
                <input type={'password'} placeholder={'Write your password'}/>
                <input type={'text'} placeholder={'Write first name and full name'}/>
                <input type={'text'} placeholder={'Write phone'}/>
            </form>
        </div>
    );
};

export default Registration;