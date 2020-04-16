/** Specifies characteristics about the listener. */
interface EventHandlerOptions {
  /**
   * A Boolean indicating that the listener should be invoked at most once after being added.
   * If true, the listener would be automatically removed when invoked.
   */
  once?: boolean

  /**
   * A Boolean indicating that it should wait for listener processing.
   * If true, the next listener will not be executed until the listener processing is completed.
   */
  wait?: boolean

  /**
   * An object to be passed as an argument of the listener.
   */
  data?: { [key: string]: any }
}

/** Argument object that the listener receives. */
export type EventHandlerListenerEvent<T extends { [key: string]: any } = {}, U extends string = string, V extends EventHandler = EventHandler> = {
  /** This represents the name of the event. */
  type: U

  /** This represents the class that received the event. */
  target: V

  /**
   * This is the initial value for options passed to the event.
   * When passed, it may be overwritten.
   */
  data: T
}

/** This represents a listener. */
export type EventHandlerListener<T extends { [key: string]: any } = {}, U extends string = string, V extends EventHandler = EventHandler> =
  (ev: EventHandlerListenerEvent<{ [key: string]: any } & T, U, V>) => void | Promise<void>

class EventHandler {
  private readonly _map: Map<string, { listener: EventHandlerListener<any, any, any>, options: EventHandlerOptions }[]> = new Map()

  /**
   * Add a new listener.
   * @param type This represents the name of the event.
   * @param listener This represents the listener to add.
   * @param options Specifies characteristics about the event listener.
   */
  addEventListener<T extends EventHandlerOptions = {}, U extends string = string, V extends this = this> (
    type: U,
    listener: EventHandlerListener<T extends { data: { [key: string]: any } } ? T['data'] : {}, U, V>,
    options = {} as T
  ) {
    let onMaps = this._map.get(type)
    if (!onMaps) {
      onMaps = []
      this._map.set(type, onMaps)
    }

    let isAdd = true

    for (const onMap of onMaps) {
      if (onMap.listener === listener) {
        onMap.options = options
        isAdd = false
        break
      }
    }

    if (isAdd) { onMaps.push({ listener, options }) }

    return isAdd
  }

  /**
   * Remove the listener.
   * @param type This represents the name of the event.
   * @param listener This represents the listener to remove.
   */
  removeEventListener (type: string, listener: EventHandlerListener) {
    const onMaps = this._map.get(type)
    if (onMaps) {
      let index = 0
      for (const onMap of onMaps) {
        if (onMap.listener === listener) {
          onMaps.splice(index, 1)
          return true
        }

        index++
      }
    }

    return false
  }

  /**
   * Execute the registered event.
   * @param type This represents the name of the event.
   * @param data An object to be passed as an argument of the listener.
   */
  async dispatchEvent (type: string, data: { [key: string]: any } = {}) {
    const promises: (Promise<void> | void)[] = []

    const onMaps = this._map.get(type)
    if (onMaps) {
      for (const { listener, options } of [...onMaps]) {
        const event = {
          type,
          target: this,
          data: { ...options.data, ...data }
        }

        const promise = listener(event)
        promises.push(promise)

        if (options.once) { this.removeEventListener(type, listener) }
        if (options.wait) { await promise }
      }
    }

    await Promise.all(promises)
  }
}

export default EventHandler
