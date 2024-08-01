/** @jsx jsx */
import { jsx } from '@emotion/core';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import '@reach/dialog/styles.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Input, FormGroup, Spinner } from './components/lib';
import { Modal, ModalContents, ModalOpenButton } from './components/modal';
import { Logo } from './components/logo';

interface LoginFormProps {
  onSubmit(formData: { username: string; password: string }): void;
  submitButton: React.ReactElement;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, submitButton }) => {
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
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        {React.cloneElement(submitButton, { type: 'submit' })}
        <Spinner css={{ marginLeft: 5 }} />
      </div>
    </form>
  );
};

function App() {
  function login(formData: { username: string; password: string }) {
    console.log('Login:', formData);
  }

  function register(formData: { username: string; password: string }) {
    console.log('Register:', formData);
  }

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={login}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <LoginForm
              onSubmit={register}
              submitButton={<Button variant="secondary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error('Failed to find the root element');
}

export { rootElement };
