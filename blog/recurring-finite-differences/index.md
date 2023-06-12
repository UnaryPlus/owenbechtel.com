---
layout: 'blog'
title: 'Sequences with recurring finite differences'
date: '11 Jun 2023'
mathjax: true
---

The finite difference operator is the discrete analogue of the derivative. It is usually written $$\Delta$$ and is defined by the equation $$ \Delta(f)(x) = f(x + 1) - f(x) $$. That is, given a sequence $$f$$, it returns a new sequence $$\Delta(f)$$, called the "difference" of $$f$$, whose terms are the differences between consecutive terms of $$f$$.

For example, if $$f$$ is the sequence of [triangular numbers](https://en.wikipedia.org/wiki/Triangular_number) (0, 1, 3, 6, 10, 15, ...) then $$\Delta(f)$$ is the sequence (1, 2, 3, 4, 5, ...), because 1 &minus; 0 = 1, 3 &minus; 1 = 2, 6 &minus; 3 = 3, and so on. Applying the finite difference operator again results in the constant sequence (1, 1, 1, ...). This sequence is called the "second difference" of $$f$$ and is denoted $$\Delta(\Delta(f))$$ or $$\Delta^2(f)$$.

If we start instead with $$f(x) = x^3$$, we find that the third difference, $$\Delta^3(f)$$, is constantly 6:

$$
\begin{array}{r|ccccccc}
            &   0 & 1 &  2 &  3 &  4 &  5 & \ldots \\
            \hline
f           &  0 &  1 &  8 & 27 & 64 &125 & \ldots \\ 
\Delta(f)   &  1 &  7 & 19 & 37 & 61 & 91 & \ldots \\
\Delta^2(f) &  6 & 12 & 18 & 24 & 30 & 36 & \ldots \\
\Delta^3(f) &  6 &  6 &  6 &  6 &  6 &  6 & \ldots \\
\end{array}
$$

This is reminiscent of differential calculus, where the third _derivative_ of $$x^3$$ is also constantly 6. However, the intermediate differences and derivatives do not coincide. For example, the first derivative of $$x^3$$ is $$3x^2$$, but you can see in the table above that the first _difference_ of $$x^3$$ begins with 1, 7, 19, ..., and is in fact equal to $$3x^2 + 3x + 1$$.

Other polynomials behave in a similar way. If the leading term of a polynomial $$f(x)$$ is $$ax^n$$, then $$\Delta^n(f)(x) = an!$$, a rule whose analogue holds in differential calculus. (The $$!$$ symbol here is a factorial, not a punctuation mark.) The "power rule" for finite differences is $$\Delta(x^n) = \Sigma_{i=1}^{n} \binom{n}{i} x^{n-i}$$. Thus the first term of $$\Delta(x^n)$$ is $$nx^{n-1}$$, as with derivatives, but there are generally other terms of smaller degree.

There are other near-similarities between derivatives and differences. For example, the derivative of $$e^x$$ is itself, and the difference of $$2^x$$ is itself (because $$2^{x+1} - 2^x = 2^x$$). Thus $$2^x$$ plays a similar role in finite difference calculus as $$e^x$$ does in differential calculus.

This brings us to the main topic of this article, namely the classification of those sequences that are equal to their own $$n$$-th difference for some $$n$$. 

It turns out that such sequences are determined by their first $$n$$ terms. That is, given a positive integer $$n$$ and a list of $$n$$ numbers, there is exactly one sequence which begins with that list of numbers and which is equal to its own $$n$$-th difference. One can find this sequence by "working backwards." For example, suppose $$n = 3$$, and we want the sequence to start with 0, 1, 3. The first step is to create a table, working out as many terms of the sequence's differences, in the usual manner, as one can:

$$
\begin{array}{r|ccc}
f           & 0 & 1 & 3 \\
\Delta(f)   & 1 & 2 \\
\Delta^2(f) & 1 \\
\end{array}
$$

Now, since we want $$\Delta^3{f}$$ to be equal to $$f$$, we can add another row at the bottom with a 0 in it (the first term of $$f$$).

$$
\begin{array}{r|ccc}
f           & 0 & 1 & 3 \\
\Delta(f)   & 1 & 2 \\
\Delta^2(f) & 1 \\
\Delta^3(f) & 0 \\
\end{array}
$$

Just as each term in the table is the difference between the term above it and the term to its top-right (if these exist), each term is the _sum_ of the one to its left and the one to its bottom-left (if these exist). Using this rule, we can "work backwards" to get the next term of $$f$$. We find that 0 + 1 = 1, 1 + 2 = 3, and 3 + 3 = 6.

$$
\begin{array}{r|ccc}
f           & 0 & 1 & 3 & 6 \\
\Delta(f)   & 1 & 2 & 3 \\
\Delta^2(f) & 1 & 1 \\
\Delta^3(f) & 0 \\
\end{array}
$$

Now we can repeat the last two steps indefinitely, adding the $$i$$-th term of $$\Delta^3(f)$$ at the bottom and then working upwards along a diagonal line to get the $$(i+3)$$th term of $$f$$.

$$
\begin{equation}
\begin{array}{r|ccc}
f           & 0 & 1 & 3 & 6 & 11 & 21 & 42 & 85 & \ldots \\
\Delta(f)   & 1 & 2 & 3 & 5 & 10 & 21 & 43 & \ldots \\
\Delta^2(f) & 1 & 1 & 2 & 5 & 11 & 22 & \ldots \\
\Delta^3(f) & 0 & 1 & 3 & 6 & 11 & \ldots \\
\end{array}
\end{equation}
$$

To find a general formula for _all_ sequences $$f$$ such that $$\Delta^3(f) = f$$, we can use the same algorithm, but start with indeterminates $$a$$, $$b$$, $$c$$ instead of 0, 1, 3.

$$
\begin{equation}
\begin{array}{r|ccc}
f           & a      & b       & c        & 2a-3b+3c & 6a-7b+6c & 12a-12b+11c & 22a-21b+21c & 42a-41b+42c & \ldots \\
\Delta(f)   & -a+b   & -b+c    & 2a-3b+2c & 4a-4b+3c & 6a-5b+5c & 10a-9b+10c  & 20a-20b+21c \ldots \\
\Delta^2(f) & a-2b+c & 2a-2b+c & 2a-b+c   & 2a-b+2c  & 4a-4b+5c & 10a-11b+11c & \ldots \\
\Delta^3(f) & a      & b       & c        & 2a-3b+3c & 6a-7b+6c & \ldots \\
\end{array}
\end{equation}
$$

Any sequence equal to its third difference must match the table above, if you substitute $$a$$ for its first term, $$b$$ for its second term, and $$c$$ for its third term. For example, table 2 becomes the same as table 1 if you substitute $$a = 0$$, $$b = 1$$, and $$c = 3$$. And if you substitute $$a = -a + b$$, $$b = -b + c$$, and $$c = 2a - 3b + 2c$$, the first row of table 2 is transformed into the second row. (This works because if $$f$$ is equal to third difference, then $$\Delta(f)$$ is also equal to its third difference&mdash;namely $$\Delta^4(f)$$&mdash;and so must also conform to the general case.)

The coefficients of $$a$$, $$b$$, and $$c$$ in the general case form three separate sequences.

* Coefficients of $$a$$: (1, 0, 0, 2, 6, 12, 22, 42, ...)
* Coefficients of $$b$$: (0, 1, 0, -3, -7, -12, -21, -41, ...)
* Coefficients of $$c$$: (0, 0, 1, 3, 6, 11, 21, 42, ...)

These three sequences form a basis, in the linear algebraic sense, of the space of sequences equal to their third difference. (I will henceforth call this space $$E_3$$.) Any sequence in $$E_3$$ is a linear combination of the three sequences above, meaning that if you multiply each term in the first sequence by some number $$a$$, the second sequence by some number $$b$$, and the third sequence by some number $$c$$, and add up corresponding terms, you can get any sequence in $$E_3$$ (and you will always get a sequence in $$E_3$$).

Obviously, nothing I have done here is specific to the case $$n=3$$. For all positive integers $$n$$, there is an $$n$$-dimensional space $$E_n$$ of sequences equal to their own $$n$$-th difference, and a general formula for all sequences in this space can be found by an algorithm analogous to the one in table 2. The sequences of coefficients produced by this algorithm form a basis of the space.

I wrote a C program to automate the algorithm, which you can find [here](https://github.com/UnaryPlus/recdiff-sequences). The program asks for a "dimension" $$n$$ and a "length" $$r$$, and outputs the first $$r$$ terms of each of the standard basis sequences of $$E_n$$.

But let's return to the case $$n=3$$. We have an algorithm that will generate a sequence in $$E_3$$ given its first three terms, but we don't have any single formula for the resulting sequence. We want an expression in terms of $$a$$, $$b$$, $$c$$, and $$i$$ that will give us the $$i$$-th term of the sequence in $$E_3$$ which begins with $$a$$, $$b$$, $$c$$. The first step to finding such a formula is to find an alternative basis of $$E_3$$ consisting of three sequences that each have a simple formula. One can then write the standard-basis sequences (the sequences of coefficients listed earlier) in terms of this new basis.

The sequence in $$E_3$$ starting with 0, 1, 1 repeats after six terms: (0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, ...). This makes it a good candidate for inclusion in the new basis. I'll call this sequence $$S_1$$. Similarly, the sequence starting with 1, 1, 0 also repeats after six terms: (1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, ...). I'll call this $$S_2$$. Clearly, $$S_1$$ and $$S_2$$ are just shifted versions of each other. Both have an explicit expression in terms of sine:

$$
\begin{align*}
S_1(i) = \frac{2}{\sqrt{3}} \sin(\frac{\pi}{3} i) &&
S_2(i) = \frac{2}{\sqrt{3}} \sin(\frac{\pi}{3} i + \frac{\pi}{3})
\end{align*}
$$ 

Such formulas are hardly necessary, however, and betray the simplicity of these sequences. To actually calculate the values of $$S_1$$ and $$S_2$$, whether on a computer or by hand, you would be better off checking the value of $$i$$ mod 6 and then returning -1, 0, or 1 based on the repeating structure of the sequence. For the third element of the new basis, I will use the sequence $$2^i$$, which is equal to its own _first_ difference and so is definitely contained in $$E_3$$.

The expressions for the standard-basis sequences in terms of this new basis are as follows:

$$\frac{2^i - 4 S_1(i) + 2 S_2(i)}{3}$$

$$\frac{- 2^i + 4 S_1(i) + S_2(i)}{3}$$

$$\frac{2^i - S_1(i) - S_2(i)}{3}$$

Now remember that to find the sequence in $$E_3$$ starting with $$a$$, $$b$$, $$c$$, you can multiply the standard basis sequences by $$a$$, $$b$$, and $$c$$ respectively and then add the corresponding terms. So the $$i$$-th term of this sequence is

$$ a\left(\frac{2^i - 4 S_1(i) + 2 S_2(i)}{3}\right) 
+ b\left(\frac{- 2^i + 4 S_1(i) + S_2(i)}{3}\right) 
+ c\left(\frac{2^i - S_1(i) - S_2(i)}{3}\right), $$

which is equal to

$$ \frac{(a - b + c)2^i + (-4a + 4b - c)S_1(i) + (2a + b - c)S_2(i)}{3}.$$

This is exactly the formula we were looking for. By substituting specific values in for $$a$$, $$b$$, and $$c$$, you can get an explicit, constant-time formula for any sequence in $$E_3$$, knowing only its first three terms.

