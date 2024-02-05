---
layout: 'symmetrica'
title: 'Symmetrica / Spaceships'
---

The most common spaceship is the [tugboat](#tugboat), followed by the [schooner](#schooner). There are many other natural and semi-natural spaceships, but all of them are rare. 

All (semi-)naturally occuring spaceships move at a speed of c/2 orthogonal. There is, however, a natural 5c/19 puffer&thinsp;&mdash;&thinsp;the [mason](/symmetrica/puffers/#mason)&thinsp;&mdash;&thinsp;which can be modified to produce a 5c/19 spaceship, the [slowpoke](#slowpoke). Moreover, several spaceships at non-standard speeds (including diagonal speeds) have been discovered with the help of the search program [ikpx2](https://gitlab.com/apgoucher/ikpx2). The diagonal speed limit for spaceships in Symmetrica is c/3 (see [hawk](#hawk) for an example), faster than that in the Game of Life.

In Symmetrica, one can unambiguously refer to spaceships as "ships," because the object known in the Game of Life as [ship](https://conwaylife.com/wiki/Ship) does not exist.

<!-- Order:
- c/2 non-Byzantine ships, ordered by period, then alphabetically
- c/2 Byzantine-based ships
- non-c/2 ships
-->

<!-- period 2 -->

### Tugboat

* Period-2 c/2 ship
* Smallest and most common ship

{% include viewer.html rle="3o$obo2$b3o! [[ GPS 8 ]]" %}

Tugboats can be stacked indefinitely as shown below. The resulting period-2 ships are known as "tugboat chains."

{% include viewer.html rle="2b3o7b3o7b3o7b3o$2bobo7bobo7bobo7bobo2$b3o7b3o7b3o7b3o2$b3o7b3o7b3o7b3o$bobo7bobo7bobo7bobo2$3o9b3o5b3o9b3o2$20b3o9b3o$20bobo9bobo2$19b3o9b3o! [[ GPS 8 ]]" %}

Tugboats can eat [blinkers](/symmetrica/oscillators/#blinker):

{% include viewer.html rle="5b3o3$3o$obo2$b3o! [[ GPS 8 ]]" %}

Here is a view of every head-on tugboat collision:

{% include viewer.html rle="34bo60bo60bo60bo60bo60bo$4bo29bo30bo29bo30bo29bo30bo29bo30bo29bo30bo29bo$4bo60bo60bo60bo60bo60bo$32bobo58bobo58bobo58bobo58bobo58bobo$2bobo27bobo28bobo27bobo28bobo27bobo28bobo27bobo28bobo27bobo28bobo27bobo$2bobo28bo29bobo28bo29bobo28bo29bobo28bo29bobo28bo29bobo28bo$3bo60bo60bo60bo60bo60bo7$2b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o$2bobo27bobo27bobo27bobo27bobo27bobo27bobo27bobo27bobo27bobo27bobo27bobo2$3b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o35$o29bo29bo29bo29bo30bo30bo30bo30bo30bo$o29bo29bo29bo29bo30bo30bo30bo30bo30bo2$obo27bobo27bobo27bobo27bobo28bobo28bobo28bobo28bobo28bobo$obo27bobo27bobo27bobo27bobo28bobo28bobo28bobo28bobo28bobo$bo29bo29bo29bo29bo30bo30bo30bo30bo30bo7$4b3o26b3o26b3o26b3o26b3o27b3o27b3o27b3o27b3o27b3o$4bobo26bobo26bobo26bobo26bobo27bobo27bobo27bobo27bobo27bobo2$5b3o26b3o26b3o26b3o26b3o27b3o27b3o27b3o27b3o27b3o36$33b3o87b3o58b3o58b3o58b3o58b3o$3b3o87b3o58b3o58b3o58b3o58b3o$32bobo87bobo58bobo58bobo58bobo58bobo$2bobo27b3o57bobo27b3o28bobo27b3o28bobo27b3o28bobo27b3o28bobo27b3o$2b3o87b3o58b3o58b3o58b3o58b3o7$2b3o27b3o56b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o$2bobo27bobo56bobo27bobo27bobo27bobo27bobo27bobo27bobo27bobo27bobo27bobo2$3b3o27b3o56b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o36$32b3o58b3o58b3o58b3o58b3o28b3o$2b3o58b3o58b3o58b3o58b3o$33bobo58bobo58bobo58bobo58bobo28bobo$3bobo27b3o28bobo27b3o28bobo27b3o28bobo27b3o28bobo27b3o28b3o$3b3o58b3o58b3o58b3o58b3o7$2b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o$2bobo27bobo27bobo27bobo27bobo27bobo27bobo27bobo27bobo27bobo27bobo2$3b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o27b3o36$32b3o57b3o57b3o57b3o57b3o$2b3o57b3o57b3o57b3o57b3o$33bobo57bobo57bobo57bobo57bobo$3bobo27b3o27bobo27b3o27bobo27b3o27bobo27b3o27bobo27b3o$3b3o57b3o57b3o57b3o57b3o7$7b3o27b3o26b3o27b3o26b3o27b3o26b3o27b3o26b3o27b3o$7bobo27bobo26bobo27bobo26bobo27bobo26bobo27bobo26bobo27bobo2$8b3o27b3o26b3o27b3o26b3o27b3o26b3o27b3o26b3o27b3o!" %}

### Schooner

* Period-2 c/2 ship
* 2nd most common ship

{% include viewer.html rle="3o$obo2$b3o2$b3o! [[ GPS 8 ]]" %}

The schooner can eat blinkers and flares, and can be eaten by a block.

{% include viewer.html rle="7bo11bo7b2o$6bo12bo7b2o$19bo4$3o9b3o9b3o$obo9bobo9bobo2$b3o9b3o9b3o2$b3o9b3o9b3o! [[ GPS 16 ]]" %}

Since the schooner looks similar to the tugboat, but with an additional "blinker," one might wonder whether further "blinkers" can be added, resulting in new spaceships. This is in fact possible, as long as the sides of the ship are stabilized with tugboats. How exactly the stabilization is done depends on the value of the number of "blinkers" modulo 4.

{% include viewer.html rle="6b2o6b2o14b2o6b2o$8bo7bo15bo7bo$3b2ob2o3b2ob2o11b2ob2o3b2ob2o2$4bobobobobobobo11bobobobobobobobo$4bobobobobobobob2o8bobobobobobobobob2o$bo2bobobobobobobo2bo8bobobobobobobobo2bo$18b2o24b2o$b2ob2o3b2ob2o13b2ob2o3b2ob2o$6bo7bo17bo7bo$4b2o6b2o16b2o6b2o7$4b2o6b2o18b2o6b2o$6bo7bo19bo7bo$b2ob2o3b2ob2o15b2ob2o3b2ob2o2$obobobobobobobobo9bobobobobobobobobobo$obobobobobobobobob2o6bobobobobobobobobobob2o$obobobobobobobobo2bo6bobobobobobobobobobo2bo$18b2o26b2o$b2ob2o3b2ob2o15b2ob2o3b2ob2o$6bo7bo19bo7bo$4b2o6b2o18b2o6b2o! [[ GPS 8 ]]" %}

Note: there are many, many period-2 ships in Symmetrica&thinsp;&mdash;&thinsp;far too many to list here. See this [Catagolue page](https://catagolue.hatsya.com/census/b2-ak3-jnqr4ces23/ikpx2_stdin/xq2) for more period-2 spaceships.

<!-- period 4 -->

### Cat

* Period-4 c/2 ship
* One phase contains a 32-cell polyomino

{% include viewer.html rle="4b3o2b3o$5bo4bo$b6o2b6o$bobo2b4o2bobo$5b2o2b2o$3o10b3o! [[ GPS 8 ]]" %}

The tugboats on either side can be replaced with schooners or tugboat chains.

{% include viewer.html rle="4b3o2b3o13b3o2b3o$5bo4bo15bo4bo$b6o2b6o7b6o2b6o$bobo2b4o2bobo7bobo2b4o2bobo$5b2o2b2o15b2o2b2o$3o10b3o5b3o10b3o2$3o10b3o5b3o10b3o$21bobo10bobo2$22b3o8b3o! [[ GPS 8 ]]" %}

### Cyclops 

* Period-4 tagalong for two tugboats or schooners
* Six variants are shown

{% include viewer.html rle="bo2bobo4bo8bobo13bobo$bo3bobo3bo9bobo13bobo$5bobo13bobo13bobo$bobo2bo2bobo7bo2bo2bo7b3o2bo2b3o$bobo5bobo7bo5bo$2bo7bo21bobo7bobo$17bobo5bobo4b3o7b3o$17bobo5bobo$18bo7bo6$5bobo13bobo13bobo$2bo3bobo3bo9bobo13bobo$2bo3bobo3bo9bobo13bobo$o3bo2bo2bo3bo3b3o2bo2b3o5b3o2bo2b3o$2bo9bo$18b3o5b3o5b3o5b3o$2bobo5bobo$2bobo5bobo4bobo7bobo5bobo3bobo$3bo7bo5b3o7b3o5b3o3b3o! [[ GPS 8 ]]" %}

### Goalpost

* Period-4 c/2 ship
* Powered by a [tango](/symmetrica/other-patterns/#tango)
* Back section has a period of 2, and resembles two tugboats fused together.

{% include viewer.html rle="o5bo$o5bo$3bo$o5bo$o5bo$b5o$3bo$3bo$2b3o! [[ GPS 8 ]]" %}

A variant of the goalpost replaces the "tugboats" in the back with "schooners":

{% include viewer.html rle="2bo5bo$2bo2bo2bo$o9bo$2bo5bo$5bo$2bo5bo$2bo5bo$3b5o$5bo$5bo$4b3o! [[ GPS 8 ]]" %}

The goalpost is extensible, and allows middle sections to be wider than their neighboring sections. (Compare the [overweight spaceship](https://conwaylife.com/wiki/Overweight_spaceship) from the Game of Life.)

{% include viewer.html rle="7b2ob2o2b2ob2o2b2ob2o$12bo6bo6bo$12bob2o3bob2o3bo2bo$9bo2bo6bo6b4o$12bob2o3bob2o3bo2bo$12bo6bo6bo$7b2ob2o2b2ob2o2b2ob2o6$14b2ob2o$19bo$7b2ob2o2b2o3bob2ob2o$12bo6bo6bo$2ob2o2b2o3bob2o3bob2o3bob2ob2o$5bo6bo6bo6bo6bo$5bob2o3bob2o3bob2o3bob2o3bo2bo$2bo2bo6bo6bo6bo6b4o$5bob2o3bob2o3bob2o3bob2o3bo2bo$5bo6bo6bo6bo6bo$2ob2o2b2o3bob2o3bob2o3bob2ob2o$12bo6bo6bo$7b2ob2o2b2o3bob2ob2o$19bo$14b2ob2o! [[ GPS 8 ]]" %}

The goalpost (and all of its variants) can be pulled by a tugboat instead of a tango, resulting in a period-2 spaceship.

{% include viewer.html rle="2ob2o$5bo$5bo$2bo2b3ob2o$5bo5bo$5bo3b2o$2ob2o! [[ GPS 8 ]]"%}

### Half-squid 

* Period-4 c/2 ship
* See also: [squid](#squid)

{% include viewer.html rle="5b3o$5bobo$b3obo$bobobo$5bo$3o2b2o$6bo! [[ GPS 8 ]]" %}

### Owl

* Period-4 tagalong for two tugboats or schooners
* Nine variants are shown

{% include viewer.html rle="2bo2bobo4bobo2bo7bobo4bobo10bobo4bobo10bobo4bobo$2bo3bobo2bobo3bo8bobo2bobo12bobo2bobo12bobo2bobo$6bobo2bobo12bobo2bobo12bobo2bobo12bobo2bobo$2bobo2bo4bo2bobo6bo2bo4bo2bo8bo2bo4bo2bo6b3o2bo4bo2b3o$2bobo10bobo6bo10bo8bo10bo$3bo12bo44bobo12bobo$22bobo10bobo6bobo6bobo5b3o12b3o$22bobo10bobo6bobo6bobo$23bo12bo8bo8bo7$5bobo4bobo10bobo4bobo10bobo4bobo10bobo4bobo10bobo4bobo$2bo3bobo2bobo3bo8bobo2bobo12bobo2bobo12bobo2bobo12bobo2bobo$2bo3bobo2bobo3bo8bobo2bobo12bobo2bobo12bobo2bobo12bobo2bobo$o3bo2bo4bo2bo3bo4bo2bo4bo2bo8bo2bo4bo2bo6b3o2bo4bo2b3o4b3o2bo4bo2b3o$2bo14bo6bo10bo8bo10bo$22bo3bo6bo3bo4bo3bo6bo3bo4b3o10b3o4b3o10b3o$2bobo10bobo6bo10bo8bo10bo$2bobo10bobo43bobo12bobo4bobo8bobo$3bo12bo5bobo10bobo6bobo6bobo5b3o12b3o4b3o8b3o$22bobo10bobo6bobo6bobo$23bo12bo8bo8bo! [[ GPS 8 ]]" %}

### Sea urchin

* Period-4 c/2 ship
* Powered by a tango

{% include viewer.html rle="3bo$2b3o3$ob3obo$2obob2o$ob3obo$3bo! [[ GPS 8 ]]" %}

Two sea urchins can combine to produce a period-80 puffer. This puffer is the basis for the [40 up rake](/symmetrica/rakes/#40-up-rake).

{% include viewer.html rle="4bo$3bobo8b3o$15bo$15bo$b2o3b2o$2ob3ob2o2b3obob3o$2o2bo2b2o5b3o$2ob3ob2obo9bo$b7o$3b3o4b3o5b2o2$15bo!" %}

### Squid

* Period 4 c/2 ship

{% include viewer.html rle="3o$obob3o$2bobobo$2bobo$2bobo$b2obo$bo2b2o$5bo! [[ GPS 8 ]]" %}

### Transformers

* Period 4 c/2 ship
* Front section appears to alternate between tugboats and schooners
* Two variants are shown

{% include viewer.html rle="3o6b3o7b3o2b3o$obo6bobo7bobo2bobo2$b3o4b3o7b3o4b3o2$b3o4b3o7b3o4b3o$4bo2bo13bo2bo$4bo2bo13bo2bo$3b2o2b2o11b2o2b2o! [[ GPS 8 ]]" %}

<!-- period 6 -->

### Trawler

* Period-6 tagalong for two tugboats

{% include viewer.html rle="3o5b3o$obo5bobo2$b3o3b3o2$5bo$5bo$5bo! [[ GPS 8 ]]" %}

<!-- period 8 -->

### Glidermaker

* Period-8 c/2 ship
* Named after the sparks it produces, which resemble the [glider](https://conwaylife.com/wiki/Glider) from the Game of Life

{% include viewer.html rle="b3o10b3o$bobob3o2b3obobo$5bobo2bobo$3o2bo6bo2b3o2$6bo4bo2$5bobo2bobo$6b2o2b2o! [[ GPS 8 ]]" %}

### Turbulence

* Period 8 c/2 ship

{% include viewer.html rle="bo6bo$3o4b3o3$3o4b3o$2o6b2o$2o6b2o$2obo2bob2o$b3o2b3o! [[ GPS 8 ]]" %}

Separating the two halves by an additional cell results in a period-196 puffer.

{% include viewer.html rle="bo7bo$3o5b3o3$3o5b3o$2o7b2o$2o7b2o$2obo3bob2o$b3o3b3o!" %}

<!-- period 16 -->

### Hexadecimal 1

* Period-16 tagalong for two tugboats

{% include viewer.html rle="10b2o$8bo2bo$8bob2o$b3o4bo$4b3o$o5bo$4b3o$b3o4bo$8bob2o$8bo2bo$10b2o! [[ GPS 16 ]]" %}

### Hexadecimal 2

* Period-16 tagalong for two tugboats

{% include viewer.html rle="o2b2ob2o$o7bo$obo3b2o2$2bo2bo$5b2o$2bo2bo2$obo3b2o$o7bo$o2b2ob2o! [[ GPS 16 ]]" %}

<!-- period-18 -->

### Moonshine

* Period-18 c/2 ship
* Produces tub sparks

{% include viewer.html rle="b3o8b3o$bobo8bobo2$3o10b3o2$3o10b3o$obob3o2b3obobo$obobobo2bobobobo$3obo6bob3o$3b2o6b2o3$6bo2bo$6bo2bo! [[ GPS 16 ]]" %}

<!-- period 26 -->

### Titan

* Period-26 c/2 ship
* 5th most common ship (after the tugboat, schooner, and two 2-tugboat chains)
* Emits one tub spark and two beehive sparks every 26 generations
* See also: [hyperion](/symmetrica/puffers/#hyperion)

{% include viewer.html rle="14bobo$13bo2bo$9b2o$9b2o$14bo3bo$18bo$9bo7b3o$bo2b2o2bobo8bo4bobobo$o3b2o5bo7b2o2b2obobob2o$bo2b2o2bobo8bo4bobobo2bo$9bo7b3o10b2o$18bo$14bo3bo$9b2o$9b2o$13bo2bo$14bobo!" %}

The smallest known predecessor of the titan has only 11 cells.

{% include viewer.html rle="o$4ob2o$o6bo$5b2o!" %}

Two titans can combine, resulting in a puffer that produces flares and blocks.

{% include viewer.html rle="8b3o16b3o$8bobo16bobo2$7b3o18b3o2$7b3o18b3o2$7b3o18b3o$8bo20bo3$8bo20bo$6b5o16b5o$4b3o3b3o12b3o3b3o$6bo3bo16bo3bo$2o13b2o4b2o13b2o2$o3bo7bo3bo4bo3bo7bo3bo$bo13bo6bo13bo2$8bo20bo$2b2o3bobo3b2o8b2o3bobo3b2o$2b2o2bo3bo2b2o8b2o2bo3bo2b2o$7bobo18bobo3$7b3o18b3o$7b3o18b3o3$7bobo18bobo$8bo20bo!" %}

<!-- byzantine-based -->

### Varangian guard

* Period-16 ship consisting of a [byzantine](/symmetrica/puffers/#byzantine) and a schooner
* Produces beehive sparks

{% include viewer.html rle="11bo$10b3o3$8bob3o$8b2obo$8bob2o3$9b2o$9b3o$3o5b3o$obo2$b3o$5bobo3bo$b3obo5bo$5bo4b2o2$7b2o$7b2o! [[ GPS 16 ]]" %}

The Varangian guard can eat blocks:

{% include viewer.html rle="11bo$10b3o$16b2o$16b2o$8bob3o$8b2obo$8bob2o3$9b2o$9b3o$3o5b3o$obo2$b3o$5bobo3bo$b3obo5bo$5bo4b2o2$7b2o$7b2o! "%}

### Symmetrical byzantine ship (SBS)

* Period-16 ship generated by two byzantines
* Tail half is invulnerable

{% include viewer.html rle="b3o11bo$2ob2ob2o5b2o2bo3b2o3bo$6b2o9bo3b2o7bo4b3o$16bo13b3o3bo$2ob2o19bo5b3o2bobo2bo$b3o7bo2b2o8b3o4bo3b3o2b2o$10bo6bo19bo2bo$11b2o4bo$16bobo$16bobo$11b2o4bo$10bo6bo19bo2bo$b3o7bo2b2o8b3o4bo3b3o2b2o$2ob2o19bo5b3o2bobo2bo$16bo13b3o3bo$6b2o9bo3b2o7bo4b3o$2ob2ob2o5b2o2bo3b2o3bo$b3o11bo! [[ GPS 16 ]]" %}

The SBS can eat blocks, carriers, steeples, and other small patterns. It was discovered before the Varangian guard, and as a result, many of my engineered patterns (such as the [rakes](/symmetrica/rakes/)) make use of SBSs for cleaning up debris instead of Varangian guards. At some point, I will change this in order to reduce the size of these patterns.

{% include viewer.html rle="52b2o$20b2o30bo2bo28b2o$20b2o32b2o28bo$5bo6bo24bo6bo24bo6bo9b2o$4b3o4b3o22b3o4b3o22b3o4b3o8b2o3$2bob3o4b3obo18bob3o4b3obo18bob3o4b3obo$2b2obo6bob2o18b2obo6bob2o18b2obo6bob2o$2bob2o6b2obo18bob2o6b2obo18bob2o6b2obo3$3b2o8b2o20b2o8b2o20b2o8b2o$3b3o6b3o20b3o6b3o20b3o6b3o$2b3o8b3o18b3o8b3o18b3o8b3o4$bo3bo6bo3bo16bo3bo6bo3bo16bo3bo6bo3bo$5bo6bo24bo6bo24bo6bo$4b2o6b2o22b2o6b2o22b2o6b2o2$b2o12b2o16b2o12b2o16b2o12b2o$b2o12b2o16b2o12b2o16b2o12b2o3$8b2o30b2o30b2o$b2o3b2o2b2o3b2o16b2o3b2o2b2o3b2o16b2o3b2o2b2o3b2o$3bo4b2o4bo20bo4b2o4bo20bo4b2o4bo$o4bo6bo4bo14bo4bo6bo4bo14bo4bo6bo4bo$bo3bo6bo3bo16bo3bo6bo3bo16bo3bo6bo3bo$bo14bo16bo14bo16bo14bo$7bo2bo28bo2bo28bo2bo$5bobo2bobo24bobo2bobo24bobo2bobo$6bo4bo26bo4bo26bo4bo3$b2o12b2o16b2o12b2o16b2o12b2o$b2o12b2o16b2o12b2o16b2o12b2o2$bo2bo8bo2bo16bo2bo8bo2bo16bo2bo8bo2bo$2o2b2o6b2o2b2o14b2o2b2o6b2o2b2o14b2o2b2o6b2o2b2o$o4bo6bo4bo14bo4bo6bo4bo14bo4bo6bo4bo$2o2b2o6b2o2b2o14b2o2b2o6b2o2b2o14b2o2b2o6b2o2b2o$bo2bo8bo2bo16bo2bo8bo2bo16bo2bo8bo2bo!" %}

The SBS can reflect a tugboat 180 degrees.

{% include viewer.html rle="b3o11bo$2ob2ob2o5b2o2bo3b2o3bo$6b2o9bo3b2o7bo4b3o$16bo13b3o3bo$2ob2o19bo5b3o2bobo2bo$b3o7bo2b2o8b3o4bo3b3o2b2o$10bo6bo19bo2bo$11b2o4bo$16bobo$16bobo$11b2o4bo$10bo6bo19bo2bo$b3o7bo2b2o8b3o4bo3b3o2b2o$2ob2o19bo5b3o2bobo2bo$16bo13b3o3bo$6b2o9bo3b2o7bo4b3o$2ob2ob2o5b2o2bo3b2o3bo$b3o11bo11$20b3o$20bobo2$21b3o!" %}

### Asymmetrical byzantine ship (ABS)

* Period-32 ship generated by two byzantines
* Tail half is invulnerable
* Produces accessible beehive sparks

{% include viewer.html rle="8b2o5b2o3bo$15b2o7bo4b3o$24b3o3bo$7bo10bo5b3o2bobo2bo$7bob2o7b3o4bo3b3o2b2o$8bo22bo2bo3$2bo7bo22bo2bo$bobo6bo9b3o4bo3b3o2b2o$2ob2o5bo9bo5b3o2bobo2bo$2ob2ob3o17b3o3bo$bobo13b2o7bo4b3o$2bo14b2o3bo!" %}

The ABS can eat blocks, carriers, steeples, and other small patterns.

{% include viewer.html rle="48b2o28b2o$48bo2bo26bo$50b2o28b2o$80b2o$17b2o$17b2o8$9bo29bo29bo$8b3o27b3o27b3o$4bo29bo29bo$3b3o27b3o27b3o$8b3obo25b3obo25b3obo$9bob2o26bob2o26bob2o$bob3o3b2obo18bob3o3b2obo18bob3o3b2obo$b2obo26b2obo26b2obo$bob2o26bob2o26bob2o$10b2o28b2o28b2o$9b3o27b3o27b3o$2b2o6b3o19b2o6b3o19b2o6b3o$2b3o27b3o27b3o$b3o27b3o27b3o2$9bo3bo25bo3bo25bo3bo$9bo29bo29bo$o3bo4b2o19bo3bo4b2o19bo3bo4b2o$4bo29bo29bo$3b2o7b2o19b2o7b2o19b2o7b2o$12b2o28b2o28b2o$2o28b2o28b2o$2o28b2o28b2o5$4bo3b3o23bo3b3o23bo3b3o$o3bo25bo3bo25bo3bo$o4bo5bo18bo4bo5bo18bo4bo5bo$3b2o6bo21b2o6bo21b2o6bo$11bo29bo29bo2$10b2o28b2o28b2o$9b4o26b4o26b4o$8bo4bo24bo4bo24bo4bo$9b4o26b4o26b4o$10b2o28b2o28b2o!" %}

Two puffers made of ABSs are shown below: a [nova](/symmetrica/oscillators/#nova) puffer (left) and a [feast](/symmetrica/still-lifes/#feast) puffer (right).

{% include viewer.html rle="8bo18bo30bo$7b3o16b3o28b3o16bo$3bo28bo20bo21b3o$2b3o26b3o18b3o26bo$7b3obo12bob3o28b3obo18b3o$8bob2o12b2obo30bob2o11bob3o$ob3o3b2obo12bob2o3b3obo14bob3o3b2obo11b2obo$2obo28bob2o14b2obo19bob2o3b3obo$ob2o28b2obo14bob2o27bob2o$9b2o14b2o32b2o20b2obo$8b3o14b3o30b3o13b2o$b2o6b3o12b3o6b2o16b2o6b3o12b3o$b3o28b3o16b3o19b3o6b2o$3o30b3o14b3o28b3o$82b3o!" %}

<!-- 5c/19 -->

### Slowpoke

* Period-19 5c/19 ship
* See also: [mason](/symmetrica/puffers/#mason)

{% include viewer.html rle="11b3o$5b2o4bo$b2o2b2o8b2o$o11bo4bo$o2bo9bo2bo$o11bo3b2o$b2o10bo2bo$12bo4bo$15b2o$11bo$11b3o! [[ GPS 16 ]]" %}

The slowpoke can eat blocks:

{% include viewer.html rle="11b3o$5b2o4bo$b2o2b2o8b2o$o11bo4bo$o2bo9bo2bo$o11bo3b2o$b2o10bo2bo$12bo4bo$15b2o$11bo$11b3o5$19b2o$19b2o!" %}

Two slowpokes can combine to produce a period-19 blinker puffer.

{% include viewer.html rle="3bobobo13bobobo$2bob3obo11bob3obo$2bo5bo11bo5bo2$o3bobo3bo7bo3bobo3bo$o2bobobo2bo7bo2bobobo2bo$2o7b2o7b2o7b2o5$b2o23b2o$b2o23b2o2$4bo19bo$2bo3bo15bo3bo$2bo3bo15bo3bo$3b3o17b3o!" %}

<!-- c/4 -->

### Trilobite 1

* Period-4 c/4 ship

{% include viewer.html rle="4bo10bo$4bo10bo$bo2bo10bo2bo$o2b2obo6bob2o2bo$bob2o2b2o2b2o2b2obo$o7bo2bo7bo$7o2b2o2b7o$3bo12bo$o18bo$2bo4bo4bo4bo$4bobo6bobo$6bo6bo$2bobo10bobo2$6b2o4b2o$3b2o2bo4bo2b2o$4b2o8b2o$4bo10bo2$6b3o2b3o$6bobo2bobo$9b2o$6bo6bo$7b2o2b2o! [[ GPS 8 ]]" %}

Tagalong:

{% include viewer.html rle="25bob2obo$27bobobo$4b2o15bo2bo2bo$6bo11bo7b2ob2o$5b2o9b3o2bobo3bob5o$4b3o10bo9bo$b2ob3o4bob2o4bo2b2o3bo2bo$5bo4bo3bo3b2o4bo4bo$2o8bo2b2o13b2o$obobo2b2o3bo14bo$obobo2b2o3bo14bo$2o8bo2b2o13b2o$5bo4bo3bo3b2o4bo4bo$b2ob3o4bob2o4bo2b2o3bo2bo$4b3o10bo9bo$5b2o9b3o2bobo3bob5o$6bo11bo7b2ob2o$4b2o15bo2bo2bo$27bobobo$25bob2obo! [[ GPS 8 ]]" %}

### Trilobite 2

* Period-4 c/4 ship

{% include viewer.html rle="4bo10bo$4bo10bo$bo2bo10bo2bo$o2b2obo6bob2o2bo$bob2o2b2o2b2o2b2obo$o7bo2bo7bo$7o2b2o2b7o$3bo12bo$o18bo$2bo4bo4bo4bo$4bobo6bobo$6bo6bo$7bob2obo$2b3o3b4o3b3o$5bo8bo$2bobo3b4o3bobo$9b2o$3bob3o4b3obo$bo16bo$5b3o4b3o$bobo3bo4bo3bobo$4bo10bo! [[ GPS 8 ]]" %}

Four tagalongs:

{% include viewer.html rle="4bo10bo20bo10bo20bo10bo20bo10bo$4bo10bo20bo10bo20bo10bo20bo10bo$bo2bo10bo2bo14bo2bo10bo2bo14bo2bo10bo2bo14bo2bo10bo2bo$o2b2obo6bob2o2bo12bo2b2obo6bob2o2bo12bo2b2obo6bob2o2bo12bo2b2obo6bob2o2bo$bob2o2b2o2b2o2b2obo14bob2o2b2o2b2o2b2obo14bob2o2b2o2b2o2b2obo14bob2o2b2o2b2o2b2obo$o7bo2bo7bo12bo7bo2bo7bo12bo7bo2bo7bo12bo7bo2bo7bo$7o2b2o2b7o12b7o2b2o2b7o12b7o2b2o2b7o12b7o2b2o2b7o$3bo12bo18bo12bo18bo12bo18bo12bo$o18bo12bo18bo12bo18bo12bo18bo$2bo4bo4bo4bo16bo4bo4bo4bo16bo4bo4bo4bo16bo4bo4bo4bo$4bobo6bobo20bobo6bobo20bobo6bobo20bobo6bobo$6bo6bo24bo6bo24bo6bo24bo6bo$7bob2obo26bob2obo26bob2obo26bob2obo$2b3o3b4o3b3o16b3o3b4o3b3o16b3o3b4o3b3o16b3o3b4o3b3o$5bo8bo22bo8bo22bo8bo22bo8bo$2bobo3b4o3bobo16bobo3b4o3bobo16bobo3b4o3bobo16bobo3b4o3bobo$9b2o30b2o30b2o30b2o$3bob3o4b3obo18bob3o4b3obo18bob3o4b3obo18bob3o4b3obo$bo16bo14bo16bo14bo16bo14bo16bo$5b3o4b3o22b3o4b3o22b3o4b3o22b3o4b3o$bobo3bo4bo3bobo14bobo3bo4bo3bobo14bobo3bo4bo3bobo14bobo3bo4bo3bobo$4bo10bo20bo10bo20bo10bo20bo10bo3$2bo14bo18bo10bo18bo14bo18bo10bo$3b2o10b2o20b2o6b2o20b2o10b2o20b2o6b2o$4bo10bo22bo6bo22bo10bo22bo6bo$2bo14bo18bo10bo18bo14bo18bo10bo$3bo12bo20bo8bo20bo12bo20bo8bo$2b2obob2o2b2obob2o18b2obob2obob2o18b2obob2o2b2obob2o18b2obob2obob2o$bo3bob2o2b2obo3bo16bo3bob2obo3bo16bo3bob2o2b2obo3bo16bo3bob2obo3bo$o2b4o6b4o2bo14bo2b4o2b4o2bo14bo2b4o6b4o2bo14bo2b4o2b4o2bo$o2bo4bo2bo4bo2bo14bo2bo8bo2bo14bo2bo4bo2bo4bo2bo14bo2bo8bo2bo$8bo2bo60bo2bo$68bo10bo22bo6bo$68bo10bo22bo6bo$66bo3bo6bo3bo18bo3bo2bo3bo$68bo10bo22bo6bo$68bo10bo22bo6bo! [[ GPS 8 ]]" %}

<!-- c/3 diagonal -->

### Hawk

* Period-3 c/3 diagonal ship
* Smallest known diagonal ship

{% include viewer.html rle="7b2o$3o3bobo$o5b4o$ob2o6b2o$4b2obobo$b2o4bo2bobo$obob2o4bo$3o$2bobo$3bob2o$3bo$5bo! [[ GPS 8 ]]" %}

The hawk can stretch a diagonal line of chips:

{% include viewer.html rle="7b2o$3o3bobo$o5b4o$ob2o6b2o$4b2obobo$b2o4bo2bobo$obob2o4bo3bo$3o10b2o$2bobo$3bob2o$3bo$5bo! [[ GPS 8 ]]"%}

The hawk supports many tagalongs, some of which can be found [here](https://catagolue.hatsya.com/census/b2-ak3-jnqr4ces23/ikpx2_stdin/xq3). For example, its wings can be extended indefinitely:

{% include viewer.html rle="7b2o7b2o7b2o$3o3bobo6bobo6bobo$o5b4o5b4o5b4o$ob2o6b2o2bo4b2o2bo4b2o$4b2obobo6bobo6bobo$b2o4bo2bobo3bo2bobo3bo2bobo$obob2o4bo8bo8bo$3o$2bobo$3bob2o$3bo$5bo2$3bo$b2o$obob2o$3o$2bobo$3bob2o$3bo$5bo2$3bo$b2o$obob2o$3o$2bobo$3bob2o$3bo$5bo! [[ GPS 8 ]]" %}

### Eagle

* Period-3 c/3 diagonal ship

{% include viewer.html rle="3o14b3o$o3bo3b3o2bo3bo$obo2bo2bo3bo4bob2o$3bo4bobo10bo$bo3b2o3bo2bobob2o$2bob2o2bo5bob2o$4b2o2bo8bo$6bo9bo$16bobo$18bobo$19bobo! [[ GPS 8 ]]" %}

### Thunderbird

* Period-15 Hawk tagalong
* Emits beehive sparks
* Useful for constructing c/3 diagonal technology

{% include viewer.html rle="12b2o$7b2o2bobo$3o3bobo2b4o$o5b4o$ob2o6b2o2bo$4b2obobo$b2o4bo2bobob2o2bo$obob2o4bo6b2o$3o10bo2bob4o$2bobo8bo4bo2bo$3bob2o11b2o$3bo$5bo! [[ GPS 16 ]]" %}

Three puffers made of thunderbirds:

{% include viewer.html rle="20b3o2b2o42b3o2b2o42b3o2b2o$20bo3bobo42bo3bobo42bo3bobo$20bobob4o41bobob4o41bobob4o$22bo5b2o41bo5b2o41bo5b2o$23bobobo44bobobo44bobobo$23bobo2bobo41bobo2bobo41bobo2bobo$20b2o6bo40b2o6bo40b2o6bo$19bobob2o43bobob2o43bobob2o$19b3o46b3o46b3o$21bobo46bobo46bobo$22bob2o45bob2o45bob2o$19b2obo45b2obo45b2obo$18bobo3bo42bobo3bo42bobo3bo$18b3o5b2o39b3o5b2o39b3o5b2o$20bobobo44bobobo34bo9bobobo$24bo48bo29bo3b2o13bo$26bo48bo20b2o4b2o2b2o16bo$25bo48bo20bobo3b2o7b2o11bo$12b2o10b5o44b5o17b4o6b2obo13b5o$7b2o2bobo12bobo29b3o14bobo22b2obo2bo3bo13bobo$3o3bobo2b4o11bo21bo4b3o2bo16bo21bobo5b3o16bo$o5b4o16b2o19b2o4bo4bob2o13b2o19b2o7bo2b3ob2o10b2o$ob2o6b2o2bo31b2o5bob2o5bo32b2o2bo16b2o$4b2obobo40bo6bo58b2o$b2o4bo2bobob2o2bo32bo4bo3bo37bob2o15bo$obob2o4bo6b2o28b3o7bo2bo3b2o32b3o$3o10bo2bob4o25bo12bo2bo3bo32bo54b3o2b2o$2bobo8bo4bo2bo25bobo17b2o86bo3bobo$3bob2o11b2o29bobo16bo86bobob4o$3bo46bobo12b2o90bo5b2o$5bo152bobobo$158bobo2bobo$155b2o6bo$154bobob2o$154b3o$156bobo$157bob2o$154b2obo$153bobo3bo$153b3o5b2o$155bobobo$159bo$161bo$160bo$159b5o$161bobo$161bo$161b2o!" %}

<!-- c/4 diagonal -->

### Bishop

* Period-4 c/4 diagonal ship
* First diagonal ship discovered
* Reappears as a mirror image halfway through its period

{% include viewer.html rle="6bo$4bo2bo2bo$3bo3b5o$2bo4bo2bo2bo$o2bo2b2obo2bo$o4bo2b3o2bo$o3bob2o$o8bo$bobob2o2b2o3bo$2o8bo2bo$obob2o2bo5bo$6bo2bo5bo$3obobob3o3b4o$2o3bobobo4bo3b3o2bo$4bo3b2o8b5o$7bo2bo8bo$11bo7bo3bobo$8b2o3bo7b2obo$11b2o8b2o$11b2o10bo2b2o$10b3o12b3o$26b3o2b2o$12bo2bo12b3obo$13b3o7bo2b3o4bob2o$12b2obo6b4obo4bo$13bob2o5bo4b2ob3obo$13b2o3b3o2bo3b2o4b3o$16b6obo9b3o$20bob3o7b3o$29bo$28b5obo$28bo3bobo$20b4o5bob2o3bo$20bo3b2o3bo4bo$20bo3b2o8bo$25bo2bob3o$21b2obo$22bobo! [[ GPS 8 ]]" %}

The bishop supports many tagalongs, some of which can be found [here](https://catagolue.hatsya.com/census/b2-ak3-jnqr4ces23/ikpx2_stdin/xq4). Below are two puffer tagalongs.

{% include viewer.html rle="6bo72bo$4bo2bo2bo66bo2bo2bo$3bo3b5o64bo3b5o$2bo4bo2bo2bo61bo4bo2bo2bo$o2bo2b2obo2bo60bo2bo2b2obo2bo$o4bo2b3o2bo59bo4bo2b3o2bo$o3bob2o65bo3bob2o$o8bo63bo8bo$bobob2o2b2o3bo59bobob2o2b2o3bo$2o8bo2bo59b2o8bo2bo$obob2o2bo5bo58bobob2o2bo5bo$6bo2bo5bo63bo2bo5bo$3obobob3o3b4o55b3obobob3o3b4o$2o3bobobo4bo3b3o2bo49b2o3bobobo4bo3b3o2bo$4bo3b2o8b5o54bo3b2o8b5o$7bo2bo8bo60bo2bo8bo$11bo7bo3bobo58bo7bo3bobo$8b2o3bo7b2obo56b2o3bo7b2obo$11b2o8b2o61b2o8b2o$11b2o10bo2b2o56b2o10bo2b2o$10b3o12b3o55b3o12b3o$26b3o2b2o66b3o2b2o$12bo2bo12b3obo52bo2bo12b3obo$13b3o7bo2b3o4bob2o49b3o7bo2b3o4bob2o$12b2obo6b4obo4bo52b2obo6b4obo4bo$13bob2o5bo4b2ob3obo51bob2o5bo4b2ob3obo$13b2o3b3o2bo3b2o4b3o50b2o3b3o2bo3b2o4b3o$16b6obo9b3o53b6obo9b3o$20bob3o7b3o58bob3o7b3o$29bo72bo$28b5obo66b5obo$28bo3bobo66bo3bobo$20b4o5bob2o3bo3b2o51b4o5bob2o3bo3b2o$20bo3b2o3bo4bo4b2o52bo3b2o3bo4bo4b2o$20bo3b2o11bo2b2o51bo3b2o11bo2b2o$25bo2bob3o4bo2bo5bo51bo2bob3o4bo2bo5bo$21b2obo9bo4bobo2b4o46b2obo9bo4bobo2b4o$22bobo10bobobobob4o2bo45bobo10bobobobob4o2bo$34b2o7bob3o59b2o7bob3o$37bo3bob2o2bo62bo3bob2o2bo$34b2o4b2o3b3o59b2o4b2o3b3o$31b2o3bo10b2ob2ob2o49b2o3bo10b2ob2ob2o$30b2o2b2obobo7b2obo52b2o2b2obobo7b2obo$31bob2o2bobo9b3obo50bob2o2bobo9b3obo$31b4o16bobo50b4o16bobo$33b3obo13b3o52b3obo13b3o$37bo72bo2$34b3obobo9b2obo53b3obobo9b2obo$34b5o11bob2o53b5o11bob2o$36b5o9bo2bo55b5o9bo2bo2bo$37b4o6b2ob3o57b4o6b2ob3o3bobo$40bob2o3bobob2o5bo54bob2o3bobob2o3bobo$43bo3bo2bo5b3o57bo3bo2bo8bob2o$39b4o2b2o11bo53b4o2b2o9b3o$40bo2b2o2b3o63bo2b2o2b3o6bo2b2o2bo$43b2o2b2o9b6o52b2o2b2o$50bo72bo6b2o2b2o$49b2ob3o67b2o$49bo2bob2o66b2o14b3o$127b2o8b5o$126b2o8bo$51b2ob2o70b2o9b4o$52b3o12bo59b2o7bo2bo$61b2o3bo69b2o7bo$59bo3bo82bo$58bo3b2o74bo$58bo76b3ob2o$57bobo80bo$136b3o$66bo2bo67bo$67b2o$67bo2b2o$69b2o6$79bobo$79bobo$79b2o$79b3o$79bobo$79bobo$82bob2o$82bobo$83b2o!" %}

<!-- c/6 diagonal -->

### Crayfish

* Period-6 c/6 diagonal ship
* No known tagalongs

{% include viewer.html rle="9b2o2$6b2o5bo$6b2obo3bo$8bob4o$11b3o$2b2o9b2o$2b2o9bo$4bo5b2obobo$o2bo7bobob2o$o3bo3bo4bob2o$4b2o2b2obo3b3o2bo$4b2o11bobo$2b9o4bo3bo$6bo10bo$8b4obob2o6b2o$9b3o3bo3bo2b2o$11b2obo4bo3bobo$23bobo$12b2o2b2o5bo$11bo8bobo2$16bo3bo$15b5o$15bo$17b2o! [[ GPS 8 ]]" %}

