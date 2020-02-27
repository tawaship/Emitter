/*!
 * @tawaship/emitter - v1.0.2
 * 
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */

'use strict';

/**
 * @interface IEmitterEvent
 * @memberof Emitter~
 * @property func {Function}
 * @property once {boolean}
 */
/**
 * @typedef EmitterEvents {Emitter~IEmitterEvent[]}
 * @memberof Emitter~
 */
/**
 * @class
 */
class Emitter {
    constructor() {
        /**
         * @member {Object<string, Emitter~EmitterEvents>}
         * @private
         */
        this._events = {};
    }
    /**
     * Register event.
     *
     * @private
     * @param {string} type Event type.
     * @param {Function} func Callback when the event fires.
     * @param {boolean} once Whether one-time event.
     * @return {Emitter} Returns itself for the method chaining.
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
     * @param {string} type Event type.
     * @param {Function} func Callback when the event fires.
     * @return {Emitter} Returns itself for the method chaining.
     */
    on(type, func) {
        return this._on(type, func, false);
    }
    /**
     * Register one-time event.
     *
     * @param {string} type Event type.
     * @param {Function} func Callback when the event fires.
     * @return {Emitter} Returns itself for the method chaining.
     */
    once(type, func) {
        return this._on(type, func, true);
    }
    /**
     * Unregister event.
     *
     * @param {string} type Event type.
     * @param {Function} func Registered callback.
     * @return {Emitter} Returns itself for the method chaining.
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
     * @param {string} type Event type to emit.
     * @param {...any} [args] Argument(s) in callback.
     * @return {Emitter} Returns itself for the method chaining.
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
     * @param {string} type Event type to emit.
     * @param {any} context 'this' context in callback.
     * @param {...any} [args] Argument(s) in callback.
     * @return {Emitter} Returns itself for the method chaining.
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
     * @param {string} [type=''] Event type to remove.<br>If it is empty, removes all events.
     * @return {Emitter} Returns itself for the method chaining.
     */
    clear(type = '') {
        if (this._events[type]) {
            this._events[type] = [];
        }
        else {
            this._events = {};
        }
        return this;
    }
}

module.exports = Emitter;
//# sourceMappingURL=Emitter.cjs.js.map
