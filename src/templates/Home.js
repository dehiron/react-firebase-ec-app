import React from 'react';
import {getUserId} from "../reducks/users/selectors";
import {getUserName} from "../reducks/users/selectors";
import {useSelector} from "react-redux";


const Home = () => {
    
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const username = getUserName(selector);

    return (
        <div>
            <h2>home</h2>
            <p>ユーザーID：{uid}</p>
            <p>ユーザー名：{username}</p>
        </div>

    )
}

export default Home;