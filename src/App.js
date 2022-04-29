import React from 'react';
import Layout from './components/Layout';
import Apply from './components/Apply'
import Renew from './components/Renew'
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<h1>WELCOME</h1>}/>
                <Route path="/home" element={<h1>TO ARENA</h1>}/>
                {/* Account Info */}
                <Route path="/my-dl" element={<h1>MY DL</h1>}/>
                <Route path="/account-management" element={<h1>ACCOUNT MANAGEMENT</h1>}/>
                {/* License */}
                <Route path="/apply-for-smart-dl" element={<Apply />} />
                <Route path="/renew-dl" element={<Renew />} />
                {/* New Drivers */}
                <Route path="/pdl-application" element={<h1>APPLICATION FOR PDL</h1>}/>
                <Route path="/test-booking" element={<h1>TEST BOOKING</h1>}/>
            </Routes>
        </Layout>
    );
}

export default App;
