import { Route, Routes } from 'react-router-dom';

import Fourth from './pages/Fourth';
// import ModalTest from './components/modals/ModalTest';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Curation from './pages/Curation';
import PresentReccomendation from './pages/Curation/components/PresentRecommendation';
import SignUp from './pages/SignUp';
import Third from './pages/Third';

import './assets/main.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/first" element={<First />} /> */}
        <Route path="/curation" element={<Curation />} />
        <Route path="/curation/present/recommendation" element={<PresentReccomendation />} />
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
