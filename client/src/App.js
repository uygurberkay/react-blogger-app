import './App.css';
import {Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { IndexPage } from './pages/IndexPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={ <IndexPage /> } />
        <Route path='/login' element={ <LoginPage /> }/>
        <Route path='/register' element={ <RegisterPage /> }/>
        <Route path='*' element={ <ErrorPage /> }/>
      </Route>
    </Routes>
  );
}

export default App;
