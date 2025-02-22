#!/usr/bin/env -S deno run

/**
 * Implements encode/decode for the [scream cipher][1].
 * 
 * [1]: https://xkcd.com/3054/
 * 
 * @module
 */

import {Command} from "@cliffy/command"
import { decode, encode } from "./codec.ts";

/**
 * TODO.
 */
async function main(args: string[]): Promise<void> {
    await cliffy(args)
}

async function cliffy(args: string[]) {
    const main = new Command()
        .name("scream")
        .description("ÃA̯ÁAẠ ĀA̰Á ĂAÂA̋ÄAA̋Á ÅA̮ ÅÄȂ ĀẢǍÁ")
        .arguments("[...input:string]")
        .option("-d --decode", "ÃA̧ȂÁAǍ ǍÅȂÁ ẢÂĀÁĂĂẢA̋ẢȦĂA̦", {default: false, })
        .action((opts, ...args) => {
            if (args.length == 0) {
                main.showHelp()
                return
            }

            const input = args.join(" ")
            if (opts.decode) {
                console.log(decode(input))
            } else {
                console.log(encode(input))
            }
        })

    await main.parse(args)
}


if (import.meta.main) {
    await main(Deno.args)
}