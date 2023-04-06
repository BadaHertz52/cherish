import { Route, Routes } from 'react-router-dom';
import Second from './pages/Second';
import Third from './pages/Third';
import Fourth from './pages/Fourth';
import { BottomNav } from './components';
import './assets/styles/App.scss';
import ModalTest from './examples/modalTest';
import './assets/main.scss';
import Home from './pages/Home';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/second" element={<Second />} />
        <Route path="/third" element={<Third />} />
        <Route path="/fourth" element={<Fourth />} />
        {/* modal 테스트를 위해 route 추가 , 추후 삭제 예정*/}
        <Route path="modaltest" element={<ModalTest />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
