import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from './components/logo';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
var LoginForm = function (_a) {
    var onSubmit = _a.onSubmit, buttonText = _a.buttonText;
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
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "username", children: "Username:" }), _jsx("input", { type: "text", id: "username" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", children: "Password:" }), _jsx("input", { type: "password", id: "password" })] }), _jsx("div", { children: _jsx("button", { type: "submit", children: buttonText }) })] }));
};
function App() {
    var _a = React.useState('none'), openModal = _a[0], setOpenModal = _a[1];
    function login(formData) {
        console.log('Login:', formData);
    }
    function register(formData) {
        console.log('Register:', formData);
    }
    return (_jsxs("div", { children: [_jsx(Logo, { width: "80", height: "80" }), _jsx("h1", { children: "Bookshelf" }), _jsx("div", { children: _jsx("button", { onClick: function () { return setOpenModal('login'); }, children: "Login" }) }), _jsx("div", { children: _jsx("button", { onClick: function () { return setOpenModal('register'); }, children: "Register" }) }), _jsxs(Dialog, { "aria-label": "Login form", isOpen: openModal === 'login', children: [_jsx("div", { children: _jsx("button", { onClick: function () { return setOpenModal('none'); }, children: "Close" }) }), _jsx("h3", { children: "Login" }), _jsx(LoginForm, { onSubmit: login, buttonText: "Login" })] }), _jsxs(Dialog, { "aria-label": "Registration form", isOpen: openModal === 'register', children: [_jsx("div", { children: _jsx("button", { onClick: function () { return setOpenModal('none'); }, children: "Close" }) }), _jsx("h3", { children: "Register" }), _jsx(LoginForm, { onSubmit: register, buttonText: "Register" })] })] }));
}
var rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(_jsx(App, {}));
}
else {
    console.error('Failed to find the root element');
}
