import React,{ useEffect } from 'react';
import {useHistory} from 'react-router-dom';

const Logout = () => {
    let history = useHistory();
    
    useEffect(() => {
        localStorage.removeItem('userInfo');
        history.push('/login'); 
    }); 
    return (<></>);
};
export default Logout; 