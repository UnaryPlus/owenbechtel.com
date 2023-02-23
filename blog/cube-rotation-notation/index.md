---
layout: 'blog'
title: 'Cube rotation notation'
date: '22 Feb 2023'
mathjax: true
---

$$
\newcommand{\tri}[2]{
\binom{#1}{ \, #2 \, }
}
$$
Imagine a cube with six distinct faces, such as a Rubik's cube or a six-sided die. 

* An _orientation_ of the cube is a way of positioning the cube such that one side is on top, one side is on the left, one side is in front, and so on. There are 24 possible orientations. I will refer to the set of cube orientations as $$O$$.

* A _rotation_ of the cube is a way of rotating the cube such that if the cube is in one of the 24 orientations, it is still in one of the 24 orientations after applying the rotation. For example, rotating 90 degrees around the vertical axis is a valid cube rotation. The set of cube rotations, which I will denote $$R$$, forms a [group](https://en.wikipedia.org/wiki/Group_(mathematics)), if you know what that means.

* There is a natural action of $$R$$ on $$O$$. In other words, you can think of a cube rotation as a function that takes any orientation and returns another orientation. Moreover, $$O$$ is a [torsor](https://ncatlab.org/nlab/show/torsor) over $$R$$: given two orientations $$A$$ and $$B$$, there is exactly one cube rotation taking $$A$$ to $$B$$.

Choose an orientation of the cube (it doesn't matter which one you choose; all orientations are essentially the same). Call the top face in this orientation $$a$$, the left face $$b$$, and the front face $$c$$. For example, on a Rubik's cube, $$a$$ could be the white side, $$b$$ could be the red side, and $$c$$ could be the blue side. Define $$a^*$$, $$b^*$$, and $$c^*$$ to be the sides opposite from $$a$$, $$b$$, and $$c$$ respectively.

The current orientation of the cube&mdash;with $$a$$ on the top, $$b$$ on the left, and $$c$$ in front&mdash;will be denoted $$\tri{a}{b \;\; c}$$. Similarly, for any sides $$x$$, $$y$$, and $$z$$, $$\tri{x}{y \;\; z}$$ is the orientation where $$x$$ is on the top, $$y$$ is on the left, and $$z$$ is in front. 

But this is not always a valid orientation. For example, $$\tri{a}{a^* \; b}$$ is obviously invalid, because the sides $$a$$ and $$a^*$$ are not adjacent. Less obviously, $$\tri{b}{a^* \; c^*}$$ isn't a valid orientation either. It turns out that a symbol $$\tri{x}{y \;\; z}$$ corresponds to a valid orientation if and only if it has the following properties:

* The symbols $$a$$, $$b$$, and $$c$$ each appear once.
* If the symbol $$b$$ is counterclockwise from $$a$$, the symbol $$*$$ occurs an even number of times. If $$b$$ is clockwise from $$a$$, then $$*$$ occurs an odd number of times.

For example, $$\tri{a^*}{c^* \; b^*}$$ is a valid orientation because $$a$$, $$b$$, and $$c$$ each appear once, $$b$$ is clockwise from $$a$$, and there are an odd number of $$*$$s.

So we have a notation for describing cube orientations, but what about cube rotations?

Well, the group $$R$$ is generated by three basic rotations:

1. Rotating 90° clockwise when viewed from the top.
2. Rotating 90° clockwise when viewed from the left.
3. Rotating 90° clockwise when viewed from the front.

I will be fancy and refer to these rotations as $$\tau$$, $$\lambda$$, and $$\phi$$ respectively. The fact that $$R$$ is generated by $$\tau$$, $$\lambda$$, and $$\phi$$ means that every rotation of the cube is equal to some composition of $$\tau$$, $$\lambda$$, and $$\phi$$. For example, if you want to rotate the cube 120° counterclockwise when viewed from the top-right-front corner, you can perform $$\lambda$$ and then perform $$\phi$$ three times. (If you happen to be holding a cube right now, try to verify this yourself.) In group theory, this combination would normally be written as $$\phi^3 \lambda$$.

The three basic rotations can be defined explicitly as follows:

1. &nbsp; $$\tau\tri{x}{y \;\; z} = \tri{x}{z \;\; y^*}$$ 

2. &nbsp; $$\lambda\tri{x}{y \;\; z} = \tri{z^*}{y \;\; x}$$

3. &nbsp; $$\phi\tri{x}{y \;\; z} = \tri{y}{x^* \; z}$$

For example, $$\phi\tri{a^*}{c \;\; b} = \tri{c}{a^{**} \; b} = \tri{c}{a \;\; b}$$. In other words, if you start in the $$\tri{a^*}{c \;\; b}$$ orientation and then perform $$\phi$$, you will end up in the $$\tri{c}{a \;\; b}$$ orientation.

Suppose we have a definition $$r\tri{x}{y \;\; z} = \tri{u}{v \;\; w}$$, where $$u$$, $$v$$, and $$w$$ are each expressions made up of $$x$$, $$y$$, $$z$$, and $$*$$. Then $$r$$ is a valid rotation if and only if $$\tri{u}{v \;\; w}$$ satisfies the following properties:

* The symbols $$x$$, $$y$$, and $$z$$ each appear once.
* If the symbol $$y$$ is counterclockwise from $$x$$, the symbol $$*$$ occurs an even number of times. If $$y$$ is clockwise from $$x$$, then $$*$$ occurs an odd number of times.

In other words, $$\tri{u}{v \;\; w}$$ must be a valid orientation after substituting $$a$$ for $$x$$, $$b$$ for $$y$$, and $$c$$ for $$z$$.

That's basically the end of the article. However, I have two more observations to make:

* Since the octahedron is the [dual](https://en.wikipedia.org/wiki/Dual_polyhedron) of the cube, its rotation group is the same as that of the cube. So everything said in this article also applies to octrahedrons, if you replace "face" with "vertex." For example, instead of choosing three _faces_ of the cube to label $$a$$, $$b$$, and $$c$$, you choose three _vertices_ of the octahedron to label $$a$$, $$b$$, and $$c$$.

* If you expand $$R$$ to include _reflections_ of the cube as well as rotations, the number of possible transformations doubles, and the number of possible orientations also doubles. In this case, the _only_ requirement for $$\tri{x}{y \;\; z}$$ to be a valid orientation is that it must contain exactly one copy each of $$a$$, $$b$$, and $$c$$. The other requirement (i.e. the counterclockwise/clockwise even/odd thing) no longer matters. You also need to add another basic transformation, $$\rho$$, which takes $$\tri{x}{y \;\; z}$$ to $$\tri{x^*}{y^* \; z^*}$$.
