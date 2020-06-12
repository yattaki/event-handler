# event-handler

![npm version](https://img.shields.io/npm/v/@yattaki/event-handler)
![npm type definitions](https://img.shields.io/npm/types/@yattaki/event-handler)
![npm bundle size](https://img.shields.io/bundlephobia/min/@yattaki/event-handler)
![npm downloads](https://img.shields.io/npm/dt/@yattaki/event-handler)
![npm license](https://img.shields.io/npm/l/@yattaki/event-handler)

Module that controls the event.

## Installation

Read from [CDN](https://cdn.jsdelivr.net/npm/@yattaki/event-handler/dist/index.iife.min.js).

```HTML
<script src="https://cdn.jsdelivr.net/npm/@yattaki/event-handler/dist/index.iife.min.js"></script>
```

Install from [npm](https://www.npmjs.com/package/@yattaki/event-handler).

```bash
npm i @yattaki/event-handler
```

## Example

```Typescript
import EventHandler from '@yattaki/event-handler'

const eventHandler = new EventHandler()

eventHandler.addEventListener('sample', (e) => { console.log(`${e.data.text} ${e.type}!`) })
eventHandler.dispatchEvent('sample', { text: 'dispatch' }) // dispatch sample!
```

```Typescript
import EventHandler from '@yattaki/event-handler'

const eventHandler = new EventHandler<{ sample: { text: string, stringOrNumber: string | number } }>()

eventHandler.addEventListener('error', () => { }) // error!
eventHandler.addEventListener('sample', (e) => {
  console.log(e.data.error) // error!
  Math.abs(e.data.text) // error!
})
eventHandler.addEventListener<'sample', { stringOrNumber: number }>('sample', (e) => {
  Math.abs(e.data.stringOrNumber) // not error! type is number
})

eventHandler.addEventListener('sample', (e) => { console.log(`${e.data.text} ${e.type}!`) })
eventHandler.dispatchEvent('sample', { text: 'dispatch' }) // dispatch sample!
eventHandler.dispatchEvent('sample', { text: 0 }) // error!
```

## Link

- [GitHub](https://github.com/yattaki/event-handler)
- [npm](https://www.npmjs.com/package/@yattaki/event-handler)

## LICENCE

[MIT licensed.](https://github.com/yattaki/event-handler/blob/master/LICENSE)
