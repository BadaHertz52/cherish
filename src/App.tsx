import { useEffect } from 'react';

import { BottomNav } from '@/components';
import Router from '@/Router';

import './assets/main.scss';
import { LOG_IN_API_ITEM_KEY, onSilentRefresh } from './api/auth/logIn';

const App = () => {
  useEffect(() => {
    const keepLogInItem = localStorage.getItem(LOG_IN_API_ITEM_KEY.keepLogIn);
    onSilentRefresh(keepLogInItem !== null);
  }, []);
  return (
    <div className="App">
      <Router />
      <BottomNav />
    </div>
  );
};

export default App;
