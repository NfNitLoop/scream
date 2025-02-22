/**
 * Exports just the encode/decode functionality for the [scream cipher][1].
 * 
 * [1]: https://xkcd.com/3054/
 * 
 * @module
 */

/**
 * TODO
 */
export function encode(text: string): Screams {
    let out = ""
    for (const letter of text) {
        const scream = encodeTable[letter.toUpperCase()]
        out += scream ? scream : letter
    }
    return out
}

/**
 * TODO
 */
export function decode(screams: Screams): string {
    let out = ""
    for (const scream of graphemes(screams.normalize())) {
        const letter = decodeTable[scream]
        out += letter ? letter : scream;
    }
    return out
}

// Could use a general-purpose graphmeme iterator, but, this is fine for screams:
function * graphemes(screams: Screams) {
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
 * TODO: 
 */
export type Screams = string

const encodeTable: Record<string, Screams> = {
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

const decodeTable: Record<Screams, string> = (() => {
    const decodeTable: Record<Screams, string> = {}
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