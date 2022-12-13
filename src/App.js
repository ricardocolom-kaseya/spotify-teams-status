import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import { ChakraProvider } from '@chakra-ui/react';

const code = new URLSearchParams(window.location.search).get('code')

const LoginOrDashboard = () => {
  if(code)
  {
    console.log('rendering dashboard...')
    return <Dashboard code={code} />
  }
  else
    return <Login />
}

function App() {

  return (
    <ChakraProvider>
      <LoginOrDashboard />
    </ChakraProvider>
  );
}

export default App;
