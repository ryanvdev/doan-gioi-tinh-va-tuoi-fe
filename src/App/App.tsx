import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from '../components/pages/HomePage/HomePage';
import PredictResultPage from '../components/pages/PredictResultPage';
import AppProvider from './AppProvider';

import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import HistoryPage from '../components/pages/HistoryPage';

function App() {
    return (
        <>
            <ToastContainer />
            <AppProvider>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/predict-result/:_id' element={<PredictResultPage />} />
                    <Route path='/history' element={<HistoryPage />} />
                </Routes>
            </AppProvider>
        </>
    );
}

export default App;
