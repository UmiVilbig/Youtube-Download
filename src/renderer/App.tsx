import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Topbar } from './components';
import { Home, Settings } from './container';
import './App.css';

export default function App() {
  return (
    <div className='app'>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}
