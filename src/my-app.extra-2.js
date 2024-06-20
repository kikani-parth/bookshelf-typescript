/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";
import * as auth from "auth-provider";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { client } from "utils/api-client.exercise";
import { useAsync } from "utils/hooks";
import { FullPageSpinner } from "components/lib";
import * as colors from "./styles/colors";

async function getUser() {
  let user = null;

  const token = await auth.getToken();

  if (token) {
    // we're logged in
    const data = await client("me", { token });
    user = data.user;
  }

  return user;
}

function App() {
  const {
    data: user,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    run,
    setData,
  } = useAsync();

  React.useEffect(() => {
    run(getUser());
  }, [run]);

  // login function that calls auth.login then sets the user
  const login = (form) => auth.login(form).then((user) => setData(user));

  // registration function that does the same as login except for register
  const register = (form) => auth.register(form).then((user) => setData(user));

  // logout function that calls auth.logout() and sets the user to null
  const logout = () => auth.logout().then((user) => setData(null));

  return (
    <div>
      {isLoading || isIdle ? <FullPageSpinner /> : null}

      {isSuccess ? (
        user ? (
          <AuthenticatedApp user={user} logout={logout} />
        ) : (
          <UnauthenticatedApp login={login} register={register} />
        )
      ) : null}

      {isError ? (
        <div
          css={{
            color: colors.danger,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
    </div>
  );
}

export { App };

/*
eslint
  no-unused-vars: "off",
*/
