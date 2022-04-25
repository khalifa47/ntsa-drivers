import React from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<h1>WELCOME</h1>}/>
                <Route path="/home" element={<h1>TO ARENA</h1>}/>
            </Routes>
        </Layout>
    );
}

export default App;
