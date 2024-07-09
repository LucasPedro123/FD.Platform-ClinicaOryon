import React from 'react';
import {   Routes, Route } from 'react-router-dom';
import  {Users}  from '../Pages/Users/Users.page';
import Email from '../Pages/Email/Email.page';

const AppRouter: React.FC = () => {
    return (
       
            <Routes>
                <Route path="/Users"  element={<Users/>} />
                <Route path="/EmailMarket"  element={<Email/>} />
            </Routes>
        
    );
};

export default AppRouter;
