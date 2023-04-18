import { BottomNav } from '@/components';
import Router from '@/Router';

import './assets/main.scss';

function App(): JSX.Element {
  return (
    <div className="App">
      <Router />
      <BottomNav />
    </div>
  );
}

export default App;
