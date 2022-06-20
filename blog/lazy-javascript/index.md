---
layout: 'blog'
title: 'Lazy Javascript'
date: '15 Nov 2021'
---

In strict languages such as Javascript, the arguments to a function are evaluated even if they are never used.

```javascript
const always = (x, y) => x;
always(0, console.log("!!!"));
//returns 0, prints "!!!"
```

In non-strict languages such as Haskell, evaluation is delayed until the value is actually used. If a parameter is never used in the function body, that parameter will never be evaluated.

```haskell
let always x y = x
in always 0 (Debug.Trace.traceId "!!!")
--returns 0, prints nothing
```

Non-strict as the default evaluation strategy only makes sense in pure functional languages. If an impure language were to use non-strict evaluation by default, side effects would be very difficult to manage. Nevertheless, it is possible to simulate non-strict evaluation in a strict language such as Javascript, so long as the language has first-class functions. There are two ways of doing this: the naive way and the lazy way.

The simplest way to simulate non-strict evaluation is to represent arguments as functions that, when called, return a value. I refer to this as the "naive" method. It is also known as "call by name." This method is useful in some situations, such as defining your own short-circuiting operations. However, it is not a good idea in cases where the parameter is used more than once, because the parameter must be re-evaluated every time it is referred to.

```javascript
//short-circuiting ternary operator
const choose = (cond, x, y) => cond ? x() : y();
choose(true, () => 0, () => bigCalculation);
//returns 0 without evaluating bigCalculation

//function that refers to its arguments twice
const chooseAndDouble = (cond, x, y) =>
  cond ? x() + x() : y() + y();  
chooseAndDouble(false, () => 0, () => bigCalculation);
//evaluates bigCalculation twice
```

In a call-by-name implementation, variables are evaluated every time they are referenced. This is good if the variable is referenced zero times, but bad if it is referenced more than once.

Fortunately, call-by-name is not the only non-strict evaluation strategy. The alternative is lazy evaluation, also known as call-by-need. Lazy parameters are never evaluated more than once. This isn't too hard to implement in Javascript.

```javascript
//turn a function into a "lazy" function that remembers its return value
const lazy = f => {
  let value = undefined;
  return () => {
    if(value === undefined) value = f();
    return value;
  };
}

//function that refers to its arguments twice
const chooseAndDouble = (cond, x, y) =>
  cond ? x() + x() : y() + y();
chooseAndDouble(false, lazy(() => 0), lazy(() => bigCalculation));
//bigCalculation is only evaluated once this time
```

The definition of `chooseAndDouble` is exactly the same as before. This time, however, the functions are wrapped in `lazy` before being passed as arguments. This makes them "remember" their return value, so when they are called a second time, they return the same value but without doing any calculations.
