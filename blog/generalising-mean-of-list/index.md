---
layout: 'blog'
title: 'Generalising the mean of a list'
date: '30 Jan 2022'
---

The _free semigroup_ on a set X, denoted X<sup>+</sup>, is the set of nonempty ordered lists whose items are elements of X. For example, ℤ<sup>+</sup> is the set of nonempty lists of integers, such as [3, 1] and [5, -6, 12]. For all sets X, there is a "length" function Λ : X<sup>+</sup> → ℕ<sub>&gt;0</sub> that calculates the length of a list. (Here, ℕ<sub>&gt;0</sub> is the set of natural numbers excluding 0.)

If (X, +) is a semigroup, then there is also a "sum" function ∑ : X<sup>+</sup> → X that combines every item in a list using the semigroup operation. For example, ∑[x, y, z] = x + y + z. Because (X, +) can be any semigroup, the + symbol does not necessarily denote addition. It could also be multiplication, function composition, maximum, minimum, greatest common divisor, etc. Any associative operation will do.

Every semigroup (X, +) admits a binary function p : ℕ<sub>&gt;0</sub> × X → X, which I will denote by juxtaposition; nx, short for p(n, x), is the result of combining x with itself n times. For example, 3x = p(3, x) = x + x + x.

In summary, for any semigroup (X, +), you can calculate the length of a list in X<sup>+</sup> with Λ and the "sum" of a list in X<sup>+</sup> with ∑. You can also "multiply" nonzero natural numbers with the elements of X. Using these three operations, I will define a binary relation ⤚ between X<sup>+</sup> and X. If a is an element of X<sup>+</sup> and x is an element of X, then a ⤚ x if and only if ∑(a) = Λ(a)x. In this case, we say that x is a _mean_ of a.

That's a very general definition (it works for any semigroup), so here are some concrete examples:

1. If the semigroup in question is (ℝ, +), then a ⤚ x means that x is the arithmetic mean of the list a.

2. If the semigroup is (ℝ<sub>&gt;0</sub>, ·), the set of positive real numbers under multiplication, then a ⤚ x means that x is the geometric mean of the list a.

3. If the semigroup is (ℤ, max), then a ⤚ x means that x is the maximum of a. This is because ∑(a) calculates the maximum of a, and nx = x for all n (i.e. the semigroup is idempotent). Similarly, in (ℤ, min), a ⤚ x means that x is the minimum of a.

4. If the semigroup is itself a free semigroup, i.e. X<sup>+</sup> for some set X, then ∑ : X<sup>++</sup> → X<sup>+</sup> is a function that flattens a list of lists. Unlike the previous examples, ⤚ in this case is not a total relation, or in other words, not every list of lists has a mean. Those that _do_ have a mean are of a very special variety. For example, the mean of [[x, y], [z, x, y, z], [x, y, z]] is [x, y, z], because flattening the former gives the same result as repeating the latter 3 times.

5. If the semigroup is (𝔹, ∧), the set of boolean values under logical conjunction, then a ⤚ 1 if every item in a is 1; otherwise, a ⤚ 0. Conversely, in (𝔹, ∨), a ⤚ 1 if _any_ item in a is 1.

6. If the semigroup operation is modular addition, then means are not always unique. For example, in the cyclic group ℤ/3ℤ, the mean of [1, 2, 0] can be either 0, 1, or 2, because 1 + 2 + 0 = 3(0) = 3(1) = 3(2). This shows why ⤚ has to be defined as a _relation_ and not a function. A list doesn't always have exactly one mean; it could have 0, or 3, or even an infinite number.

