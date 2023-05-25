import Router from './src/router';
import { AuthContextProvedor } from './src/context/auth';

export default function App() {

  return (
    <AuthContextProvedor>
      <Router/>
    </AuthContextProvedor>
  );
}
