/**
 * @private
 */
interface IEmitterEvent {
	func: EmitterCallback,
	once: boolean
}

/**
 * @private
 */
type Events = { [type: string]: IEmitterEvent[] };

/**
 * @since 2.0.0
 */
export type EmitterCallback = (...args: any[]) => void;

export class Emitter {
	private _events: Events = {};
	
	/**
	 * Registered event names.
	 * 
	 * @since 1.1.1
	 */
	get eventNames(): string[] {
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
	private _on(type: string, func: EmitterCallback, once: boolean): Emitter {
		if (!type || !func) {
			return this;
		}
		
		const events: IEmitterEvent[] = this._events[type] = this._events[type] || [];
		
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
	 * @param type Event type.
	 * @param func Callback when the event fires.
	 * @return Returns itself for the method chaining.
	 */
	on(type: string, func: EmitterCallback): Emitter {
		return this._on(type, func, false);
	}
	
	/**
	 * Register one-time event.
	 * 
	 * @param type Event type.
	 * @param func Callback when the event fires.
	 * @return Returns itself for the method chaining.
	 */
	once(type: string, func: EmitterCallback): Emitter {
		return this._on(type, func, true);
	}
	
	/**
	 * Unregister event.
	 * 
	 * @param type Event type.
	 * @param func Registered callback.
	 * @return Returns itself for the method chaining.
	 */
	off(type: string, func: EmitterCallback): Emitter {
		if (!type || !func) {
			return this;
		}
		
		const events: IEmitterEvent[] = this._events[type] || [];
		
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
	 * @param type Event type to emit.
	 * @param args Argument(s) in callback.
	 * @return Returns itself for the method chaining.
	 */
	emit(type: string, ...args: any[]): Emitter {
		if (!type) {
			return this;
		}
		
		const events: IEmitterEvent[] = this._events[type] || [];
		const use: IEmitterEvent[] = [];
		
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
	 * @param type Event type to emit.
	 * @param context 'this' context in callback.
	 * @param args Argument(s) in callback.
	 * @return Returns itself for the method chaining.
	 */
	cemit(type: string, context: any, ...args: any[]): Emitter {
		if (!type || context == null) {
			return this;
		}
		
		const events: IEmitterEvent[] = this._events[type] || [];
		const use: IEmitterEvent[] = [];
		
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
	 * @param type Event type to remove.<br>If it is empty, removes all events.
	 * @return Returns itself for the method chaining.
	 */
	clear(type: string=''): Emitter {
		if (this._events[type]) {
			delete(this._events[type]);
		} else {
			this._events = {};
		}
		
		return this;
	}
}
