---
layout: 'blog'
title: 'Hyperspheres and quasispheres'
date: '21 May 2025'
mathjax: true
center_equations: true
---

The unit $$n$$-sphere $$S^n$$ is a Riemannian manifold which can be defined as the subset of $$\mathbb{R}^{n+1}$$ satisfying $$x_1^2 + \dots + x_{n+1}^2 = 1$$. We can obtain a parametrization by using the fact that the cross-sections with $$x_1$$ fixed are $$(n-1)$$-spheres of radius $$\sqrt{1-x_1^2}$$. If we write $$x_1 = \cos\theta_1$$ (with $$\theta_1$$ ranging from $$0$$ to $$\pi$$, so that $$\cos\theta_1$$ covers all the values from $$1$$ to $$-1$$), then $$\sqrt{1-x_1^2}$$ becomes the nicer expression $$\sin\theta_1$$, and the sphere equation can be rewritten as

$$
\left(\frac{x_2}{\sin\theta_1}\right)^2 + \dots + \left(\frac{x_{n+1}}{\sin\theta_1}\right)^2 = 1.
$$

Applying the same trick again, we write $$x_2/\sin\theta_1 = \cos\theta_2$$, so that the equation above can be written as

$$
\left(\frac{x_3}{\sin\theta_1\sin\theta_2}\right)^2 + \dots + \left(\frac{x_{n+1}}{\sin\theta_1\sin\theta_2}\right)^2 = 1.
$$

Then we write $$x_3/\sin\theta_1\sin\theta_2 = \cos\theta_3$$, and so on. Eventually, the equation becomes that of a unit circle:

$$
\left(\frac{x_n}{\sin\theta_1\cdots\sin\theta_{n-1}}\right)^2 + \left(\frac{x_{n+1}}{\sin\theta_1\cdots\sin\theta_{n-1}}\right)^2 = 1
$$

Everyone knows how to parametrize this: $$x_n$$ divided by whatnot is $$\cos\theta_n$$, and $$x_{n+1}$$ divided by whatnot is $$\sin\theta_n$$. The full parametrization of the $$n$$-sphere is

$$
\begin{align*}
x_i = \left(\prod_{j=1}^{i-1}\sin\theta_j\right)\cos\theta_i\,&\quad \text{for } 1 \leq i \leq n\\
x_{n+1} = \prod_{j=1}^n\sin\theta_j,&
\end{align*}
$$

with $$\theta_1,\dots,\theta_{n-1} \in [0,\pi]$$ and $$\theta_n \in [-\pi, \pi]$$.

The corresponding tangent vectors are

$$
\begin{align*}
\frac{\partial}{\partial\theta_k} &= \sum_{i=1}^{n+1}\frac{\partial x_i}{\partial\theta_k}\frac{\partial}{\partial x_i} \\
&= -\left(\prod_{j=1}^{k}\sin\theta_j\right)\frac{\partial}{\partial x_k} + \sum_{i=k+1}^{n} \frac{\cos\theta_k}{\sin\theta_k}\left(\prod_{j=1}^{i-1} \sin\theta_j\right) \cos\theta_i\frac{\partial}{\partial x_i} + \frac{\cos\theta_k}{\sin\theta_k}\left(\prod_{j=1}^{n} \sin\theta_j\right)\frac{\partial}{\partial x_{n+1}}.
\end{align*}
$$

It's pretty straightforward to show that these tangent vectors are orthogonal: For $$k < l$$, the dot product of $$\partial/\partial\theta_k$$ and $$\partial/\partial\theta_l$$ is

$$
\frac{\cos\theta_k}{\sin\theta_k}\frac{\cos\theta_l}{\sin\theta_l}\prod_{j=1}^l\sin^2\theta_j \left(-1 + \sum_{i=l+1}^{\color{red}n}\left(\prod_{j=l+1}^{i-1}\sin^2\theta_j\right)\cos^2\theta_i + \prod_{j=l+1}^{\color{red}n}\sin^2\theta_j\right).
$$

Using the $$\cos^2 + \sin^2 = 1$$ rule, we can decrease each of the red numbers by 1. Eventually, the sum and product both become empty, cancelling out the $$-1$$ and making the whole expression 0. The dot product of $$\partial/\partial\theta_k$$ with itself is of course nonzero, and is instead equal to

$$
\prod_{j=1}^{k-1}\sin^2\theta_j.
$$

Combining all of the dot products, we get an expression for the metric on $$S^n$$ in intrinsic coordinates:

