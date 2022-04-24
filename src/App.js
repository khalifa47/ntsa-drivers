import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<h1>WELCOME</h1>} />
          <Route path='/home' element={<h1>TO ARENA</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;