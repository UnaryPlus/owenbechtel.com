---
layout: 'blog'
title: 'A pointfree proof'
date: '2 Dec 2021'
---

If f and g are odd functions, then the function x → f(x) + g(x) is also an odd function. More concisely, the pointwise sum of f and g, denoted f + g, is odd. In this post, I will prove that theorem in a "pointfree" manner, using only the operations of function composition and pointwise sum. I will not refer to argument variables like "x" and "y"; I will only refer to function variables like "f" and "g". As far as I'm aware, the term "pointfree" in this sense originated in the Haskell community.

First, I need to define the property of additivity. An additive map is a function d where d (f + g) = d f + d g for all functions f and g. (For the sake of brevity, I am leaving out the composition operator, so d f means d ∘ f.) The negation function, which I will denote as n, is additive, because n (f + g) = n f + n g. The reverse of additivity, namely (f + g) d = f d + g d, is true for all functions.

The next property to define is oddness. An odd function is a function f where f = n f n. The sine function, for example, is odd, because sin = n sin n.

Now we can prove that the sum of two odd functions is always odd. We will start with two functions, f and g, and define them to be odd. By definition, the following assumptions are true:

* f = n f n
* g = n g n

By adding the two equations, we get:

* f + g = n f n + n g n

Because n is additive, this is equivalent to:

* f + g = n (f n + g n)

By the definition of pointwise addition:

* f + g = n (f + g) n

Q.E.D.
