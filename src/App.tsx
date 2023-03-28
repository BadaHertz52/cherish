import { Route, Routes } from 'react-router-dom';
import First from './pages/First';
import Second from './pages/Second';
import Third from './pages/Third';
import Fourth from './pages/Fourth';
import Main from './pages/Main';
import ModalTest from './components/modals/ModalTest';
import LogIn from './pages/LogIn';
import Signup from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/first" element={<First />} />
        <Route path="/second" element={<Second />} />
        <Route path="/third" element={<Third />} />
        <Route path="/fourth" element={<Fourth />} />
        {/* modal 테스트를 위해 route 추가 , 추후 삭제 예정*/}
        <Route path="modaltest" element={<ModalTest />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
