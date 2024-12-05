---
id: methods
title: Adding Methods 
---

While the default methods support a lot of common functionality, to make the logic engine useful within your domain & give it the ability to interact with your platform, the module has tried to make it simple to add new commands into the framework.

<br/>


```js
const engine = new LogicEngine()

engine.addMethod('hello', ([name]) => {
    return `Hello, ${name}!`
})

const f = engine.build({ 'hello': {var: ''} })

console.log(f('json-logic-engine')) // Hello, json-logic-engine!
```

Let's use a less silly example,

<br/>


```js
engine.addMethod('repeat', ([str, times]) => {
    return str.repeat(times)
})

const g = engine.build({ 'cat' : [{ 'repeat': [{var: ''}, 7] }, ' Batman'] })

console.log(g('Na')) // NaNaNaNaNaNaNa Batman 
```

### Adding a whole library


If you would like to import a whole library, you may call `addModule` to do so.

```js
// imports all of the methods from Math (the annotations are explained below, and can be left off. They can help optimize your logic though.)
engine.addModule('Math', Math, { deterministic: true, sync: true })

const j = engine.build({ "Math.sqrt": { "Math.round": 25.3 } })

console.log(j()) //? prints 5
```


#### Additional Flexibility


This section is only for really niche edge cases, I don't expect it to benefit most users.

<br/>

If you need more capability than executing a function, like hijacking the traversal of the input or accessing context, it is possible to do so. 


You can disable the automatic traversal of the input by using `traverse: false`, this can be useful if you want to preserve the input for things like defining your own control structures.

```js
engine.addMethod('repeatObj', {
   traverse: false,
   method: ([obj, times]) => {
       return JSON.stringify(obj).repeat(times)
   }
})

const h = engine.build({ 'repeatObj': [{ var: 'a' }, 5] })

console.log(h()) // prints "{"var":"a"}{"var":"a"}{"var":"a"}{"var":"a"}{"var":"a"}"
```

You can also specify an alternate `asyncMethod` in case for whatever reason a particular function would not function the same in an asynchronous environment (like if you're making calls to `engine.run`).


<br/>


Your method can have the following signature:
`(input, context, above, engine) => {}`

<br/>


Params | Explanation
-- | --
input | Whatever data is passed into the function. If traversal is disabled, this'll be the raw input.
context | The current "context" for the run-time. This can be either whatever the function is invoked with, or the context set by a higher order operator (map, reduce, etc.)
above | Whenever a higher order operator is invoked, it pushes the current context to an array.  This is what allows the handlebars style traversal, so you can access values from outside of the current context.
engine | The current engine powering this call, this is really useful for when you're building custom control structures and want to invoke `engine.run` or similar.




--- 

#### Assisting the Engine 

It is possible to inform the engine of things it could use to try to optimize itself during "compilation". If your function has no side-effects, you can flag it as deterministic by passing in an additional parameter <br/><br/>

```js
engine.addMethod('repeat', ([str, times]) => {
    return str.repeat(times)
}, { deterministic: true })
```

This will allow it to evaluate whether the input to this function is also deterministic, and pre-compute the result for the generated function.


<br/>

Alternatively, if you use the advanced object syntax for adding a function, you can make `determistic` a function, this is particularly useful if you've turned off automatic traversal.

<br/>

Additionally, if you are using the `AsyncLogicEngine` class, if a particular function is fully synchronous, you may pass in `sync: true` as an annotation well.


```js
engine.addMethod('repeat', ([str, times]) => {
    return str.repeat(times)
}, { deterministic: true, sync: true })
```

This will allow the engine to more efficiently compose your custom functions together for optimal-performance.
