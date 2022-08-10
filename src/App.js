
import './App.css';
import Editor from './components/Editor';

function App() {
  return (
    <div className="App">
      <div>
        <button> Add a Question</button>
        <Editor/>
      </div>
      {/* <Questions/> */}
    </div>
  );
}

export default App;
