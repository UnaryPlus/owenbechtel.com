---
layout: 'blog'
title: 'Weighted fibonacci sequences'
date: '11 Sep 2021'
---

The Fibonacci sequence is one of the most well-known integer sequences. It begins with the values 1, 1, 2, 3, 5, 8, 13, 21, 34, 55... and is defined as follows:

1. F(1) = 1
2. F(2) = 1
3. F(n) = F(n - 2) + F(n - 1)

The growth rate of the Fibonacci sequence is (1+ sqrt(5)) / 2. This means that each term in the sequence is approximately 1.618 times greater than the previous term.

What happens if we alter the Fibonacci sequence by scaling the two previous terms before adding them? In other words, what is the growth rate of a weighted Fibonacci sequence S where S(n) = aS(n - 2) + bS(n - 1)?

Define r to be the growth rate of the sequence. Our goal is to calculate the value of r in terms of the constants a and b. We can start by replacing S(n - 1) with S(n) / r, and S(n - 2) with S(n) / r<sup>2</sup>.

1. S(n) = aS(n) / r<sup>2</sup> + bS(n) / r

Next, multiply both sides by r<sup>2</sup>.

<ol start="2">
  <li>S(n)r<sup>2</sup> = aS(n) + bS(n)r</li>
  <li>r<sup>2</sup> = a + br</li>
  <li>r<sup>2</sup> - br - a = 0</li>
</ol>

Now we can use the quadratic formula to solve for r.

<ol start="5">
  <li>r = (b ± sqrt(b<sup>2</sup> + 4a)) / 2</li>
</ol>

When a and b are both 1, this formula evaluates to (1 + sqrt(5)) / 2 and (1 - sqrt(5)) / 2. The first answer is the growth rate of the Fibonacci sequence.

A special case occurs when the constant b is one less than a.

1. r = (a - 1 ± sqrt((a - 1)<sup>2</sup> + 4a)) / 2
2. r = (a - 1 ± sqrt(a<sup>2</sup> - 2a + 1 + 4a) / 2
3. r = (a - 1 ± sqrt(a<sup>2</sup> + 2a + 1) / 2
4. r = (a - 1 ± (a + 1)) / 2

If we choose the addition option, we can evaluate this expression further.

<ol start="5">
  <li>r = (a - 1 + a + 1) / 2</li>
  <li>r = 2a / 2</li>
  <li>r = a</li>
</ol>

Let's test this result. Suppose a = 2 and b = 1. The corresponding weighted Fibonacci sequence is given by the formula S(n) = 2S(n - 2) + S(n - 1). If you start with 1 and 1, the next eight terms of this sequence are 3, 5, 11, 21, 43, 85, 171, and 341. It isn't hard to see that each term is either one greater than twice the term before it, or one less than twice the term before it. Therefore, the growth rate of the sequence, or the limit of S(k)/S(k - 1) as k approaches infinity, is 2. Since a is also 2, r is equal to a, just as we expected.

If at step 5, you chose subtraction instead of addition, you would get -1 as the growth rate. This happens if one of the two starting numbers is negative. For example, suppose a = 3 and b = 2. If we start with the numbers 1 and -1:

1. 3(1) + 2(-1) = 1
2. 3(-1) + 2(1) = -1
3. 3(1) + 2(-1) = 1

The sequence simply alternates between -1 and 1 forever, so the growth rate is obviously -1.
