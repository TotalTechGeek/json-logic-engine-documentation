---
id: doc2
title: Blazing Fast via Compilation
---


## Blazing Fast Performance with Compilation

`json-logic-engine` has support for logic-compilation which greatly enhances run-time performance of your logic. In a number of (simpler) cases, it can get rather close to native performance. 

<br />


Running many iterations of `json-logic-js`'s test suite, we can observe stark performance differences between the built versions of the logic-engine against `json-logic-js`. Some of the additional features of the engine do seem to cause the interpreted version of the engine to perform slightly slower. <br/><br/>


```
> node test.js
json-logic-js: 10.872s
le interpreted: 13.291s
le built: 1.695s
le async built: 4.171s
```


<br/>

This comparison is not fair though, as the compilation mechanism is able to evaluate whether a particular branch is deterministic & pre-compute portions of the logic in advance. Running a modified test suite that can't be pre-computed unfairly yields this alternative set of results:

```
> node test.js
json-logic-js: 741.06ms
le interpreted: 858.67ms
le built: 22.686ms
le async built: 75.483ms
```

<br/>

Additionally, the compilation mechanism allows the asynchronous version of the engine to perform quite well against its interpreted counter-part.

```
> node perf.js & node perf2.js
interpreted: 23.365s
built: 185.105ms
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
        '===': [40, { var: 'gameDuration' }]
      }, {
        '>=': [{ var: 'personalFoulCount' }, 5]
      }]
    },
    {
      and: [{
        '===': [48, { var: 'gameDuration' }]
      }, {
        '>=': [{ var: 'personalFoulCount' }, 6]
      }]
    }
  ]
}
```

The performance difference is staggering: 
```
> node rules.js
json-logic-engine: 83.782ms
json-rules-engine: 39.928s
```

---

To use this feature, you merely have to call:

```js
const func = engine.build(logic)
```

And invoke `func` with the data you'd like to run it with.