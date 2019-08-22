export class BlobToUrlValueConverter {
    toView(blob) {
        if (blob != null) {
            return URL.createObjectURL(blob);
        }
    }
}
