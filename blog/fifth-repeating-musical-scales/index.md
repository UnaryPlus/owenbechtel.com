---
layout: 'blog'
title: 'Fifth-repeating musical scales'
date: '24 Apr 2023'
mathjax: true
---

I was messing around with [Sevish](https://www.youtube.com/sevish)'s [Scale Workshop](https://sevish.com/scaleworkshop) the other day, when I discovered an interesting family of musical scales. These scales are just (consisting entirely of rational multiples of a single base frequency) and have the following properties:

1. They repeat at the fifth rather than the octave.
2. They contain four notes per fifth.
3. The fourth degree is a perfect fourth (4/3) above the tonic.
4. The third degree is either a major third (5/4) or a minor third (6/5) above the tonic.
5. The second degree is either a major third or a minor third below the fourth degree. (This implies, along with property 3, that the second degree is either 16/15 or 10/9 above the tonic.)

In such a scale, all of the thirds are a perfect ratio of 5/4 or 6/5, and all of the fifths are a perfect ratio of 3/2. So every note is the root of a just major or just minor triad, which is not possible in an octave-repeating scale. And there will always be a note exactly one octave above the tonic, since 4/3 * 3/2 = 2/1.

There are four scales satisfying properties 1&ndash;5, each with a different choice of ratios for the second and third degrees:

* [P-Ionian](https://sevish.com/scaleworkshop/?n=P-Ionian&l=aF9_5F4_4F3_3F2&version=2.0.1) (10/9, 5/4)
* [P-Dorian](https://sevish.com/scaleworkshop/?n=P-Dorian&l=aF9_6F5_4F3_3F2&version=2.0.1) (10/9, 6/5)
* [P-Harmonic](https://sevish.com/scaleworkshop/?n=P-Harmonic&l=gFf_5F4_4F3_3F2&version=2.0.1) (16/15, 5/4)
* [P-Phrygian](https://sevish.com/scaleworkshop/?n=P-Phrygian&l=gFf_6F5_4F3_3F2&version=2.0.1) (16/15, 6/5)

I have chosen to name these scales with a "P" followed by the name of the octave-repeating scale formed by the first 8 notes. For example, the first 8 notes of the P-Dorian scale form a just-intonation Dorian scale. (P-Harmonic is short for P-[Double Harmonic](https://en.wikipedia.org/wiki/Double_harmonic_scale).) These four scales can collectively be referred to as "P scales"

In the P-Dorian and P-Harmonic scales, only a quarter of the notes (the notes fifth-equivalent to the tonic) have an octave above them. In the P-Ionian and P-Phrygian scales, half the notes have an octave above them. These two scales contain each other as modes, so one can switch between them without changing the tuning.

Unfortunately, in none of the P scales does the tonic have an octave (or perfect fourth) _below_ it, as that would imply the existence of a note 9/8 above the tonic. This is the inspiration for a new family of scales, in which conditions 3 and 5 are replaced by the following:

* The second degree is at a ratio of 9/8 with the tonic.
* The fourth degree is either a major third or a minor third above the second degree (making it either 45/32 or 27/20 above the tonic).

There are four such scales, which I have decided to call "Q scales". (The letters P and Q were chosen arbitrarily.) Like the P scales, the Q scales have the property that every note is the root of a just-intonation triad. But instead of the tonic having a perfect fourth and an octave _above_ it, as in the P scales, the tonic has a perfect fourth and an octave _below_ it.

* [Q-Lydian](https://sevish.com/scaleworkshop/?n=Q-Lydian&l=9F8_5F4_19Fw_3F2&version=2.0.1) (45/32, 5/4)
* [Q-Ukrainian](https://sevish.com/scaleworkshop/?n=Q-Ukrainian&l=9F8_6F5_19Fw_3F2&version=2.0.1) (45/32, 6/5)
* [Q-Ionian](https://sevish.com/scaleworkshop/?n=Q-Ionian&l=9F8_5F4_rFk_3F2&version=2.0.1) (27/20, 5/4)
* [Q-Dorian](https://sevish.com/scaleworkshop/?n=Q-Dorian&l=9F8_6F5_rFk_3F2&version=2.0.1) (27/20, 6/5)

The latter two scales (Q-Ionian and Q-Dorian) have near-octaves above the tonic at a ratio of 81/40, or about 1221 cents; the first two lack anything close to an octave.

Each of the P scales has corresponding _inverse_ Q scale formed by inverting all of the notes' ratios relative to the tonic:

* P-Ionian ⟷ Q-Dorian
* P-Dorian ⟷ Q-Ionian
* P-Harmonic ⟷ Q-Ukrainian
* P-Phrygian ⟷ Q-Lydian

Moreover, each scale actually _contains_ its inverse as a mode. For example, Q-Lydian is the second mode of P-Phrygian. And since (as previously mentioned) P-Ionian and P-Phrygian are modes of each other, the four scales {P-Ionian, Q-Dorian, P-Phrygian, Q-Lydian} are all modes of each other. Thus the 8 scales defined in this article assemble into just 3 scale groups or "affine scales."

Two final remarks:

* One can replace 5-limit major and minor thirds with septimal supermajor (9/7) and subminor (7/6) thirds, resulting in "P7" and "Q7" scales corresponding to the 5-limit P and Q scales. (For example, [Q7-Dorian](https://sevish.com/scaleworkshop/?n=Q7-Dorian&l=9F8_7F6_lFg_3F2&version=2.0.1).) 

* You could also use 12edo thirds instead of just thirds, and have the scale repeat at the 12edo fifth instead of the perfect fifth. The resulting "P12" and "Q12" scales are subsets of 12edo, and thus playable on standard musical instruments like the piano.