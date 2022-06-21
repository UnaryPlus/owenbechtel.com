---
layout: 'blog'
title: 'Zero-augmentation'
date: '29 Sep 2021'
---

A few weeks ago I made a post called "Zero = Infinity?" where I showed that zero and infinity have the same properties under multiplication. This can be generalised with the concept of a "zero-augmented group."

Define G to be a group. For the rest of this post, I will be using the variables a, b, and c to represent any elements of G. Let Zr(G) be the monoid formed by extending G with a "zero element" z such that zz = z and za = az = z. This is the "annihilation" property I mentioned in the previous post. The other properties can be easily proven.

* Closure: Due to the definition of a group, ab ∈ G, and since G is a subset of Zr(G), ab ∈ Zr(G). Due to the annihilation property, zz ∈ Zr(G), za ∈ Zr(G), and az ∈ Zr(G). Therefore, Zr(G) is closed under the group operation of G.
* Commutativity: If G is abelian, then ab = ba by definition. Due to the annihilation property, za = az. Therefore, Zr(G) is commutative under the group operation of G if and only if G is abelian, as is the case with the positive real numbers under multiplication.
* Associativity: The group axioms state that (ab)c = a(bc). If you replace a, b, or c with z, the result on both sides of the equation will be z, so the associative property will still hold. Therefore, Zr(G) is a semigroup.
* Identity: Let i be the identity element of G, so that ai = ia = a. Due to the annihilation property, zi = iz = z. Therefore, Zr(G) is a monoid.
* Inverse: For z to have an inverse, there would have to be an element y such that yz = i. However, anything combined with z is always z, and z ≠ i. Therefore, Zr(G) is never a group.

If G is the group of positive real numbers under multiplication, then the "zero element" of Zr(G) can be interpreted as either zero or infinity, because both satisfy the annihilation property. That's what I was getting at in the previous post. Another interesting thing to consider is the zero-augmented trivial group. If we denote the element of the trivial group as a, we get the following operation table:

* aa = a
* az = z
* za = z
* zz = z

This means that the zero-augmented trivial group is isomorphic to the set of booleans under the AND operation, with z as "false" and a as "true." It is also isomorphic to the set of booleans under the OR operation, with a as "false" and z as "true." Alternatively, you could view it as the monoid formed by the set {0, 1} under multiplication.

* What happens if you augment a symmetry group? Take, for example, the group D3, which is the symmetry group of the equilateral triangle. Zr(D3) adds an additional transformation z such that composing z with any other transformation gives you z. You can think of z intuitively as a transformation which destroys the triangle. Once you destroy the triangle, it is impossible to return to the previous state by applying other transformations; the information that made up the triangle is lost forever.

There might already be a mathematical term for the concept of "zero-augmentation." If so, I'm not aware of it.
