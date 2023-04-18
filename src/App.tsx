import { BottomNav } from './components';
import './assets/main.scss';
import Router from './Router';

function App() {
  return (
    <div className="App">
      <Router />
      <BottomNav />
    </div>
  );
}

export default App;
