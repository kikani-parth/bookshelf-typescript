import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Button } from './components/lib';
import * as mq from './styles/media-queries';
import { DiscoverBooksScreen } from './discover';
function AuthenticatedApp(_a) {
    var _b;
    var user = _a.user, logout = _a.logout;
    return (_jsxs(React.Fragment, { children: [_jsxs("div", { css: {
                    display: 'flex',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                }, children: [user.username, _jsx(Button, { variant: "secondary", css: { marginLeft: '10px' }, onClick: logout, children: "Logout" })] }), _jsx("div", { css: (_b = {
                        margin: '0 auto',
                        padding: '4em 2em',
                        maxWidth: '840px',
                        width: '100%',
                        display: 'grid',
                        gridGap: '1em',
                        gridTemplateColumns: '1fr 3fr'
                    },
                    _b[mq.small] = {
                        gridTemplateColumns: '1fr',
                        gridTemplateRows: 'auto',
                        width: '100%',
                    },
                    _b), children: _jsx(DiscoverBooksScreen, {}) })] }));
}
export { AuthenticatedApp };
