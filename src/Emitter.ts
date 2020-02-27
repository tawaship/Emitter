
interface IEmitterEvent {
	func: Function,
	once: boolean
}

type EmitterEvents = IEmitterEvent[];

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
	private _events: { [type: string]: EmitterEvents } = {};
	
	/**
	 * Register event.
	 * 
	 * @private
	 * @param {string} type Event type.
	 * @param {Function} func Callback when the event fires.
	 * @param {boolean} once Whether one-time event.
	 * @return {Emitter} Returns itself for the method chaining.
	 */
	private _on(type: string, func: Function, once: boolean): Emitter {
		if (!type || !func) {
			return this;
		}
		
		const events: EmitterEvents = this._events[type] = this._events[type] || [];
		
		for (let i: number = 0; i < events.length; i++) {
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
	on(type: string, func: Function): Emitter {
		return this._on(type, func, false);
	}
	
	/**
	 * Register one-time event.
	 * 
	 * @param {string} type Event type.
	 * @param {Function} func Callback when the event fires.
	 * @return {Emitter} Returns itself for the method chaining.
	 */
	once(type: string, func: Function): Emitter {
		return this._on(type, func, true);
	}
	
	/**
	 * Unregister event.
	 * 
	 * @param {string} type Event type.
	 * @param {Function} func Registered callback.
	 * @return {Emitter} Returns itself for the method chaining.
	 */
	off(type: string, func: Function): Emitter {
		if (!type || !func) {
			return this;
		}
		
		const events: EmitterEvents = this._events[type] || [];
		
		for (let i: number = 0; i < events.length; i++) {
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
	emit(type: string, ...args: any[]): Emitter {
		if (!type) {
			return this;
		}
		
		const events: EmitterEvents = this._events[type] || [];
		const use: EmitterEvents = [];
		
		for (let i: number = events.length - 1; i >= 0; i--) {
			const ev: IEmitterEvent = events[i];
			
			if (ev.once) {
				events.splice(i, 1);
			}
			
			use.push(ev);
		}
		
		for (let i: number = use.length - 1; i >= 0; i--) {
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
	cemit(type: string, context: any, ...args: any[]): Emitter {
		if (!type || context == null) {
			return this;
		}
		
		const events: EmitterEvents = this._events[type] || [];
		const use: EmitterEvents = [];
		
		for (let i: number = events.length - 1; i >= 0; i--) {
			const ev: IEmitterEvent = events[i];
			
			if (ev.once) {
				events.splice(i, 1);
			}
			
			use.push(ev);
		}
		
		for (let i: number = use.length - 1; i >= 0; i--) {
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
	clear(type: string = ''): Emitter {
		if (this._events[type]) {
			this._events[type] = [];
		} else {
			this._events = {};
		}
		
		return this;
	}
}