import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from '../Components/Sidebar/Sidebar.component';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Sidebar/>
            <Routes>
                <Route path="/" element={<div>Home</div>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
