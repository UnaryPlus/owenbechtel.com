---
layout: 'blog'
title: 'Big and small numbers'
date: '14 Feb 2023'
---

We know what it means for a number to be "negative" or "positive." But what does it mean for a number to be "big" or "small"?

To answer this question, we first need to define the relative notions of "bigger" and "smaller." For example, is -100 smaller than 0.1? It is certainly true that -100 is _less_ than 0.1. But I assert that "smaller" and "less" are not the same thing. Imagine two cars: car A and car B. Car A is moving at a velocity of -100 m/s (i.e. moving backward at a speed of 100 m/s), and car B is moving forward at 0.1 meters per second. Although its velocity is technically less than that of car B, nobody would say that car A is moving "slower" than car B. I argue that the same is true for the relative size of numbers; -100 is bigger than 0.1. More generally, x is bigger than y, and y is smaller than x, if and only if \|x\|&nbsp;>&nbsp;\|y\|.

So, using these definitions of "bigger" and "smaller", how should we define the absolute notions of "big" and "small"? Clearly, we must choose some positive value K, and define x to be "big" if and only if \|x\|&nbsp;>&nbsp;K. I assert that most natural choice for K is 1. That is, x is "big" if \|x\|&nbsp;>&nbsp;1, and "small" if \|x\|&nbsp;<&nbsp;1. The numbers 1 and -1 are neither big nor small. This definition is nice for several reasons.

First, consider the following true statements.

1. The additive identity, 0, is neither positive nor negative.
2. The additive inverse of a positive number is negative; the additive inverse of a negative number is positive.
3. The additive inverse of a big number is big; the additive inverse of a small number is small.
4. The multiplicative identity, 1, is neither big nor small.
5. The multiplicative inverse of a big number is small; the multiplicative inverse of a small number is big.
6. The multiplicative inverse of a positive number is positive; the multiplicative inverse of a negative number is negative. 

Statements 1&ndash;3 are the same as statements 4&ndash;6, if you replace addition with multiplication, and positive/negative with big/small. In other words, the big/small distinction is the multiplicative equivalent of the positive/negative distinction.

Similarly, we have the following properties involving infinity:

1. In the [extended real numbers](https://en.wikipedia.org/wiki/Extended_real_number_line), there are two absorbing elements with respect to addition. One of these (-∞) is maximally negative, while the other (∞) is maximally positive.
2. In the [projectively extended real numbers](https://en.wikipedia.org/wiki/Projectively_extended_real_line), there are two absorbing elements with respect to multiplication. One of these (0) is maximally small, while the other (∞) is maximally big.

Lastly, the [exp](https://en.wikipedia.org/wiki/Exponential_function) function converts negative numbers to small positive numbers, and positive numbers to big positive numbers. The [log](https://en.wikipedia.org/wiki/Natural_logarithm) function, of course, does the reverse. More generally, we have the following properties:

1. If c is a big positive number, then c<sup>x</sup> converts negative numbers into small positive numbers, and positive numbers into big positive numbers. log<sub>c</sub>(x) does the reverse.
2. If c is a small positive number, then c<sup>x</sup> converts negative numbers into big positive numbers, and positive numbers into small positive numbers. log<sub>c</sub>(x) does the reverse.

I am aware of two pre-existing usages of the term "small" in mathematics.

1. A set which is part of some "universe" (such as the universe of all ZFC sets) is known as a [small set](https://en.wikipedia.org/wiki/Small_set_(category_theory)). This definition of "small" has nothing to do with my definition (one applies to sets, while the other applies to numbers), so there is no context in which they could be confused. 
2. Mathematicians sometimes use the term "small" as shorthand for "sufficiently small." By this definition, a function f has property P for small x if there is some c&nbsp;>&nbsp;0 such that for all x with 0&nbsp;<&nbsp;x&nbsp;<&nbsp;c, f(x) has property P. For example, "1/x is greater than 1000 for small x." This usage of "small" conflicts with my usage, so I recommend saying "sufficiently small" instead.
