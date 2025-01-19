---
id: install
title: Installation and Setup
sidebar_label: Installation and Setup
slug: /
---


First, add the module to your application through your preferred package manager, 

<br />

```bash
npm install json-logic-engine 
# or
yarn add json-logic-engine
# or 
bun add json-logic-engine
```


Then import the module, and try to set up a "Hello, World!"

```js
import { LogicEngine } from 'json-logic-engine'

const engine = new LogicEngine()

// we can make use of the modules function compilation
const f = engine.build({
  cat: ["Hello, ", { val: 'name' }, "!"]
})

console.log(f({ name: "World" })) // prints "Hello, World!"
```

Or alternatively, make use of the interpreter using: 

```js
import { LogicEngine } from 'json-logic-engine'

const engine = new LogicEngine()

// we can make use of the modules function compilation
console.log(engine.run({ cat: ["Hello, ", { val: [] }, "!"] }, "World"))
```

> Please note that at the time of writing that while the interpreter is still available in this module, the compilation mechanism yields far better performance in all use-cases &amp; supports all of the same features. The only time you may wish to use `.run` is when you are switching over from `json-logic-js` and migrating from it's `.apply` method.