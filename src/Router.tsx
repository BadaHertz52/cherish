import { Routes, Route } from 'react-router-dom';

import Bookmark from '@/pages/Bookmark';
import Curation from '@/pages/Curation';
import PresentRecommendation from '@/pages/Curation/components/PresentRecommendation';
import FindPw from '@/pages/FindPw';
import Home from '@/pages/Home';
import LogIn from '@/pages/LogIn';
import SearchPage from '@/pages/Search';
import SignUp from '@/pages/SignUp';
import Third from '@/pages/Third';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/curation" element={<Curation />} />
      <Route path="/curation/present/recommendation" element={<PresentRecommendation />} />
      <Route path="/third" element={<Third />} />
      <Route path="/bookmark" element={<Bookmark />} />
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="findpw" element={<FindPw />} />
    </Routes>
  );
}
