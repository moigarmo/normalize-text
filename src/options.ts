import { readFileSync } from "fs";
import minimist from 'minimist';

export class Options {

    public getOptions(): { input: string, output: string, keyRegex: string, normalizedKey: string, phrase: string } {

        const args = minimist(process.argv.slice(2), {
            string: ['input', 'output', 'keyRegex', 'phrase', 'normalizedKey'],
            boolean: ['help'],
            alias: {'input': 'i', 'output': 'o', 'keyRegex': 'r', 'help': 'h', 'phrase': 'p', 'normalizedKey': 'k'},
            unknown: arg => {
                console.error(`Unknown argument ${arg}, type --help for a list of allowed arguments`);
                process.exit(1);
            }
        });

        if (args.help) {
            this.printHelp();
            process.exit();
        }

        if (!!args.phrase) {
            return args as any;
        }

        if (!args.input || !args.output) {
            console.error("Either provide a phrase to normalize" +
            " or provide input and output file paths for properties file normalization");
            process.exit(1);
        }

        return {
            keyRegex: ".*",
            normalizedKey: "normalized",
            ...args
        } as any;
    }

    private printHelp(): void {
        console.info(readFileSync("./README.md").toString());
    }

}