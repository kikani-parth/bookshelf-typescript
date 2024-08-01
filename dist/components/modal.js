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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { Dialog, CircleButton } from './lib';
// Utility function that calls all functions passed to it with the given arguments
var callAll = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return fns.forEach(function (fn) { return fn && fn.apply(void 0, args); });
    };
};
var ModalContext = React.createContext(undefined);
function Modal(_a) {
    var children = _a.children;
    var _b = React.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    return (_jsx(ModalContext.Provider, { value: { isOpen: isOpen, setIsOpen: setIsOpen }, children: children }));
}
function ModalDismissButton(_a) {
    var child = _a.children;
    var modalContext = React.useContext(ModalContext);
    if (!modalContext) {
        throw new Error('ModalDismissButton must be used within a ModalProvider');
    }
    var setIsOpen = modalContext.setIsOpen;
    return React.cloneElement(child, {
        onClick: callAll(function () { return setIsOpen(false); }, child.props.onClick),
    });
}
function ModalOpenButton(_a) {
    var child = _a.children;
    var modalContext = React.useContext(ModalContext);
    if (!modalContext) {
        throw new Error('ModalDismissButton must be used within a ModalProvider');
    }
    var setIsOpen = modalContext.setIsOpen;
    return React.cloneElement(child, {
        onClick: callAll(function () { return setIsOpen(true); }, child.props.onClick),
    });
}
function ModalContentsBase(_a) {
    var children = _a.children;
    var modalContext = React.useContext(ModalContext);
    if (!modalContext) {
        throw new Error('ModalDismissButton must be used within a ModalProvider');
    }
    var isOpen = modalContext.isOpen, setIsOpen = modalContext.setIsOpen;
    return (_jsx(Dialog, { isOpen: isOpen, onDismiss: function () { return setIsOpen(false); }, children: children }));
}
function ModalContents(_a) {
    var title = _a.title, children = _a.children, props = __rest(_a, ["title", "children"]);
    return (_jsxs(ModalContentsBase, __assign({}, props, { children: [_jsx("div", { css: { display: 'flex', justifyContent: 'flex-end' }, children: _jsx(ModalDismissButton, { children: _jsxs(CircleButton, { children: [_jsx(VisuallyHidden, { children: "Close" }), _jsx("span", { "aria-hidden": true, children: "\u00D7" })] }) }) }), _jsx("h3", { css: { textAlign: 'center', fontSize: '2em' }, children: title }), children] })));
}
export { Modal, ModalDismissButton, ModalOpenButton, ModalContents };
