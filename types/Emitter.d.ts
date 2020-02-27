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
export default class Emitter {
    /**
     * @member {Object<string, Emitter~EmitterEvents>}
     * @private
     */
    private _events;
    /**
     * @property {string[]}
     * @readonly
     */
    get eventNames(): string[];
    /**
     * Register event.
     *
     * @private
     * @param {string} type Event type.
     * @param {Function} func Callback when the event fires.
     * @param {boolean} once Whether one-time event.
     * @return {Emitter} Returns itself for the method chaining.
     */
    private _on;
    /**
     * Register event.
     *
     * @param {string} type Event type.
     * @param {Function} func Callback when the event fires.
     * @return {Emitter} Returns itself for the method chaining.
     */
    on(type: string, func: Function): Emitter;
    /**
     * Register one-time event.
     *
     * @param {string} type Event type.
     * @param {Function} func Callback when the event fires.
     * @return {Emitter} Returns itself for the method chaining.
     */
    once(type: string, func: Function): Emitter;
    /**
     * Unregister event.
     *
     * @param {string} type Event type.
     * @param {Function} func Registered callback.
     * @return {Emitter} Returns itself for the method chaining.
     */
    off(type: string, func: Function): Emitter;
    /**
     * Emit event.
     *
     * @param {string} type Event type to emit.
     * @param {...any} [args] Argument(s) in callback.
     * @return {Emitter} Returns itself for the method chaining.
     */
    emit(type: string, ...args: any[]): Emitter;
    /**
     * Emit event with specifying a context.
     *
     * @param {string} type Event type to emit.
     * @param {any} context 'this' context in callback.
     * @param {...any} [args] Argument(s) in callback.
     * @return {Emitter} Returns itself for the method chaining.
     */
    cemit(type: string, context: any, ...args: any[]): Emitter;
    /**
     * Remove events grouped event type.
     *
     * @param {string} [type=''] Event type to remove.<br>If it is empty, removes all events.
     * @return {Emitter} Returns itself for the method chaining.
     */
    clear(type?: string): Emitter;
}
