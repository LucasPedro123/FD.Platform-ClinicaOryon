import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Users } from '../Pages/Users/Users.page';
import Email from '../Pages/Email/Email.page';
import Auth from '../Pages/Auth/Auth.page';
import { LoggedIn } from '../Context/LoggedIn.context';
import {Error} from '../Pages/Error/Error.page';



const AppRouter: React.FC = () => {
    const context = useContext(LoggedIn);

    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/unauthorized" element={<Error typeError="401"/>} />
            <Route path="/Users" element={context?.loggedIn ? <Users /> :<Navigate to="/unauthorized" />} />
            <Route path="/EmailMarket" element={context?.loggedIn ? <Email /> :<Navigate to="/unauthorized" />} />
            <Route path="*" element={<Error typeError="404"/>} />
        </Routes>
    );
};

export default AppRouter;
