import React from 'react';
import Layout from './components/Layout';
import Apply from './components/license/Apply'
import Renew from './components/license/Renew'
import { Routes, Route } from 'react-router-dom';
import MyDl from './components/accountInfo/MyDl';
import AccManagement from './components/accountInfo/AccManagement';
import PdlApplication from './components/newDrivers/PdlApplication';
import TestBooking from './components/newDrivers/TestBooking';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<h1>WELCOME</h1>}/>
                <Route path="/home" element={<h1>TO ARENA</h1>}/>
                {/* Account Info */}
                <Route path="/my-dl" element={<MyDl />}/>
                <Route path="/account-management" element={<AccManagement />}/>
                {/* License */}
                <Route path="/apply-for-smart-dl" element={<Apply />} />
                <Route path="/renew-dl" element={<Renew />} />
                {/* New Drivers */}
                <Route path="/pdl-application" element={<PdlApplication />}/>
                <Route path="/test-booking" element={<TestBooking />}/>
            </Routes>
        </Layout>
    );
}

export default App;
