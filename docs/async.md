---
id: async
title: Asynchronous Engine
---

`json-logic-engine` comes with built-in support for asynchronous operations, so that you may integrate with external data sources our modules that may only resolve via Promises.

<br/>


```js
import { AsyncLogicEngine } from 'json-logic-engine'

const engine = new AsyncLogicEngine()

engine.addMethod('after250ms', async ([n]) => {
    return new Promise(resolve => setTimeout(() => resolve(n), 250))
})

async function main () {
    const f = await engine.build({ '+': [{ after250ms: 1 }, 1] })
    console.log(await f()) // prints 2
}
```

At the time of writing, there are no built-in asynchronous operations, although each of the higher order operators are built-with support for asynchronous operations. (so you can map/filter/reduce/etc using async methods.)