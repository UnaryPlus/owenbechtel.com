---
layout: 'blog'
title: 'Simple explanation of numpy.bincount'
date: '18 Nov 2024'
mathjax: true
---

<div style="display:none">
  $$
  \newcommand{\Set}{\mathrm{Set}}
  \newcommand{\Mon}{\mathrm{Mon}}
  \newcommand{\CMon}{\mathrm{CMon}}
  \newcommand{\To}{\Rightarrow}
  $$
</div>

Let $$\Set$$ denote the category of sets, $$\Mon$$ the category of monoids, and $$\CMon$$ the category of commutative monoids. There is a functor $$U : \Mon\to\Set$$ taking a monoid to its underlying set, and a functor $$V : \CMon\to\Mon$$ which vergisst that a monoid is commutative. These have left adjoints $$F : \Set\to\Mon$$ and $$A : \Mon\to\CMon$$ respectively. Let $$\eta : 1_{\Mon}\To V\circ A$$ be the unit of $$A\dashv V$$, and $$\alpha : F\To V\circ A\circ F$$ the horizontal composition of $$\eta$$ with the identity natural transformation on $$F$$.

Let $$n$$ be a natural number, and let $$[n] = \{k \in \mathbb{N} : k < n\} \in \Set$$. Then `lambda xs: numpy.bincount(xs, minlength=n)` implements $$\alpha_{[n]}$$.