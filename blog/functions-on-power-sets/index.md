---
layout: 'blog'
title: 'Three ways for functions to act on power sets'
date: '30 Oct 2023'
mathjax: true
---

If $$f$$ is a function from a set $$A$$ to a set $$B$$, there are two well-known ways to lift $$f$$ to a function of subsets:

* The _preimage_ of a subset $$Y \subseteq B$$ is the subset $$\{ x \in A \mid f(x) \in Y \}$$. I will denote this as $$f^*(Y)$$.
* The _image_ of a subset $$X \subseteq A$$ is the subset $$\{ f(x) \mid x \in X \}$$, which can be written more explicitly as $$\{y \in B \mid \exists x \in X . f(x) = y\}$$. I will denote this as $$f_\exists(X)$$.

The preimage function $$f^* : P(B) \to P(A)$$ has many nice properties:

1. $$f^*(\emptyset) = \emptyset$$.
2. $$f^*(B) = A$$.
3. If $$X \subseteq Y$$, then $$f^*(X) \subseteq f^*(Y)$$.
4. $$f^*(X \cup Y) = f^*(X) \cup f^*(Y)$$. 
5. $$f^*(X \cap Y) = f^*(X) \cap f^*(Y)$$.
6. $$f^*({\sim}X) = {\sim}f^*(X)$$ &nbsp;&nbsp;&nbsp; (where $${\sim}$$ denotes the complement of a subset).

The image, however, has fewer nice properties. In particular, if $$f^*$$ is replaced by $$f_\exists$$, then properties 1, 3, and 4 hold, but properties 2, 5, and 6 do not.

The fact that the preimage is generally "nicer" than the image shows up in many fields of mathematics. In topology, for instance, a continuous function is defined by the property that the _preimage_ of any open subset is an open subset. And in algebra, one encounters theorems such as "the preimage of a normal subgroup is a normal subgroup" and "the preimage of a prime ideal is a prime ideal," which do not hold if "preimage" is replaced with "image."

It turns out there is a third, lesser-known, way for $$f$$ to act on power sets, which has properties dual to those of the image. For the purposes of this article, I will call this the _coimage_ and denote it by $$f_\forall$$. The coimage of a subset $$X \subseteq A$$ is defined as $$f_\forall(X) = \{ y \in B \mid \forall x \in A. f(x) = y \implies x \in X \}$$. In other words, $$f_\forall(X)$$ is the subset of $$B$$ consisting of elements whose fibers are contained in $$X$$.

The image and the coimage together satisfy the following properties:

1. $$f_\exists(\emptyset) = \emptyset$$.
2. $$f_\forall(A) = B$$.
3. If $$X \subseteq Y$$, then $$f_\exists(X) \subseteq f_\exists(Y)$$ and $$f_\forall(X) \subseteq f_\forall(Y)$$.
4. $$f_\exists(X \cup Y) = f_\exists(X) \cup f_\exists(Y)$$.
5. $$f_\forall(X \cap Y) = f_\forall(X) \cap f_\forall(Y)$$.
6. $$f_\exists({\sim}X) = {\sim}f_\forall(X)$$ and $$f_\forall({\sim}X) = {\sim}f_\exists(X)$$.

Perhaps the nicest characterization of the image and the coimage is as follows:

* $$f_\exists(X)$$ is the smallest subset $$Y \subseteq B$$ for which $$x \in X$$ implies $$f(x) \in Y$$.
* $$f_\forall(X)$$ is the largest subset $$Y \subseteq B$$ for which $$f(x) \in Y$$ implies $$x \in X$$.

In category theory, the image and coimage are encountered as the left and right adjoints of the preimage respectively. This means that

* $$f_\exists(X) \subseteq Y$$ if and only if $$X \subseteq f^*(Y)$$ &nbsp;&nbsp;&nbsp; ($$f_\exists$$ is left adjoint to $$f^*$$). 
* $$Y \subseteq f_\forall(X)$$ if and only if $$f^*(Y) \subseteq X$$ &nbsp;&nbsp;&nbsp; ($$f_\forall$$ is right adjoint to $$f^*$$).

In turns out that these statements are equivalent to the following four statements:

* $$X \subseteq f^*(f_\exists(X))$$.
* $$f_\exists(f^*(Y)) \subseteq Y$$.
* $$f^*(f_\forall(X)) \subseteq X$$.
* $$Y \subseteq f_\forall(f^*(Y))$$.

The main reason why $$f^*$$ has so many nice properties, whereas $$f_\exists$$ and $$f_\forall$$ each satisfy only around half of those properties, is that $$f^*$$ has both a left and a right adjoint, while $$f_\exists$$ has only a right adjoint, and $$f_\forall$$ has only a left adjoint.

Lastly, the notation I have been using for the image and coimage ($$f_\exists$$ and $$f_\forall$$) was not chosen at random. You are probably aware that there is a correspondence between subset operations and logical operations, with $$\cap$$ corresponding to $$\land$$, $$\cup$$ corresponding to $$\lor$$, and complement (which I have been denoting $${\sim}$$) corresponding to $$\neg$$. It turns out that this correspondence can be extended to include quantifiers, and that $$f_\exists$$ and $$f_\forall$$ correspond to $$\exists$$ and $$\forall$$ respectively.

For example, property 5 above, which says that $$f_\forall(X \cap Y) = f_\forall(X) \cap f_\forall(Y)$$, corresponds to the logical rule $$(\forall x. P(x) \land Q(x)) \iff (\forall x. P(x)) \land (\forall x. Q(x))$$. And just as it is _not_ the case that $$f_\forall(X \cup Y) = f_\forall(X) \cup f_\forall(Y)$$, it is also not the case that $$(\forall x. P(x) \lor Q(x)) \iff (\forall x. P(x)) \lor (\forall x. Q(x))$$.
