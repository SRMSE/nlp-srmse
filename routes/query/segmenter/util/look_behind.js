
(function (XRegExp) {

    function prepareLb(lb) {
        // Allow mode modifier before lookbehind
        var parts = /^((?:\(\?[\w$]+\))?)\(\?<([=!])([\s\S]*)\)$/.exec(lb);
        return {
            // $(?!\s) allows use of (?m) in lookbehind
            lb: XRegExp(parts ? parts[1] + "(?:" + parts[3] + ")$(?!\\s)" : lb),
            // Positive or negative lookbehind. Use positive if no lookbehind group
            type: parts ? parts[2] === "=" : !parts
        };
    }

    XRegExp.execLb = function (str, lb, regex) {
        var pos = 0, match, leftContext;
        lb = prepareLb(lb);
        while (match = XRegExp.exec(str, regex, pos)) {
            leftContext = str.slice(0, match.index);
            if (lb.type === lb.lb.test(leftContext)) {
                return match;
            }
            pos = match.index + 1;
        }
        return null;
    };

    XRegExp.testLb = function (str, lb, regex) {
        return !!XRegExp.execLb(str, lb, regex);
    };

    XRegExp.searchLb = function (str, lb, regex) {
        var match = XRegExp.execLb(str, lb, regex);
        return match ? match.index : -1;
    };

    XRegExp.matchAllLb = function (str, lb, regex) {
        var matches = [], pos = 0, match, leftContext;
        lb = prepareLb(lb);
        while (match = XRegExp.exec(str, regex, pos)) {
            leftContext = str.slice(0, match.index);
            if (lb.type === lb.lb.test(leftContext)) {
                matches.push(match[0]);
                pos = match.index + (match[0].length || 1);
            } else {
                pos = match.index + 1;
            }
        }
        return matches;
    };

    XRegExp.replaceLb = function (str, lb, regex, replacement) {
        var output = "", pos = 0, lastEnd = 0, match, leftContext;
        lb = prepareLb(lb);
        while (match = XRegExp.exec(str, regex, pos)) {
            leftContext = str.slice(0, match.index);
            if (lb.type === lb.lb.test(leftContext)) {
                // Doesn't work correctly if lookahead in regex looks outside of the match
                output += str.slice(lastEnd, match.index) + XRegExp.replace(match[0], regex, replacement);
                lastEnd = match.index + match[0].length;
                if (!regex.global) {
                    break;
                }
                pos = match.index + (match[0].length || 1);
            } else {
                pos = match.index + 1;
            }
        }
        return output + str.slice(lastEnd);
    };

}(RegExp));
