export interface IEmitterDelegate {
	(...args: any[]): void;
}

/**
 * @private
 */
interface IEmitterEvent {
	callback: IEmitterDelegate,
	once: boolean
}

/**
 * @private
 */
interface IEmitterEventDictionary {
	[type: string]: IEmitterEvent[];
}

export class Emitter {
	private _events: IEmitterEventDictionary = {};
	
	private _on(type: string, callback: IEmitterDelegate, once: boolean) {
		if (!type || !callback) {
			return this;
		}
		
		const events = this._events[type] = this._events[type] || [];
		
		for (let i = 0; i < events.length; i++) {
			if (events[i].callback === callback) {
				return this;
			}
		}
		
		events.push({ callback, once });
		
		return this;
	}
	
	/**
	 * Register event.
	 * 
	 * @param type Event type.
	 * @param callback Callback when the event fires.
	 */
	on(type: string, callback: IEmitterDelegate): this {
		return this._on(type, callback, false);
	}
	
	/**
	 * Register one-time event.
	 * 
	 * @param type Event type.
	 * @param callback Callback when the event fires.
	 */
	once(type: string, callback: IEmitterDelegate) {
		return this._on(type, callback, true);
	}
	
	/**
	 * Unregister event.
	 * 
	 * @param type Event type.
	 * @param callback Registered callback.
	 */
	off(type: string, callback: IEmitterDelegate) {
		if (!type || !callback) {
			return this;
		}
		
		const events = this._events[type] || [];
		
		for (let i = 0; i < events.length; i++) {
			if (events[i].callback === callback) {
				events.splice(i, 1);
				return this;
			}
		}
		
		return this;
	}
	
	private _emit(type: string, context: any, ...args: any[]) {
		if (!type) {
			return this;
		}
		
		const events = this._events[type] || [];
		const targets: IEmitterEvent[] = [];
		
		for (let i = events.length - 1; i >= 0; i--) {
			const event = events[i];
			
			if (event.once) {
				events.splice(i, 1);
			}
			
			targets.push(event);
		}
		
		for (let i = targets.length - 1; i >= 0; i--) {
			targets[i].callback.apply(context, args);
		}
		
		return this;
	}
	
	/**
	 * Emit event.
	 * 
	 * @param type Event type to emit.
	 * @param args Argument(s) in callback.
	 */
	emit(type: string, ...args: any[]) {
		return this._emit(type, this, ...args);
	}
	
	/**
	 * Emit event with specifying a context.
	 * 
	 * @param type Event type to emit.
	 * @param context Context to execute the callback.
	 * @param args Argument(s) in callback.
	 */
	cemit(type: string, context: any, ...args: any[]) {
		return this._emit(type, context, ...args);
	}
	
	private _emitAll(context: any, ...args: any[]) {
		if (context == null) {
			return this;
		}
		
		const targets: IEmitterEvent[] = [];
		
		for (let type in this._events) {
			const events = this._events[type] || [];
			
			for (let i = events.length - 1; i >= 0; i--) {
				const event = events[i];
				
				if (event.once) {
					events.splice(i, 1);
				}
				
				targets.push(event);
			}
		}
		
		for (let i = targets.length - 1; i >= 0; i--) {
			targets[i].callback.apply(context, args);
		}
		
		return this;
	}
	
	/**
	 * Emit all events.
	 * 
	 * @param args Argument(s) in callback.
	 */
	emitAll(...args: any[]) {
		return this._emitAll(this, ...args);
	}
	
	/**
	 * Emit all events with specifying a context.
	 * 
	 * @param context Context to execute the callback.
	 * @param args Argument(s) in callback.
	 */
	cemitAll(context: any, ...args: any[]) {
		return this._emitAll(context, ...args);
	}
	
	/**
	 * Remove events grouped event type.
	 * 
	 * @param type Event type to remove. If it is empty, removes all events.
	 */
	clear(type: string = '') {
		if (type) {
			delete(this._events[type]);
		} else {
			this._events = {};
		}
		
		return this;
	}
}