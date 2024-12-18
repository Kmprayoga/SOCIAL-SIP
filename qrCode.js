const QRCode = require('qrcode');

const backendUrl = 'https://social-sip-production.up.railway.app';

QRCode.toFile('qrcode1.png', `${backendUrl}/scan1`, {
    errorCorrectionLevel: 'H',
}, function (err) {
    if (err) throw err;
    console.log('QR Code 1 berhasil dibuat!');
});

QRCode.toFile('qrcode2.png', `${backendUrl}/scan2`, {
    errorCorrectionLevel: 'H',
}, function (err) {
    if (err) throw err;
    console.log('QR Code 2 berhasil dibuat!');
});

QRCode.toFile('qrcode3.png', `${backendUrl}/scan3`, {
    errorCorrectionLevel: 'H',
}, function (err) {
    if (err) throw err;
    console.log('QR Code 3 berhasil dibuat!');
});
