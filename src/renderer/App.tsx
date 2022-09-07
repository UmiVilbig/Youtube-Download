import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Topbar } from './components';
import { Home } from './container';
import './App.css';

export default function App() {
  return (
    <div className='app'>
      <Topbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
