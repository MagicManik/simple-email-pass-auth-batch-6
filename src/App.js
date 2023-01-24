import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Main from './layout/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main>0</Main>,
    children: [
      {
        path: '/',
        element: <RegisterForm></RegisterForm>
      },
      {
        path: '/register',
        element: <RegisterForm></RegisterForm>
      },
      {
        path: '/login',
        element: <LoginForm></LoginForm>
      },
    ]
  }
])

function App() {

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
