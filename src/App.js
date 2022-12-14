import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import { ChakraProvider, Button } from '@chakra-ui/react';

const code = new URLSearchParams(window.location.search).get('code')

const LoginOrDashboard = () => {

  if (code) {
    return <Dashboard code={code} />
  }
  else
    return <Login />
}

const ToggleColorButton = ({ toggleColorMode }) => {
  return <Button pos="absolute" right="2" top="2" onClick={() => toggleColorMode()}>
    •
  </Button>
}

function App() {
  return (
    <ChakraProvider>
      <LoginOrDashboard />
    </ChakraProvider>
  );
}

export default App;
