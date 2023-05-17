import logo from './logo.svg';
import './App.css';
import SearchBar, from './Components/SearchBar';
import SearchBarResults from './Components/SearchBarResults';
function App() {
  const [userInput, setUserInput] = useState('');

  return (
    <div className="App">
      <header>
        <h1>Jammming</h1>
      </header>
      <nav>
        <SearchBar  onSearch={setUserInput}/>
      </nav>
        <SearchBarResults results={}/>
    </div>
  );
}

export default App;
