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
        console.info(`
        Normalises input texts so the can be used as part of urls,
        removing all non alphanumeric characters and returning the words joined by - character.

        Accepts chinise characters in which case they will be transformed to pinyin representation before normalizing.

        Arguments:
            - input, i: input file where texts are, supposed properties format key:value.
            - output, o: output file to add urls
            - keyRegex, r: regular expression to search for keys in input file - default: ".*" (matches every key)
            - normalizedKey, k: suffix to build the key for the normalized value - default: "normalized"
            - phrase, p: normalize only one phrase, normalized phrase will be outputted to console.
                If provided all other arguments will be ignored.

        Output file will be a copy of input file but adding for each match of the keyRegex a new entry:
            key.normalizedKey: normalised-value`);
    }

}