import {assertEquals} from "@std/assert"
import { decode, encode } from "./codec.ts";

Deno.test(function simple() {
    const input = "The quick brown fox jumps over the lazy dog."

    const screams = encode(input)
    assertEquals(screams, "ĀA̰Á A̤ÄẢA̧Ạ ȦȂÅȀÂ A̮ÅA̽ A̓ÄǍA̯Ã ÅÀÁȂ ĀA̰Á ĂAA̸A̦ A̱ÅA̋.")

    const decoded = decode(screams)
    assertEquals(decoded, "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.")
})

Deno.test(function altText() {
    // TODO: Technically, the "title text".
    const altText = "AAAAAA A ÃA̧AȂA̦ ǍÅÂÃĀÁȂ AAAAAAA!"
    const decoded = decode(altText)
    assertEquals(decoded, "AAAAAA A SCARY MONSTER AAAAAAA!")
})