---
layout: 'blog'
title: 'The pyramid hotel'
date: '15 Apr 2023'
mathjax: true
---

Last Tuesday, I participated in a math competition at my university. There were five problems, and we were given two hours to solve them. I managed to solve the first three, but didn't have enough time left over to make any progress on question 4. I am neither proud of nor disappointed in my performance. 

This article concerns question 3, which, of the three questions I solved, was the most interesting. The problem, along with my solution, is stated below.

### The problem

There is a very tall pyramid-shaped hotel, such that the number of rooms on the _n_-th floor from the top is the _n_-th [triangular number](https://en.wikipedia.org/wiki/Triangular_number). (The top floor has 1 room, the second floor from the top has 3 rooms, the third floor from the top has 6 rooms, and so on.) The rooms in the top three floors are all occupied, while the other rooms are empty. The hotel managers, for whatever reason, want the top three floors to be vacant, so they decide to allow anyone staying in the hotel to exchange _one_ room for _two_ vacant rooms on the floor below.

Will this plan work? Is there any way to vacate the top three floors by repeatedly exchanging rooms in the allowed manner?

### The solution

_Before reading this section, try solving the problem yourself._

<details markdown="1">
  <summary>Expand solution</summary>

The key is to work not from the bottom up, but from the top down. 

Number the floors 1, 2, 3, 4, etc. starting from the top. To vacate the top three floors, the room on floor 1 will eventually need to be exchanged for 8 rooms on floor 4, the 3 rooms on floor 2 will eventually need to be exchanged for 12 rooms on floor 4, and the 6 rooms on floor 3 will eventually need to be exchanged for 12 rooms on floor 4. This makes a total of 32 rooms that will have to be acquired on floor 4. As 32 is more than the total number of rooms on floor 4 (namely 10), at some point 22 rooms on floor 4 will need to be traded for 44 rooms on floor 5. This is more than the total number of rooms on floor 5 (namely 15), so 29 of these will need to be traded for 58 rooms on floor 6. And so on.

Denote the number of rooms on floor _n_ by T<sub>n</sub>. This sequence, starting at term 4, can be defined by T<sub>4</sub> = 10 and T<sub>n+1</sub> = T<sub>n</sub> + n + 1. Denote the number of rooms that must be acquired on floor _n_ by S<sub>n</sub>. This sequence is defined by S<sub>4</sub> = 32 and S<sub>n+1</sub> = 2(S<sub>n</sub> - T<sub>n</sub>). The first few terms of S, starting at 4, are 32, 44, 58, 74, and 92. Taking the differences between successive terms gives 12, 14, 16, and 18. It looks like the differences are increasing at a constant rate of 2. Specifically, it looks as if S<sub>n+1</sub> - S<sub>n</sub> = 2(n + 2).

One can prove by [induction](https://en.wikipedia.org/wiki/Mathematical_induction) that this equation does indeed hold for all n ≥ 4. Let P(n) be the proposition that S<sub>n+1</sub> - S<sub>n</sub> = 2(n + 2), and suppose that P(n) is true for some number n. Then

| $$ S_{n+2} - S_{n+1}                      $$ | &nbsp;&nbsp; |                                         |
| $$ = 2(S_{n+1} - T_{n+1}) - 2(S_n - T_n)  $$ | &nbsp;&nbsp; | (definition of S)                       |
| $$ = 2((S_{n+1} - S_n) - (T_{n+1} - T_n)) $$ | &nbsp;&nbsp; | (reordering terms)                      |
| $$ = 2(2(n + 2) - (n + 1))                $$ | &nbsp;&nbsp; | (inductive hypothesis, definition of T) |
| $$ = 2(2n + 4 - n - 1)                    $$ | &nbsp;&nbsp; |                                         |
| $$ = 2(n + 3)                             $$ | &nbsp;&nbsp; |                                         |

so P(n + 1) is also true.

The difference between successive terms of T is n + 1, and (as I have just shown) the difference between successive terms of S is 2(n + 2). Since the latter is greater than the former, the number of rooms _required_ on floor _n_ is always greater than the number of rooms _available_ on floor _n_. So it will always be necessary to trade some of these rooms for rooms on floor n + 1, and the process will continue forever.

It is not possible to vacate the top three floors.

</details>









