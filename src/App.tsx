import { Route, Routes } from 'react-router-dom';
import Second from './pages/Second';
import Third from './pages/Third';
import Fourth from './pages/Fourth';
import BottomNav from './components/BottomNav';
import './assets/styles/App.scss';
import ModalTest from './examples/modalTest';
import LogIn from './logIn';
import './assets/main.scss';
import SignUp from './signup';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/second" element={<Second />} />
        <Route path="/third" element={<Third />} />
        <Route path="/fourth" element={<Fourth />} />
        {/* modal 테스트를 위해 route 추가 , 추후 삭제 예정*/}
        <Route path="modaltest" element={<ModalTest />} />
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
