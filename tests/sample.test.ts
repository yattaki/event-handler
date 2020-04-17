import EventHandler from '../src/event-handler'

describe('EventHandler', () => {
  test('AddEventListener.', async () => {
    const eventHandler = new EventHandler()

    const fn = jest.fn()

    eventHandler.addEventListener('add', fn)
    await eventHandler.dispatchEvent('add')
    expect(fn).toBeCalled()
  })

  test('RemoveEventListener.', async () => {
    const eventHandler = new EventHandler()

    const fn = jest.fn()

    eventHandler.addEventListener('add', fn)
    eventHandler.removeEventListener('add', fn)
    await eventHandler.dispatchEvent('add')
    expect(fn).not.toBeCalled()
  })

  test('Match argument.', () => {
    const eventHandler = new EventHandler()

    const data = { check: Date.now() }
    const type = String(new Date())

    eventHandler.addEventListener(type, (e) => {
      expect({ type, data, target: eventHandler }).toEqual(e)
    })
    eventHandler.dispatchEvent(type, data)
  })

  test('Extend.', () => {
    class ExtendHandler extends EventHandler { }
    const eventHandler = new ExtendHandler()

    eventHandler.addEventListener('test', (e) => {
      expect(eventHandler).toBe(e.target)
    })
    eventHandler.dispatchEvent('test')
  })
})
