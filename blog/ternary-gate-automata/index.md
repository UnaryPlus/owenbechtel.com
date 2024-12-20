---
layout: 'blog'
title: 'Ternary gate automata'
date: '3 Jan 2024'
mathjax: true
---

<style>
  .image-row {
    display: flex;
    flex-direction: row;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  td {
    padding: 5px;
    border: 1px solid black;
  }

  .newcommands {
    display: none;
  }
</style>

<div class="newcommands">
  $$ 
  \newcommand{\Z}{\mathbb{Z}} 
  $$
</div>

In high school, I learned that if you draw lines on a sheet of graph paper according to a simple set of rules, it generates a Sierpinski triangle:

<img src="sierpinski.svg">

Specifically, the rules are:

* Start at the top, and add lines one row at a time.
* A single diagonal line splits into two diagonal lines in the next row.
* But when two lines collide, they "cancel" and don't create any lines in the next row.

I realized at the time that this process could be generalized to a large number of variants. In particular, I came up with the following rule, which includes vertical lines in addition to diagonal lines:

* A single vertical line splits into two diagonal lines.
* A single diagonal line splits into a vertical line along with a diagonal line in the opposite direction. 
* When two or three lines collide, they cancel.

This rule can be illustrated with the following diagram:

<svg viewBox="-0.1 -0.1 16.2 2.2" xmlns="http://www.w3.org/2000/svg">
<path d="M1 0 L1 1 L0 2 M1 1 L2 2 M3 0 L4 1 L3 2 M4 1 L4 2 M6 0 L5 1 L5 2 M5 1 L6 2 M7 0 L8 1 L9 0 M10 0 L11 1 L11 0 M12 0 L12 1 L13 0 M14 0 L15 1 L15 0 M15 1 L16 0" stroke="black" fill="transparent" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round" />
</svg>

The diagram shows what happens to each of the seven possible inputs. In this rule, all of the two- and three-line inputs cancel (produce no output), but one can imagine other rules in which that is not the case.

If you start with a single vertical line and repeatedly apply the rule above (in this case, for 100 rows or "generations"), you get the following image: 

<img src="pyramid.svg">

(You may notice that lines sometimes cross without cancelling. That's because the rule operates in discrete steps, so lines always go from one row to the next without affecting each other.)

The sides of this triangular pattern have slopes of 2, and repeat every 10 or 20 rows (depending on how much you count as the "side"). The center, meanwhile, appears to behave chaotically. Along the line of symmetry, there is a vertical gutter which (after the first few rows) contains only "V" shapes. These "V" shapes repeat at irregular intervals, occuring in chains in which several "V" shapes are each separated by just one row, with larger gaps in between these chains. The lengths of the chains are, from top to bottom, 1, 6, 1, 1, 1, 1, 1, 6, 7, 3, ... 

By generating 600 rows of the pattern instead of just 100, one finds that the next values in this sequence are 4, 9, 1, 1, 1, 1, 1, 4, 11, 6, 1, 5, 1, 7, 7, 3, 6, 1 (!), 2, 4, 5, 13, 5, 6, 1, 1, 1, 6, 1, 1, 6, 7, 1, 6, 1, 1, 5, 4, 1, 1, ... The exclamation point marks a location in which the central gutter briefly widens into a triangular bubble, something I had not expected. ([Here's](big-pyramid.svg) the 600-row version of the image, if you're curious. It's 36 times larger, so it may take some time to load.)

The following pattern is what generates the vertical chains of "V" shapes:

<img src="oscillator.svg">

Unlike the triangular pattern from before, this pattern doesn't grow as you go down, and instead repeats itself every 2 rows. If you're familiar with Game of Life terminology, this means it's a "period-2 oscillator."

As I suggested earlier, this rule is just one of a large class of rules which I call "ternary gate automata."

### Ternary gate automata

A _ternary gate automaton_ is like an [elementary cellular automaton](https://en.wikipedia.org/wiki/Elementary_cellular_automaton), except that information is not stored in the "cells" themselves, but in signals (drawn as lines) that go from one point to another. Every time-step (or "generation", represented visually as a row), each point can send a signal to one or more of its three neighbors, including itself. Which signals it sends out depends on which signals it receives, in a way that differs between rules. There are 2<sup>3</sup> = 8 inputs a point can receive, and 2<sup>3</sup> = 8 possible outputs:

<svg viewBox="-0.2 -0.1 15.3 3.0" xmlns="http://www.w3.org/2000/svg">
<g id="top">
  <path d="M1 0 L1 1 M2 0 L3 1 M4 1 L5 0 M6 0 L7 1 L8 0 M9 0 L10 1 L10 0 M11 0 L11 1 L12 0 M13 0 L14 1 L14 0 M14 1 L15 0" stroke="black" fill="transparent" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round" />
  <circle id="point" cx="0" cy="1" r="0.15" fill="limegreen" /> 
  <use href="#point" x="1" />
  <use href="#point" x="3" />
  <use href="#point" x="4" />
  <use href="#point" x="7" />
  <use href="#point" x="10" />
  <use href="#point" x="11" />
  <use href="#point" x="14" />
</g>
<use href="#top" transform="scale(1 -1)" transform-origin="0 1.4" />
</svg>

A ternary gate automaton is defined by a function from the set of input configurations to the set of output configurations. This means that there are 8<sup>8</sup> = 2<sup>24</sup> = 16,777,216 ternary gate automata in total. However, it is often useful to consider the subset of TGAs that map the empty input to the empty output. I call these "vacuum-preserving TGAs," and they are easier to simulate on a computer (or by hand) because finite patterns remain finite. There are 8<sup>7</sup> = 2<sup>21</sup> = 2,097,152 vacuum-preserving TGAs.

A TGA can be specified by a diagram showing what happens to each of the eight input configurations. However, it is often useful to have a more compact, text-based representation. The first step in creating such a representation is assigning each input and output configuration a digit:

<svg viewBox="-0.3 -0.1 14.9 3.6" xmlns="http://www.w3.org/2000/svg">
<g id="top2">
  <path d="M1 1 L2 0 M3 0 L3 1 M4 0 L4 1 L5 0 M6 0 L7 1 M7.5 0 L8.5 1 L9.5 0 M10.5 0 L11.5 1 L11.5 0 M12.5 0 L13.5 1 L13.5 0 M13.5 1 L14.5 0" stroke="black" fill="transparent" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round" />
</g>
<use href="#top2" transform="scale(1 -1)" transform-origin="0 1.7" />
<text x="0" y="1.7" text-anchor="middle" dominant-baseline="central" font-size="0.8" fill="royalblue">0</text>
<text x="1" y="1.7" text-anchor="middle" dominant-baseline="central" font-size="0.8" fill="royalblue">1</text>
<text x="3" y="1.7" text-anchor="middle" dominant-baseline="central" font-size="0.8" fill="royalblue">2</text>
<text x="4" y="1.7" text-anchor="middle" dominant-baseline="central" font-size="0.8" fill="royalblue">3</text>
<text x="7" y="1.7" text-anchor="middle" dominant-baseline="central" font-size="0.8" fill="royalblue">4</text>
<text x="8.5" y="1.7" text-anchor="middle" dominant-baseline="central" font-size="0.8" fill="royalblue">5</text>
<text x="11.5" y="1.7" text-anchor="middle" dominant-baseline="central" font-size="0.8" fill="royalblue">6</text>
<text x="13.5" y="1.7" text-anchor="middle" dominant-baseline="central" font-size="0.8" fill="royalblue">7</text>
</svg>

If you're familiar with binary, it should be clear why I chose the correspondence above. For example, 6, or 110 in binary, represents the configuration where the left and middle signals are on, and the right signal is off.

With this correspondence in mind, a TGA can now be specified by eight digits: the first digit is the output when the input is 0, the second digit is the output when the input is 1, and so on. I will call this the "rulestring" of the automaton. For example, the chaotic automaton from earlier has the rulestring 03506000. An automaton is vacuum-preserving if and only if its rulestring begins with the digit 0, so vacuum-preserving automata can be specified with just seven digits by dropping the leading zero.

### Counting TGAs up to equivalence

I said earlier that there are 2<sup>24</sup> ternary gate automata. While this is correct, certain TGAs are essentially equivalent. For example, the rules 5176002 and 3405072 are reflections of each other:

<img src="reflections.svg">

Although these are two different TGAs, they are related by a simple transformation. This raises the question: how many <i>essentially different</i> TGAs are there? To answer this, we must first define what it means for two automata to be equivalent.

There are four simple and reversible ways to transform a TGA into another TGA:

1. Do nothing.
2. Reflect across the vertical axis.
3. Replace "on" signals with "off" signals and vice versa.
4. Swap "on" signals with "off" signals _and_ reflect across the vertical axis.

Two automata are equivalent if one can be transformed into the other via one of these transformations. Since this set of transformations is closed under composition, we can use a very useful theorem from group theory known as [Burnside's lemma](https://en.wikipedia.org/wiki/Burnside's_lemma) to find the number of classes of equivalent automata.

Burnside's lemma states that this number is (n<sub>1</sub> + n<sub>2</sub> + n<sub>3</sub> + n<sub>4</sub>) / 4, where n<sub>i</sub> is the number of automata fixed by transformation i. Clearly, all 2<sup>24</sup> automata are fixed by transformation 1 (doing nothing). Moreover, 2<sup>14</sup> automata are fixed by transformation 2 (reflection), 2<sup>12</sup> automata are fixed by transformation 3 (signal inversion), and another 2<sup>12</sup> automata are fixed by transformation 4 (reflection and signal inversion). Thus the number of TGAs up to equivalence is (2<sup>24</sup> + 2<sup>14</sup> + 2<sup>12</sup> + 2<sup>12</sup>) / 4 = 2<sup>22</sup> + 2<sup>12</sup> + 2<sup>11</sup> = 4,200,448.
 
We can use the same method to calculate the number of vacuum-preserving TGAs up to equivalence, arriving at an answer of 2<sup>19</sup> + 2<sup>10</sup> + 2<sup>8</sup> = 525,568.

In summary:

| _Number of TGAs_ | Total | Up to equivalence | 
| All | 2<sup>24</sup> = 16,777,216 | 2<sup>22</sup> + 2<sup>12</sup> + 2<sup>11</sup> = 4,200,448 |
| Vacuum-preserving | 2<sup>21</sup> = 2,097,152 | 2<sup>19</sup> + 2<sup>10</sup> + 2<sup>8</sup> = 525,568 |

### Connection with cellular automata

[Elementary cellular automata](https://en.wikipedia.org/wiki/Elementary_cellular_automaton) are a well-known class of cellular automata. Like ternary gate automata, they are one-dimensional (or two-dimensional if you count time as a dimension). However, in an ECA, the information is stored in the points themselves rather than in signals passing between them. An equivalent framing is that the points _do_ send signals between them, but they must send the same signal to each of their neighbors. In other words, an ECA is a TGA where the only outputs are "0" and "7":

<svg viewBox="-3.2 -0.2 9.3 1.3" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1 L2 0 L2 1 M2 0 L3 1" stroke="black" fill="transparent" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round" />
<use href="#point" x="0" y="-1" />
<use href="#point" x="2" y="-1" />
</svg>

Conversely, ternary gate automata can be emulated by cellular automata, though not usually by _elementary_ cellular automata. One way to do this is to associate each output configuration with a block of three cells.

<svg viewBox="-0.225 -0.2 23.45 2.55" xmlns="http://www.w3.org/2000/svg">
<g transform="scale(1 -1)" transform-origin="0 0.5">
  <path d="M4 1 L5 0 M7 1 L7 0 M10 0 L10 1 L11 0 M13 1 L12 0 M15 0 L16 1 L17 0 M18 0 L19 1 L19 0 M21 0 L22 1 L22 0 M22 1 L23 0" stroke="black" fill="transparent" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round" />
  <use href="#point" x="1"/>
  <use href="#point" x="4" />
  <use href="#point" x="7" />
  <use href="#point" x="10" />
  <use href="#point" x="13" />
  <use href="#point" x="16" />
  <use href="#point" x="19" />
  <use href="#point" x="22" />
</g>
<rect id="white" x="-0.125" y="1.5" width="0.75" height="0.75" stroke="black" fill="white" stroke-width="0.05" />
<use href="#white" x="0.75" />
<use href="#white" x="1.5" />

<use href="#white" x="3" />
<use href="#white" x="3.75" />
<rect id="black" x="4.375" y="1.5" width="0.75" height="0.75" stroke="black" fill="black" stroke-width="0.05" />

<use href="#white" x="6" />
<use href="#black" x="2.25" />
<use href="#white" x="7.5" />

<use href="#white" x="9" />
<use href="#black" x="5.25" />
<use href="#black" x="6" />

<use href="#black" x="7.5" />
<use href="#white" x="12.75" />
<use href="#white" x="13.5" />

<use href="#black" x="10.5" />
<use href="#white" x="15.75" />
<use href="#black" x="12" />

<use href="#black" x="13.5" />
<use href="#black" x="14.25" />
<use href="#white" x="19.5" />

<use href="#black" x="16.5" />
<use href="#black" x="17.25" />
<use href="#black" x="18" />
</svg>

In a TGA, the output at a point in the next generation is determined by the "right" signal coming from the point to its left, the "down" signal coming from itself, and the "left" signal coming from the point to its right. So in the corresponding cellular automaton, the state of each cell in a block in the next generation is determined by

1. The rightmost cell of the block to its left,
2. The center cell of the block,
3. The leftmost cell of the block to its right.

In other words, if we number the cells such that the center cell of each block is a multiple of three, then the states of the cells 3n - 1, 3n, and 3n + 1 in the next generation are determined by the current states of the cells 3n - 2, 3n, and 3n + 2.

### General gate automata

The name "_ternary_ gate automata" is due to the fact that each point has three neighbors (points that it directly affects): itself, and the points to its left and right. In general, the points in a gate automaton can have more than three neighbors, and the automaton need not be one-dimensional. There can also be more than two signal types. (In a TGA, the only signal types are "off" and "on".) Gate automata are similar to cellular automata, the difference being that in a gate automaton, points can send a different signal to each of their neighbors, while in a cellular automaton, points must send the same signal to each of their neighbors.

Before laying out the general definition of "gate automaton," I will give a formal definition of "ternary gate automaton." A TGA is defined by a _local transition function_ $$f : B^3 \to B^3$$, where $$B$$ is the set $$\{0, 1\}$$ and 3 is the set $$\{-1, 0, 1\}$$, so that elements of $$B^3$$ correspond to input/output configurations in a natural way. The _global transition function_ $$f' : (B^3)^\Z \to (B^3)^\Z$$ is then defined in terms of the local transition function as $$f'(s)(n) = f(s(n - 1)(1), s(n)(0), s(n + 1)(-1))$$. In words, this says that "given the current global state $$s$$, represented as an integer-indexed sequence of output configurations, the output in the next generation at point $$n$$ is the result of applying the local transition function to the rightward signal coming from point $$n - 1$$, the downward signal coming from point $$n$$, and the leftward signal coming from point $$n + 1$$."

The formal definition of a general gate automaton is similar, but with more parameters. Explicitly, a gate automaton is specified by the following:

* A positive integer $$n$$, the dimension.
* A set $$S$$ of signal types.
* A finite subset $$U \subset \Z^n$$ of output signal directions.
* A local transition function $$f : S^{-U} \to S^U$$, where $$-U$$ is the set of input directions $$\{-u : u \in U\}$$.

The global transition function $$f' : (S^U)^{(\Z^n)} \to (S^U)^{(\Z^n)}$$ is then defined as $$f'(s)(p) = f(u \mapsto s(p + u)(-u))$$. It is kind of confusing to keep track of all of the sets and functions involved in this definition, but I promise it makes sense if you look at it for a while.

A ternary gate automaton is a gate automaton in which $$n = 1$$, $$S = B = \{0, 1\}$$, and $$U = 3 = \{-1, 0, 1\}$$.

### Computer program

I wrote a [computer program](https://github.com/UnaryPlus/gate-automata) for running ternary gate automata, which I used to generate some of the images in this article. The program is written in C, consists of just one file, and doesn't require any non-standard or OS-specific libraries, so you should be able to compile it easily on any computer. The way the image generation works is very simple: the program just creates an SVG file and adds text to it.

