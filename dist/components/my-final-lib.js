var _a;
import styled from '@emotion/styled';
import { Dialog as ReachDialog } from '@reach/dialog';
import * as mq from 'styles/media-queries';
import * as colors from 'styles/colors';
import { FaSpinner } from 'react-icons/fa';
import { keyframes, css } from '@emotion/react';
var buttonVariants = {
    primary: css({
        background: colors.indigo,
        color: colors.base,
    }),
    secondary: css({
        background: colors.gray,
        color: colors.text,
    }),
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
var Input = styled.input({
    borderRadius: '3px',
    border: "1px solid ".concat(colors.gray10),
    background: colors.gray,
    padding: '8px 12px',
});
var FormGroup = styled.div({
    display: 'flex',
    flexDirection: 'column',
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
var Dialog = styled(ReachDialog)((_a = {
        maxWidth: '450px',
        borderRadius: '3px',
        paddingBottom: '3.5em',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
        margin: '20vh auto'
    },
    _a[mq.small] = {
        /* small styles */
        width: '100%',
        margin: '10vh auto',
    },
    _a));
var spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
});
var Spinner = styled(FaSpinner)({
    animation: "".concat(spin, " 1s linear infinite"),
});
Spinner.defaultProps = {
    'aria-label': 'loading',
};
export { Button, Input, FormGroup, CircleButton, Dialog, Spinner };
