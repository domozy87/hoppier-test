import React from 'react';

// Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//Components
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';

// Global Style
import { GlobalStyle } from './GlobalStyle';

const App = () => (
    <Router>
        <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<NotFound />} />
        </Routes>
        <GlobalStyle />
    </Router>
);

export default App;
