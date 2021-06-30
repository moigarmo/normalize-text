Normalises input texts so the can be used as part of urls, removing all non alphanumeric characters and returning the words joined by - character.

Accepts chinise characters in which case they will be transformed to pinyin representation before normalizing.

Arguments:
    - input, i: input file where texts are, supposed properties format key:value.
    - output, o: output file to add transformed texts
    - keyRegex, r: regular expression to search for keys in input file - default: ".*" (matches every key)
    - normalizedKey, k: suffix to build the key for the normalized value - default: "normalized"
    - phrase, p: normalize only one phrase, normalized phrase will be outputted to console.
        If provided all other arguments will be ignored.

Output file will be a copy of input file but adding for each match of the keyRegex a new entry:
    key.normalizedKey: normalised-value