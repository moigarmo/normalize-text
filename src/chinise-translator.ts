import pinyin from "pinyin";

export class ChiniseTranslator {

    private static CH_REGEX = new RegExp(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/);

    public isChinise(value: string): boolean {
        return ChiniseTranslator.CH_REGEX.test(value);
    }

    public chiniseToPinyin(chiniseText: string): string {
        return pinyin(chiniseText).join(" ");
    }

}