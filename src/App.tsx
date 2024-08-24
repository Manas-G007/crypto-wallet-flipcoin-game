import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from '.';
import PageNotFound from './pages/PageNotFound';

const App: React.FC = () => {
    

    return (
      <BrowserRouter >
        <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    );
};

export default App;
