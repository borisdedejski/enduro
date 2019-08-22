var FileListToArrayValueConverter = /** @class */ (function () {
    function FileListToArrayValueConverter() {
    }
    FileListToArrayValueConverter.prototype.toView = function (fileList) {
        var files = [];
        if (!fileList) {
            return files;
        }
        for (var i = 0; i < fileList.length; i++) {
            files.push(fileList.item(i));
        }
        return files;
    };
    return FileListToArrayValueConverter;
}());
export { FileListToArrayValueConverter };
//# sourceMappingURL=FileListToArrayValueConverter.js.map