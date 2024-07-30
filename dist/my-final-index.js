import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import 'bootstrap/dist/css/bootstrap-reboot.css';
import '@reach/dialog/styles.css';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Button, Input, FormGroup, Spinner } from './components/lib';
import { Modal, ModalContents, ModalOpenButton } from './components/modal';
import { Logo } from './components/logo';
var LoginForm = function (_a) {
    var onSubmit = _a.onSubmit, submitButton = _a.submitButton;
    var handleSubmit = function (event) {
        event.preventDefault();
        var elements = event.currentTarget
            .elements;
        // Extract username and password values
        var username = elements.username ? elements.username.value : '';
        var password = elements.password ? elements.password.value : '';
        onSubmit({
            username: username,
            password: password,
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit, css: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            '> div': {
                margin: '10px auto',
                width: '100%',
                maxWidth: '300px',
            },
        }, children: [_jsxs(FormGroup, { children: [_jsx("label", { htmlFor: "username", children: "Username" }), _jsx(Input, { id: "username" })] }), _jsxs(FormGroup, { children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password" })] }), _jsxs("div", { children: [React.cloneElement(submitButton, { type: 'submit' }), _jsx(Spinner, { css: { marginLeft: 5 } })] })] }));
};
function App() {
    function login(formData) {
        console.log('Login:', formData);
    }
    function register(formData) {
        console.log('Register:', formData);
    }
    return (_jsxs("div", { css: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100vh',
        }, children: [_jsx(Logo, { width: "80", height: "80" }), _jsx("h1", { children: "Bookshelf" }), _jsxs("div", { css: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gridGap: '0.75rem',
                }, children: [_jsxs(Modal, { children: [_jsx(ModalOpenButton, { children: _jsx(Button, { variant: "primary", children: "Login" }) }), _jsx(ModalContents, { "aria-label": "Login form", title: "Login", children: _jsx(LoginForm, { onSubmit: login, submitButton: _jsx(Button, { variant: "primary", children: "Login" }) }) })] }), _jsxs(Modal, { children: [_jsx(ModalOpenButton, { children: _jsx(Button, { variant: "secondary", children: "Register" }) }), _jsx(ModalContents, { "aria-label": "Registration form", title: "Register", children: _jsx(LoginForm, { onSubmit: register, submitButton: _jsx(Button, { variant: "secondary", children: "Register" }) }) })] })] })] }));
}
var rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(_jsx(App, {}));
}
else {
    console.error('Failed to find the root element');
}
export { rootElement };
