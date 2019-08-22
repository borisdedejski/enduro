var BlobToUrlValueConverter = /** @class */ (function () {
    function BlobToUrlValueConverter() {
    }
    BlobToUrlValueConverter.prototype.toView = function (blob) {
        if (blob != null) {
            return URL.createObjectURL(blob);
        }
    };
    return BlobToUrlValueConverter;
}());
export { BlobToUrlValueConverter };
//# sourceMappingURL=BlobToUrlValueConverter.js.map