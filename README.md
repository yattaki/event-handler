# event-handler
 Module that controls the event.

## Install

  ```
  npm i @yattaki/event-handler
  ```

## Example

  ```Typescript
    import EventHandler from '@yattaki/event-handler'

    const eventHandler = new EventHandler()

    eventHandler.addEventListener('sample', (e) => { console.log(e.data.text) })
    eventHandler.dispatchEvent('sample', { text: 'dispatch sample!' }) // dispatch sample!
  ```

## Link
  - [GitHub](https://github.com/yattaki/event-handler)

## LICENCE
 MIT licence.
