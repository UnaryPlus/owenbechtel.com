---
layout: 'navbar'
title: 'Multifunge'
---

## Multifunge

Multifunge is an esoteric programming language inspired by Asciidots and Befunge.
You can download the interpreter on [Github](https://github.com/UnaryPlus/multifunge).

`@` marks the starting location of an instruction pointer in the code. Instruction pointers
always start moving right, but can also move left, up, or down. Each instruction pointer
has a value, which starts at 0. When a pointer reaches a command character, the associated
command is executed.

* `x` deletes the pointer. (They are also deleted if they leave the boundaries of the program.)
* `;` ends the program by deleting all pointers.
* `^` causes the pointer to move up.
* `v` causes the pointer to move down.
* `<` causes the pointer to move left.
* `>` causes the pointer to move right.
* `/` and `\` duplicate the pointer. You can think of them as semi-transparent mirrors.
  One copy of the pointer keeps going forward, and the other copy "bounces off."
* `*` creates two new copies of the pointer moving perpendicular to the original.
* `+` increments the pointer's value.
* `-` decrements the pointer's value.
* `~` negates the pointer's value.
* `#` resets the pointer's value to 0.
* Any digit 0-9 multiplies the pointer's value by 10 and then adds the given digit.
  This basically just appends the digit to the end of the value.
* `!` prints the pointer's value.
* `?` waits for the user to enter a value, and then sets the pointer to that value.
* `"` prints every character until the next quote.
* `.` prints a newline.
* `c` puts the pointer in character mode. While in character mode, the `?` and `!` commands
  input and output single characters rather than integers, and the pointer's value
  is treated as an ascii code.
* `i` puts the pointer back in integer mode.
* Other characters are ignored by the interpreter.
