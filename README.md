![version](https://img.shields.io/npm/v/@yattaki/event-handler)
![minzipped size](https://img.shields.io/bundlephobia/minzip/@yattaki/event-handler)
![MIT License](https://img.shields.io/github/license/yattaki/event-handler)
![issues](https://img.shields.io/github/issues/yattaki/event-handler)

# event-handler
 Module that controls the event.

## Install

  ```console
  npm i @yattaki/event-handler
  ```

## Example

  ```Typescript
  import EventHandler from '@yattaki/event-handler'

  const eventHandler = new EventHandler()

  eventHandler.addEventListener('sample', (e) => { console.log(`${e.data.text} ${e.type}!`) })
  eventHandler.dispatchEvent('sample', { text: 'dispatch' }) // dispatch sample!
  ```

## Link
  - [GitHub](https://github.com/yattaki/event-handler)
  - [Document](https://yattaki.github.io/event-handler)

## LICENCE
 MIT licence.
