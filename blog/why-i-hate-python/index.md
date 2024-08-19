---
layout: 'blog'
title: 'Why I hate Python and dynamic typing'
date: '9 Jul 2024'
---

I dislike Python more than the average programmer, for a variety of reasons. In this article, I list three such reasons in increasing order of importance.

1. The arguments to Python's conditional operator are in the wrong order. Instead of `if <condition> then <x> else <y>`, as in Haskell, or `<condition> ? <x> : <y>`, as in C, Python has `<x> if <condition> else <y>`. This is totally illogical, since it is the condition that is evaluated first, before determing whether `x` or `y` should be returned. The Python order results in harder-to-read code, and as a result, I use the conditional operator less in Python than in other languages.

2. Python uses indentation to delimit blocks of code, 

3. 

<!-- no block comments -->
<!-- definition function in loop/comprehension -->
<!-- map returns "map object" -->

Two summers ago, I had a job teaching Python to elementary- and middle-school kids. The kids spent much of their time playing Minecraft and Roblox instead of listening to my instructions, and although I tried my best, I doubt they learned very much of anything. There was only one kid who consistently listened to me. He had a very whiny voice and was constantly harassed by the kid sitting to next to him, a very cute younger kid (maybe 7 years old) with a high-pitched squeaky voice. The cute kid would constantly attempt to talk with the whiny kid, as well as touch him, try to sit in his seat, and so on, and the whiny kid would appeal to me to get the cute kid to stop. After my attempts at verbal persuasion failed, I had to (reluctantly) literally drag the cute kid away from the whiny kid and put him back in his seat. 

Anecdotes aside, I learned a number of things that summer.

* Kids should not be learning how to code. They shouldn    I am glad that the kids in my class put a greater priority on playing Minecraft and Roblox with the kids next to them than on following my instructions (most of which consisted of literally copying-and-pasting code from a website).
* Indentation-sensitivity makes Python a lot harder to teach beginners. I was constantly having to fix errors in the kids' programs, and _most_ of the time the solution was to add or remove a space somewhere, or to indent or de-indent a chunk of code that they had pasted in. If Python was not indentation-sensitive, the number of errors they got 

In my opinion, _newline_ sensitivity is OK; there's no reason to force the programmer to add a semicolon at the end of every line. Indentation sensitivity, however, is both unintuitive and hazardous. 

A minor issue is that Python's `if` operator takes the form of `<x> if <condition> else <y>` instead of `if <condition> then <x> else <y>` (as in Haskell) or `<condition> ? <x> : <y>` (as in C). The arguments are in the wrong order, which makes me hesitant to use what is in other languages a very nice operator. (`condition`, `x`, `y`) is by far the best ordering because it is the condition that is evaluated first, 

Another issue is Python's indentation-sensitivity. Two summers ago I had a job teaching kids how to code in Python.

However, the biggest issue is Python's ``dynamic typing'', i.e. total lack of type checking. Instead of getting an error message that tells me where and how I made a mistake, I get. 

People seem to have the impression that ``dynamically typed'' languages are easier and more beginner-friendly than languages with type checking. This is false. For one thing, you still have to learn just as many c

It seems to me that the only reason anyone supports dynamic typing 


