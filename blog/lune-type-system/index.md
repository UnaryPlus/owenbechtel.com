---
layout: 'blog'
title: 'The Lune type system'
date: '8 Sep 2021'
---

At the moment, I’m working on a compiler for a purely functional language called Lune. The parser and code generator are finished, but the type checker is still incomplete. The type system I plan to implement in Lune is very different from that of other functional languages. Most notably, it allows for subtypes. As a result, every expression can be assigned multiple types, with some more general than others.

There are a few built-in types:

* `number` is the set of real numbers. In practice, these are stored as double-precision floating-point values.
* `int` is the set of integers. It is a subset of `number`.
* `string` is the set of strings. String literals are written with double quotes.
* `char` is the set of single-character strings. It is a subset of `string`.
* `atom` is the set of atoms. An atom is any word beginning with a capital letter, e.g. `Hello`. (All identifiers must start with a lowercase letter in Lune, so this doesn't create any ambiguity.) Atoms are not strictly necessary&mdash;you could use strings instead&mdash;but the use case for atoms is completely different from that of strings, so I think they deserve a separate type.
* There are an infinite number of "literal types" inhabited by a single value. For example, `3` is a set containing just the number three, `"owo"` is a set containing just the string `"owo"`, and `Null` is a set containing just the atom `Null`.
* `any` is the supertype of all types. Every expression can be given the type `any`.
* `void` is an uninhabited "bottom type". Since it contains no values, it is a subtype of all types.

There are also a few operators that act on types:

* `a -> b` is the type of a function with domain `a` and range `b`. For example, the `round` function would have the type `number -> int`.
* `a | b` denotes the union of sets `a` and `b`.
* `a, b` denotes the set of ordered pairs of elements of `a` and elements of `b`.

Universal quantification is denoted with square brackets. For example, the type of the identity function is `[a] a -> a`. (You could also annotate it as `any -> any`, but in that case, you'd hardly be able to do anything with the returned value, because its type would be way too general.) I'm probably going to disallow higher-ranked types for the sake of simplicity.

Type synonyms are created with the `type` keyword. For example, `type bit = 0 | 1` assigns the synonym `bit` to the set with two elements: 0 and 1. You can also use the `type` keyword to create type-level functions which take sets as arguments. For example, a `maybe` type could be defined as `type maybe a = Null | Just, a`. This means that a value of type `maybe int` can be either the atom `Null` or the atom `Just` combined with an integer. Type synonyms can also be recursive, allowing you to define things such as linked lists and Peano-style natural numbers.

As I said earlier, the existence of subtypes implies that many values can be assigned more than one type. In fact, every value has an infinite number of types associated with it. For example, the string `"x"` is a member of the following sets:

* `"x"`
* `char`
* `string`
* `any`
* `"x" | a`
* `char | a`
* `string | a`

where `a` can be any type.

I haven't figured out all the details of the type-checking algorithm yet. Type inference is going to be a major issue, because every function can have a wide variety of possible types. I'm going to have to create an algorithm which infers the "most reasonable" type for every function, but what exactly is the definition of "most reasonable"? I'll post the solution here once I figure it all out.
