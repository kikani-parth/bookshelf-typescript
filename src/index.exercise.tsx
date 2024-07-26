import React from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from './components/logo';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

interface LoginFormProps {
  onSubmit(formData: { username: string; password: string }): void;
  buttonText: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, buttonText }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const elements = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      username?: HTMLInputElement;
      password?: HTMLInputElement;
    };

    // Extract username and password values
    const username = elements.username ? elements.username.value : '';
    const password = elements.password ? elements.password.value : '';

    onSubmit({
      username: username,
      password: password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" />
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  );
};

function App() {
  const [openModal, setOpenModal] = React.useState<
    'none' | 'login' | 'register'
  >('none');

  function login(formData: { username: string; password: string }) {
    console.log('Login:', formData);
  }

  function register(formData: { username: string; password: string }) {
    console.log('Register:', formData);
  }

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Login</h3>
        <LoginForm onSubmit={login} buttonText="Login" />
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <h3>Register</h3>
        <LoginForm onSubmit={register} buttonText="Register" />
      </Dialog>
    </div>
  );
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error('Failed to find the root element');
}
