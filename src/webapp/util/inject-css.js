const injectedCss = {};

export function injectCss(id, css) {
    if (typeof(window) !== 'undefined') {
        const window = global;
        const document = window.document;
        if (!injectedCss[id]) {
            injectedCss[id] = true;
            const styleCode = document.createElement('STYLE');
            styleCode.appendChild(document.createTextNode(css));
            document.head.appendChild(styleCode);
        }
    }
}
