---
layout: 'blog'
title: 'The chopstick game'
date: '3 March 2023'
mathjax: true
---

Here's a game my friends were playing at dinner the other day:

* There are two players: A and B. Each player has a pair of chopsticks. There are three bowls: one in front of A, one in front of B, and one in the center. At the beginning of the game, the center bowl is filled with chickpeas (about 30 or so). Once the game starts, the two players use their chopsticks to place chickpeas in their bowl. Each player can take chickpeas either from the center bowl or from the other player's bowl. The game ends when there are no chickpeas left in the center bowl; the player with the most chickpeas in their bowl wins.

This article is a mathematical analysis of the chopstick game.

Suppose A can pick up $$a$$ chickpeas per second, and B can pick up $$b$$ chickpeas per second. Let $$p$$ be the proportion of A's chickpeas which come from B's bowl, and $$q$$ be the proportion of B's chickpeas which come from A's bowl. For example, if $$a = \frac{1}{2}$$ and $$p = \frac{1}{3}$$, then player A will pick up (on average) one chickpea every 2 seconds, and one-third of these will come from B's bowl, with the other two-thirds coming from the center bowl.

Note that $$a$$ and $$b$$ must both be positive real numbers, and $$p$$ and $$q$$ must both be in the interval $$[0, 1]$$. Also, $$p$$ and $$q$$ can't both be 1, because then the players would never take from the center bowl, and the game would go on forever.

The rate at which A gains chickpeas is $$a - qb$$, and the rate at which B gains chickpeas is $$b - pa$$. Therefore, player A will win if and only if $$b - pa < a - qb$$. Since $$p$$ is the only variable that A really has control over, it makes sense to solve this inequality for $$p$$.

* $$b - pa < a - qb$$&nbsp;
* $$- pa < a - qb - b$$&nbsp;
* $$pa > b + qb - a$$&nbsp;
* $$pa > (1 + q)b - a$$&nbsp;
* $$p > (1 + q)\frac{b}{a} - 1$$&nbsp;

From this condition, we can see that if $$\frac{b}{a} > 2$$, i.e. B is more than twice as fast as A, then it is impossible for A to win. Even in the best case scenario, where B doesn't take anything from A's bowl (so $$q = 0$$), the value of $$p$$ must be greater than 1 for A to win (which is impossible):

* $$q = 0$$&nbsp;
* $$1 + q = 1$$&nbsp;
* $$\frac{b}{a} > 2$$&nbsp;
* $$(1 + q)\frac{b}{a} > 2$$&nbsp;
* $$(1 + q)\frac{b}{a} - 1 > 1$$&nbsp;

Similarly, if $$\frac{b}{a} < \frac{1}{2}$$, then A will win no matter what. Even in the worst case scenario where $$q = 1$$, the threshold for $$p$$ is negative:

* $$q = 1$$&nbsp;
* $$1 + q = 2$$&nbsp;
* $$\frac{b}{a} < \frac{1}{2}$$&nbsp;
* $$(1 + q)\frac{b}{a} < 1$$&nbsp;
* $$(1 + q)\frac{b}{a} - 1 < 0$$&nbsp;

Conversely, if $$\frac{1}{2} < \frac{b}{a} < 2$$, then any outcome is possible, i.e. there are some values of $$(p, q)$$ where A wins, and other values of $$(p, q)$$ where B wins. In the edge case where $$\frac{b}{a}$$ is exactly 2, it is almost certain that B will win, but it is possible for the game to end in a tie, if $$p = 1$$ and $$q = 0$$. This is intuitively true: if B takes chickpeas at twice the rate that A does, but B takes only from the center bowl, whereas A takes only from B's bowl, then the game will end in a tie, because half of the chickpeas B takes will end up going to A. Symmetrically, in the case where $$\frac{b}{a} = \frac{1}{2}$$, it is almost certain that A will win, but a tie is still possible.

So we have the following table of outcomes:

| $$\frac{b}{a} < \frac{1}{2}$$&nbsp;&nbsp;&nbsp;&nbsp; | A always wins |
| $$\frac{b}{a} = \frac{1}{2}$$&nbsp;&nbsp;&nbsp;&nbsp; | A wins or tie |
| $$\frac{1}{2} < \frac{b}{a} < 2$$&nbsp;&nbsp;&nbsp;&nbsp; | any outcome possible |
| $$\frac{b}{a} = 2$$&nbsp;&nbsp;&nbsp;&nbsp; | B wins or tie |
| $$\frac{b}{a} > 2$$&nbsp;&nbsp;&nbsp;&nbsp; | B always wins |

However, if both players are acting rationally (i.e. choosing the best possible values for $$p$$ and $$q$$), then all that matters is which player is faster. In other words, if $$\frac{b}{a} < 1$$, then no matter what value $$q$$ is, there is some value of $$p$$ such that A will win.

Proof: Recall that player A wins if and only if $$p > (1 + q)\frac{b}{a} - 1$$. Suppose $$\frac{b}{a} < 1$$, i.e. B is slower than A. Since $$(1 + q) \in [1, 2]$$, the product $$(1 + q)\frac{b}{a}$$ is in the interval $$(0, 2)$$, and $$(1 + q)\frac{b}{a} - 1$$ is in the interval $$(-1, 1)$$. So there is some value of $$p$$ which is higher than the threshold but less than 1.

This fact is also intuitively obvious; if A is faster than B, then A can take chickpeas from B's bowl at a rate matching the rate at which B takes chickpeas from A's bowl, so that the transfer of chickpeas between A and B sums to zero. Then, since A is faster, A can take more chickpeas from the center bowl, and will therefore win.
