---
layout: 'blog'
title: 'Notation complaints'
date: '18 Dec 2021'
---

On most calculators, “log” with no explicit base denotes the base-10 logarithm. This is a horrible convention. The most common logarithm in mathematics is either base-e or base-2, depending on the field. The choice of 10 for the so-called “common” log makes no sense at all.

What is the solution to this nonsense? The base-e logarithm is called the “natural log” for a reason. It even has a separate symbol: ln. The best convention would be to ditch “ln” and have “log” with no base denote the natural log instead of the base-10 log. This solution has two benefits. First, all logarithms would be written with “log” instead of having two separate symbols. Second, the natural log would officially be the default logarithm. From the perspective of calculus, the natural log is the One True Logarithm; Every other logarithm is just the natural log scaled by some constant. Making the natural log the default is the most natural thing to do.

Another bad convention in mathematical notation is the use of sin<sup>2</sup>(x) to mean sin(x)<sup>2</sup>. The only benefit of this notation is that it occasionally lets you avoid brackets. If you follow the convention of always putting the argument of a function in brackets, then both notations have one set of brackets: sin<sup>2</sup>(x) and sin(x)<sup>2</sup>. But many mathematicians make an exception to the “arguments go in brackets” rule for a few special functions such as sine. In this case, the sin<sup>2</sup> notation requires one fewer set of brackets; compare sin<sup>2</sup>x to (sin x)<sup>2</sup>.

But the drawbacks of the sin<sup>2</sup> notation far outweigh its benefits.

1. It adds an unnecessary notational rule that must be taught to students.
2. I often have to mentally replace sin<sup>2</sup>(x) with sin(x)<sup>2</sup> when performing calculations.
3. A superscript -1 is commonly used to denote the inverse of a function. Thus, sin<sup>-1</sup> means the inverse sine function. This introduces an outrageous inconsistency: sin<sup>2</sup>(x) is equivalent to sin(x)<sup>2</sup>, but sin<sup>-1</sup>(x) is absolutely _not_ equivalent to sin(x)<sup>-1</sup>. Every student of mathematics has been confused by this at some point.
4. In many fields of mathematics, the notation f&#8202;<sup>2</sup> means the function f composed with itself. By this convention, sin<sup>2</sup>(x) would be equivalent to sin(sin(x)). But it isn’t.

In short, the sin<sup>2</sup> notation is unnecessary, counterintuitive, and inconsistent. Is a single pair of brackets really worth it?

The solution I propose, of course, is to get rid of sin<sup>2</sup>(x) in the sense that it is normally used, and use sin(x)<sup>2</sup> or (sin x)<sup>2</sup> instead.

The fundamental binary operation of functions is _composition_. Sure, you can define a pointwise multiplication operator, but multiplication is primarily a thing that _numbers_ do. Therefore, unless otherwise specified, I believe that f&#8202;<sup>2</sup> should mean a function composed with itself, rather than a function multiplied with itself. That is also the only definition that’s consistent with the f&#8202;<sup>-1</sup> notation for inverses. If “id” represents the identity function id(x) = x, you can define numeric superscripts recursively as follows:

1. f&#8202;<sup>0</sup> = id
2. f&#8202;<sup>n</sup> = f ∘ f&#8202;<sup>n-1</sup>

This means that f&#8202;<sup>1</sup> = f, f&#8202;<sup>2</sup> = f ∘ f, and f&#8202;<sup>3</sup> = f ∘ f ∘ f. By substituting 0 for “n” in the second equation, you get id = f ∘ f&#8202;<sup>-1</sup>, or in other words, f&#8202;<sup>-1</sup> is the inverse of f. You can keep going in reverse, so f&#8202;<sup>-2</sup> = f&#8202;<sup>-1</sup> ∘ f&#8202;<sup>-1</sup>, and so on. This notation is already used in many fields of mathematics.

The last example of bad notation I’d like to address is the use of the radical symbol for roots beyond the square root. The square root is common enough to warrant its own symbol, but there is no point in using the same symbol with an integer next to it for cube roots, fourth roots, and so on. It is just as easy to write x<sup>1/3</sup> as it is to write ∛x. And expressions like x∛y can look very similar to x<sup>3</sup>√y.
