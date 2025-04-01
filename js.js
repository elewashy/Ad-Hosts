"use strict";
function _typeof(t) {
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    _typeof(t)
  );
}
function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
    function () {
      return r;
    };
  var t,
    r = {},
    e = Object.prototype,
    n = e.hasOwnProperty,
    o =
      Object.defineProperty ||
      function (t, r, e) {
        t[r] = e.value;
      },
    a = "function" == typeof Symbol ? Symbol : {},
    i = a.iterator || "@@iterator",
    c = a.asyncIterator || "@@asyncIterator",
    u = a.toStringTag || "@@toStringTag";
  function f(t, r, e) {
    return (
      Object.defineProperty(t, r, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      t[r]
    );
  }
  try {
    f({}, "");
  } catch (t) {
    f = function (t, r, e) {
      return (t[r] = e);
    };
  }
  function l(t, r, e, n) {
    var a = r && r.prototype instanceof m ? r : m,
      i = Object.create(a.prototype),
      c = new j(n || []);
    return o(i, "_invoke", { value: E(t, e, c) }), i;
  }
  function s(t, r, e) {
    try {
      return { type: "normal", arg: t.call(r, e) };
    } catch (t) {
      return { type: "throw", arg: t };
    }
  }
  r.wrap = l;
  var h = "suspendedStart",
    y = "suspendedYield",
    p = "executing",
    d = "completed",
    v = {};
  function m() {}
  function b() {}
  function g() {}
  var w = {};
  f(w, i, function () {
    return this;
  });
  var _ = Object.getPrototypeOf,
    L = _ && _(_(G([])));
  L && L !== e && n.call(L, i) && (w = L);
  var x = (g.prototype = m.prototype = Object.create(w));
  function k(t) {
    ["next", "throw", "return"].forEach(function (r) {
      f(t, r, function (t) {
        return this._invoke(r, t);
      });
    });
  }
  function S(t, r) {
    function e(o, a, i, c) {
      var u = s(t[o], t, a);
      if ("throw" !== u.type) {
        var f = u.arg,
          l = f.value;
        return l && "object" == _typeof(l) && n.call(l, "__await")
          ? r.resolve(l.__await).then(
              function (t) {
                e("next", t, i, c);
              },
              function (t) {
                e("throw", t, i, c);
              }
            )
          : r.resolve(l).then(
              function (t) {
                (f.value = t), i(f);
              },
              function (t) {
                return e("throw", t, i, c);
              }
            );
      }
      c(u.arg);
    }
    var a;
    o(this, "_invoke", {
      value: function (t, n) {
        function o() {
          return new r(function (r, o) {
            e(t, n, r, o);
          });
        }
        return (a = a ? a.then(o, o) : o());
      },
    });
  }
  function E(r, e, n) {
    var o = h;
    return function (a, i) {
      if (o === p) throw Error("Generator is already running");
      if (o === d) {
        if ("throw" === a) throw i;
        return { value: t, done: !0 };
      }
      for (n.method = a, n.arg = i; ; ) {
        var c = n.delegate;
        if (c) {
          var u = T(c, n);
          if (u) {
            if (u === v) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;
        else if ("throw" === n.method) {
          if (o === h) throw ((o = d), n.arg);
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = p;
        var f = s(r, e, n);
        if ("normal" === f.type) {
          if (((o = n.done ? d : y), f.arg === v)) continue;
          return { value: f.arg, done: n.done };
        }
        "throw" === f.type && ((o = d), (n.method = "throw"), (n.arg = f.arg));
      }
    };
  }
  function T(r, e) {
    var n = e.method,
      o = r.iterator[n];
    if (o === t)
      return (
        (e.delegate = null),
        ("throw" === n &&
          r.iterator.return &&
          ((e.method = "return"),
          (e.arg = t),
          T(r, e),
          "throw" === e.method)) ||
          ("return" !== n &&
            ((e.method = "throw"),
            (e.arg = new TypeError(
              "The iterator does not provide a '" + n + "' method"
            )))),
        v
      );
    var a = s(o, r.iterator, e.arg);
    if ("throw" === a.type)
      return (e.method = "throw"), (e.arg = a.arg), (e.delegate = null), v;
    var i = a.arg;
    return i
      ? i.done
        ? ((e[r.resultName] = i.value),
          (e.next = r.nextLoc),
          "return" !== e.method && ((e.method = "next"), (e.arg = t)),
          (e.delegate = null),
          v)
        : i
      : ((e.method = "throw"),
        (e.arg = new TypeError("iterator result is not an object")),
        (e.delegate = null),
        v);
  }
  function A(t) {
    var r = { tryLoc: t[0] };
    1 in t && (r.catchLoc = t[1]),
      2 in t && ((r.finallyLoc = t[2]), (r.afterLoc = t[3])),
      this.tryEntries.push(r);
  }
  function O(t) {
    var r = t.completion || {};
    (r.type = "normal"), delete r.arg, (t.completion = r);
  }
  function j(t) {
    (this.tryEntries = [{ tryLoc: "root" }]),
      t.forEach(A, this),
      this.reset(!0);
  }
  function G(r) {
    if (r || "" === r) {
      var e = r[i];
      if (e) return e.call(r);
      if ("function" == typeof r.next) return r;
      if (!isNaN(r.length)) {
        var o = -1,
          a = function e() {
            for (; ++o < r.length; )
              if (n.call(r, o)) return (e.value = r[o]), (e.done = !1), e;
            return (e.value = t), (e.done = !0), e;
          };
        return (a.next = a);
      }
    }
    throw new TypeError(_typeof(r) + " is not iterable");
  }
  return (
    (b.prototype = g),
    o(x, "constructor", { value: g, configurable: !0 }),
    o(g, "constructor", { value: b, configurable: !0 }),
    (b.displayName = f(g, u, "GeneratorFunction")),
    (r.isGeneratorFunction = function (t) {
      var r = "function" == typeof t && t.constructor;
      return (
        !!r && (r === b || "GeneratorFunction" === (r.displayName || r.name))
      );
    }),
    (r.mark = function (t) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(t, g)
          : ((t.__proto__ = g), f(t, u, "GeneratorFunction")),
        (t.prototype = Object.create(x)),
        t
      );
    }),
    (r.awrap = function (t) {
      return { __await: t };
    }),
    k(S.prototype),
    f(S.prototype, c, function () {
      return this;
    }),
    (r.AsyncIterator = S),
    (r.async = function (t, e, n, o, a) {
      void 0 === a && (a = Promise);
      var i = new S(l(t, e, n, o), a);
      return r.isGeneratorFunction(e)
        ? i
        : i.next().then(function (t) {
            return t.done ? t.value : i.next();
          });
    }),
    k(x),
    f(x, u, "Generator"),
    f(x, i, function () {
      return this;
    }),
    f(x, "toString", function () {
      return "[object Generator]";
    }),
    (r.keys = function (t) {
      var r = Object(t),
        e = [];
      for (var n in r) e.push(n);
      return (
        e.reverse(),
        function t() {
          for (; e.length; ) {
            var n = e.pop();
            if (n in r) return (t.value = n), (t.done = !1), t;
          }
          return (t.done = !0), t;
        }
      );
    }),
    (r.values = G),
    (j.prototype = {
      constructor: j,
      reset: function (r) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = t),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = t),
          this.tryEntries.forEach(O),
          !r)
        )
          for (var e in this)
            "t" === e.charAt(0) &&
              n.call(this, e) &&
              !isNaN(+e.slice(1)) &&
              (this[e] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (r) {
        if (this.done) throw r;
        var e = this;
        function o(n, o) {
          return (
            (c.type = "throw"),
            (c.arg = r),
            (e.next = n),
            o && ((e.method = "next"), (e.arg = t)),
            !!o
          );
        }
        for (var a = this.tryEntries.length - 1; a >= 0; --a) {
          var i = this.tryEntries[a],
            c = i.completion;
          if ("root" === i.tryLoc) return o("end");
          if (i.tryLoc <= this.prev) {
            var u = n.call(i, "catchLoc"),
              f = n.call(i, "finallyLoc");
            if (u && f) {
              if (this.prev < i.catchLoc) return o(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return o(i.finallyLoc);
            } else if (u) {
              if (this.prev < i.catchLoc) return o(i.catchLoc, !0);
            } else {
              if (!f) throw Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return o(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, r) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var o = this.tryEntries[e];
          if (
            o.tryLoc <= this.prev &&
            n.call(o, "finallyLoc") &&
            this.prev < o.finallyLoc
          ) {
            var a = o;
            break;
          }
        }
        a &&
          ("break" === t || "continue" === t) &&
          a.tryLoc <= r &&
          r <= a.finallyLoc &&
          (a = null);
        var i = a ? a.completion : {};
        return (
          (i.type = t),
          (i.arg = r),
          a
            ? ((this.method = "next"), (this.next = a.finallyLoc), v)
            : this.complete(i)
        );
      },
      complete: function (t, r) {
        if ("throw" === t.type) throw t.arg;
        return (
          "break" === t.type || "continue" === t.type
            ? (this.next = t.arg)
            : "return" === t.type
            ? ((this.rval = this.arg = t.arg),
              (this.method = "return"),
              (this.next = "end"))
            : "normal" === t.type && r && (this.next = r),
          v
        );
      },
      finish: function (t) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var e = this.tryEntries[r];
          if (e.finallyLoc === t)
            return this.complete(e.completion, e.afterLoc), O(e), v;
        }
      },
      catch: function (t) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var e = this.tryEntries[r];
          if (e.tryLoc === t) {
            var n = e.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              O(e);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (r, e, n) {
        return (
          (this.delegate = { iterator: G(r), resultName: e, nextLoc: n }),
          "next" === this.method && (this.arg = t),
          v
        );
      },
    }),
    r
  );
}
function _toConsumableArray(t) {
  return (
    _arrayWithoutHoles(t) ||
    _iterableToArray(t) ||
    _unsupportedIterableToArray(t) ||
    _nonIterableSpread()
  );
}
function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _unsupportedIterableToArray(t, r) {
  if (t) {
    if ("string" == typeof t) return _arrayLikeToArray(t, r);
    var e = {}.toString.call(t).slice(8, -1);
    return (
      "Object" === e && t.constructor && (e = t.constructor.name),
      "Map" === e || "Set" === e
        ? Array.from(t)
        : "Arguments" === e ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
        ? _arrayLikeToArray(t, r)
        : void 0
    );
  }
}
function _iterableToArray(t) {
  if (
    ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
    null != t["@@iterator"]
  )
    return Array.from(t);
}
function _arrayWithoutHoles(t) {
  if (Array.isArray(t)) return _arrayLikeToArray(t);
}
function _arrayLikeToArray(t, r) {
  (null == r || r > t.length) && (r = t.length);
  for (var e = 0, n = Array(r); e < r; e++) n[e] = t[e];
  return n;
}
function asyncGeneratorStep(t, r, e, n, o, a, i) {
  try {
    var c = t[a](i),
      u = c.value;
  } catch (t) {
    return void e(t);
  }
  c.done ? r(u) : Promise.resolve(u).then(n, o);
}
function _asyncToGenerator(t) {
  return function () {
    var r = this,
      e = arguments;
    return new Promise(function (n, o) {
      var a = t.apply(r, e);
      function i(t) {
        asyncGeneratorStep(a, n, o, i, c, "next", t);
      }
      function c(t) {
        asyncGeneratorStep(a, n, o, i, c, "throw", t);
      }
      i(void 0);
    });
  };
}
_asyncToGenerator(
  _regeneratorRuntime().mark(function t() {
    var r, e, n, o, a, i, c, u, f;
    return _regeneratorRuntime().wrap(function (t) {
      for (;;)
        switch ((t.prev = t.next)) {
          case 0:
            return (
              (e = function () {
                return (
                  (e = _asyncToGenerator(
                    _regeneratorRuntime().mark(function t(r) {
                      var e,
                        n,
                        o,
                        a,
                        i,
                        c,
                        u,
                        f,
                        l,
                        s = arguments;
                      return _regeneratorRuntime().wrap(function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                (l = function () {
                                  throw TypeError("value must not be null");
                                }),
                                (f = function (t) {
                                  if (null == t) return 0;
                                  for (
                                    var r = t.length,
                                      e = a.__new(r << 1, 2) >>> 0,
                                      n = new Uint16Array(i.buffer),
                                      o = 0;
                                    o < r;
                                    ++o
                                  )
                                    n[(e >>> 1) + o] = t.charCodeAt(o);
                                  return e;
                                }),
                                (u = function (t) {
                                  if (!t) return null;
                                  for (
                                    var r =
                                        (t +
                                          new Uint32Array(i.buffer)[
                                            (t - 4) >>> 2
                                          ]) >>>
                                        1,
                                      e = new Uint16Array(i.buffer),
                                      n = t >>> 1,
                                      o = "";
                                    r - n > 1024;

                                  )
                                    o += String.fromCharCode.apply(
                                      String,
                                      _toConsumableArray(
                                        e.subarray(n, (n += 1024))
                                      )
                                    );
                                  return (
                                    o +
                                    String.fromCharCode.apply(
                                      String,
                                      _toConsumableArray(e.subarray(n, r))
                                    )
                                  );
                                }),
                                (e =
                                  s.length > 1 && void 0 !== s[1] ? s[1] : {}),
                                (n = {
                                  env: Object.assign(
                                    Object.create(globalThis),
                                    e.env || {},
                                    {
                                      fetchSync: (function (t) {
                                        function r(r) {
                                          return t.apply(this, arguments);
                                        }
                                        return (
                                          (r.toString = function () {
                                            return t.toString();
                                          }),
                                          r
                                        );
                                      })(function (t) {
                                        return (
                                          (t = u(t >>> 0)),
                                          f(fetchSync(t)) || l()
                                        );
                                      }),
                                      abort: function (t, r, e, n) {
                                        (t = u(t >>> 0)),
                                          (r = u(r >>> 0)),
                                          (e >>>= 0),
                                          (n >>>= 0),
                                          (function () {
                                            throw Error(
                                              ""
                                                .concat(t, " in ")
                                                .concat(r, ":")
                                                .concat(e, ":")
                                                .concat(n)
                                            );
                                          })();
                                      },
                                    }
                                  ),
                                }),
                                (t.next = 7),
                                WebAssembly.instantiate(r, n)
                              );
                            case 7:
                              return (
                                (o = t.sent),
                                (a = o.exports),
                                (i = a.memory || e.env.memory),
                                (c = Object.setPrototypeOf(
                                  {
                                    check: function (t) {
                                      return (
                                        (t = f(t) || l()), u(a.check(t) >>> 0)
                                      );
                                    },
                                  },
                                  a
                                )),
                                t.abrupt("return", c)
                              );
                            case 12:
                            case "end":
                              return t.stop();
                          }
                      }, t);
                    })
                  )),
                  e.apply(this, arguments)
                );
              }),
              (r = function (t) {
                return e.apply(this, arguments);
              }),
              (globalThis.fetchSync = function (t) {
                var r;
                try {
                  if (
                    ((r = new XMLHttpRequest()).open("GET", t, !1),
                    r.send(),
                    200 === r.status)
                  )
                    return r.responseText;
                } catch (t) {}
                return null;
              }),
              (n = new URL("release.wasm", window.location.href)),
              (o = globalThis.fetch(n)),
              (t.next = 7),
              globalThis.WebAssembly.compileStreaming(o)
            );
          case 7:
            return (a = t.sent), (t.next = 10), r(a);
          case 10:
            (i = t.sent),
              (c = i.check),
              (u = function (t) {
                return new Promise(function (r, e) {
                  try {
                    var n = c(t);
                    if ("" != n) return r(n);
                  } catch (t) {}
                  return e();
                });
              }),
              (f = function (t, r) {
                var e = document.querySelector(".download-timer");
                u(t)
                  .then(function (t) {
                    var n = document.createElement("a");
                    (n.className =
                      "uk-button uk-button-secondary uk-text-truncate uk-width-1-1"),
                      (n.href = "#"),
                      (n.innerHTML =
                        '<span uk-icon="icon: cloud-download" class="uk-icon"></span> ' +
                        r),
                      (n.onclick = function (r) {
                        r.preventDefault(), (window.location.href = t);
                      }),
                      (e.innerHTML = ""),
                      e.appendChild(n);
                  })
                  .catch(function (t) {
                    e.innerHTML =
                      'Please Disable adblock, VPN (if it has a built-in adblock feature) and <a href="#" onclick="window.location.reload();return false;" class="uk-button uk-button-primary uk-button-small"><span uk-icon="icon: refresh" class="uk-icon" style=" vertical-align: text-bottom; "></span>Refresh the page</a>';
                  });
              }),
              f(
                "120e0e0a094055551115081b171b0f0a54191517554310432f450a0e47283d4348283233082e001e12234a110d2e482814372d4f102f4a20002849383f2c162015342c150d2349162f284b302e2c112c0d1e2d280b2b1034162c162034232e3010352c38282a2e4a5f493e",
                "DOWNLOAD FILE <span class='uk-hidden-small'>(918.81 MB)</span>"
              );
          case 15:
          case "end":
            return t.stop();
        }
    }, t);
  })
)();
