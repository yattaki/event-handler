/** Specifies characteristics about the listener. */
interface EventHandlerOptions {
    /**
     * A Boolean indicating that the listener should be invoked at most once after being added.
     * If true, the listener would be automatically removed when invoked.
     */
    once?: boolean;
    /**
     * A Boolean indicating that it should wait for listener processing.
     * If true, the next listener will not be executed until the listener processing is completed.
     */
    wait?: boolean;
    /**
     * An object to be passed as an argument of the listener.
     */
    data?: {
        [key: string]: any;
    };
}
/** Argument object that the listener receives. */
export declare type EventHandlerListenerEvent<T extends {
    [key: string]: any;
} = {}, U extends string = string, V extends EventHandler = EventHandler> = {
    /** This represents the name of the event. */
    type: U;
    /** This represents the class that received the event. */
    target: V;
    /**
     * This is the initial value for options passed to the event.
     * When passed, it may be overwritten.
     */
    data: T;
};
/** This represents a listener. */
export declare type EventHandlerListener<T extends {
    [key: string]: any;
} = {}, U extends string = string, V extends EventHandler = EventHandler> = (ev: EventHandlerListenerEvent<{
    [key: string]: any;
} & T, U, V>) => void | Promise<void>;
declare class EventHandler {
    private readonly _map;
    /**
     * Add a new listener.
     * @param type This represents the name of the event.
     * @param listener This represents the listener to add.
     * @param options Specifies characteristics about the event listener.
     */
    addEventListener<T extends EventHandlerOptions = {}, U extends string = string, V extends this = this>(type: U, listener: EventHandlerListener<T extends {
        data: {
            [key: string]: any;
        };
    } ? T['data'] : {}, U, V>, options?: T): boolean;
    /**
     * Remove the listener.
     * @param type This represents the name of the event.
     * @param listener This represents the listener to remove.
     */
    removeEventListener(type: string, listener: EventHandlerListener): boolean;
    /**
     * Execute the registered event.
     * @param type This represents the name of the event.
     * @param data An object to be passed as an argument of the listener.
     */
    dispatchEvent(type: string, data?: {
        [key: string]: any;
    }): Promise<void>;
}
export default EventHandler;
