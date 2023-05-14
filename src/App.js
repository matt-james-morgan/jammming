import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBar';
import SearchBarResults from './Components/SearchBarResults';
function App() {
  return (
    <div className="App">
      <header>
        <h1>Jammming</h1>
      </header>
      <nav>
        <SearchBar  />
      </nav>
      <section>
        <SearchBarResults />
      </section>
      
    </div>
  );
}

export default App;
