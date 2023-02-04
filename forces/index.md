---
layout: 'navbar'
title: 'Forces at Play'
---

<style>
  table {
    border-collapse: collapse;
  }

  td {
    padding-right: 50px;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
  }

  li p {
    margin: 8px 0;
  }
</style>

[Forces at Play](/games/forces-at-play) is a cellular automaton I created in 2022. (If you don't know what a cellular automaton is, you can think of it as a simple sandbox game where you build machines out of basic units called "cells".) The source code is available on [Github](https://github.com/UnaryPlus/forces-at-play).

Forces at Play was inspired by a game called [Cell Machine](https://samhogan.itch.io/cell-machine) by Sam Hogan. In Cell Machine, you only have a fixed number of cells to work with, and you must arrange them to accomplish a specific goal. However, Forces at Play is more open-ended; you can place as many cells as you want, and you can do whatever you want with them. I also added two types of cell that don't exist in Cell Machine: shifters and destroyers.

## Cell types

There are nine kinds of cell:

* Empty (white square)

* Pusher (blue square with arrow)\
  Moves in the direction of the arrow, pushing the cells in front of it, unless blocked by a wall or a board.

* Box (black square with white square inside it)\
  Doesn't do anything on its own, but can be moved by other cells.

* Wall (solid black square)\
  Cannot be moved by other cells.

* Board (black square with parallel lines)\
  Boards with horizontal lines can move horizontally but not vertically; boards with vertical lines can move vertically but not horizontally.

* Destroyer (red square with parallel lines)\
  Adjacent cells in the direction of the lines are safe; adjacent cells perpendicular to the lines are deleted.

* Shifter (purple square with arrow)\
  Similar to the pusher, but doesn't move itself, only the cells in front of it.

* Rotator (green square with arc)\
  Rotates the adjacent cells. There are two types of rotator: the one with a "C" rotates things counterclockwise, and the one with a "Ɔ" rotates things clockwise.

* Generator (yellow square with arrow)\
  Creates copies of the cell behind it.

## Controls

* Click: select cell
* Click and drag: select region
* Arrow keys: move selected region
* W: create wall
* E: create box
* F: create/edit board
* D: create/edit destroyer
* R: create/edit rotator
* Q: create/edit pusher
* S: create/edit shifter
* A: create/edit generator
* Backspace or tab: delete region
* Space: start/stop automaton
* Digits 1-5: change animation speed (1 is slowest, 5 is fastest)

## Copy and paste

You can copy and cut regions of the grid using ctrl-C and ctrl-X respectively.
Use ctrl-V to paste the copied pattern.

When you copy a pattern, a text representation of that pattern is saved to your
device's clipboard. This allows you to save and import patterns by converting
them into text and vice versa. For example, try pasting the following text
onto the canvas: `Pzerzfr`.

## Pattern catalogue

### Spaceships

A spaceship is a pattern that moves across the screen in a regular manner. Spaceships are classified by their speed, measured as a fraction of the "speed of light" (the speed at which pushers move, denoted by the letter c). For example, a spaceship that moves forward by two cells every five steps is said to have a speed of 2c/5.

Smallest known spaceship at each speed:

| c | P |
| 4c/5 | Perz |
| 3c/4 | Pzr |
| c/2 | Pz |
| 2c/5 | Pzerz |
| c/3 | PFrz |
| c/4 | Pzrf |
| c/5 | Pzerzfr |
| c/6 | PFrezeR;8PR |

Miscellaneous:

| steamboat | PFr |
| destroyer ship 1 | 2PzR;PzerGD |
| destroyer ship 2 | PfrR;PfrGD |
| growing spaceship | PzeG |
| shuttle ship | PFR;3PR |

### Stackers

A stacker is a pattern that uses a generator to create a box every N generations. The number N is called the "period" of the stacker.

Simplest known stacker at each period:

| p1 | eG |
| p2 | S;eG;;s |
| p3 | 2S;2eG;Z2z;1s |
| p4 | 2S;Z1eG;3z;1s |
| p5 | z;;r;eG;s |
| p6 | 1w;w;1rQ;2eG;2s;2w |
| p7 | 1r;;w;1rQ;2eG;2s;2w |
| p8, p10, p12, ... | 2r;;r;2rQ;3eG;3s;3w |
| p9, p11, p13, ... | 2z;;2r;;Z;2rQ;3eG;3s;3w |

(The period-8 stacker can be extended to any even period by moving the top two rotators upward. The period-9 stacker can be extended to any odd period by moving the shifter and the top rotator upward.)

### Guns

A gun is a pattern that creates a pusher every N generations. If the pushers always go in the same direction, the number N is called the "period". If the pushers alternate direction, the number N is called the "mod" or the "half-period". Guns that output more complex spaceships, rather than just pushers, can also be constructed.

Simplest known gun at each period:

| p1 | Pw;A;P |
| p2 | Pw;A;;w |
| p3 | 1S;2w;1Pzw;sA |
| p4 | 2Pw;wrAw |
| p5, p7, p9, ... | 2R;R;1P1Rw;1A |
| p6, p10, p12, ... | wR;2P1Rw;2A |
| p8 | R;P;A |

Simplest known alternating gun at each half-period:

| m1 | wZPp1zw;3A;3P |
| m2 | 1w;1r;wPw;1A;;1w |
| m3 | 1S3S;;1Z1p1f;rfRArzR;1swPws |
| m4, m6, m8, ... | 2S1S;;wr1P1Rw;3A |
| m5 | 2S1S;;r2P2R;2rAR;;2R1r |
| m7, m9, m11, ... | RDr;;rAR;1P;1A |

Miscellaneous:

| random gun | 2Pwp;wRAwArw |
| longship gun | R;P1ee;A1AA;;2ww |
| c/2 gun | R;P;A1w;2z;2aS;wZ;3zz;2s |
| steamboat gun | R3w;P1F1r;A1A1a;;2w1w |

### Rakes

A rake is a moving gun, or a spaceship that shoots pushers. Rakes which shoot backward are called "backrakes".

| c/2 rake | 1Pz;PAz;;PFz |
| c/2 backrake | 1Pz;PAz;P1PFr |
| c/4 rake | 5Pzrf;PzrfA |
| double barrel c/4 rake | 5Pzrf;PZrfA |
| c/4 backrake | 2Pfrez;PAFrez |
| c/4 side rake | 2Pfrez;PAeFrez |


### Other

| all-purpose reflector | 17w;17R;17Sr;Pfr3Pz3Pee4rw |
| boardship reflector | 6r;;PF;5sr1R;5R |
| destroyer turner | 1R;rGr;2d1s1s |
| strange puffer | Pfr;PA |
| self-destruct | P3D2d;5r |
| pusher-to-box converter | 5e1DD;5A;10d;4aw3A;P;6R |