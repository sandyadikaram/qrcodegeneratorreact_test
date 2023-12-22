import './App.css';
import NavTabs from './components/navugationtabs/NavTabs.js'
import Container from '@mui/material/Container';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h3>Generate your own QR here. </h3>
      </header>
      <Container>
      <NavTabs></NavTabs>
      </Container>

    </div>
  );
}

export default App;
