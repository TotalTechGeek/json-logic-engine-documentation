---
id: doc3
title: Differences from json-logic-js
---

At the time of writing, `json-logic-engine` is  100% compatible with `json-logic-js`'s test suite

However, in order to switch to fully compatible behaviors, you must pass a flag into the constructor.

```javascript
const engine = new LogicEngine(undefined, { compatible: true })
```

This will make minor modifications to truthiness rules. In the future, I will likely make this the default behavior.

### Empty Arrays are Truthy

By default, empty arrays are truthy in `json-logic-engine` while they are falsy in `json-logic-js`. This is likely due to JSON Logic's roots in PHP.


### "all" with zero items evaluates to true

To keep in line with JavaScript's `every` method by default, `json-logic-engine` checks if each item in an array checked against a conditional is true, if there are zero items in the array the method defaults to true.

```json
{
    "all": [[], { "var": "" }]
} 
// json-logic-js: false
// json-logic-engine: true
```

