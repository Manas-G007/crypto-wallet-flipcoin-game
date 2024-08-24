// src/App.tsx
import React from 'react';
import "./App.css"
import BackGround from './components/background';
import Main from './pages/main';

const IndexPage: React.FC = () => {
    

    return (
        <div className='container'>
            <BackGround />
            <Main />
        </div>
    );
};

export default IndexPage;
