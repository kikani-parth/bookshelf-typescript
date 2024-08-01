var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Input, Button, Spinner, FormGroup, ErrorMessage, } from './components/lib';
import { Modal, ModalContents, ModalOpenButton } from './components/modal';
import { Logo } from './components/logo';
import { useAsync } from './utils/hooks';
function LoginForm(_a) {
    var onSubmit = _a.onSubmit, submitButton = _a.submitButton;
    var _b = useAsync(), isLoading = _b.isLoading, isError = _b.isError, error = _b.error, run = _b.run;
    var val;
    var handleSubmit = function (event) {
        event.preventDefault();
        var elements = event.currentTarget
            .elements;
        // Extract username and password values
        var username = elements.username ? elements.username.value : '';
        var password = elements.password ? elements.password.value : '';
        val = onSubmit({
            username: username,
            password: password,
        });
        run(val);
    };
    React.useEffect(function () {
        console.log(val);
    }, [val]);
    return (_jsxs("form", { onSubmit: handleSubmit, css: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            '> div': {
                margin: '10px auto',
                width: '100%',
                maxWidth: '300px',
            },
        }, children: [_jsxs(FormGroup, { children: [_jsx("label", { htmlFor: "username", children: "Username" }), _jsx(Input, { id: "username" })] }), _jsxs(FormGroup, { children: [_jsx("label", { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password" })] }), _jsx("div", { children: React.cloneElement.apply(React, __spreadArray(__spreadArray([submitButton,
                    { type: 'submit' }], (Array.isArray(submitButton.props.children)
                    ? submitButton.props.children
                    : [submitButton.props.children]), false), [isLoading ? _jsx(Spinner, { css: { marginLeft: 5 } }) : null], false)) }), isError ? _jsx(ErrorMessage, { error: error }) : null] }));
}
function UnauthenticatedApp(_a) {
    var login = _a.login, register = _a.register;
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
export { UnauthenticatedApp };
