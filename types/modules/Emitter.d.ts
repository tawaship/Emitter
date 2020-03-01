export declare type EmitterCallback = (...args: any[]) => void;
export declare class Emitter {
    private _events;
    /**
     * Registered event names.
     * @since 1.1.1
     */
    get eventNames(): string[];
    /**
     * Register event.
     *
     * @param type Event type.
     * @param func Callback when the event fires.
     * @param once Whether one-time event.
     * @return Returns itself for the method chaining.
     */
    private _on;
    /**
     * Register event.
     *
     * @param type Event type.
     * @param func Callback when the event fires.
     * @return Returns itself for the method chaining.
     */
    on(type: string, func: EmitterCallback): Emitter;
    /**
     * Register one-time event.
     *
     * @param type Event type.
     * @param func Callback when the event fires.
     * @return Returns itself for the method chaining.
     */
    once(type: string, func: EmitterCallback): Emitter;
    /**
     * Unregister event.
     *
     * @param type Event type.
     * @param func Registered callback.
     * @return Returns itself for the method chaining.
     */
    off(type: string, func: EmitterCallback): Emitter;
    /**
     * Emit event.
     *
     * @param type Event type to emit.
     * @param args Argument(s) in callback.
     * @return Returns itself for the method chaining.
     */
    emit(type: string, ...args: any[]): Emitter;
    /**
     * Emit event with specifying a context.
     *
     * @param type Event type to emit.
     * @param context 'this' context in callback.
     * @param args Argument(s) in callback.
     * @return Returns itself for the method chaining.
     */
    cemit(type: string, context: any, ...args: any[]): Emitter;
    /**
     * Remove events grouped event type.
     *
     * @param type Event type to remove.<br>If it is empty, removes all events.
     * @return Returns itself for the method chaining.
     */
    clear(type?: string): Emitter;
}
