import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import Tooltip from '@reach/tooltip';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Input, BookListUL, Spinner } from './components/lib';
import { BookRow } from './components/book-row';
import { client } from './utils/api-client';
import * as colors from './styles/colors';
import { useAsync } from 'utils/hooks';
function DiscoverBooksScreen() {
    var _a;
    var _b = React.useState(), query = _b[0], setQuery = _b[1];
    var _c = React.useState(false), queried = _c[0], setQueried = _c[1];
    var _d = useAsync(), data = _d.data, error = _d.error, run = _d.run, isLoading = _d.isLoading, isError = _d.isError, isSuccess = _d.isSuccess;
    React.useEffect(function () {
        if (!queried) {
            return;
        }
        if (query !== undefined) {
            run(client("books?query=".concat(encodeURIComponent(query))));
        }
    }, [query, queried, run]);
    function handleSearchSubmit(event) {
        event.preventDefault();
        setQueried(true);
        // Type assertion for form elements
        var elements = event.currentTarget
            .elements;
        // Extract search value
        var searchValue = elements.search ? elements.search.value : '';
        setQuery(searchValue);
    }
    return (_jsxs("div", { css: { maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0' }, children: [_jsxs("form", { onSubmit: handleSearchSubmit, children: [_jsx(Input, { placeholder: "Search books...", id: "search", css: { width: '100%' } }), _jsx(Tooltip, { label: "Search Books", children: _jsx("label", { htmlFor: "search", children: _jsx("button", { type: "submit", css: {
                                    border: '0',
                                    position: 'relative',
                                    marginLeft: '-35px',
                                    background: 'transparent',
                                }, children: isLoading ? (_jsx(Spinner, {})) : isError ? (_jsx(FaTimes, { "aria-label": "error", css: { color: colors.danger } })) : (_jsx(FaSearch, { "aria-label": "search" })) }) }) })] }), isError ? (_jsxs("div", { css: { color: colors.danger }, children: [_jsx("p", { children: "There was an error:" }), _jsx("pre", { children: error ? error.message : '' })] })) : null, isSuccess ? (((_a = data === null || data === void 0 ? void 0 : data.books) === null || _a === void 0 ? void 0 : _a.length) ? (_jsx(BookListUL, { css: { marginTop: 20 }, children: data.books.map(function (book) { return (_jsx("li", { "aria-label": book.title, children: _jsx(BookRow, { book: book }, book.id) }, book.id)); }) })) : (_jsx("p", { children: "No books found. Try another search." }))) : null] }));
}
export { DiscoverBooksScreen };
