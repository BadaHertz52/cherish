import { Route, Routes } from 'react-router-dom';

import { BottomNav } from './components';
// import ModalTest from './examples/modalTest';
import Curation from './pages/Curation';
import PresentRecommendation from './pages/Curation/components/PresentRecommendation';
import FindPw from './pages/FindPw';
// import Fourth from './pages/Fourth';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
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
        <Route path="/curation/present/recommendation" element={<PresentRecommendation />} />
        <Route path="/third" element={<Third />} />
        {/* <Route path="/fourth" element={<Fourth />} /> */}
        {/* modal 테스트를 위해 route 추가 , 추후 삭제 예정*/}
        {/* <Route path="modaltest" element={<ModalTest />} /> */}
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="findpw" element={<FindPw />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;
