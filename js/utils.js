function canJsonExport(key) {
    return !key.endsWith("Export") && key !== "favorite" && !key.endsWith("None") && key !== "otherInfos";
}