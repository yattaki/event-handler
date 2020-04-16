class EventHandler {
    constructor() {
        this._map = new Map();
    }
    /**
     * Add a new listener.
     * @param type This represents the name of the event.
     * @param listener This represents the listener to add.
     * @param options Specifies characteristics about the event listener.
     */
    addEventListener(type, listener, options = {}) {
        let onMaps = this._map.get(type);
        if (!onMaps) {
            onMaps = [];
            this._map.set(type, onMaps);
        }
        let isAdd = true;
        for (const onMap of onMaps) {
            if (onMap.listener === listener) {
                onMap.options = options;
                isAdd = false;
                break;
            }
        }
        if (isAdd) {
            onMaps.push({ listener, options });
        }
        return isAdd;
    }
    /**
     * Remove the listener.
     * @param type This represents the name of the event.
     * @param listener This represents the listener to remove.
     */
    removeEventListener(type, listener) {
        const onMaps = this._map.get(type);
        if (onMaps) {
            let index = 0;
            for (const onMap of onMaps) {
                if (onMap.listener === listener) {
                    onMaps.splice(index, 1);
                    return true;
                }
                index++;
            }
        }
        return false;
    }
    /**
     * Execute the registered event.
     * @param type This represents the name of the event.
     * @param data An object to be passed as an argument of the listener.
     */
    async dispatchEvent(type, data = {}) {
        const promises = [];
        const onMaps = this._map.get(type);
        if (onMaps) {
            for (const { listener, options } of [...onMaps]) {
                const event = {
                    type,
                    target: this,
                    data: { ...options.data, ...data }
                };
                const promise = listener(event);
                promises.push(promise);
                if (options.once) {
                    this.removeEventListener(type, listener);
                }
                if (options.wait) {
                    await promise;
                }
            }
        }
        await Promise.all(promises);
    }
}
export default EventHandler;
