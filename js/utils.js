function canJsonExport(key) {
    return !key.endsWith("Export") && key !== "favorite" && !key.endsWith("None") && key !== "otherInfos";
}

function camelToSentence(str) {
    let res = str[0].toUpperCase();
    str = str.substring(1);
    for (let ch in str) {
        let c = str[ch];
        if (c.toUpperCase() === c) {
            res += " " + c;
        } else {
            res += c;
        }
    }
    return res;
}