7. If the semigroup is (ℝ → ℝ, ∘), then a ⤚ f means that performing every function in the list a is equivalent to repeating f, Λ(a) times. Finding a mean of a list of functions amounts to composing every function in the list and then taking the [functional root](https://en.wikipedia.org/wiki/Functional_square_root).

A semigroup (X, +) is _meaningful_ if the ⤚ relation can be made into a function; for every a ∈ X<sup>+</sup>, there is a unique μ(a) ∈ X such that a ⤚ μ(a). Instead of saying that μ(a) is a mean of a, we can now confidently say that μ(a) is _the_ mean of a. In examples 1, 2, 3, and 5 above, the semigroup in question is meaningful, but in examples 4, 6, and 7, it is not. A semigroup that is not meaningful is called _meaningless_. In a meaningless semigroup, the ⤚ relation is either non-total or multi-valued, so it cannot be made into a function.

A _mean-preserving homomorphism_ from (X, +) to (Y, ∗) is a function h : X → Y with the following properties:

1. h is a semigroup homomorphism: h(x + y) = h(x) ∗ h(y).
2. h respects the mean relation: a ⤚ x implies h(a) ⤚ h(x), where h(a) denotes the application of h to every item in a.

One can prove that _all_ semigroup homomorphisms are mean-preserving. Assume h is a homomorphism from (X, +) to (Y, ∗), a ∈ X<sup>+</sup>, and x ∈ X. Then a ⤚ x ⇔ ∑(a) = Λ(a)x ⇒ h(∑(a)) = h(Λ(a)x). Because h is a homomorphism, h(nx) = nh(x), and h(∑(a)) = ∑(h(a)). The latter can be demonstrated by replacing the list a with its components: h(∑(a)) = h(a<sub>0</sub> + a<sub>1</sub> + … a<sub>n</sub>) = h(a<sub>0</sub>) ∗ h(a<sub>1</sub>) ∗ … h(a<sub>n</sub>) = ∑(h(a)). Therefore, the equality h(∑(a)) = h(Λ(a)x) is equivalent to ∑(h(a)) = Λ(a)h(x). Applying h to a list does not change its length, so we get that ∑(h(a)) = Λ(h(a))h(x) ⇔ h(a) ⤚ h(x). In summary, for any homomorphism h, a ⤚ x implies h(a) ⤚ h(x).

I will use the term _divisible semigroup_ for a semigroup X satisfying the following property: for every x ∈ X and n ∈ ℕ<sub>&gt;0</sub>, there is a unique y ∈ X such that ny = x. The element y is called the nth factor of x, and is written x / n. It isn't difficult to see that all divisible semigroups are meaningful, with μ(a) = ∑(a) / Λ(a). But the reverse implication (that all meaningful semigroups are divisible) is not true.

One example of a semigroup which is meaningful but not divisible is (ℝ<sub>&gt;2</sub>, ·). This is a valid semigroup, because the product of numbers greater than 2 will also be greater than 2. It is meaningful, because the geometric mean of a list of numbers greater than 2 will also be greater than 2. But it is not divisible, because the nth root of a number greater than 2 is not necessarily greater than 2. (nth roots are the equivalent of nth factors in multiplicative semigroups.) Therefore, the concept of "meaningfulness" can be thought of as a generalisation of divisibility.

Meaningfulness _does_ imply divisibility if the semigroup has an identity element. To find the factor x / n, you can construct a list with length n and sum x, and then calculate the mean. In a monoid, it is always possible to construct a list with these properties by appending the identity: [x], [x, e], [x, e, e], and so on. So for monoids, meaningfulness and divisibility are equivalent.

Given two meaningful semigroups (X, +) and (Y, ∗), their direct product is also meaningful. For any list of pairs c ∈ (X × Y)<sup>+</sup>, we can split c into two lists a ∈ X<sup>+</sup> and b ∈ Y<sup>+</sup> by putting the first element of each pair in a and the second element of each pair in b. Then the pair (μ(a), µ(b)) is a mean of c, because Λ(c)(μ(a), μ(b)) = (Λ(c)μ(a), Λ(c)μ(b)) = (Λ(a)μ(a), Λ(b)μ(b)) = (Σ(a), Σ(b)) = Σ(c). It is also clearly the _only_ mean of c, because μ(a) and μ(b) are the only means of a and b respectively. This means that the direct product of any two meaningful semigroups is meaningful.

Many other constructions also preserve meaningfulness.

* Given a meaningful semigroup (X, +), the opposite semigroup (X, (x, y) ↦ y + x) is also meaningful, with μ(a) in the latter being equivalent to μ(reverse(a)) in the former.

* The semigroup formed by augmenting a meaningful semigroup (X, +) with an absorbing element ∞ (such that ∞ + x = x + ∞ = ∞) is meaningful. The mean of any list not containing ∞ is already defined, and the mean of a list containing ∞ is just ∞.

* If a meaningful semigroup (X, +) can be divided into two disjoint subsets Y and Z such that both are closed under the + operation and Y ∪ Z = X, then both (Y, +) and (Z, +) are meaningful. The mean of a list in Y<sup>+</sup> must be in Y because Z is closed, and vice versa. For example, the meaningful semigroup (ℝ<sub>&gt;0</sub>, ·) can be divided into two subsemigroups (ℝ<sub>(0, 1]</sub>, ·) and (ℝ<sub>&gt;1</sub>, ·). Both are meaningful by the preceding theorem.

One construction that does _not_ preserve meaningfulness is the addition of an identity element. For example, (ℝ<sub>&gt;1</sub>, +) is meaningful, but (ℝ<sub>&gt;1</sub> ∪ {0}, +) is not, even though it is a valid semigroup. The arithmetic mean of [0, 2] is not contained in ℝ<sub>&gt;1</sub> ∪ {0}.
