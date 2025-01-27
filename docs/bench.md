---
id: bench
title: Blazing Fast via Compilation
---


`json-logic-engine` has support for logic compilation which greatly enhances run-time performance of your logic. In a number of (simpler) cases, it can get rather close to native performance. Additionally, as of `v2.0.0`, the interpreter has an optimizer that can cache the execution plan of the logic if re-used, improving interpreted performance without the need for compilation.



Running many iterations of `json-logic-js`'s test suite, we can observe stark performance differences between the built versions of the `json-logic-engine` against `json-logic-js`.  <br/>


```
> node test.js
json-logic-js: 5.329s
le interpreted: 4.648s
le interpreted (optimized): 2.447s
le built: 655.238ms
le async interpreted: 4.076s
le async built: 2.167s
```


<br/>

This comparison is not fair though, as the compilation mechanism is able to evaluate whether a particular branch is deterministic & pre-compute portions of the logic in advance. Running a different test suite that can't be pre-computed yields:

```
> node test.js
json-logic-js: 317.355ms
le interpreted: 222.456ms
le interpreted (optimized): 78.932ms
le built: 14.585ms
le async interpreted: 130.575ms
le async built: 55.565ms
```

<br/>

Additionally, the compilation mechanism allows the asynchronous version of the engine to perform quite well against its interpreted counter-part.

```
> node perf.js & node perf2.js
interpreted: 8.386s
interpreted (optimized): 599.283ms
built: 128.127ms
```

--- 
Comparing the engine against an alternative library like `json-rules-engine`, 

```js
{
  any: [{
    all: [{
      fact: 'gameDuration',
      operator: 'equal',
      value: 40
    }, {
      fact: 'personalFoulCount',
      operator: 'greaterThanInclusive',
      value: 5
    }]
  }, {
    all: [{
      fact: 'gameDuration',
      operator: 'equal',
      value: 48
    }, {
      fact: 'personalFoulCount',
      operator: 'greaterThanInclusive',
      value: 6
    }]
  }]
}
```

vs 

```js
{
  or: [
    {
      and: [{
        '===': [40, { val: 'gameDuration' }]
      }, {
        '>=': [{ val: 'personalFoulCount' }, 5]
      }]
    },
    {
      and: [{
        '===': [48, { val: 'gameDuration' }]
      }, {
        '>=': [{ val: 'personalFoulCount' }, 6]
      }]
    }
  ]
}
```

The performance difference is significant: 
```
> node rules.js
json-logic-engine: 54.421ms
json-rules-engine: 9.153s
```

---

To use this feature, you merely have to call:

```js
const func = engine.build(logic)
```

And invoke `func` with the data you'd like to run it with.