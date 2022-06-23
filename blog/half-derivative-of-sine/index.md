---
layout: 'blog'
title: 'Half derivative of sine'
date: '15 Sep 2021'
mathjax: true
---

A few days ago I came across [this video](https://www.youtube.com/watch?v=gaAhCTDc6oA) by Dr. Peyam, where he extends the power rule of differential calculus to allow for fractional derivatives. Using the formula in the video, I decided to calculate the half derivative of the sine function.

Before we begin, here is the power rule for half derivatives:

$$ D^{\frac{1}{2}}x^n = \frac{n!}{(n-\frac{1}{2})!} x^{n-\frac{1}{2}} $$

And here is another equation which will be useful later:

$$ \frac{1}{n!} D^{\frac{1}{2}}x^n = \frac{x^{n-\frac{1}{2}}}{(n-\frac{1}{2})!} $$

Now let's calculate the half derivative of sine. To start, we'll begin with the Taylor series. The sine function can be written as the following infinite polynomial:

$$ \sin(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \ldots $$

The half derivative, like the normal derivative, is a linear map, so we can distribute it over each term like so:

$$ D^{\frac{1}{2}} \sin(x)
  = D^{\frac{1}{2}}x
  - \frac{1}{3!} D^{\frac{1}{2}} x^3
  + \frac{1}{5!} D^{\frac{1}{2}} x^5
  - \frac{1}{7!} D^{\frac{1}{2}} x^7
  + \ldots $$

Using the second equation from before, we can simplify all of the half derivatives.

$$ D^{\frac{1}{2}} \sin(x)
  = \frac{x^\frac{1}{2}}{\frac{1}{2}!}
  - \frac{x^\frac{5}{2}}{\frac{5}{2}!}
  + \frac{x^\frac{9}{2}}{\frac{9}{2}!}
  - \frac{x^\frac{13}{2}}{\frac{13}{2}!}
  + \ldots $$

Or using the sigma notation:

$$ D^{\frac{1}{2}} \sin(x) = \sum_{n=0}^\infty
  (-1)^n \frac{x^{2n+\frac{1}{2}}}{(2n+\frac{1}{2})!} $$

That's it! We now have a relatively simple formula for the half derivative of sine. By comparing it with the Taylor series for the sine and cosine functions, you can see that the half derivative of sine is in some sense "halfway between" sine and cosine.

$$ \begin{align}
  \sin(x) = \sum_{n=0}^\infty (-1)^n \frac{x^{2n+1}}{(2n+1)!}
  && \cos(x) = \sum_{n=0}^\infty (-1)^n \frac{x^{2n}}{(2n)!}
\end{align} $$

In the series for sine, the exponent is 2n + 1. In the formula for the half derivative of sine, the exponent is 2n + 1/2. And in the series for cosine (i.e. the first derivative of sine), the exponent is simply 2n.

I strongly suspect that the half derivative of sine is equal to sin(x + π/4). It certainly looks that way when plotted on a chart. In fact, I suspect there is a more general pattern:

$$ D^k \sin(x) = \sin(x + \frac{\pi k}{2})$$

This equation is certainly true for integer values of "k", but I'm not sure how to prove the more general case.
