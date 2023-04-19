import { useEffect } from 'react';

import { BottomNav } from '@/components';
import Router from '@/Router';

import './assets/main.scss';
import { onSilentRefresh } from './api/auth/logIn';

const App = () => {
  useEffect(() => {
    onSilentRefresh();
  }, []);
  return (
    <div className="App">
      <Router />
      <BottomNav />
    </div>
  );
};

export default App;
