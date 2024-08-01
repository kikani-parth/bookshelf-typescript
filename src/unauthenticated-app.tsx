/** @jsx jsx */
import { jsx } from '@emotion/core';

import * as React from 'react';
import {
  Input,
  Button,
  Spinner,
  FormGroup,
  ErrorMessage,
} from './components/lib';
import { Modal, ModalContents, ModalOpenButton } from './components/modal';
import { Logo } from './components/logo';
import { useAsync } from './utils/hooks';
import { Credentials } from 'interfaces/credentials';

interface LoginFormProps {
  // TODO: unkown should be changed
  onSubmit(formData: { username: string; password: string }): Promise<unknown>;
  submitButton: React.ReactElement;
}

function LoginForm({ onSubmit, submitButton }: LoginFormProps) {
  const { isLoading, isError, error, run } = useAsync();
  let val: any;
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

    val = onSubmit({
      username: username,
      password: password,
    });

    run(val);
  };
  React.useEffect(() => {
    console.log(val);
  }, [val]);

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
        {React.cloneElement(
          submitButton,
          { type: 'submit' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null
        )}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  );
}

interface UnauthenticatedAppProps {
  login(form: Credentials): Promise<unknown>;
  register(form: Credentials): Promise<unknown>;
}

function UnauthenticatedApp({ login, register }: UnauthenticatedAppProps) {
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

export { UnauthenticatedApp };
