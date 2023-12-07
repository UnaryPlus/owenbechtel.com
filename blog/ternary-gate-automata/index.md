---
layout: 'blog'
title: 'Ternary gate automata'
date: 'XXX Dec 2023'
mathjax: true
---

<style>
  .image-row {
    display: flex;
    flex-direction: row;
  }
</style>

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
<path d="M1 0 L1 1 L0 2 M1 1 L2 2   M3 0 L4 1 L3 2 M4 1 L4 2   M6 0 L5 1 L5 2 M5 1 L6 2   M7 0 L8 1 L9 0   M10 0 L11 1 L11 0   M12 0 L12 1 L13 0   M14 0 L15 1 L15 0 M15 1 L16 0" stroke="black" fill="transparent" stroke-width="0.1" stroke-linecap="round" stroke-linejoin="round" />
</svg>

The diagram shows what happens to each of the seven possible inputs. In this rule, all of the two- and three-line inputs cancel (produce no output), but one can imagine other rules in which that is not the case.

If you start with a single vertical line and repeatedly apply the rule above (in this case, for 100 rows or "generations"), you get the following image: 

<img src="pyramid.svg">

(You may notice that lines sometimes cross without cancelling. That's because the rule operates in discrete steps, so lines always go from one row to the next without affecting each other.)

I first discovered this pattern by drawing it on graph paper in high school math class. I originally called it "the devil's pyramid," but I have since realized that names of the form "the devil's X" are embarrassingly overused, and I could not bear to create another such name. Perhaps you could call it "Bechtel's pyramid," after myself*, or "Barad-Dûr," after Sauron's tower in Mordor, since I think it looks rather ominous, especially if you watch it grow from the top downwards.

(*Unless it turns out that someone else has done all of this before, which is not unlikely.)

The sides of this triangular pattern have slopes of 2, and repeat every 10 or 20 rows (depending on how much you count as the "side"). The center, meanwhile, appears to behave chaotically. Along the line of symmetry, there is a vertical gutter which (after the first few rows) contains only "V" shapes. These "V" shapes repeat at irregular intervals, occuring in chains in which several "V" shapes are each separated by just one row, with larger gaps in between these chains. The lengths of the chains are, from top to bottom, 1, 6, 1, 1, 1, 1, 1, 6, 7, 3, ... 

By generating 600 rows of the pattern instead of just 100, one finds that the next values in this sequence are 4, 9, 1, 1, 1, 1, 1, 4, 11, 6, 1, 5, 1, 7, 7, 3, 6, 1 (!), 2, 4, 5, 13, 5, 6, 1, 1, 1, 6, 1, 1, 6, 7, 1, 6, 1, 1, 5, 4, 1, 1, ... The exclamation point marks a location in which the central gutter briefly widens into a triangular bubble, something I had not expected. ([Here's](big-pyramid.svg) the 600-row version of the image, if you're curious. It's 36 times larger, so it may take some time to load.)

The following pattern is what generates the vertical chains of "V" shapes:

<img src="oscillator.svg">

Unlike the triangular pattern from before, this pattern doesn't grow as you go down, and instead repeats itself every 2 rows. If you're familiar with Game of Life terminology, this means it's a "period-2 oscillator."

As I suggested earlier, this rule is just one of a large class of rules which I call "ternary gate automata."

### Ternary gate automata

A _ternary gate automaton_ is like an [elementary cellular automaton](https://en.wikipedia.org/wiki/Elementary_cellular_automaton), except that information is not stored in the "cells" themselves, but in signals (or lines) that go from one point to another. Every time-step (or "generation", represented visually as a row), each point can send a signal to one or more of its three neighbors, including itself. Which signals it sends out depends on which signals it receives, in a way that differs between rules. There are 2<sup>3</sup> = 8 inputs a point can receive, and 2<sup>3</sup> = 8 possible outputs:

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

A ternary gate automaton is defined by a function from the set of input configurations to the set of output configurations. This means that there are 8<sup>8</sup> = 2<sup>24</sup> = 16&thinsp;777&thinsp;216 ternary gate automata in total. However, it is often useful to consider the subset of TGAs that map the empty input to the empty output. I call these "vacuum-preserving TGAs," and they are easier to simulate on a computer (or by hand) because finite patterns remain finite. There are 8<sup>7</sup> = 2<sup>21</sup> = 2&thinsp;097&thinsp;152 vacuum-preserving TGAs.

A TGA can be specified by a diagram showing what happens to each of the eight input configurations. However, it is often useful to have a more compact, text-based representation. The first step in creating such a representation is assigning each input and output configuration to a digit:

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

With this correspondence in mind, a TGA can now be specified by eight digits: the first digit is the output when the input is 0, the second digit is the output when the input is 1, and so on. I will call this the "rulestring" of the automaton. For example, the "Barad Dûr" automaton from earlier has the rulestring 03506000. An automaton is vacuum-preserving if and only if its rulestring begins with the digit 0, so vacuum-preserving automata can be specified with just seven digits by dropping the leading zero.

I said earlier that there are 2<sup>24</sup> ternary gate automata. While this is correct, certain TGAs are essentially equivalent. For example, the rules 5176002 and 3405072 are reflections of each other:

<img src="reflections.svg">

Although these are two different TGAs, they are related by simple transformation. This raises the question, how many <i>essentially different</i> TGAs are there? To answer this question, we must first define what it means for two automata to be "essentially the same." 

There are four simple and reversible ways to transform a TGA into another TGA:

* Do nothing.
* Reflect across the horizontal axis.
* ...
* ...