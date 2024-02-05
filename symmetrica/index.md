---
layout: 'symmetrica'
title: 'Symmetrica'
---

{% include viewer.html rle="6b3o51b3o$2o4bo47b2o4bo$2o8b2o42b2o8b2o$7bo4bo48bo4bo$8bo2bo50bo2bo$7bo3b2o48bo3b2o$8bo2bo50bo2bo$7bo4bo48bo4bo$10b2o52b2o$6bo26b3o24bo26b3o$6b3o24bo26b3o24bo$37b2o52b2o$34bo4bo48bo4bo$35bo2bo50bo2bo$34bo3b2o48bo3b2o$35bo2bo50bo2bo$34bo4bo48bo4bo$27b2o8b2o42b2o8b2o$27b2o4bo47b2o4bo$33b3o51b3o! [[ GPS 16 AUTOSTART THUMBZOOM 5.5 ]]" universe=":T108,0" %}

Symmetrica is a cellular automaton with two states. (The name "Symmetrica" comes from the word "symmetry" combined with "CA" for cellular automaton.) As in the [Game of Life](https://conwaylife.com/), the states are referred to as "alive" and "dead." Each generation, every cell changes state in accordance with the following rules:

1. If the cell is dead and has 2 or 3 live neighbors in a symmetrical configuration, it becomes alive.
2. If the cell is dead and has 4 live neighbors which are all orthogonal or all diagonal, it becomes alive.
3. If the cell is alive and has 2 or 3 live neighbors, it stays alive.
4. Otherwise, the cell will be dead in the next generation.

In [Hensel notation](https://conwaylife.com/wiki/Isotropic_non-totalistic_rule#Hensel_notation), these rules are abbreviated as "B2-ak3-jnqr4ce/S23."

In February 2022, I wrote a (now outdated) <a href="/blog/cellular-automaton-symmetrica/">article</a> with a list of patterns I had discovered the previous summer. Since then, I have investigated Symmetrica further with the help of [apgsearch](https://gitlab.com/apgoucher/apgmera/) and [ikpx2](https://gitlab.com/apgoucher/ikpx2/), the full results of which are available on [Catagolue](https://catagolue.hatsya.com/census/b2-ak3-jnqr4ces23). The list of known patterns is now much more extensive, and includes puffers, rakes, and large spaceships.

This website is a catalogue of named objects and their properties. You can click on any image to run it in LifeViewer.

* [Still lifes](still-lifes)
* [Oscillators](oscillators)
* [Spaceships](spaceships)
* [Puffers](puffers)
* [Rakes](rakes)
* [Other patterns](other-patterns)

If you are new to cellular automata and don't know what these terms mean, see [here](https://conwaylife.com/wiki/Glossary_of_basic_terms).

<!-- TODO: use Varangian guards instead of SBSs -->
<!-- TODO: add 32 down rake -->