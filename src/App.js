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
                <Route path="/apply-for-smart-dl" element={<Apply />} />
                <Route path="/renew-dl" element={<Renew />} />
            </Routes>
        </Layout>
    );
}

export default App;
