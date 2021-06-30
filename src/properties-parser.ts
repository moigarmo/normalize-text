import { readFileSync, writeFileSync } from "fs";

export type Properties = { obj: { [key: string]: string }, keys: string[] };

export class PropertiesParser {

    constructor(private input: string, private output: string) {}

    public readProperties(): Properties {
        let file;

        try {
            file = readFileSync(this.input);
        } catch (error) {
            console.error(`Error reading input file: ${error}`);
            process.exit(1);
        }

        const properties = JSON.parse(file.toString());

        return { obj: properties, keys : Object.keys(properties) };
    }

    public writeProperties(properties: Properties): void {
        writeFileSync(
            this.output,
            JSON.stringify(properties.obj, properties.keys, 2)
        );
    }
}