import { Route, Routes } from 'react-router-dom';

import Curation from './pages/Curation';
import Fourth from './pages/Fourth';
// import ModalTest from './components/modals/ModalTest';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SearchPage from './pages/Search';
import SignUp from './pages/SignUp';
import Third from './pages/Third';

import './assets/main.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/first" element={<First />} /> */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/curation" element={<Curation />} />
        <Route path="/third" element={<Third />} />
        <Route path="/fourth" element={<Fourth />} />
        {/* modal 테스트를 위해 route 추가 , 추후 삭제 예정*/}
        {/* <Route path="modaltest" element={<ModalTest />} /> */}
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
