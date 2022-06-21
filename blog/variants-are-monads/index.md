---
layout: 'blog'
title: 'Variants are monads'
date: '12 Nov 2021'
---

Recently I've been working on a statically typed, pure functional programming language called Lune. Lune's syntax is similar to ML-family languages such as OCaml and Haskell. But Lune does not have ML-style algebraic data types. Instead, it uses a form of row polymorphism based on these two papers:

* [Extensible records with scoped labels](https://www.microsoft.com/en-us/research/publication/extensible-records-with-scoped-labels/)
* [First-class labels for extensible rows](https://www.microsoft.com/en-us/research/publication/first-class-labels-for-extensible-rows/)

A _row_ is a list of label-type pairs. Rows are implemented in Lune with two type constructors: `nil :: Row`, and `(:=) :: Label -> Type -> Row`. The standard Prelude module also includes a type operator `(;)`, defined as `(;) f t = f t`. The labels in a row can be any identifier starting with a capital letter. Here are some examples:

* `nil`
* `X := float; nil`
* `X := float; Y := float; nil`
* `Name := string; Age := int; nil`
* `Name := string; Name := string; Age := int; nil`

As you can see in the last example, the labels in a row do not have to be unique. There are very few cases where duplicate labels are useful, but allowing duplicate labels greatly simplifies the type system. Rows also have a special unification rule that allows labels to be swapped. Thus `N := int; S := string; nil` is equivalent to `S := string; N := int; nil`.

Because rows have the kind `Row` rather than the kind `Type`, it is impossible to construct a value with a row as its type. There are two ways of transforming rows into normal types: by surrounding them in curly brackets, or by surrounding them in square brackets. Curly brackets are used to define _record_ types, and square brackets are used to define _variant_ types. In this post I will focus on the latter.

Variants represent a choice between multiple types, each with a different label attached to them. For example, suppose there is a function that returns an integer labeled with `Success` if it succeeds, or an error message labeled with `Error` if it fails. The return type of this function would be `[Success := int; Error := string; nil]`.

In Lune, labels are first-class values. This means they can be passed as arguments and returned from functions. The standard Prelude defines a type constructor `label :: Label -> Type`. The type of a term-level label `x` is `label x`. For example, `Name` has the type `label Name`. This is what makes labels so powerful; unlike strings, they can be differentiated at the type level.

There are three basic operations on variants: _injection_, _embedding_, and _deconstruction_. These are represented in Lune with the functions `(^)`, `embed`, and `match` respectively.

* The `(^)` operator has the type `any s a r. label s -> a -> [s := a; r]`. For example, `Success ^ 5` has the type `[Success := int; r]`, where `r` can be any row. Basically, what you are doing when you write `Success ^ 5` is labelling the value `5` with the label `Success`.

* The existence of variants allows for subtypes. For example, `[Message := string; nil]` is a subtype of `[Message := string; Number := int; nil]`. Every value of the type `[Message := string; nil]`, such as `Message ^ "hello"` and `Message ^ "abc"`, is also a value of the type `[Message := string; Number := int; nil]`. However, the Lune type system, like every other ML type system, does not implicitly coerce between values of different monotypes. This means that if you have a function `f` that returns a value of type `[Message := string; nil]`, and a function `g` that expects a value of type `[Message := string; Number := int; nil]`, you cannot legally compose `f` with `g`. This is where label embedding comes in. The standard Prelude defines a function called `embed` with the type `any s a r. label s -> [r] -> [s := a; r]`. This allows you to explicitly coerce a value of any variant type to any of its supertypes. Instead of writing `g (f x)`, which does not type-check, you can write `g (embed Number (f x))`.

* The `match` function allows you to extract a value from a label. It has the type `any s a b r. label s -> (a -> b) -> ([r] -> b) -> [s := a; r] -> b`. For example, suppose you want to convert a value of the type `[Success := int; Error := string; nil]` into an integer. If the value is `Success ^ x`, you want to return `x`, but if the value is an error, you want to return 0. Such a function can be defined with `match` by writing `match Success (do x. x) (do x. 0)`. (In Lune, anonymous functions are created with the `do` keyword.) The standard Prelude exports a function called `else`, which is defined as `else x y = x`. This allows you to make pattern-matching expressions more readable. For instance, the above function could be written `match Success (do x. x) (else 0)`. This is roughly equivalent to the Haskell expression `\case Success x -> x; _ -> 0`.

The promotion of labels to first class allows you to define functions that work on any variant type. This is an enormous improvement on other ML languages. For example, you can define a function called `case` that does the same thing as `match`, but ignores the value inside the label.

```
val case :: any s a b r. label s -> b -> ([r] -> b) -> [s := a; r] -> b
let case s x = match s (do y. x)
```

But this is only the tip of the iceberg. It turns out that `[s := a; r]` is a monad for any label `s` and any row `r`. And with first-class labels, it is possible to define a monadic operation that works on all variant types.

```
val map :: any s a b r. label s -> (a -> b) -> [s := a; r] -> [s := b; r]
let map s f = match s (do x. s ^ f x) (embed s)

val apply :: any s a b r. label s -> [s := (a -> b); r] -> [s := a; r] -> [s := b; r]
let apply s vf vx = vf # match s (do f. map s f vx) (embed s)

val bind :: any s a b r. label s -> (a -> [s := b; r]) -> [s := a; r] -> [s := b; r]
let bind s f = match s f (embed s)
```

These higher-order functions are equivalent to Haskell's `fmap`, `(<*>)`, and `(=<<)`, except that they each take a label as a parameter; the label to map the given function over. In Haskell terminology, I have defined a `Monad` instance for every single sum type at once. This is not remotely possible in any ML language. In my opinion, Lune's combination of row polymorphism and first-class labels almost makes up for its lack of typeclasses.
