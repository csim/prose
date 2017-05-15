function setupPrism() {
    function markLanguage(tag, name) {
        $("pre").has("code[class*=\"language-" + tag + "\"]").each(function () {
            $(this).attr("data-language", name || tag.toUpperCase());
        });
    }
    function getCodePres() {
        var languages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            languages[_i] = arguments[_i];
        }
        function preSelector(element, suffix) {
            var languages = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                languages[_i - 2] = arguments[_i];
            }
            return languages.map(function (tag) { return element + "[class*='language-" + tag + "']" + suffix; }).join(", ");
        }
        if (languages.length == 0)
            languages = [''];
        return $("pre").has(preSelector.apply(void 0, ["code", ""].concat(languages))).add(preSelector.apply(void 0, ["div", " > pre"].concat(languages)));
    }
    var termLanguages = ['console', 'cmd', 'term', 'terminal'];
    getCodePres.apply(void 0, termLanguages).addClass("command-line").not("pre[data-prompt]").attr("data-prompt", "$");
    getCodePres().not(".command-line").addClass("line-numbers");
    $('div[class="highlighter-rouge"] > pre[class="highlight"] > code:not([class])').addClass('language-none');
    Prism.languages["xml"] = Prism.languages.markup;
    markLanguage("xml");
    Prism.languages["dsl"] = {
        'comment': {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true
        },
        'string': {
            pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: true
        },
        'keyword': /#?\b(reference|feature|language|semantics|learners|let|in|using)\b/,
        'type': [
            /(Tuple|HashSet|IEnumerable|I?List|I?Dictionary)<[?\w\[\]]+(,\s*[?\w\[\]]+)*>/,
            /\b(Regex|bool|byte|char|string|int|uint|sbyte|long|ulong|decimal|float|double|short)\b\??(\[])?/,
            /\b\w+(\.\w+)+\b/,
            {
                pattern: /(\[)\b\w+(\.\w+)*\b(?=])/,
                lookbehind: true
            }
        ],
        'annotation': /@\b\w+/,
        'function': /\w+(?=\()/,
        'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
        'punctuation': /:=|\||\\|:|=|=>|\(|\)|,/
    };
    markLanguage("dsl");
    Prism.languages["bnf"] = Prism.languages.extend("dsl", {
        'optional-start': /\{/,
        'optional-end': /}/,
        'placeholder': {
            pattern: /<[\w\d\s]+>/,
            greedy: true,
        },
        'string': {
            pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: true,
            inside: {
                'placeholder': /<[\w\d\s]+>/
            }
        }
    });
    markLanguage("bnf", "DSL");
    Prism.highlightAll();
    $(".toolbar").addClass("flex justify-between");
    $(".toolbar-item").has("span:contains('None')").css("visibility", "hidden");
}
function setupTables() {
    $(".content").find("table").addClass("pure-table pure-table-horizontal mx-auto");
}
function setupHeaderLinks() {
    var $root = $('html, body');
    $("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]").each(function () {
        $(this).append($("<a title=\"Permalink\" href=\"#" + $(this).attr('id') + "\" class=\"header-link\">#</a>"));
        var $scrollLink = $("<a title=\"Scroll to top\" href=\"#\" class=\"header-link\">&#8593;</a>");
        $scrollLink.click(function () { return $root.animate({ scrollTop: 0 }, "slow"); });
        $(this).append($scrollLink);
    });
}
function setupPopups() {
    $(".popup-image").magnificPopup({
        autoFocusLast: false,
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
}
function setupAnchors() {
    var $root = $('html, body');
    $("a[href^=\\#]").click(function () {
        var href = $(this).attr('href').substring(1);
        if (href == "")
            return true;
        $root.animate({ scrollTop: $("#" + $.escapeSelector(href)).offset().top }, 500, function () { return window.location.hash = href; });
        return false;
    });
}
function defer(method) {
    if (window.jQuery) {
        method();
    }
    else {
        setTimeout(function () { return defer(method); }, 50);
    }
}
defer(function () {
    $(function () {
        setupPrism();
        setupTables();
        setupHeaderLinks();
        setupPopups();
        setupAnchors();
    });
});
if (window.Prism) {
    document.removeEventListener('DOMContentLoaded', Prism.highlightAll);
}
else {
    window.Prism = { manual: true };
}

//# sourceMappingURL=main.js.map