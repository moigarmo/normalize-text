import { ChiniseTranslator } from "./chinise-translator";

export class PhraseNormalizer {

    constructor(private chiniseTranslator: ChiniseTranslator) { }

    public normalize(phrase: string): string {
        let normalized = phrase;

        if (this.chiniseTranslator.isChinise(phrase)) {
            normalized = this.chiniseTranslator.chiniseToPinyin(phrase);
        }

        return this.removeInvalidCharacters(normalized)
            .map(word => word.toLowerCase())
            .join("-");
    }

    private removeInvalidCharacters(value: string): string[] {
        return value.normalize("NFD").split(" ")
            .map(word => word.replace(/\W/g, ""))
            .filter(word => word.length > 0);
    }
}