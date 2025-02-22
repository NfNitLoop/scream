/**
 * Exports just the encode/decode functionality for the [scream cipher][1].
 * 
 * [1]: https://xkcd.com/3054/
 * 
 * @module
 */

/**
 * ÁÂA̧ÅA̱Á ǍÄÂA̱AÂÁ ÁÀÁȂA̦A̱AA̦ ÃA̯ÁÁA̧A̰ ẢÂĀÅ ÃÅǍÁĀA̰ẢÂA̋ ǍÅȂÁ AA̯A̯ȂÅA̯ȂẢAĀÁ A̮ÅȂ ĀA̰Á ĀẢǍÁÃ.
 */
export function encode(text: string): ÃA̧ȂÁAǍÃ {
    let out = ""
    for (const letter of text) {
        const scream = encodeTable[letter.toUpperCase()]
        out += scream ? scream : letter
    }
    return out
}

/**
 * AĀĀÁǍA̯Ā ĀÅ ǍAẠÁ ÃÁÂÃÁ ÅA̮ ĀA̰Á ǍAA̱ÂÁÃÃ
 */
export function decode(screams: ÃA̧ȂÁAǍÃ): string {
    let out = ""
    for (const scream of graphemes(screams.normalize())) {
        const letter = decodeTable[scream]
        out += letter ? letter : scream;
    }
    return out
}

// Could use a general-purpose graphmeme iterator, but, ĀA̰ẢÃ ẢÃ A̮ẢÂÁ:
function * graphemes(screams: ÃA̧ȂÁAǍÃ) {
    let tmp = ""
    for (const codepoint of screams) {
        if (codepoint == "A") {
            if (tmp.length > 0) {
                yield tmp
                tmp = ""
            }
            tmp = codepoint
            continue
        }
        
        if (codepoint in decodeTable) {
            // This is a standalone character:
            if (tmp.length > 0) {
                yield tmp
                tmp = ""
            }
            yield codepoint
            continue
        }


        // Max size of our characters is 2: A + a combining diacritical.
        yield tmp + codepoint
        tmp = ""
    }

    if (tmp.length > 0) { yield tmp }
}

/**
 * ȀÅÂ'Ā ÃÅǍÁÅÂÁ A̱Å ÃÅǍÁĀA̰ẢÂA̋ ĀÅ ÃĀÅA̯ AĂĂ ÅA̮ ĀA̰ẢÃ?
 */
export type ÃA̧ȂÁAǍÃ = string

const encodeTable: Record<string, ÃA̧ȂÁAǍÃ> = {
    A: "A",
    B: "Ȧ",
    C: "A̧",
    D: "A̱",
    E: "Á",
    F: "A̮",
    G: "A̋",
    H: "A̰",
    I: "Ả", 
    J: "A̓",
    K: "Ạ",
    L: "Ă",
    M: "Ǎ",
    N: "Â",
    O: "Å",
    P: "A̯",
    Q: "A̤",
    R: "Ȃ",
    S: "Ã",
    T: "Ā",
    U: "Ä",
    V: "À",
    W: "Ȁ",
    X: "A̽",
    Y: "A̦",
    Z: "A̸",
}

const decodeTable: Record<ÃA̧ȂÁAǍÃ, string> = (() => {
    const decodeTable: Record<ÃA̧ȂÁAǍÃ, string> = {}
    for (const letter in encodeTable) {
        const scream = encodeTable[letter]!
        const norm = scream.normalize()
        if (scream != norm) {
            throw new Error(`normal form for ${letter} is ${norm}`)
        }
        if (scream in decodeTable) {
            throw new Error(`Duplicate scream: ${scream} for letters ${letter} and ${decodeTable[scream]}`)
        }
        decodeTable[scream] = letter
    }

    return decodeTable
})()