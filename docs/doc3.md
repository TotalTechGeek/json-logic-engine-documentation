---
id: doc3
title: Differences from json-logic-js
---

At the time of writing, `json-logic-engine` is approximately 90% compatible with `json-logic-js`'s test suite, this is unlikely to improve due to differences of opinion between the authors &amp; language origins.

<br/>

`json-logic-js` was developed to be compatible with PHP, and this has led to some subtle differences.


### Empty Arrays are Truthy

In JavaScript & most languages, because arrays are objects, they are evaluated as truthy even if they are empty. `json-logic-engine` follows this convention.

<br/>

Because PHP does not follow this convention, the author of `json-logic-js` wrote his interpreter to evaluate `[]` as false, as well as a few comparable cases, like `[0]`. I do not think I will budge on this stance, but it is possible to override the `and`, `or` and `if` methods to mimic this functionality if necessary.

### No Support for "if" chaining

This may be adjusted at some point in the future, `json-logic-engine` supports if statements in the following format:

```json
{
    "if": [
        conditional,
        then,
        else
    ]
}
```

It does not support the syntax 
```json
{
    "if": [
        conditional,
        then,
        conditional2,
        then2,
        ...,
        else
    ]
}
```

This may change in the future.

### "all" with zero items evaluates to true

To keep in line with JavaScript's `every` method, which checks if each item in an array checked against a conditional is true, if there are zero items in the array the method defaults to true.

```json
{
    "all": [[], { "var": "" }]
} 
// json-logic-js: false
// json-logic-engine: true
```

### Conclusion

For most users, it is the author's opinion that most will not be impacted by the differences between the two modules.