import { Route, Routes } from 'react-router-dom';
import Second from './pages/Second';
import Third from './pages/Third';
import Fourth from './pages/Fourth';
import Button from './pages/Button';
<<<<<<< HEAD
import Home from './pages/Home';
import BottomNav from './components/BottomNav';
import './assets/styles/App.scss';

=======
import Main from './pages/Main';
import ModalTest from './components/modals/ModalTest';
import Button from './pages/Button';
import './assets/main.scss';
>>>>>>> 765efe1003e9a95b1ecc79d63995583135889bb5
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
