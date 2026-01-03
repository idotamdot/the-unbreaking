import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollsOpening from './components/ScrollsOpening';
// import ScrollDetail from './components/ScrollDetail'; // Optional for individual scrolls

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ScrollsOpening />} />
      {/* Add dynamic route for scrolls here if needed */}
      {/* <Route path="/scrolls/:filename" element={<ScrollDetail />} /> */}
    </Routes>
  );
}
