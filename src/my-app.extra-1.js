/** @jsx jsx */
import { jsx } from "@emotion/core";

import * as React from "react";
import * as auth from "auth-provider";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { client } from "utils/api-client.exercise";

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
  const [user, setUser] = React.useState(null);

  // login function that calls auth.login then sets the user
  const login = (form) => auth.login(form).then((u) => setUser(u));

  // registration function that does the same as login except for register
  const register = (form) => auth.register(form).then((u) => setUser(u));

  // logout function that calls auth.logout() and sets the user to null
  const logout = () => auth.logout().then((u) => setUser(null));

  React.useEffect(() => {
    getUser().then((u) => setUser(u));
  }, []);

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  );
}

export { App };

/*
eslint
  no-unused-vars: "off",
*/
