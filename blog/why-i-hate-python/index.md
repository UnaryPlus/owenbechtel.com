---
layout: 'blog'
title: 'Why I hate Python and dynamic typing'
date: '14 Oct 2024'
---

1. The arguments to Python's conditional operator are in the wrong order. Instead of `if <condition> then <x> else <y>`, as in Haskell, or `<condition> ? <x> : <y>`, as in C, Python has `<x> if <condition> else <y>`. This is totally illogical, since it is the condition that is evaluated first, before determing whether `x` or `y` should be returned. The Python order results in harder-to-read code, and as a result, I use the conditional operator less in Python than in other languages.

2. Python uses indentation to delimit blocks of code, which can be hazardous. For example, these two code blocks differ only in indentation, but have very different behaviors:
```python
# 1
if condition:
  statement1
  statement2
  
# 2
if condition:
  statement1
statement2
```
It is easy to imagine that one of these s

3. 

4. The `map` function returns a "map object" 


<!-- no block comments [don't care about this one much anymore] -->
<!-- defining function in loop/comprehension does weird things -->
<!-- map returns "map object" -->
<!-- can't spread expression over multiple lines w/o parens -->

<!-- remove anecdote below -->

In my opinion, _newline_ sensitivity is OK; there's no reason to force the programmer to add a semicolon at the end of every line. Indentation sensitivity, however, is both unintuitive and hazardous. 

A minor issue is that Python's `if` operator takes the form of `<x> if <condition> else <y>` instead of `if <condition> then <x> else <y>` (as in Haskell) or `<condition> ? <x> : <y>` (as in C). The arguments are in the wrong order, which makes me hesitant to use what is in other languages a very nice operator. (`condition`, `x`, `y`) is by far the best ordering because it is the condition that is evaluated first, 

Another issue is Python's indentation-sensitivity. Two summers ago I had a job teaching kids how to code in Python.

However, the biggest issue is Python's ``dynamic typing'', i.e. total lack of type checking. Instead of getting an error message that tells me where and how I made a mistake, I get. 

People seem to have the impression that ``dynamically typed'' languages are easier and more beginner-friendly than languages with type checking. This is false. For one thing, you still have to learn just as many c

It seems to me that the only reason anyone supports dynamic typing 


