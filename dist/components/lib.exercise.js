var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/core';
import * as colors from 'styles/colors';
import * as mq from 'styles/media-queries';
import { Dialog as ReachDialog } from '@reach/dialog';
import { FaSpinner } from 'react-icons/fa';
var spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});
var CircleButton = styled.button({
    borderRadius: '30px',
    padding: '0',
    width: '40px',
    height: '40px',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.base,
    color: colors.text,
    border: "1px solid ".concat(colors.gray10),
    cursor: 'pointer',
});
var BookListUL = styled.ul({
    listStyle: 'none',
    padding: '0',
    display: 'grid',
    gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
    gridGap: '1em',
});
var Spinner = styled(FaSpinner)({
    animation: "".concat(spin, " 1s linear infinite"),
});
Spinner.defaultProps = {
    'aria-label': 'loading',
};
var buttonVariants = {
    primary: {
        background: colors.indigo,
        color: colors.base,
    },
    secondary: {
        background: colors.gray,
        color: colors.text,
    },
};
var Button = styled.button({
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
}, function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'primary' : _b;
    return buttonVariants[variant];
});
var inputStyles = {
    border: '1px solid #f1f1f4',
    background: '#f1f2f7',
    padding: '8px 12px',
};
var Input = styled.input({ borderRadius: '3px' }, inputStyles);
var Textarea = styled.textarea(inputStyles);
var Dialog = styled(ReachDialog)((_a = {
        maxWidth: '450px',
        borderRadius: '3px',
        paddingBottom: '3.5em',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
        margin: '20vh auto'
    },
    _a[mq.small] = {
        width: '100%',
        margin: '10vh auto',
    },
    _a));
Dialog.defaultProps = {
    'aria-label': 'dialog-box',
};
var FormGroup = styled.div({
    display: 'flex',
    flexDirection: 'column',
});
function FullPageSpinner() {
    return (_jsx("div", { css: {
            fontSize: '4em',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }, children: _jsx(Spinner, {}) }));
}
var Link = styled(RouterLink)({
    color: colors.indigo,
    ':hover': {
        color: colors.indigoDarken10,
        textDecoration: 'underline',
    },
});
var errorMessageVariants = {
    stacked: { display: 'block' },
    inline: { display: 'inline-block' },
};
function ErrorMessage(_a) {
    var error = _a.error, _b = _a.variant, variant = _b === void 0 ? 'stacked' : _b, props = __rest(_a, ["error", "variant"]);
    return (_jsxs("div", __assign({ role: "alert", css: [{ color: colors.danger }, errorMessageVariants[variant]] }, props, { children: [_jsx("span", { children: "There was an error: " }), _jsx("pre", { css: [
                    { whiteSpace: 'break-spaces', margin: '0', marginBottom: -5 },
                    errorMessageVariants[variant],
                ], children: error ? error.message : '' })] })));
}
function FullPageErrorFallback(_a) {
    var error = _a.error;
    return (_jsxs("div", { role: "alert", css: {
            color: colors.danger,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }, children: [_jsx("p", { children: "Uh oh... There's a problem. Try refreshing the app." }), _jsx("pre", { children: error.message })] }));
}
export { FullPageErrorFallback, ErrorMessage, CircleButton, BookListUL, Spinner, Button, Input, Textarea, Dialog, FormGroup, FullPageSpinner, Link, };
