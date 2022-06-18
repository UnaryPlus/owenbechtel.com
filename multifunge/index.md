---
layout: 'navbar'
title: 'Multifunge'
---

## Multifunge

Multifunge is an esoteric programming language inspired by Asciidots and Befunge. You can download the interpreter on [Github](https://github.com/UnaryPlus/multifunge).

`@` marks the starting location of an instruction pointer in the code. Instruction pointers always start moving right, but can also move left, up, or down. Each instruction pointer has a value, which starts at 0. When a pointer reaches a command character, the associated command is executed.

* `x` deletes the pointer. (They are also deleted if they leave the boundaries of the program.)
* `;` ends the program by deleting all pointers.
* `^` causes the pointer to move up.
* `v` causes the pointer to move down.
* `<` causes the pointer to move left.
* `>` causes the pointer to move right.
* `/` and `\` duplicate the pointer. You can think of them as semi-transparent mirrors. One copy of the pointer keeps going forward, and the other copy "bounces off."
* `*` creates two new copies of the pointer moving perpendicular to the original.
* `+` increments the pointer's value.
* `-` decrements the pointer's value.
* `~` negates the pointer's value.
* `#` resets the pointer's value to 0.
* Any digit 0-9 multiplies the pointer's value by 10 and then adds the given digit. This basically just appends the digit to the end of the value.
* `!` prints the pointer's value.
* `?` waits for the user to enter a value, and then sets the pointer to that value.
* `"` prints every character until the next quote.
* `.` prints a newline.
* `c` puts the pointer in character mode. While in character mode, the `?` and `!` commands input and output single characters rather than integers, and the pointer's value is treated as an ascii code.
* `i` puts the pointer back in integer mode.
* Other characters are ignored by the interpreter.

The example below prints 143 and then -5, with a newline in between. (To set a value to -5, you set it to 5 and then negate it.)

```
@143!.#5~!
```

The next example gets input from the user, adds 5, and then outputs it. The program also makes use of the arrow commands to change the pointer's direction.

```
@?++v
!+++<
```

To create a loop, you have to use the arrow commands to move the pointer in a circle. The following program prints "hello world" indefinitely.

```
>@"Hello "v
^."!dlrow"<
```

You can also have multiple instruction pointers moving at once. The program below prints the number 8 four times.

```
@8!
@8*!
  !
```

Since each pointer can only hold one value, the only way to do anything interesting is to have the pointers interact. To do this, you need to use binary operators. Binary operators are always surrounded in square brackets. When a pointer reaches a binary operator, it waits for another one to come from a different direction. Then the horizontal pointer's value is set to the result of the operation, and the vertical one is deleted.

* `[+]` adds the values.
* `[-]` subtracts the vertical value from the horizontal one.
* `[*]` multiplies the values.
* `[/]` divides the horizontal value by the vertical one. The result is truncated into an integer.
* `[%]` returns the remainder of dividing the horizontal value by the vertical one (modulo).
* `[^]` exponentiates the horizontal value by the vertical one.
* `[|]` returns 1 if either of the values isn't 0, returns 0 otherwise.
* `[&]` returns 1 if both of the values aren't 0, returns 0 otherwise.
* `[<]` returns 1 if the horizontal value is smaller, returns 0 otherwise.
* `[>]` returns 1 if the horizontal value is larger, returns 0 otherwise.
* `[=]` returns 1 if the values are equal, returns 0 otherwise.

There is also a control flow operator, written `[?]`. This operator checks if the vertical value is 0. If it is, nothing happens, and the horizonal value keeps moving in the same direction. Otherwise, the horizontal value turns and moves away from the direction the vertical value came from.

The following example checks if the input is zero. If it is, a single zero is printed. Otherwise, ones are printed indefinitely.

```
@?v
@[?]!
  1
  >!<
```

The next example takes two inputs and then outputs the sum and product.

```
@ ? \   v
@?v
  \[+]!.
  >    [*]!
```

The next example is a calculator program which takes three inputs: two integers and a character. If the final input is a '+', the two numbers are added. If the final input is a '-', the two numbers are subtracted. If it's a '*', they're multiplied, and if it's a '/', they're divided. The result is then printed.

```
@ c?\        \        \        v
@ ?     \        \        \        v
@43[=]v  @45[=]v  @42[=]v  @47[=]v
@?   [?]      [?]      [?]      [?]
      >[+].!.; >[-].!.; >[*].!.; >[/].!.;
```
