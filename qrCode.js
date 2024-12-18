const QRCode = require('qrcode');

QRCode.toFile('qrcode1.png', 'http://localhost:3002/scan1', {
    errorCorrectionLevel: 'H',
}, function (err) {
    if (err) throw err;
    console.log('QR Code 1 berhasil dibuat!');
});

QRCode.toFile('qrcode2.png', 'http://localhost:3002/scan2', {
    errorCorrectionLevel: 'H',
}, function (err) {
    if (err) throw err;
    console.log('QR Code 2 berhasil dibuat!');
});
