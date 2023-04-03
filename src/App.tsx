import { Route, Routes } from 'react-router-dom';
import Second from './pages/Second';
import Third from './pages/Third';
import Fourth from './pages/Fourth';
import Button from './pages/Button';
import Home from './pages/Home';
import BottomNav from './components/BottomNav';
import './assets/styles/App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/second" element={<Second />} />
        <Route path="/third" element={<Third />} />
        <Route path="/fourth" element={<Fourth />} />
        <Route path="/button" element={<Button />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
