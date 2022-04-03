import './App.css';
import  { Filter } from "./components"
import { micronLogo } from "./images"

function App() {
  return (
    <div className="App">
      <div className="App-header">
          <div>
            <img alt="micron logo" src={micronLogo} width={50} />
          </div>
          <Filter />
      </div>
    </div>
  );
}

export default App;
