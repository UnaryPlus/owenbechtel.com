---
layout: 'blog'
title: 'Googology (archived)'
date: '16 Oct 2023'
---

_I wrote this article several years ago, when I was in high school. For a while, it was listed on the main navigation bar of my website, because the "Articles" page didn't exist yet when I wrote it. I've decided to move it here because I don't think it's important enough to deserve its own top-level page._

<hr>

Googology is the study of googolisms, or extremely large numbers. The word "googolism" comes from the number googol, or 10^100. Below is the definition of a function I've created for making big numbers, and the names I've come up with for a few of them.

### The Bracket Function

I'll start by defining a recursive array function with three rules. This function can take any number of arguments, which are placed inside brackets and separated by commas. In the definition below, lowercase letters are used to represent a single argument, and capital letters are used to represent zero or more arguments.

1.  \[x] = 2^x \
   (A single number in brackets evaluates to 2 to the power of that number.)

2. [1, x, Y] = [x, Y] \
   (If there is more than one number inside the brackets and the first number is 1, the first number can be removed.)

3. [x, y, Z] = [x - 1, [y, Z], Z] \
   (If there is more than one number inside the brackets and the first number is greater than 1, the first number is decremented and the second number is replaced with the entire array except for the first number.)

The third rule is what makes this function capable of generating extremely large numbers. Let’s see what happens when we evaluate something like [3, 3].

* [3, 3] = [2, [3]] = [1, [[3]]] (rule 3)
* [1, [[3]]] = [[[3]]] (rule 2)
* [[[3]]] = [[2^3]] = [[8]] = [2^8] = [256] = 2^256 (rule 1)

By applying the three rules, a short array of small numbers like [3, 3] can end up evaluating to something truly enormous. In case you’re wondering, the full decimal representation of 2^256 is 115 792 089 237 316 195 423 570 985 008 687 907 853 269 984 665 640 564 039 457 584 007 913 129 639 936. What happens if we try [4, 4]?

* [4, 4] = [3, [4]] = [2, [[4]]] = [1, [[[4]]]] (rule 3)
* [1, [[[4]]]] = [[[[4]]]] (rule 2)
* [[[[4]]]] = [[[2^4]]] = [[[16]]] = [[2^16]] = [[65536]] = [2^65536] = 2^(2^65536) (rule 1)

In other words, [4, 4] is equal to 2 to the power of [this number](2-65536). Imagine multiplying that many 2s together! We’ve already reached values far larger than googolplex, and we haven’t even tried putting more than two numbers inside the brackets. Let’s try evaluating [4, 4, 4].

* [4, 4, 4] = [3, [4, 4], 4] = [2, [[4, 4], 4], 4] = [1, [[[4, 4], 4], 4], 4] (rule 3)
* [1, [[[4, 4], 4], 4], 4] = [[[[4, 4], 4], 4], 4] (rule 2)

I’m going to stop here, because you can probably already tell how big this is going to get. It’s difficult to imagine the size of something like [4, 4, 4] but we might as well try. First, imagine a 4 inside of [4, 4] sets of brackets. Now imagine a 4 inside of that many brackets. Now imagine a 4 inside of _that_ many brackets. Repeat the process one more time and you have finally reached [4, 4, 4].

### The Zigzag Operator

Adding more arguments to the bracket function increases the resulting values hyper-exponentially. Taking advantage of this fact, we can define a new operator, which I will call the zigzag operator, represented by the archaic greek letter qoppa.

1. 1 ϟ x = x
2. x ϟ y = (x - 1) ϟ [y, y, ... y, y] with y y's

Here are a few examples to demonstrate the tremendous power of this new operator:

* 2 ϟ 2 = [2, 2] = 16
* 2 ϟ 5 = [5, 5, 5, 5, 5]
* 2 ϟ 8 = [8, 8, 8, 8, 8, 8, 8, 8]
* 3 ϟ 2 = 2 ϟ [2, 2] = 2 ϟ 16 = [16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]
* 3 ϟ 3 = 2 ϟ [3, 3, 3] = [[3, 3, 3], [3, 3, 3], ...... [3, 3, 3], [3, 3, 3]] with [3, 3, 3] [3, 3, 3]'s

Well that escalated quickly.

### Names and Suffixes

Fourov = [4, 4, 4, 4, 4] \
Fivov = [5, 5, 5, 5, 5] \
Sixov = [6, 6, 6, 6, 6] \
Sevenov = [7, 7, 7, 7, 7] \
etc.

Fourox = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4] \
Fivox = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5] \
Sixox = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6] \
Sevenox = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7] \
etc.

Fourol = [4, 4, ... 4, 4] with 50 4’s \
Fivol = [5, 5, ... 5, 5] with 50 5’s \
Sixol = [6, 6, ... 6, 6] with 50 6's \
Sevenol = [7, 7, ... 7, 7] with 50 7's \
etc.

Fouroc = [4, 4, ... 4, 4] with 100 4’s \
Fivoc = [5, 5, ... 5, 5] with 100 5’s \
Sixoc = [6, 6, ... 6, 6] with 100 6's \
Sevenoc = [7, 7, ... 7, 7] with 100 7's \
etc.

(The -ov, -ox, -ol, and -oc suffixes are based on the roman numerals for 5, 10, 50, and 100 respectively.)

Big Three = 2 ϟ 3 = [3, 3, 3] \
Big Four = 2 ϟ 4 = [4, 4, 4, 4] \
Big Twelve = 2 ϟ 12 = [12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12] \
Big Googol = 2 ϟ (10^100) = [10^100, 10^100, ...... 10^100, 10^100] with 10^100 10^100's \
etc.

Really Big Three = 3 ϟ 3 \
Really Big Four = 3 ϟ 4 \
Really Big Twelve = 3 ϟ 12 \
Really Big Googol = 3 ϟ (10^100) \
etc.

Threeqoppa = 3 ϟ 3 ϟ 3 \
Fourqoppa = 4 ϟ 4 ϟ 4 ϟ 4 \
Fiveqoppa = 5 ϟ 5 ϟ 5 ϟ 5 ϟ 5 \
Googolqoppa = (10^100) ϟ (10^100) ϟ ...... (10^100) ϟ (10^100) with 10^100 10^100's \
etc.

(The zigzag operator is left associative. If it was right associative, those last four numbers would be much smaller.)



