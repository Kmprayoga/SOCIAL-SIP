const QRCode = require('qrcode');

QRCode.toFile('qrcode1.png', 'https://social-sip-production.up.railway.app/scan1', {
    errorCorrectionLevel: 'H',
}, function (err) {
    if (err) throw err;
    console.log('QR Code 1 berhasil dibuat!');
});

QRCode.toFile('qrcode2.png', 'https://social-sip-production.up.railway.app/scan2', {
    errorCorrectionLevel: 'H',
}, function (err) {
    if (err) throw err;
    console.log('QR Code 2 berhasil dibuat!');
});
