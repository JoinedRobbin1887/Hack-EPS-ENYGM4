import logo from './logo.svg';
import './App.css';
import {Button} from './components/Button';

function App() {
  return (
    <div className="App bg-">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <Button className="mt-5 p-3">
          Mi Primer Botón
        </Button>
        <a
          className="App-link "
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
