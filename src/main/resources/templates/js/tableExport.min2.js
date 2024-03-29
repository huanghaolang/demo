/*
 tableExport.jquery.plugin

 Version 1.10.3

 Copyright (c) 2015-2019 hhurz, https://github.com/hhurz

 Original Work Copyright (c) 2014 Giri Raj

 Licensed under the MIT License
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(c, m, u) {
    c instanceof String && (c = String(c));
    for (var x = c.length, w = 0; w < x; w++) {
        var P = c[w];
        if (m.call(u, P, w, c))
            return {
                i: w,
                v: P
            }
    }
    return {
        i: -1,
        v: void 0
    }
}
;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, m, u) {
    c != Array.prototype && c != Object.prototype && (c[m] = u.value)
}
;
$jscomp.getGlobal = function(c) {
    return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(c, m, u, x) {
    if (m) {
        u = $jscomp.global;
        c = c.split(".");
        for (x = 0; x < c.length - 1; x++) {
            var w = c[x];
            w in u || (u[w] = {});
            u = u[w]
        }
        c = c[c.length - 1];
        x = u[c];
        m = m(x);
        m != x && null != m && $jscomp.defineProperty(u, c, {
            configurable: !0,
            writable: !0,
            value: m
        })
    }
}
;
$jscomp.polyfill("Array.prototype.find", function(c) {
    return c ? c : function(c, u) {
        return $jscomp.findInternal(this, c, u).v
    }
}, "es6", "es3");
(function(c) {
    c.fn.tableExport = function(m) {
        function u(b) {
            var d = [];
            w(b, "thead").each(function() {
                d.push.apply(d, w(c(this), a.theadSelector).toArray())
            });
            return d
        }
        function x(b) {
            var d = [];
            w(b, "tbody").each(function() {
                d.push.apply(d, w(c(this), a.tbodySelector).toArray())
            });
            a.tfootSelector.length && w(b, "tfoot").each(function() {
                d.push.apply(d, w(c(this), a.tfootSelector).toArray())
            });
            return d
        }
        function w(b, d) {
            var a = b[0].tagName
              , h = b.parents(a).length;
            return b.find(d).filter(function() {
                return h === c(this).closest(a).parents(a).length
            })
        }
        function P(b) {
            var d = [];
            c(b).find("thead").first().find("th").each(function(b, a) {
                void 0 !== c(a).attr("data-field") ? d[b] = c(a).attr("data-field") : d[b] = b.toString()
            });
            return d
        }
        function L(b) {
            var d = "undefined" !== typeof b[0].cellIndex
              , a = "undefined" !== typeof b[0].rowIndex
              , h = d || a ? Ca(b) : b.is(":visible")
              , g = b.data("tableexport-display");
            d && "none" !== g && "always" !== g && (b = c(b[0].parentNode),
            a = "undefined" !== typeof b[0].rowIndex,
            g = b.data("tableexport-display"));
            a && "none" !== g && "always" !== g && (g = b.closest("table").data("tableexport-display"));
            return "none" !== g && (!0 === h || "always" === g)
        }
        function Ca(b) {
            var a = [];
            R && (a = G.filter(function() {
                var a = !1;
                this.nodeType === b[0].nodeType && ("undefined" !== typeof this.rowIndex && this.rowIndex === b[0].rowIndex ? a = !0 : "undefined" !== typeof this.cellIndex && this.cellIndex === b[0].cellIndex && "undefined" !== typeof this.parentNode.rowIndex && "undefined" !== typeof b[0].parentNode.rowIndex && this.parentNode.rowIndex === b[0].parentNode.rowIndex && (a = !0));
                return a
            }));
            return !1 === R || 0 === a.length
        }
        function Da(b, d, e) {
            var h = !1;
            L(b) ? 0 < a.ignoreColumn.length && (-1 !== c.inArray(e, a.ignoreColumn) || -1 !== c.inArray(e - d, a.ignoreColumn) || Q.length > e && "undefined" !== typeof Q[e] && -1 !== c.inArray(Q[e], a.ignoreColumn)) && (h = !0) : h = !0;
            return h
        }
        function C(b, d, e, h, g) {
            if ("function" === typeof g) {
                var l = !1;
                "function" === typeof a.onIgnoreRow && (l = a.onIgnoreRow(c(b), e));
                if (!1 === l && -1 === c.inArray(e, a.ignoreRow) && -1 === c.inArray(e - h, a.ignoreRow) && L(c(b))) {
                    var y = w(c(b), d)
                      , q = 0;
                    y.each(function(b) {
                        var a = c(this), d, l = S(this), h = T(this);
                        c.each(E, function() {
                            if (e >= this.s.r && e <= this.e.r && q >= this.s.c && q <= this.e.c)
                                for (d = 0; d <= this.e.c - this.s.c; ++d)
                                    g(null, e, q++)
                        });
                        if (!1 === Da(a, y.length, b)) {
                            if (h || l)
                                l = l || 1,
                                E.push({
                                    s: {
                                        r: e,
                                        c: q
                                    },
                                    e: {
                                        r: e + (h || 1) - 1,
                                        c: q + l - 1
                                    }
                                });
                            g(this, e, q++)
                        }
                        if (l)
                            for (d = 0; d < l - 1; ++d)
                                g(null, e, q++)
                    });
                    c.each(E, function() {
                        if (e >= this.s.r && e <= this.e.r && q >= this.s.c && q <= this.e.c)
                            for (Z = 0; Z <= this.e.c - this.s.c; ++Z)
                                g(null, e, q++)
                    })
                }
            }
        }
        function na(b, a, e, c) {
            if ("undefined" !== typeof c.images && (e = c.images[e],
            "undefined" !== typeof e)) {
                a = a.getBoundingClientRect();
                var d = b.width / b.height
                  , l = a.width / a.height
                  , h = b.width
                  , q = b.height
                  , f = 19.049976 / 25.4
                  , k = 0;
                l <= d ? (q = Math.min(b.height, a.height),
                h = a.width * q / a.height) : l > d && (h = Math.min(b.width, a.width),
                q = a.height * h / a.width);
                h *= f;
                q *= f;
                q < b.height && (k = (b.height - q) / 2);
                try {
                    c.doc.addImage(e.src, b.textPos.x, b.y + k, h, q)
                } catch (Ia) {}
                b.textPos.x += h
            }
        }
        function oa(b, d) {
            if ("string" === a.outputMode)
                return b.output();
            if ("base64" === a.outputMode)
                return H(b.output());
            if ("window" === a.outputMode)
                window.URL = window.URL || window.webkitURL,
                window.open(window.URL.createObjectURL(b.output("blob")));
            else
                try {
                    var e = b.output("blob");
                    saveAs(e, a.fileName + ".pdf")
                } catch (h) {
                    fa(a.fileName + ".pdf", "data:application/pdf" + (d ? "" : ";base64") + ",", d ? b.output("blob") : b.output())
                }
        }
        function pa(b, a, e) {
            var d = 0;
            "undefined" !== typeof e && (d = e.colspan);
            if (0 <= d) {
                for (var c = b.width, l = b.textPos.x, y = a.table.columns.indexOf(a.column), q = 1; q < d; q++)
                    c += a.table.columns[y + q].width;
                1 < d && ("right" === b.styles.halign ? l = b.textPos.x + c - b.width : "center" === b.styles.halign && (l = b.textPos.x + (c - b.width) / 2));
                b.width = c;
                b.textPos.x = l;
                "undefined" !== typeof e && 1 < e.rowspan && (b.height *= e.rowspan);
                if ("middle" === b.styles.valign || "bottom" === b.styles.valign)
                    e = ("string" === typeof b.text ? b.text.split(/\r\n|\r|\n/g) : b.text).length || 1,
                    2 < e && (b.textPos.y -= (2 - 1.15) / 2 * a.row.styles.fontSize * (e - 2) / 3);
                return !0
            }
            return !1
        }
        function qa(b, a, e) {
            "undefined" !== typeof b && null !== b && (b.hasAttribute("data-tableexport-canvas") ? (a = (new Date).getTime(),
            c(b).attr("data-tableexport-canvas", a),
            e.images[a] = {
                url: '[data-tableexport-canvas="' + a + '"]',
                src: null
            }) : "undefined" !== a && null != a && a.each(function() {
                if (c(this).is("img")) {
                    var a = ra(this.src);
                    e.images[a] = {
                        url: this.src,
                        src: this.src
                    }
                }
                qa(b, c(this).children(), e)
            }))
        }
        function Ea(b, a) {
            function d(b) {
                if (b.url)
                    if (b.src) {
                        var d = new Image;
                        h = ++g;
                        d.crossOrigin = "Anonymous";
                        d.onerror = d.onload = function() {
                            if (d.complete && (0 === d.src.indexOf("data:image/") && (d.width = b.width || d.width || 0,
                            d.height = b.height || d.height || 0),
                            d.width + d.height)) {
                                var c = document.createElement("canvas")
                                  , e = c.getContext("2d");
                                c.width = d.width;
                                c.height = d.height;
                                e.drawImage(d, 0, 0);
                                b.src = c.toDataURL("image/png")
                            }
                            --g || a(h)
                        }
                        ;
                        d.src = b.url
                    } else {
                        var e = c(b.url);
                        e.length && (h = ++g,
                        html2canvas(e[0]).then(function(d) {
                            b.src = d.toDataURL("image/png");
                            --g || a(h)
                        }))
                    }
            }
            var h = 0
              , g = 0;
            if ("undefined" !== typeof b.images)
                for (var l in b.images)
                    b.images.hasOwnProperty(l) && d(b.images[l]);
            (b = g) || (a(h),
            b = void 0);
            return b
        }
        function sa(b, d, e) {
            d.each(function() {
                if (c(this).is("div")) {
                    var d = aa(I(this, "background-color"), [255, 255, 255])
                      , g = aa(I(this, "border-top-color"), [0, 0, 0])
                      , l = ba(this, "border-top-width", a.jspdf.unit)
                      , y = this.getBoundingClientRect()
                      , q = this.offsetLeft * e.wScaleFactor
                      , f = this.offsetTop * e.hScaleFactor
                      , k = y.width * e.wScaleFactor;
                    y = y.height * e.hScaleFactor;
                    e.doc.setDrawColor.apply(void 0, g);
                    e.doc.setFillColor.apply(void 0, d);
                    e.doc.setLineWidth(l);
                    e.doc.rect(b.x + q, b.y + f, k, y, l ? "FD" : "F")
                } else
                    c(this).is("img") && (d = ra(this.src),
                    na(b, this, d, e));
                sa(b, c(this).children(), e)
            })
        }
        function ta(b, d, e) {
            if ("function" === typeof e.onAutotableText)
                e.onAutotableText(e.doc, b, d);
            else {
                var h = b.textPos.x
                  , g = b.textPos.y
                  , l = {
                    halign: b.styles.halign,
                    valign: b.styles.valign
                };
                if (d.length) {
                    for (d = d[0]; d.previousSibling; )
                        d = d.previousSibling;
                    for (var y = !1, q = !1; d; ) {
                        var f = d.innerText || d.textContent || ""
                          , k = f.length && " " === f[0] ? " " : ""
                          , m = 1 < f.length && " " === f[f.length - 1] ? " " : "";
                        !0 !== a.preserve.leadingWS && (f = k + ha(f));
                        !0 !== a.preserve.trailingWS && (f = ia(f) + m);
                        c(d).is("br") && (h = b.textPos.x,
                        g += e.doc.internal.getFontSize());
                        c(d).is("b") ? y = !0 : c(d).is("i") && (q = !0);
                        (y || q) && e.doc.setFontType(y && q ? "bolditalic" : y ? "bold" : "italic");
                        if (k = e.doc.getStringUnitWidth(f) * e.doc.internal.getFontSize()) {
                            "linebreak" === b.styles.overflow && h > b.textPos.x && h + k > b.textPos.x + b.width && (0 <= ".,!%*;:=-".indexOf(f.charAt(0)) && (m = f.charAt(0),
                            k = e.doc.getStringUnitWidth(m) * e.doc.internal.getFontSize(),
                            h + k <= b.textPos.x + b.width && (e.doc.autoTableText(m, h, g, l),
                            f = f.substring(1, f.length)),
                            k = e.doc.getStringUnitWidth(f) * e.doc.internal.getFontSize()),
                            h = b.textPos.x,
                            g += e.doc.internal.getFontSize());
                            if ("visible" !== b.styles.overflow)
                                for (; f.length && h + k > b.textPos.x + b.width; )
                                    f = f.substring(0, f.length - 1),
                                    k = e.doc.getStringUnitWidth(f) * e.doc.internal.getFontSize();
                            e.doc.autoTableText(f, h, g, l);
                            h += k
                        }
                        if (y || q)
                            c(d).is("b") ? y = !1 : c(d).is("i") && (q = !1),
                            e.doc.setFontType(y || q ? y ? "bold" : "italic" : "normal");
                        d = d.nextSibling
                    }
                    b.textPos.x = h;
                    b.textPos.y = g
                } else
                    e.doc.autoTableText(b.text, b.textPos.x, b.textPos.y, l)
            }
        }
        function ca(b, a, c) {
            return null == b ? "" : b.toString().replace(new RegExp(null == a ? "" : a.toString().replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"),"g"), c)
        }
        function ha(b) {
            return null == b ? "" : b.toString().replace(/^\s+/, "")
        }
        function ia(b) {
            return null == b ? "" : b.toString().replace(/\s+$/, "")
        }
        function ja(b) {
            b = ca(b || "0", a.numbers.html.thousandsSeparator, "");
            b = ca(b, a.numbers.html.decimalMark, ".");
            return "number" === typeof b || !1 !== jQuery.isNumeric(b) ? b : !1
        }
        function Fa(b) {
            -1 < b.indexOf("%") ? (b = ja(b.replace(/%/g, "")),
            !1 !== b && (b /= 100)) : b = !1;
            return b
        }
        function B(b, d, e) {
            var h = "";
            if (null !== b) {
                var g = c(b);
                if (g[0].hasAttribute("data-tableexport-canvas"))
                    var l = "";
                else if (g[0].hasAttribute("data-tableexport-value"))
                    l = (l = g.data("tableexport-value")) ? l + "" : "";
                else if (l = g.html(),
                "function" === typeof a.onCellHtmlData)
                    l = a.onCellHtmlData(g, d, e, l);
                else if ("" !== l) {
                    var f = c.parseHTML(l)
                      , q = 0
                      , k = 0;
                    l = "";
                    c.each(f, function() {
                        if (c(this).is("input"))
                            l += g.find("input").eq(q++).val();
                        else if (c(this).is("select"))
                            l += g.find("select option:selected").eq(k++).text();
                        else if (c(this).is("br"))
                            l += "<br>";
                        else if ("undefined" === typeof c(this).html())
                            l += c(this).text();
                        else if (void 0 === jQuery().bootstrapTable || !0 !== c(this).hasClass("filterControl") && 0 === c(b).parents(".detail-view").length)
                            l += c(this).html()
                    })
                }
                if (!0 === a.htmlContent)
                    h = c.trim(l);
                else if (l && "" !== l)
                    if ("" !== c(b).data("tableexport-cellformat")) {
                        var m = l.replace(/\n/g, "\u2028").replace(/(<\s*br([^>]*)>)/gi, "\u2060")
                          , n = c("<div/>").html(m).contents();
                        f = !1;
                        m = "";
                        c.each(n.text().split("\u2028"), function(b, d) {
                            0 < b && (m += " ");
                            !0 !== a.preserve.leadingWS && (d = ha(d));
                            m += !0 !== a.preserve.trailingWS ? ia(d) : d
                        });
                        c.each(m.split("\u2060"), function(b, d) {
                            0 < b && (h += "\n");
                            !0 !== a.preserve.leadingWS && (d = ha(d));
                            !0 !== a.preserve.trailingWS && (d = ia(d));
                            h += d.replace(/\u00AD/g, "")
                        });
                        h = h.replace(/\u00A0/g, " ");
                        if ("json" === a.type || "excel" === a.type && "xmlss" === a.mso.fileFormat || !1 === a.numbers.output)
                            f = ja(h),
                            !1 !== f && (h = Number(f));
                        else if (a.numbers.html.decimalMark !== a.numbers.output.decimalMark || a.numbers.html.thousandsSeparator !== a.numbers.output.thousandsSeparator)
                            if (f = ja(h),
                            !1 !== f) {
                                n = ("" + f.substr(0 > f ? 1 : 0)).split(".");
                                1 === n.length && (n[1] = "");
                                var p = 3 < n[0].length ? n[0].length % 3 : 0;
                                h = (0 > f ? "-" : "") + (a.numbers.output.thousandsSeparator ? (p ? n[0].substr(0, p) + a.numbers.output.thousandsSeparator : "") + n[0].substr(p).replace(/(\d{3})(?=\d)/g, "$1" + a.numbers.output.thousandsSeparator) : n[0]) + (n[1].length ? a.numbers.output.decimalMark + n[1] : "")
                            }
                    } else
                        h = l;
                !0 === a.escape && (h = escape(h));
                "function" === typeof a.onCellData && (h = a.onCellData(g, d, e, h))
            }
            return h
        }
        function ua(b) {
            return 0 < b.length && !0 === a.preventInjection && 0 <= "=+-@".indexOf(b.charAt(0)) ? "'" + b : b
        }
        function Ga(b, a, c) {
            return a + "-" + c.toLowerCase()
        }
        function aa(b, a) {
            (b = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(b)) && (a = [parseInt(b[1]), parseInt(b[2]), parseInt(b[3])]);
            return a
        }
        function va(b) {
            var a = I(b, "text-align")
              , c = I(b, "font-weight")
              , h = I(b, "font-style")
              , g = "";
            "start" === a && (a = "rtl" === I(b, "direction") ? "right" : "left");
            700 <= c && (g = "bold");
            "italic" === h && (g += h);
            "" === g && (g = "normal");
            a = {
                style: {
                    align: a,
                    bcolor: aa(I(b, "background-color"), [255, 255, 255]),
                    color: aa(I(b, "color"), [0, 0, 0]),
                    fstyle: g
                },
                colspan: S(b),
                rowspan: T(b)
            };
            null !== b && (b = b.getBoundingClientRect(),
            a.rect = {
                width: b.width,
                height: b.height
            });
            return a
        }
        function S(b) {
            var a = c(b).data("tableexport-colspan");
            "undefined" === typeof a && c(b).is("[colspan]") && (a = c(b).attr("colspan"));
            return parseInt(a) || 0
        }
        function T(b) {
            var a = c(b).data("tableexport-rowspan");
            "undefined" === typeof a && c(b).is("[rowspan]") && (a = c(b).attr("rowspan"));
            return parseInt(a) || 0
        }
        function I(b, a) {
            try {
                return window.getComputedStyle ? (a = a.replace(/([a-z])([A-Z])/, Ga),
                window.getComputedStyle(b, null).getPropertyValue(a)) : b.currentStyle ? b.currentStyle[a] : b.style[a]
            } catch (e) {}
            return ""
        }
        function ba(b, a, c) {
            a = I(b, a).match(/\d+/);
            if (null !== a) {
                a = a[0];
                b = b.parentElement;
                var d = document.createElement("div");
                d.style.overflow = "hidden";
                d.style.visibility = "hidden";
                b.appendChild(d);
                d.style.width = 100 + c;
                c = 100 / d.offsetWidth;
                b.removeChild(d);
                return a * c
            }
            return 0
        }
        function Ha(a) {
            for (var b = new ArrayBuffer(a.length), c = new Uint8Array(b), h = 0; h !== a.length; ++h)
                c[h] = a.charCodeAt(h) & 255;
            return b
        }
        function ra(a) {
            var b = 0, c;
            if (0 === a.length)
                return b;
            var h = 0;
            for (c = a.length; h < c; h++) {
                var g = a.charCodeAt(h);
                b = (b << 5) - b + g;
                b |= 0
            }
            return b
        }
        function J(b, d, c, h, g, l) {
            var e = !0;
            "function" === typeof a.onBeforeSaveToFile && (e = a.onBeforeSaveToFile(b, d, c, h, g),
            "boolean" !== typeof e && (e = !0));
            if (e)
                try {
                    if (wa = new Blob([b],{
                        type: c + ";charset=" + h
                    }),
                    saveAs(wa, d, !1 === l),
                    "function" === typeof a.onAfterSaveToFile)
                        a.onAfterSaveToFile(b, d)
                } catch (q) {
                    fa(d, "data:" + c + (h.length ? ";charset=" + h : "") + (g.length ? ";" + g : "") + "," + (l ? "\ufeff" : ""), b)
                }
        }
        function fa(b, d, c) {
            var e = window.navigator.userAgent;
            if (!1 !== b && window.navigator.msSaveOrOpenBlob)
                window.navigator.msSaveOrOpenBlob(new Blob([c]), b);
            else if (!1 !== b && (0 < e.indexOf("MSIE ") || e.match(/Trident.*rv\:11\./))) {
                if (d = document.createElement("iframe")) {
                    document.body.appendChild(d);
                    d.setAttribute("style", "display:none");
                    d.contentDocument.open("txt/plain", "replace");
                    d.contentDocument.write(c);
                    d.contentDocument.close();
                    d.contentDocument.focus();
                    switch (b.substr(b.lastIndexOf(".") + 1)) {
                    case "doc":
                    case "json":
                    case "png":
                    case "pdf":
                    case "xls":
                    case "xlsx":
                        b += ".txt"
                    }
                    d.contentDocument.execCommand("SaveAs", !0, b);
                    document.body.removeChild(d)
                }
            } else {
                var g = document.createElement("a");
                if (g) {
                    var l = null;
                    g.style.display = "none";
                    !1 !== b ? g.download = b : g.target = "_blank";
                    "object" === typeof c ? (window.URL = window.URL || window.webkitURL,
                    e = [],
                    e.push(c),
                    l = window.URL.createObjectURL(new Blob(e,{
                        type: d
                    })),
                    g.href = l) : 0 <= d.toLowerCase().indexOf("base64,") ? g.href = d + H(c) : g.href = d + encodeURIComponent(c);
                    document.body.appendChild(g);
                    if (document.createEvent)
                        null === da && (da = document.createEvent("MouseEvents")),
                        da.initEvent("click", !0, !1),
                        g.dispatchEvent(da);
                    else if (document.createEventObject)
                        g.fireEvent("onclick");
                    else if ("function" === typeof g.onclick)
                        g.onclick();
                    setTimeout(function() {
                        l && window.URL.revokeObjectURL(l);
                        document.body.removeChild(g);
                        if ("function" === typeof a.onAfterSaveToFile)
                            a.onAfterSaveToFile(c, b)
                    }, 100)
                }
            }
        }
        function H(a) {
            var b, c = "", h = 0;
            if ("string" === typeof a) {
                a = a.replace(/\x0d\x0a/g, "\n");
                var g = "";
                for (b = 0; b < a.length; b++) {
                    var l = a.charCodeAt(b);
                    128 > l ? g += String.fromCharCode(l) : (127 < l && 2048 > l ? g += String.fromCharCode(l >> 6 | 192) : (g += String.fromCharCode(l >> 12 | 224),
                    g += String.fromCharCode(l >> 6 & 63 | 128)),
                    g += String.fromCharCode(l & 63 | 128))
                }
                a = g
            }
            for (; h < a.length; ) {
                var f = a.charCodeAt(h++);
                g = a.charCodeAt(h++);
                b = a.charCodeAt(h++);
                l = f >> 2;
                f = (f & 3) << 4 | g >> 4;
                var q = (g & 15) << 2 | b >> 6;
                var k = b & 63;
                isNaN(g) ? q = k = 64 : isNaN(b) && (k = 64);
                c = c + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(q) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(k)
            }
            return c
        }
        var a = {
            csvEnclosure: '"',
            csvSeparator: ",",
            csvUseBOM: !0,
            displayTableName: !1,
            escape: !1,
            exportHiddenCells: !1,
            fileName: "tableExport",
            htmlContent: !1,
            ignoreColumn: [],
            ignoreRow: [],
            jsonScope: "all",
            jspdf: {
                orientation: "p",
                unit: "pt",
                format: "a4",
                margins: {
                    left: 20,
                    right: 10,
                    top: 10,
                    bottom: 10
                },
                onDocCreated: null,
                autotable: {
                    styles: {
                        cellPadding: 2,
                        rowHeight: 12,
                        fontSize: 8,
                        fillColor: 255,
                        textColor: 50,
                        fontStyle: "normal",
                        overflow: "ellipsize",
                        halign: "inherit",
                        valign: "middle"
                    },
                    headerStyles: {
                        fillColor: [52, 73, 94],
                        textColor: 255,
                        fontStyle: "bold",
                        halign: "inherit",
                        valign: "middle"
                    },
                    alternateRowStyles: {
                        fillColor: 245
                    },
                    tableExport: {
                        doc: null,
                        onAfterAutotable: null,
                        onBeforeAutotable: null,
                        onAutotableText: null,
                        onTable: null,
                        outputImages: !0
                    }
                }
            },
            mso: {
                fileFormat: "xlshtml",
                onMsoNumberFormat: null,
                pageFormat: "a4",
                pageOrientation: "portrait",
                rtl: !1,
                styles: [],
                worksheetName: ""
            },
            numbers: {
                html: {
                    decimalMark: ".",
                    thousandsSeparator: ","
                },
                output: {
                    decimalMark: ".",
                    thousandsSeparator: ","
                }
            },
            onAfterSaveToFile: null,
            onBeforeSaveToFile: null,
            onCellData: null,
            onCellHtmlData: null,
            onIgnoreRow: null,
            outputMode: "file",
            pdfmake: {
                enabled: !1,
                docDefinition: {
                    pageOrientation: "portrait",
                    defaultStyle: {
                        font: "Roboto"
                    }
                },
                fonts: {}
            },
            preserve: {
                leadingWS: !1,
                trailingWS: !1
            },
            preventInjection: !0,
            tbodySelector: "tr",
            tfootSelector: "tr",
            theadSelector: "tr",
            tableName: "Table",
            type: "csv"
        }, K = {
            a0: [2383.94, 3370.39],
            a1: [1683.78, 2383.94],
            a2: [1190.55, 1683.78],
            a3: [841.89, 1190.55],
            a4: [595.28, 841.89],
            a5: [419.53, 595.28],
            a6: [297.64, 419.53],
            a7: [209.76, 297.64],
            a8: [147.4, 209.76],
            a9: [104.88, 147.4],
            a10: [73.7, 104.88],
            b0: [2834.65, 4008.19],
            b1: [2004.09, 2834.65],
            b2: [1417.32, 2004.09],
            b3: [1000.63, 1417.32],
            b4: [708.66, 1000.63],
            b5: [498.9, 708.66],
            b6: [354.33, 498.9],
            b7: [249.45, 354.33],
            b8: [175.75, 249.45],
            b9: [124.72, 175.75],
            b10: [87.87, 124.72],
            c0: [2599.37, 3676.54],
            c1: [1836.85, 2599.37],
            c2: [1298.27, 1836.85],
            c3: [918.43, 1298.27],
            c4: [649.13, 918.43],
            c5: [459.21, 649.13],
            c6: [323.15, 459.21],
            c7: [229.61, 323.15],
            c8: [161.57, 229.61],
            c9: [113.39, 161.57],
            c10: [79.37, 113.39],
            dl: [311.81, 623.62],
            letter: [612, 792],
            "government-letter": [576, 756],
            legal: [612, 1008],
            "junior-legal": [576, 360],
            ledger: [1224, 792],
            tabloid: [792, 1224],
            "credit-card": [153, 243]
        }, v = this, da = null, r = [], t = [], n = 0, p = "", Q = [], E = [], wa, G = [], R = !1;
        c.extend(!0, a, m);
        "xlsx" === a.type && (a.mso.fileFormat = a.type,
        a.type = "excel");
        "undefined" !== typeof a.excelFileFormat && "undefined" === a.mso.fileFormat && (a.mso.fileFormat = a.excelFileFormat);
        "undefined" !== typeof a.excelPageFormat && "undefined" === a.mso.pageFormat && (a.mso.pageFormat = a.excelPageFormat);
        "undefined" !== typeof a.excelPageOrientation && "undefined" === a.mso.pageOrientation && (a.mso.pageOrientation = a.excelPageOrientation);
        "undefined" !== typeof a.excelRTL && "undefined" === a.mso.rtl && (a.mso.rtl = a.excelRTL);
        "undefined" !== typeof a.excelstyles && "undefined" === a.mso.styles && (a.mso.styles = a.excelstyles);
        "undefined" !== typeof a.onMsoNumberFormat && "undefined" === a.mso.onMsoNumberFormat && (a.mso.onMsoNumberFormat = a.onMsoNumberFormat);
        "undefined" !== typeof a.worksheetName && "undefined" === a.mso.worksheetName && (a.mso.worksheetName = a.worksheetName);
        a.mso.pageOrientation = "l" === a.mso.pageOrientation.substr(0, 1) ? "landscape" : "portrait";
        Q = P(v);
        if ("csv" === a.type || "tsv" === a.type || "txt" === a.type) {
            var M = ""
              , W = 0;
            E = [];
            n = 0;
            var ka = function(b, d, e) {
                b.each(function() {
                    p = "";
                    C(this, d, n, e + b.length, function(b, c, d) {
                        var g = p
                          , e = "";
                        if (null !== b)
                            if (b = B(b, c, d),
                            c = null === b || "" === b ? "" : b.toString(),
                            "tsv" === a.type)
                                b instanceof Date && b.toLocaleString(),
                                e = ca(c, "\t", " ");
                            else if (b instanceof Date)
                                e = a.csvEnclosure + b.toLocaleString() + a.csvEnclosure;
                            else if (e = ua(c),
                            e = ca(e, a.csvEnclosure, a.csvEnclosure + a.csvEnclosure),
                            0 <= e.indexOf(a.csvSeparator) || /[\r\n ]/g.test(e))
                                e = a.csvEnclosure + e + a.csvEnclosure;
                        p = g + (e + ("tsv" === a.type ? "\t" : a.csvSeparator))
                    });
                    p = c.trim(p).substring(0, p.length - 1);
                    0 < p.length && (0 < M.length && (M += "\n"),
                    M += p);
                    n++
                });
                return b.length
            };
            W += ka(c(v).find("thead").first().find(a.theadSelector), "th,td", W);
            w(c(v), "tbody").each(function() {
                W += ka(w(c(this), a.tbodySelector), "td,th", W)
            });
            a.tfootSelector.length && ka(c(v).find("tfoot").first().find(a.tfootSelector), "td,th", W);
            M += "\n";
            if ("string" === a.outputMode)
                return M;
            if ("base64" === a.outputMode)
                return H(M);
            if ("window" === a.outputMode) {
                fa(!1, "data:text/" + ("csv" === a.type ? "csv" : "plain") + ";charset=utf-8,", M);
                return
            }
            J(M, a.fileName + "." + a.type, "text/" + ("csv" === a.type ? "csv" : "plain"), "utf-8", "", "csv" === a.type && a.csvUseBOM)
        } else if ("sql" === a.type) {
            n = 0;
            E = [];
            var A = "INSERT INTO `" + a.tableName + "` (";
            r = u(c(v));
            c(r).each(function() {
                C(this, "th,td", n, r.length, function(a, c, e) {
                    A += "'" + B(a, c, e) + "',"
                });
                n++;
                A = c.trim(A).substring(0, A.length - 1)
            });
            A += ") VALUES ";
            t = x(c(v));
            c(t).each(function() {
                p = "";
                C(this, "td,th", n, r.length + t.length, function(a, c, e) {
                    p += "'" + B(a, c, e) + "',"
                });
                3 < p.length && (A += "(" + p,
                A = c.trim(A).substring(0, A.length - 1),
                A += "),");
                n++
            });
            A = c.trim(A).substring(0, A.length - 1);
            A += ";";
            if ("string" === a.outputMode)
                return A;
            if ("base64" === a.outputMode)
                return H(A);
            J(A, a.fileName + ".sql", "application/sql", "utf-8", "", !1)
        } else if ("json" === a.type) {
            var U = [];
            E = [];
            r = u(c(v));
            c(r).each(function() {
                var a = [];
                C(this, "th,td", n, r.length, function(b, c, f) {
                    a.push(B(b, c, f))
                });
                U.push(a)
            });
            var la = [];
            t = x(c(v));
            c(t).each(function() {
                var a = {}
                  , d = 0;
                C(this, "td,th", n, r.length + t.length, function(b, c, g) {
                    U.length ? a[U[U.length - 1][d]] = B(b, c, g) : a[d] = B(b, c, g);
                    d++
                });
                !1 === c.isEmptyObject(a) && la.push(a);
                n++
            });
            m = "";
            m = "head" === a.jsonScope ? JSON.stringify(U) : "data" === a.jsonScope ? JSON.stringify(la) : JSON.stringify({
                header: U,
                data: la
            });
            if ("string" === a.outputMode)
                return m;
            if ("base64" === a.outputMode)
                return H(m);
            J(m, a.fileName + ".json", "application/json", "utf-8", "base64", !1)
        } else if ("xml" === a.type) {
            n = 0;
            E = [];
            var N = '<?xml version="1.0" encoding="utf-8"?>';
            N += "<tabledata><fields>";
            r = u(c(v));
            c(r).each(function() {
                C(this, "th,td", n, r.length, function(a, c, e) {
                    N += "<field>" + B(a, c, e) + "</field>"
                });
                n++
            });
            N += "</fields><data>";
            var xa = 1;
            t = x(c(v));
            c(t).each(function() {
                var a = 1;
                p = "";
                C(this, "td,th", n, r.length + t.length, function(b, c, f) {
                    p += "<column-" + a + ">" + B(b, c, f) + "</column-" + a + ">";
                    a++
                });
                0 < p.length && "<column-1></column-1>" !== p && (N += '<row id="' + xa + '">' + p + "</row>",
                xa++);
                n++
            });
            N += "</data></tabledata>";
            if ("string" === a.outputMode)
                return N;
            if ("base64" === a.outputMode)
                return H(N);
            J(N, a.fileName + ".xml", "application/xml", "utf-8", "base64", !1)
        } else if ("excel" === a.type && "xmlss" === a.mso.fileFormat) {
            var ma = []
              , z = [];
            c(v).filter(function() {
                return L(c(this))
            }).each(function() {
                function b(a, b, d) {
                    var e = [];
                    c(a).each(function() {
                        var b = 0
                          , g = 0;
                        p = "";
                        C(this, "td,th", n, d + a.length, function(a, d, l) {
                            if (null !== a) {
                                var f = "";
                                d = B(a, d, l);
                                l = "String";
                                if (!1 !== jQuery.isNumeric(d))
                                    l = "Number";
                                else {
                                    var h = Fa(d);
                                    !1 !== h && (d = h,
                                    l = "Number",
                                    f += ' ss:StyleID="pct1"')
                                }
                                "Number" !== l && (d = d.replace(/\n/g, "<br>"));
                                h = S(a);
                                a = T(a);
                                c.each(e, function() {
                                    if (n >= this.s.r && n <= this.e.r && g >= this.s.c && g <= this.e.c)
                                        for (var a = 0; a <= this.e.c - this.s.c; ++a)
                                            g++,
                                            b++
                                });
                                if (a || h)
                                    a = a || 1,
                                    h = h || 1,
                                    e.push({
                                        s: {
                                            r: n,
                                            c: g
                                        },
                                        e: {
                                            r: n + a - 1,
                                            c: g + h - 1
                                        }
                                    });
                                1 < h && (f += ' ss:MergeAcross="' + (h - 1) + '"',
                                g += h - 1);
                                1 < a && (f += ' ss:MergeDown="' + (a - 1) + '" ss:StyleID="rsp1"');
                                0 < b && (f += ' ss:Index="' + (g + 1) + '"',
                                b = 0);
                                p += "<Cell" + f + '><Data ss:Type="' + l + '">' + c("<div />").text(d).html() + "</Data></Cell>\r";
                                g++
                            }
                        });
                        0 < p.length && (F += '<Row ss:AutoFitHeight="0">\r' + p + "</Row>\r");
                        n++
                    });
                    return a.length
                }
                var d = c(this)
                  , e = "";
                "string" === typeof a.mso.worksheetName && a.mso.worksheetName.length ? e = a.mso.worksheetName + " " + (z.length + 1) : "undefined" !== typeof a.mso.worksheetName[z.length] && (e = a.mso.worksheetName[z.length]);
                e.length || (e = d.find("caption").text() || "");
                e.length || (e = "Table " + (z.length + 1));
                e = c.trim(e.replace(/[\\\/[\]*:?'"]/g, "").substring(0, 31));
                z.push(c("<div />").text(e).html());
                !1 === a.exportHiddenCells && (G = d.find("tr, th, td").filter(":hidden"),
                R = 0 < G.length);
                n = 0;
                Q = P(this);
                F = "<Table>\r";
                var f = b(u(d), "th,td", f);
                b(x(d), "td,th", f);
                F += "</Table>\r";
                ma.push(F)
            });
            m = {};
            for (var D = {}, k, O, V = 0, Z = z.length; V < Z; V++)
                k = z[V],
                O = m[k],
                O = m[k] = null == O ? 1 : O + 1,
                2 === O && (z[D[k]] = z[D[k]].substring(0, 29) + "-1"),
                1 < m[k] ? z[V] = z[V].substring(0, 29) + "-" + m[k] : D[k] = V;
            m = '<?xml version="1.0" encoding="UTF-8"?>\r<?mso-application progid="Excel.Sheet"?>\r<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\r xmlns:o="urn:schemas-microsoft-com:office:office"\r xmlns:x="urn:schemas-microsoft-com:office:excel"\r xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\r xmlns:html="http://www.w3.org/TR/REC-html40">\r<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\r  <Created>' + (new Date).toISOString() + '</Created>\r</DocumentProperties>\r<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">\r  <AllowPNG/>\r</OfficeDocumentSettings>\r<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">\r  <WindowHeight>9000</WindowHeight>\r  <WindowWidth>13860</WindowWidth>\r  <WindowTopX>0</WindowTopX>\r  <WindowTopY>0</WindowTopY>\r  <ProtectStructure>False</ProtectStructure>\r  <ProtectWindows>False</ProtectWindows>\r</ExcelWorkbook>\r<Styles>\r  <Style ss:ID="Default" ss:Name="Normal">\r    <Alignment ss:Vertical="Bottom"/>\r    <Borders/>\r    <Font/>\r    <Interior/>\r    <NumberFormat/>\r    <Protection/>\r  </Style>\r  <Style ss:ID="rsp1">\r    <Alignment ss:Vertical="Center"/>\r  </Style>\r  <Style ss:ID="pct1">\r    <NumberFormat ss:Format="Percent"/>\r  </Style>\r</Styles>\r';
            for (D = 0; D < ma.length; D++)
                m += '<Worksheet ss:Name="' + z[D] + '" ss:RightToLeft="' + (a.mso.rtl ? "1" : "0") + '">\r' + ma[D],
                m = a.mso.rtl ? m + '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">\r<DisplayRightToLeft/>\r</WorksheetOptions>\r' : m + '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"/>\r',
                m += "</Worksheet>\r";
            m += "</Workbook>\r";
            if ("string" === a.outputMode)
                return m;
            if ("base64" === a.outputMode)
                return H(m);
            J(m, a.fileName + ".xml", "application/xml", "utf-8", "base64", !1)
        } else if ("excel" === a.type && "xlsx" === a.mso.fileFormat) {
            z = [];
            var ya = XLSX.utils.book_new();
            c(v).filter(function() {
                return L(c(this))
            }).each(function() {
                var b = c(this)
                  , d = XLSX.utils.table_to_sheet(this)
                  , e = "";
                "string" === typeof a.mso.worksheetName && a.mso.worksheetName.length ? e = a.mso.worksheetName + " " + (z.length + 1) : "undefined" !== typeof a.mso.worksheetName[z.length] && (e = a.mso.worksheetName[z.length]);
                e.length || (e = b.find("caption").text() || "");
                e.length || (e = "Table " + (z.length + 1));
                e = c.trim(e.replace(/[\\\/[\]*:?'"]/g, "").substring(0, 31));
                z.push(e);
                XLSX.utils.book_append_sheet(ya, d, e)
            });
            m = XLSX.write(ya, {
                type: "binary",
                bookType: a.mso.fileFormat,
                bookSST: !1
            });
            J(Ha(m), a.fileName + "." + a.mso.fileFormat, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "UTF-8", "", !1)
        } else if ("excel" === a.type || "xls" === a.type || "word" === a.type || "doc" === a.type) {
            m = "excel" === a.type || "xls" === a.type ? "excel" : "word";
            D = "excel" === m ? "xls" : "doc";
            k = 'xmlns:x="urn:schemas-microsoft-com:office:' + m + '"';
            var F = ""
              , X = "";
            c(v).filter(function() {
                return L(c(this))
            }).each(function() {
                var b = c(this);
                "" === X && (X = a.mso.worksheetName || b.find("caption").text() || "Table",
                X = c.trim(X.replace(/[\\\/[\]*:?'"]/g, "").substring(0, 31)));
                !1 === a.exportHiddenCells && (G = b.find("tr, th, td").filter(":hidden"),
                R = 0 < G.length);
                n = 0;
                E = [];
                Q = P(this);
                F += "<table><thead>";
                r = u(b);
                c(r).each(function() {
                    var b = c(this);
                    p = "";
                    C(this, "th,td", n, r.length, function(c, d, g) {
                        if (null !== c) {
                            var e = ""
                              , f = document.defaultView.getComputedStyle(c, null)
                              , h = document.defaultView.getComputedStyle(b[0], null);
                            p += "<th";
                            for (var k in a.mso.styles) {
                                var m = f[a.mso.styles[k]];
                                "" === m && (m = h[a.mso.styles[k]]);
                                "" !== m && "0px none rgb(0, 0, 0)" !== m && "rgba(0, 0, 0, 0)" !== m && (e += "" === e ? 'style="' : ";",
                                e += a.mso.styles[k] + ":" + m)
                            }
                            "" !== e && (p += " " + e + '"');
                            e = S(c);
                            0 < e && (p += ' colspan="' + e + '"');
                            e = T(c);
                            0 < e && (p += ' rowspan="' + e + '"');
                            p += ">" + B(c, d, g) + "</th>"
                        }
                    });
                    0 < p.length && (F += "<tr>" + p + "</tr>");
                    n++
                });
                F += "</thead><tbody>";
                t = x(b);
                c(t).each(function() {
                    var b = c(this);
                    p = "";
                    C(this, "td,th", n, r.length + t.length, function(d, f, g) {
                        if (null !== d) {
                            var e = B(d, f, g)
                              , h = ""
                              , k = c(d).data("tableexport-msonumberformat")
                              , m = document.defaultView.getComputedStyle(d, null)
                              , n = document.defaultView.getComputedStyle(b[0], null);
                            "undefined" === typeof k && "function" === typeof a.mso.onMsoNumberFormat && (k = a.mso.onMsoNumberFormat(d, f, g));
                            "undefined" !== typeof k && "" !== k && (h = "style=\"mso-number-format:'" + k + "'");
                            for (var r in a.mso.styles)
                                k = m[a.mso.styles[r]],
                                "" === k && (k = n[a.mso.styles[r]]),
                                "" !== k && "0px none rgb(0, 0, 0)" !== k && "rgba(0, 0, 0, 0)" !== k && (h += "" === h ? 'style="' : ";",
                                h += a.mso.styles[r] + ":" + k);
                            p += "<td";
                            "" !== h && (p += " " + h + '"');
                            f = S(d);
                            0 < f && (p += ' colspan="' + f + '"');
                            d = T(d);
                            0 < d && (p += ' rowspan="' + d + '"');
                            "string" === typeof e && "" !== e && (e = ua(e),
                            e = e.replace(/\n/g, "<br>"));
                            p += ">" + e + "</td>"
                        }
                    });
                    0 < p.length && (F += "<tr>" + p + "</tr>");
                    n++
                });
                a.displayTableName && (F += "<tr><td></td></tr><tr><td></td></tr><tr><td>" + B(c("<p>" + a.tableName + "</p>")) + "</td></tr>");
                F += "</tbody></table>"
            });
            k = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' + k + ' xmlns="http://www.w3.org/TR/REC-html40">' + ('<meta http-equiv="content-type" content="application/vnd.ms-' + m + '; charset=UTF-8">') + "<head>";
            "excel" === m && (k += "\x3c!--[if gte mso 9]>",
            k += "<xml>",
            k += "<x:ExcelWorkbook>",
            k += "<x:ExcelWorksheets>",
            k += "<x:ExcelWorksheet>",
            k += "<x:Name>",
            k += X,
            k += "</x:Name>",
            k += "<x:WorksheetOptions>",
            k += "<x:DisplayGridlines/>",
            a.mso.rtl && (k += "<x:DisplayRightToLeft/>"),
            k += "</x:WorksheetOptions>",
            k += "</x:ExcelWorksheet>",
            k += "</x:ExcelWorksheets>",
            k += "</x:ExcelWorkbook>",
            k += "</xml>",
            k += "<![endif]--\x3e");
            k += "<style>";
            k += "@page { size:" + a.mso.pageOrientation + "; mso-page-orientation:" + a.mso.pageOrientation + "; }";
            k += "@page Section1 {size:" + K[a.mso.pageFormat][0] + "pt " + K[a.mso.pageFormat][1] + "pt";
            k += "; margin:1.0in 1.25in 1.0in 1.25in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}";
            k += "div.Section1 {page:Section1;}";
            k += "@page Section2 {size:" + K[a.mso.pageFormat][1] + "pt " + K[a.mso.pageFormat][0] + "pt";
            k += ";mso-page-orientation:" + a.mso.pageOrientation + ";margin:1.25in 1.0in 1.25in 1.0in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}";
            k += "div.Section2 {page:Section2;}";
            k += "br {mso-data-placement:same-cell;}";
            k += "</style>";
            k += "</head>";
            k += "<body>";
            k += '<div class="Section' + ("landscape" === a.mso.pageOrientation ? "2" : "1") + '">';
            k += F;
            k += "</div>";
            k += "</body>";
            k += "</html>";
            if ("string" === a.outputMode)
                return k;
            if ("base64" === a.outputMode)
                return H(k);
            J(k, a.fileName + "." + D, "application/vnd.ms-" + m, "", "base64", !1)
        } else if ("png" === a.type)
            html2canvas(c(v)[0]).then(function(b) {
                b = b.toDataURL();
                for (var c = atob(b.substring(22)), e = new ArrayBuffer(c.length), f = new Uint8Array(e), g = 0; g < c.length; g++)
                    f[g] = c.charCodeAt(g);
                if ("string" === a.outputMode)
                    return c;
                if ("base64" === a.outputMode)
                    return H(b);
                "window" === a.outputMode ? window.open(b) : J(e, a.fileName + ".png", "image/png", "", "", !1)
            });
        else if ("pdf" === a.type)
            if (!0 === a.pdfmake.enabled) {
                m = [];
                var za = [];
                n = 0;
                E = [];
                D = function(a, d, e) {
                    var b = 0;
                    c(a).each(function() {
                        var a = [];
                        C(this, d, n, e, function(b, c, d) {
                            if ("undefined" !== typeof b && null !== b) {
                                var e = S(b)
                                  , g = T(b);
                                b = B(b, c, d) || " ";
                                1 < e || 1 < g ? a.push({
                                    colSpan: e || 1,
                                    rowSpan: g || 1,
                                    text: b
                                }) : a.push(b)
                            } else
                                a.push(" ")
                        });
                        a.length && za.push(a);
                        b < a.length && (b = a.length);
                        n++
                    });
                    return b
                }
                ;
                r = u(c(this));
                k = D(r, "th,td", r.length);
                for (O = m.length; O < k; O++)
                    m.push("*");
                t = x(c(this));
                D(t, "th,td", r.length + t.length);
                m = {
                    content: [{
                        table: {
                            headerRows: r.length,
                            widths: m,
                            body: za
                        }
                    }]
                };
                c.extend(!0, m, a.pdfmake.docDefinition);
                pdfMake.fonts = {
                    Roboto: {
                        normal: "Roboto-Regular.ttf",
                        bold: "Roboto-Medium.ttf",
                        italics: "Roboto-Italic.ttf",
                        bolditalics: "Roboto-MediumItalic.ttf"
                    }
                };
                c.extend(!0, pdfMake.fonts, a.pdfmake.fonts);
                pdfMake.createPdf(m).getBuffer(function(b) {
                    J(b, a.fileName + ".pdf", "application/pdf", "", "", !1)
                })
            } else if (!1 === a.jspdf.autotable) {
                m = {
                    dim: {
                        w: ba(c(v).first().get(0), "width", "mm"),
                        h: ba(c(v).first().get(0), "height", "mm")
                    },
                    pagesplit: !1
                };
                var Aa = new jsPDF(a.jspdf.orientation,a.jspdf.unit,a.jspdf.format);
                Aa.addHTML(c(v).first(), a.jspdf.margins.left, a.jspdf.margins.top, m, function() {
                    oa(Aa, !1)
                })
            } else {
                var f = a.jspdf.autotable.tableExport;
                if ("string" === typeof a.jspdf.format && "bestfit" === a.jspdf.format.toLowerCase()) {
                    var ea = ""
                      , Y = ""
                      , Ba = 0;
                    c(v).each(function() {
                        if (L(c(this))) {
                            var a = ba(c(this).get(0), "width", "pt");
                            if (a > Ba) {
                                a > K.a0[0] && (ea = "a0",
                                Y = "l");
                                for (var d in K)
                                    K.hasOwnProperty(d) && K[d][1] > a && (ea = d,
                                    Y = "l",
                                    K[d][0] > a && (Y = "p"));
                                Ba = a
                            }
                        }
                    });
                    a.jspdf.format = "" === ea ? "a4" : ea;
                    a.jspdf.orientation = "" === Y ? "w" : Y
                }
                if (null == f.doc && (f.doc = new jsPDF(a.jspdf.orientation,a.jspdf.unit,a.jspdf.format),
                f.wScaleFactor = 1,
                f.hScaleFactor = 1,
                "function" === typeof a.jspdf.onDocCreated))
                    a.jspdf.onDocCreated(f.doc);
                !0 === f.outputImages && (f.images = {});
                "undefined" !== typeof f.images && (c(v).filter(function() {
                    return L(c(this))
                }).each(function() {
                    var b = 0;
                    E = [];
                    !1 === a.exportHiddenCells && (G = c(this).find("tr, th, td").filter(":hidden"),
                    R = 0 < G.length);
                    r = u(c(this));
                    t = x(c(this));
                    c(t).each(function() {
                        C(this, "td,th", r.length + b, r.length + t.length, function(a) {
                            qa(a, c(a).children(), f)
                        });
                        b++
                    })
                }),
                r = [],
                t = []);
                Ea(f, function() {
                    c(v).filter(function() {
                        return L(c(this))
                    }).each(function() {
                        var b;
                        n = 0;
                        E = [];
                        !1 === a.exportHiddenCells && (G = c(this).find("tr, th, td").filter(":hidden"),
                        R = 0 < G.length);
                        Q = P(this);
                        f.columns = [];
                        f.rows = [];
                        f.teCells = {};
                        if ("function" === typeof f.onTable && !1 === f.onTable(c(this), a))
                            return !0;
                        a.jspdf.autotable.tableExport = null;
                        var d = c.extend(!0, {}, a.jspdf.autotable);
                        a.jspdf.autotable.tableExport = f;
                        d.margin = {};
                        c.extend(!0, d.margin, a.jspdf.margins);
                        d.tableExport = f;
                        "function" !== typeof d.beforePageContent && (d.beforePageContent = function(a) {
                            if (1 === a.pageCount) {
                                var b = a.table.rows.concat(a.table.headerRow);
                                c.each(b, function() {
                                    0 < this.height && (this.height += (2 - 1.15) / 2 * this.styles.fontSize,
                                    a.table.height += (2 - 1.15) / 2 * this.styles.fontSize)
                                })
                            }
                        }
                        );
                        "function" !== typeof d.createdHeaderCell && (d.createdHeaderCell = function(a, b) {
                            a.styles = c.extend({}, b.row.styles);
                            if ("undefined" !== typeof f.columns[b.column.dataKey]) {
                                var e = f.columns[b.column.dataKey];
                                if ("undefined" !== typeof e.rect) {
                                    a.contentWidth = e.rect.width;
                                    if ("undefined" === typeof f.heightRatio || 0 === f.heightRatio) {
                                        var g = b.row.raw[b.column.dataKey].rowspan ? b.row.raw[b.column.dataKey].rect.height / b.row.raw[b.column.dataKey].rowspan : b.row.raw[b.column.dataKey].rect.height;
                                        f.heightRatio = a.styles.rowHeight / g
                                    }
                                    g = b.row.raw[b.column.dataKey].rect.height * f.heightRatio;
                                    g > a.styles.rowHeight && (a.styles.rowHeight = g)
                                }
                                a.styles.halign = "inherit" === d.headerStyles.halign ? "center" : d.headerStyles.halign;
                                a.styles.valign = d.headerStyles.valign;
                                "undefined" !== typeof e.style && !0 !== e.style.hidden && ("inherit" === d.headerStyles.halign && (a.styles.halign = e.style.align),
                                "inherit" === d.styles.fillColor && (a.styles.fillColor = e.style.bcolor),
                                "inherit" === d.styles.textColor && (a.styles.textColor = e.style.color),
                                "inherit" === d.styles.fontStyle && (a.styles.fontStyle = e.style.fstyle))
                            }
                        }
                        );
                        "function" !== typeof d.createdCell && (d.createdCell = function(a, b) {
                            b = f.teCells[b.row.index + ":" + b.column.dataKey];
                            a.styles.halign = "inherit" === d.styles.halign ? "center" : d.styles.halign;
                            a.styles.valign = d.styles.valign;
                            "undefined" !== typeof b && "undefined" !== typeof b.style && !0 !== b.style.hidden && ("inherit" === d.styles.halign && (a.styles.halign = b.style.align),
                            "inherit" === d.styles.fillColor && (a.styles.fillColor = b.style.bcolor),
                            "inherit" === d.styles.textColor && (a.styles.textColor = b.style.color),
                            "inherit" === d.styles.fontStyle && (a.styles.fontStyle = b.style.fstyle))
                        }
                        );
                        "function" !== typeof d.drawHeaderCell && (d.drawHeaderCell = function(a, b) {
                            var c = f.columns[b.column.dataKey];
                            return (!0 !== c.style.hasOwnProperty("hidden") || !0 !== c.style.hidden) && 0 <= c.rowIndex ? pa(a, b, c) : !1
                        }
                        );
                        "function" !== typeof d.drawCell && (d.drawCell = function(a, b) {
                            var d = f.teCells[b.row.index + ":" + b.column.dataKey];
                            if (!0 !== ("undefined" !== typeof d && d.isCanvas))
                                pa(a, b, d) && (f.doc.rect(a.x, a.y, a.width, a.height, a.styles.fillStyle),
                                "undefined" !== typeof d && "undefined" !== typeof d.elements && d.elements.length ? (b = a.height / d.rect.height,
                                b > f.hScaleFactor && (f.hScaleFactor = b),
                                f.wScaleFactor = a.width / d.rect.width,
                                b = a.textPos.y,
                                sa(a, d.elements, f),
                                a.textPos.y = b,
                                ta(a, d.elements, f)) : ta(a, {}, f));
                            else {
                                d = d.elements[0];
                                var e = c(d).attr("data-tableexport-canvas")
                                  , g = d.getBoundingClientRect();
                                a.width = g.width * f.wScaleFactor;
                                a.height = g.height * f.hScaleFactor;
                                b.row.height = a.height;
                                na(a, d, e, f)
                            }
                            return !1
                        }
                        );
                        f.headerrows = [];
                        r = u(c(this));
                        c(r).each(function() {
                            b = 0;
                            f.headerrows[n] = [];
                            C(this, "th,td", n, r.length, function(a, c, d) {
                                var e = va(a);
                                e.title = B(a, c, d);
                                e.key = b++;
                                e.rowIndex = n;
                                f.headerrows[n].push(e)
                            });
                            n++
                        });
                        if (0 < n)
                            for (var e = n - 1; 0 <= e; )
                                c.each(f.headerrows[e], function() {
                                    var a = this;
                                    0 < e && null === this.rect && (a = f.headerrows[e - 1][this.key]);
                                    null !== a && 0 <= a.rowIndex && (!0 !== a.style.hasOwnProperty("hidden") || !0 !== a.style.hidden) && f.columns.push(a)
                                }),
                                e = 0 < f.columns.length ? -1 : e - 1;
                        var h = 0;
                        t = [];
                        t = x(c(this));
                        c(t).each(function() {
                            var a = [];
                            b = 0;
                            C(this, "td,th", n, r.length + t.length, function(d, e, g) {
                                if ("undefined" === typeof f.columns[b]) {
                                    var k = {
                                        title: "",
                                        key: b,
                                        style: {
                                            hidden: !0
                                        }
                                    };
                                    f.columns.push(k)
                                }
                                "undefined" !== typeof d && null !== d ? (k = va(d),
                                k.isCanvas = d.hasAttribute("data-tableexport-canvas"),
                                k.elements = k.isCanvas ? c(d) : c(d).children()) : (k = c.extend(!0, {}, f.teCells[h + ":" + (b - 1)]),
                                k.colspan = -1);
                                f.teCells[h + ":" + b++] = k;
                                a.push(B(d, e, g))
                            });
                            a.length && (f.rows.push(a),
                            h++);
                            n++
                        });
                        if ("function" === typeof f.onBeforeAutotable)
                            f.onBeforeAutotable(c(this), f.columns, f.rows, d);
                        f.doc.autoTable(f.columns, f.rows, d);
                        if ("function" === typeof f.onAfterAutotable)
                            f.onAfterAutotable(c(this), d);
                        a.jspdf.autotable.startY = f.doc.autoTableEndPosY() + d.margin.top
                    });
                    oa(f.doc, "undefined" !== typeof f.images && !1 === jQuery.isEmptyObject(f.images));
                    "undefined" !== typeof f.headerrows && (f.headerrows.length = 0);
                    "undefined" !== typeof f.columns && (f.columns.length = 0);
                    "undefined" !== typeof f.rows && (f.rows.length = 0);
                    delete f.doc;
                    f.doc = null
                })
            }
        return this
    }
}
)(jQuery);
