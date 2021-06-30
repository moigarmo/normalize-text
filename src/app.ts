import { ChiniseTranslator } from "./chinise-translator";
import { PropertiesNormalizer } from "./properties-normalizer";
import { Options } from './options';
import { PhraseNormalizer } from "./phrase-normalizer";
import { PropertiesParser } from "./properties-parser";


const options = new Options().getOptions();

const phraseNormalizer = new PhraseNormalizer(new ChiniseTranslator());

if (!!options.phrase) {
    console.log(phraseNormalizer.normalize(options.phrase));
} else {
    const propertiesParser = new PropertiesParser(options.input, options.output);

    const properties = propertiesParser.readProperties();

    const propertiesNormalizer = new PropertiesNormalizer(
        phraseNormalizer, options.keyRegex, options.normalizedKey
    );

    propertiesNormalizer.normalize(properties);

    propertiesParser.writeProperties(properties);
}
