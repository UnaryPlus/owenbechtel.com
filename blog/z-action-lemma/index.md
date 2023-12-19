---
layout: 'blog'
title: 'Z-action lemma'
date: '5 Dec 2023'
mathjax: true
center_equations: true
---

<!-- TODO: use "homomorphism" -->
<!-- TODO: this article is really bad -->

<style>
  .fullwidth {
    width: 100%;
  }
</style>

$$ 
\newcommand{\Z}{\mathbb{Z}} 
\newcommand{\Orb}{\mathrm{Orb}}
$$
Suppose $$X$$ and $$Y$$ are sets, and $$u : X \to X$$ and $$v : Y \to Y$$ are bijections (invertible functions). The question I'd like to answer is: how many functions $$f : X \to Y$$ are there such that $$f \circ u = v \circ f$$, i.e. $$f(u(x)) = v(f(x))$$ for all $$x \in X$$?

I'll start by defining some useful notions. First of all, since $$u$$ is a bijection, we can raise it to any integer power by composing itself or its inverse the given number of times. For example, $$u^2(x) = u(u(x))$$, and $$u^{-3}(x) = u^{-1}(u^{-1}(u^{-1}(x)))$$. $$u^0(x)$$ is just $$x$$, or in other words, $$u^0$$ is the identity function.

Second of all, for any $$a \in X$$, we can form the subset $$\Orb_u(a) \subseteq X$$ consisting of elements that are reachable from $$a$$ by repeated application of $$u$$ or its inverse. Explicitly, $$\Orb_u(a) = \{ u^n(a) : n \in \Z \}$$. $$\Orb$$ is short for "orbit," and $$\Orb_u(a)$$ is called the orbit of $$a$$.

For any elements $$a, b \in X$$, the sets $$\Orb_u(a)$$ and $$\Orb_u(b)$$ are either equal or disjoint. (This is easy to prove.) In other words, $$X$$ is a disjoint union of orbits, like in the image below:

<img alt="Orbit diagram" src="orbits.png" class="fullwidth">

I will define the "order" of an element $$a \in X$$, denoted $$\ord_u(a)$$, to be the size of $$\Orb_u(a)$$ if $$\Orb_u(a)$$ is finite, or 0 if $$\Orb_u(a)$$ is infinite. 

Similarly, for any element $$a \in Y$$, we can form the set $$\Orb_v(a)$$, and $$Y$$ is a disjoint union of these orbits. <!-- edit -->

Recall that we're trying to find functions $$f : X \to Y$$ such that 

$$
\begin{equation}
f \circ u = v \circ f.
\end{equation}
$$

It turns out that property (1) implies the following seemingly stronger property: 

$$
\begin{equation}
f \circ u^n = v^n \circ f \text{ for all } n \in \Z.
\end{equation} 
$$

To see that (1) implies (2), note that we can compose $$v^{-1}$$ and $$u^{-1}$$ on both sides of equation (1) to get $$v^{-1} \circ f \circ u \circ u^{-1} = v^{-1} \circ v \circ f \circ u^{-1}$$. After cancellation, this becomes $$v^{-1} \circ f = f \circ u^{-1}$$, which is precisely property (2) in the case where $$n = -1$$. To prove the general case, you can repeatedly apply the proven cases of $$n = 1$$ and $$n = -1$$.

Property (2) implies that, once we know the value $$f(x)$$ for a single element $$x \in X$$, the values of $$f$$ on the entire orbit of $$x$$ are determined: $$f(u^n(x)) = v^n(f(x))$$. This gives an upper bound for the number of functions we're looking for: If we define $$X/u$$ to be the set of $$u$$-orbits, then there are at most $$|Y|^{|X/u|}$$ homomorphisms, because every homomorphism is determined by its values on one element from each orbit, and there are $$|Y|^{|X/u|}$$ ways to assign those values, once we've chosen a representative from each orbit.

This is an upper bound rather than an exact solution because it might not be possible to map an orbit representative to any element of $$Y$$. For 

### Connection to group theory

### Special case: cyclic groups of prime order

### Special case: the trivial group