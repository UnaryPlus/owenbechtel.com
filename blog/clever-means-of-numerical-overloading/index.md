---
layout: 'blog'
title: 'A clever means of numerical overloading'
date: '30 Oct 2021'
---

Statically typed programming languages almost always have more than one numerical data type. Java has six: `byte`, `short`, `int`, `long`, `float`, and `double`. Having more than one type of number is useful in many cases, because there are some operations which only work on integers (e.g. modulo), and some which only work on floating-point numbers (e.g. square root). But there are some operations, like addition and multiplication, which work on all types of numbers; adding two integers returns an integer, and adding two floats returns a float. Programming languages have many ways of getting around this problem.

* Most C-like languages support ad-hoc overloading. In these languages, you can simply define two versions of a function, one for integers and one for floats. The compiler will figure out which version to use based on the types of the arguments.
* Haskell has a more principled method of ad-hoc polymorphism called a _typeclass_. The Haskell standard library defines a typeclass called `Num` containing the addition and multiplication functions. This means that any type with an instance of the `Num` class can be added and multiplied. The type of the addition operation is `Num a => a -> a -> a`, which means "for any type `a` with a `Num` instance, take two values of type `a` and return a value of type `a`."
* Elm has a special type variable called `number` which can be instantiated as either `Int` or `Float`. In Elm, the addition operation has the type `number -> number -> number`. There is a key difference between this method and Haskell's typeclasses. In Haskell, typeclasses are extensible, so you can define addition to work on any type you want by providing a `Num` instance for that type. In Elm, addition only works on integers and floats.
* OCaml avoids the problem by having two separate operators: `+` for integers, and `+.` for floats.

About a month ago, I made a post called "The Lune Type System." It turns out the type system I described in that post is impossible to implement. The combination of arbitrary set unions and universal quantification makes type checking undecidable, because it is not always possible to test if two types are the same. With that in mind, I have completely redesigned the type system, and have spent the last few weeks implementing it for the Lune compiler.

Recently, I ran into the same problem described above: how should I implement addition, subtraction, and multiplication so that they work for both integers and floats? Even though I'm a huge fan of typeclasses, I don't want to add full support for typeclasses in Lune just yet. I also don't want to go the Elm route and add "restricted type variables." That solution seems a bit too arbitrary. And I certainly don't want to go the OCaml route. `+.` is ugly as hell.

Instead, I came up with a novel solution to the problem:

* Create a new kind called `Num`.
* Create two types of the kind `Num`, called `i` and `f`.
* Create a type called `num` of kind `Num -> Type`.
* Define `int` and `float` as type synonyms for `num i` and `num f` respectively.

Here's what this looks like in Lune:

```
type i :: Num
type f :: Num
type num :: Num -> Type
type int = num i
type float = num f

--modulo function (only works on ints)
val mod :: int -> int -> int
let mod = ...

--square root function (only works on floats)
val sqrt :: float -> float
let sqrt = ...

--addition function (works on any numbers)
val (+) :: any x. num x -> num x -> num x
let (+) = ...
```

The type annotation for the addition operator states that for any type `x` of the kind `Num`, the addition operator takes two values of type `num x` and returns a value of type `num x`. The only types of the form `num x` are `num i` and `num f`, also known as `int` and `float`. This means that the addition function works for both integers and floats, but nothing else.

It is also possible to define type functions which only work on numerical types. For example, a type synonym for complex numbers could be defined like so:

```
type complex x = (num x, num x)
```

Because `x` is passed as an argument to `num`, it must be of the kind `Num`. This means that the only valid complex number types are `complex f` and `complex i`.

In practice, this solution is similar to Elm's restricted type variables. But I think it's more elegant, because it utilises the already-in-place kind-checking system, and treats all type variables equally. The Lune method of overloading would seem out of place in other languages, because it requires adding a new kind. But Lune already has several different kinds, so adding one more isn't a big deal.