$$
g_{S^n} = \sum_{k=1}^n \left(\prod_{j=1}^{k-1}\sin^2\theta_j\right) \mathrm{d}\theta_k^2.
$$

From this one can compute the Christoffel symbols (of the Levi-Civita connection) and thence the curvature tensors and whatnot.

The coordinate tangent vectors are already orthogonal, so we can obtain an orthonormal basis for the tangent space at each point on the $$n$$-sphere by scaling them:

$$
\left(\prod_{j=1}^{k-1}\frac{1}{\sin\theta_j}\right)\frac{\partial}{\partial\theta_k}\quad k\in 1,\dots,n.
$$

The corresponding dual basis is

$$
\left(\prod_{j=1}^{k-1}\sin\theta_j\right)\mathrm{d}\theta_k \quad k\in1,\dots,n.
$$

If we take the exterior product of all of these, we obtain the volume form for the $$n$$-sphere:

$$
\omega_{S^n} = \left(\prod_{j=1}^{n-1}(\sin\theta_j)^{n-j}\right)\mathrm{d}\theta_1\wedge\dots\wedge\mathrm{d}\theta_n.
$$

This is what you need to multiply a scalar field by if you want to integrate it over $$S^n$$. (If $$n=2$$ and we write $$(\theta_1, \theta_2)$$ as $$(\theta, \phi)$$, the volume form is the familiar $$\sin\theta\,\mathrm{d}\theta\wedge\mathrm{d}\phi$$.) If we integrate the volume form itself, we should obtain the volumn of the $$n$$-sphere (that is, the perimeter of the unit circle, the surface area of the unit 2-sphere, and so on). This integral can be separated into $$n$$ integrals, one for each coordinate, giving

$$
2\pi \prod_{j=1}^{n-1}\int_0^\pi (\sin t)^{j} \,\mathrm{d}t = 2\pi \prod_{j=1}^{n-1}2\int_0^\frac{\pi}{2} (\sin t)^{j} \,\mathrm{d}t = 2^n\pi\prod_{j=1}^{n-1}W_j,
$$

