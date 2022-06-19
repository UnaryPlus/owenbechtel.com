---
layout: 'navbar'
title: 'Unique'
---

Unique is an esoteric programming language where the same number cannot occur more than once. The source code for the interpreter is available on [Github](https://github.com/UnaryPlus/unique).

Comments begin with a `#` and are ignored by the interpreter. The rest of the program is split by whitespace, and the resulting strings are evaluated sequentially.

* If the string is an integer, that integer is pushed onto the stack.
* If the string is a `+`, `-`, or `*` character, the last two numbers are popped, the associated operation is performed (addition, subtraction, or multiplication), and the result is pushed onto the stack.
* If the string is a `[` or `]` character, it is ignored. These are included for the purpose of readability.

The evaluation step results in a stack of integers. In step 2 of the compilation process, this stack of integers is transformed into a list of commands, which is then executed. There are 45 commands, which operate on a stack of integer arrays:

* 1: Delete the last array on the stack (equivalent to Forth's `drop`).
* 2: Swap the last two arrays on the stack (equivalent to Forth's `swap`).
* 3: Bring the antepenultimate array to the end (`rot`).
* 4: Duplicate the last array (`dup`).
* 5: Pop the last two arrays, append them together, and push the result.
* 6: Pop the last array and push each of its elements onto the stack as an array of length 1.
* 7: Pop two arrays. The first array popped is converted into a list of commands, and these commands are executed if the second array contains no zeros. This is Unique's version of an `if` statement. (Remember that stacks are first-in-last-out, so the second array popped will appear first in the code.)
* 8: Pop three arrays. If the third array popped contains no zeros, execute the second array. Otherwise, execute the first array. This is Unique's version of an `if else` statement.
* 9: Pop an array and convert it into a list of commands. Pop another array and, if it contains no zeros, execute the commands. Repeat the previous step. This is Unique's version of a `while` statement.

The next 22 integers correspond to binary operations. These commands come in pairs. The even numbers perform an operation on every possible combination of elements from the two arrays. The odd numbers perform an operation on corresponding elements of the two arrays. For example, if the top two arrays on the stack are [3, 4, 5] and [9, 8, 7], the `14` command will pop these two arrays and push [27, 24, 21, 36, 32, 28, 45, 40, 35]. The `15` command will push [27, 32, 35]. (If you're familiar with Haskell, the even-numbered commands behave like `liftA2`, and the odd-numbered commands behave like `zipWith`.)

* 10 or 11: addition
* 12 or 13: subtraction
* 14 or 15: multiplication
* 16 or 17: integer division
* 18 or 19: modulo
* 20 or 21: exponentiation
* 22 or 23: boolean or
* 24 or 25: boolean and
* 26 or 27: less than
* 28 or 29: greater than
* 30 or 31: equal to

For non-commutative operations, the second value popped goes on the left-hand side. All predicates return either 0 or 1. The "and" and "or" operations treat 0 as false, and everything else as true.

* 32: Pop an array, and push it back onto the stack with every element negated.
* 33: Same as `32`, but with boolean not instead of negation. 0 becomes 1, and everything else becomes 0.
* 34: Pop an array, reverse it, and push it back onto the stack.
* 35: Pop an array and push its length as an array of length 1.
* 36: Pop an array and push the sum of its elements as an array of length 1.
* 37: Pop an array and push the product of its elements.
* 38: Pop an array. Push 1 if any element of the array is nonzero, push 0 otherwise.
* 39: Pop an array. Push 1 if all of its elements are nonzero, push 0 otherwise.
* 40: Get a single character as input and push the code of that character as an array of length 1.
* 41: Get a string as input and push an array containing the code of every character in the string.
* 42: Get a number as input and push it as an array of length 1.
* 43: Pop an array, convert its elements into characters and print them.
* 44: Pop an array and print each of its elements as a number, separated by newlines.

The last command, represented by the number `0`, is used to push an array of numbers. The number after the `0` (N) represents the length of the array, and the next N numbers are the values to push. These values are pushed sequentially onto the front of the array rather than the back before the array is pushed onto the stack. This behavior make sense in some contexts, but in other contexts it is counterintuitive and you may want to use the `34` command to reverse the array after it is pushed.

Example programs can be found on the Github repository.
