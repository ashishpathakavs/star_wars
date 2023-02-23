import Characters from './pages/CharcterList';
import Header from './components/Header';
import './App.css';
const App = () => {
  return (
    <div className="layout">
      <Header />
      <Characters />
    </div>
  );
};

export default App;