where $$W_j$$ denotes the [Wallace integral](https://en.wikipedia.org/wiki/Wallis'_integrals). By using the formula for $$W_j$$ as a product of fractions, I figured out that the above is equal to

$$
\frac{2^{\lfloor\frac{n+2}{2}\rfloor}\pi^{\lfloor\frac{n+1}{2}\rfloor}}{(n-1)!!},
$$

where the exclamation points denote the [double factorial](https://en.wikipedia.org/wiki/Double_factorial) (which is not the factorial of the factorial).
Interestingly, this formula even works if $$n=0$$. The double factorial of $$-1$$ is $$1$$, so the formula evaluates to 2, which is the number of points in the 0-sphere. (Extrapolating backward, if there were such a thing as the $$-2$$-sphere, its volume would be $$-1/\pi$$.)

The volume of the $$(n+1)$$-ball (the region enclosed by the $$n$$-sphere) should equal the volume of the $$n$$-sphere times the integral of $$t^{n}$$ from 0 to 1.* This integral is $$1/(n+1)$$ by the power rule. Nicely, the new $$n+1$$ in the denominator can be combined into the double factorial to give

$$
\frac{2^{\lfloor\frac{n+2}{2}\rfloor}\pi^{\lfloor\frac{n+1}{2}\rfloor}}{(n+1)!!}.
$$

[* The idea is that we partition the ball into spheres of varying radius.]

### Quasispheres

The $$(m, n)$$-quasisphere $$Q^{(m, n)}$$ is a generalization of the sphere. It is an $$(m+n)$$-dimensional pseudo-Riemannian manifold with metric signature $$(m, n)$$. To define $$Q^{(m, n)}$$, we first define $$\mathbb{R}^{(m, n)}$$ to be the pseudo-Riemannian manifold which has the same underlying set and topology as $$\mathbb{R}^{m+n}$$ but has the metric 

$$
\mathrm{d}x_1^2 + \dots + \mathrm{d}x_m^2 - \mathrm{d}y_1^2 - \dots - \mathrm{d}y_n^2.
$$

(For example, $$\mathbb{R}^{(3, 1)}$$ is the Minkowski space of special relativity.) Then $$Q^{(m,n)}$$ is the submanifold of $$\mathbb{R}^{(m+1,n)}$$ defined by the equation

$$
x_1^2 + \dots + x_{m+1}^2 - y_1^2 - \dots - y_n^2 = 1.
$$

If $$n = 0$$, this is the definition of the $$m$$-sphere. 

If we ignore the metrics and view them merely as smooth manifolds, then $$Q^{(0, 1)}$$ is the unit hyperbola ($$\simeq S^0 \times \mathbb{R}$$), $$Q^{(1,1)}$$ is the one-sheeted hyperboloid ($$\simeq S^1 \times \mathbb{R}$$), and $$Q^{(0,2)}$$ is the two-sheeted hyperboloid ($$\simeq S^0 \times \mathbb{R}^2$$). More generally, $$Q^{(m,n)}$$ is diffeomorphic to $$S^m\times \mathbb{R}^n$$, with a diffeomorphism given by

$$
(x_1, \dots, x_{m+1}, y_1, \dots, y_n) \mapsto \left(\frac{x_1}{\sqrt{1+\sum_{i=1}^n y_i^2}}, \dots, \frac{x_{m+1}}{\sqrt{1+\sum_{i=1}^n y_i^2}}, y_1, \dots, y_n\right).
$$

One implication of this is that $$Q^{(m,n)}$$ is connected if and only if $$m > 0$$. $$Q^{(0,n)}$$ has two connected components: one with $$x_1 \geq 1$$ and one with $$x_1 \leq -1$$. Similarly, $$Q^{(m,n)}$$ is simply connected if and only if $$m > 1$$.

To see that $$Q^{(m,n)}$$ has metric signature $$(m,n)$$, consider the point $$p \in Q^{(m,n)}$$ defined by $$x_{m+1}=1$$ with all other coordinates 0. For each $$i$$ from 1 to $$m$$, let $$\gamma_i$$ be the curve in the $$x_{m+1}, x_i$$ plane defined by $$x_{m+1} = \cos(t)$$ and $$x_i = \sin(t)$$. Note that $$\gamma_i$$ lies on the quasisphere, that $$\gamma_i(0) = p$$, and that $$\gamma_i'(0) = \partial/\partial x_i$$, the unit vector in the $$x_i$$ direction. Similarly, for each $$i$$ from 1 to $$n$$, let $$\zeta_i$$ be the curve in the $$x_{m+1}, y_i$$ plane defined by $$x_{m+1} = \cosh(t)$$ and $$y_i = \sinh(t)$$. These curves also lie on the quasisphere and start at $$p$$, and they satisfy $$\zeta_i'(0) = \partial/\partial y_i$$.

So the tangent space of the quasisphere at $$p$$ has a basis consisting of the vectors

$$
\frac{\partial}{\partial x_1}, \dots, \frac{\partial}{\partial x_m}, \frac{\partial}{\partial y_1}, \dots, \frac{\partial}{\partial y_n}.
$$

These vectors are all orthogonal, with $$m$$ of them having a self-inner-product of 1 and $$n$$ having a self-inner-product of $$-1$$. So long as the metric on $$Q^{(m,n)}$$ is nondegenerate everywhere (which I don't care to prove), it must have the same signature everywhere.

Two quasispheres are of importance in general relativity. These are $$Q^{(3, 1)}$$, which is a submanifold of $$\mathbb{R}^{(4, 1)}$$, and $$Q^{(1, 3)}$$, which is a submanifold of $$\mathbb{R}^{(2, 3)}$$. The former is known as de Sitter space and the latter is known as anti-de Sitter space, up to negating the metric. De Sitter space describes an empty, exponentially expanding universe, while anti-de Sitter space describes an empty universe that expands and then contracts, ending in a "big crunch."

Hyperbolic space can also be defined in terms of quasispheres. If we take one of the connected components of $$Q^{(0, n)}$$ and negate the metric, we get the $$n$$-dimensional hyperbolic space $$H^n$$.

As this negating the metric business seems pretty common, we can define $$\widehat{Q}^{(m, n)}$$ to be $$Q^{(n, m)}$$ but with the metric negated. $$\widehat{Q}^{(m, n)}$$ can also be defined directly as the submanifold of $$\mathbb{R}^{(m, n+1)}$$ on which

$$
x_1^2 + \dots + x_m^2 - y_1^2 - \dots - y_{n+1}^2 = -1.
$$

Note that $$Q^{(m-1, n)}$$ and $$\widehat{Q}^{(m, n-1)}$$ are both defined as submanifolds of $$\mathbb{R}^{(m, n)}$$, but with a $$1$$ and a $$-1$$ respectively on the right hand sides of their defining equations.