/*!
 * @tawaship/emitter - v1.1.4
 * 
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class Emitter {
    constructor() {
        this._events = {};
    }
    /**
     * Registered event names.
     * @since 1.1.1
     */
    get eventNames() {
        return Object.keys(this._events);
    }
    /**
     * Register event.
     *
     * @param type Event type.
     * @param func Callback when the event fires.
     * @param once Whether one-time event.
     * @return Returns itself for the method chaining.
     */
    _on(type, func, once) {
        if (!type || !func) {
            return this;
        }
        const events = this._events[type] = this._events[type] || [];
        for (let i = 0; i < events.length; i++) {
            if (events[i].func === func) {
                return this;
            }
        }
        events.push({ func, once });
        return this;
    }
    /**
     * Register event.
     *
     * @param type Event type.
     * @param func Callback when the event fires.
     * @return Returns itself for the method chaining.
     */
    on(type, func) {
        return this._on(type, func, false);
    }
    /**
     * Register one-time event.
     *
     * @param type Event type.
     * @param func Callback when the event fires.
     * @return Returns itself for the method chaining.
     */
    once(type, func) {
        return this._on(type, func, true);
    }
    /**
     * Unregister event.
     *
     * @param type Event type.
     * @param func Registered callback.
     * @return Returns itself for the method chaining.
     */
    off(type, func) {
        if (!type || !func) {
            return this;
        }
        const events = this._events[type] || [];
        for (let i = 0; i < events.length; i++) {
            if (events[i].func === func) {
                events.splice(i, 1);
                return this;
            }
        }
        return this;
    }
    /**
     * Emit event.
     *
     * @param type Event type to emit.
     * @param args Argument(s) in callback.
     * @return Returns itself for the method chaining.
     */
    emit(type, ...args) {
        if (!type) {
            return this;
        }
        const events = this._events[type] || [];
        const use = [];
        for (let i = events.length - 1; i >= 0; i--) {
            const ev = events[i];
            if (ev.once) {
                events.splice(i, 1);
            }
            use.push(ev);
        }
        for (let i = use.length - 1; i >= 0; i--) {
            use[i].func.apply(this, args);
        }
        return this;
    }
    /**
     * Emit event with specifying a context.
     *
     * @param type Event type to emit.
     * @param context 'this' context in callback.
     * @param args Argument(s) in callback.
     * @return Returns itself for the method chaining.
     */
    cemit(type, context, ...args) {
        if (!type || context == null) {
            return this;
        }
        const events = this._events[type] || [];
        const use = [];
        for (let i = events.length - 1; i >= 0; i--) {
            const ev = events[i];
            if (ev.once) {
                events.splice(i, 1);
            }
            use.push(ev);
        }
        for (let i = use.length - 1; i >= 0; i--) {
            use[i].func.apply(context, args);
        }
        return this;
    }
    /**
     * Remove events grouped event type.
     *
     * @param type Event type to remove.<br>If it is empty, removes all events.
     * @return Returns itself for the method chaining.
     */
    clear(type = '') {
        if (this._events[type]) {
            delete (this._events[type]);
        }
        else {
            this._events = {};
        }
        return this;
    }
}

exports.Emitter = Emitter;
//# sourceMappingURL=Emitter.cjs.js.map
