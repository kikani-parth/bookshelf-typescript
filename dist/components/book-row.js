import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as mq from 'styles/media-queries';
import * as colors from 'styles/colors';
function BookRow(_a) {
    var _b;
    var book = _a.book;
    var title = book.title, author = book.author, coverImageUrl = book.coverImageUrl;
    var id = "book-row-book-".concat(book.id);
    return (_jsx("div", { css: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'relative',
        }, children: _jsxs("div", { "aria-labelledby": id, css: {
                minHeight: 270,
                flexGrow: 2,
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gridGap: 20,
                border: "1px solid ".concat(colors.gray20),
                color: colors.text,
                padding: '1.25em',
                borderRadius: '3px',
                ':hover,:focus': {
                    textDecoration: 'none',
                    boxShadow: '0 5px 15px -5px rgba(0,0,0,.08)',
                    color: 'inherit',
                },
            }, children: [_jsx("div", { css: (_b = {
                            width: 140
                        },
                        _b[mq.small] = {
                            width: 100,
                        },
                        _b), children: _jsx("img", { src: coverImageUrl, alt: "".concat(title, " book cover"), css: { maxHeight: '100%', width: '100%' } }) }), _jsxs("div", { css: { flex: 1 }, children: [_jsxs("div", { css: { display: 'flex', justifyContent: 'space-between' }, children: [_jsx("div", { css: { flex: 1 }, children: _jsx("h2", { id: id, css: {
                                            fontSize: '1.25em',
                                            margin: '0',
                                            color: colors.indigo,
                                        }, children: title }) }), _jsxs("div", { css: { marginLeft: 10 }, children: [_jsx("div", { css: {
                                                marginTop: '0.4em',
                                                fontStyle: 'italic',
                                                fontSize: '0.85em',
                                            }, children: author }), _jsx("small", { children: book.publisher })] })] }), _jsxs("small", { css: { whiteSpace: 'break-spaces', display: 'block' }, children: [book.synopsis.substring(0, 500), "..."] })] })] }) }));
}
export { BookRow };
