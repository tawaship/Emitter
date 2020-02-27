/*!
 * @tawaship/emitter - v1.0.2
 * 
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */
var Emitter = function() {
    "use strict";
    var Emitter = function Emitter() {
        this._events = {};
    };
    Emitter.prototype._on = function _on(type, func, once) {
        if (!type || !func) {
            return this;
        }
        var events = this._events[type] = this._events[type] || [];
        for (var i = 0; i < events.length; i++) {
            if (events[i].func === func) {
                return this;
            }
        }
        events.push({
            func: func,
            once: once
        });
        return this;
    };
    Emitter.prototype.on = function on(type, func) {
        return this._on(type, func, false);
    };
    Emitter.prototype.once = function once(type, func) {
        return this._on(type, func, true);
    };
    Emitter.prototype.off = function off(type, func) {
        if (!type || !func) {
            return this;
        }
        var events = this._events[type] || [];
        for (var i = 0; i < events.length; i++) {
            if (events[i].func === func) {
                events.splice(i, 1);
                return this;
            }
        }
        return this;
    };
    Emitter.prototype.emit = function emit(type) {
        var args = [], len = arguments.length - 1;
        while (len-- > 0) {
            args[len] = arguments[len + 1];
        }
        if (!type) {
            return this;
        }
        var events = this._events[type] || [];
        var use = [];
        for (var i = events.length - 1; i >= 0; i--) {
            var ev = events[i];
            if (ev.once) {
                events.splice(i, 1);
            }
            use.push(ev);
        }
        for (var i$1 = use.length - 1; i$1 >= 0; i$1--) {
            use[i$1].func.apply(this, args);
        }
        return this;
    };
    Emitter.prototype.cemit = function cemit(type, context) {
        var args = [], len = arguments.length - 2;
        while (len-- > 0) {
            args[len] = arguments[len + 2];
        }
        if (!type || null == context) {
            return this;
        }
        var events = this._events[type] || [];
        var use = [];
        for (var i = events.length - 1; i >= 0; i--) {
            var ev = events[i];
            if (ev.once) {
                events.splice(i, 1);
            }
            use.push(ev);
        }
        for (var i$1 = use.length - 1; i$1 >= 0; i$1--) {
            use[i$1].func.apply(context, args);
        }
        return this;
    };
    Emitter.prototype.clear = function clear(type) {
        if (void 0 === type) {
            type = "";
        }
        if (this._events[type]) {
            this._events[type] = [];
        } else {
            this._events = {};
        }
        return this;
    };
    return Emitter;
}();
//# sourceMappingURL=Emitter.js.map
