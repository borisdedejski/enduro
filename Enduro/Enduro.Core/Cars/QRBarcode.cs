using QRCoder;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;

namespace Enduro.Core.Cars
{
    public class QRBarcode
    {
        /// <summary>
        /// TODO HERE WITH BARCODES ITS ONLY INITIALIZE USING PLUGIN QRCoder
        /// </summary>
        public QRCodeGenerator qrGenerator { get; set; }
        public QRCodeData qrCodeData { get; set; }
        public QRCode qrCode { get; set; }
        public Bitmap qrCodeImage { get; set; }
        public QRBarcode(QRCodeGenerator qrGenerator, QRCodeData qrCodeData, QRCode qrCode, Bitmap qrCodeImage)
        {
            qrGenerator = new QRCodeGenerator();
            qrCodeData = qrGenerator.CreateQrCode("The text which should be encoded.", QRCodeGenerator.ECCLevel.Q);
            qrCode = new QRCode(qrCodeData);
            qrCodeImage = qrCode.GetGraphic(20);

        }

    }
}
