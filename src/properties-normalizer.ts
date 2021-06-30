import { PhraseNormalizer } from "./phrase-normalizer";
import { Properties } from "./properties-parser";

export class PropertiesNormalizer {
    private regexp: RegExp;

    constructor(
        private phraseNormalizer: PhraseNormalizer,
        keyRegex: string,
        private normalizedKey: string) {
        this.regexp = new RegExp(keyRegex);
    }

    public normalize(properties: Properties): void {
        Object.keys(properties.obj)
            .filter(key => this.regexp.test(key))
            .forEach(key => {
                const keyIndex = properties.keys.indexOf(key);
                const normalizedKey = `${key}.${this.normalizedKey}`;
                const normalizedValue = this.phraseNormalizer.normalize(properties.obj[key]);

                properties.keys.splice(keyIndex + 1, 0, normalizedKey);
                properties.obj[normalizedKey] = normalizedValue;
            });
    }
}