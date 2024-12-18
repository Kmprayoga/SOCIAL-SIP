const Hapi = require('@hapi/hapi');
const { Firestore } = require('@google-cloud/firestore');

// Ambil kredensial dari environment variable
const serviceAccountBase64 = process.env.SERVICE_ACCOUNT;
if (!serviceAccountBase64) {
    console.error('SERVICE_ACCOUNT environment variable is not set.');
    process.exit(1); // Hentikan jika variabel tidak ada
}

// Decode Base64 ke objek JSON
const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString());

// Inisialisasi Firestore dengan kredensial dari ENV
const firestore = new Firestore({
    credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
    },
    projectId: serviceAccount.project_id,
});

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3002,
        host: '0.0.0.0', // Agar bisa diakses dari Railway
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Authorization', 'Content-Type'],
            },
        },
    });

    // Endpoint untuk QR Code 1
    server.route({
        method: 'GET',
        path: '/scan1',
        handler: async (request, h) => {
            const ip = request.info.remoteAddress;

            await firestore.collection('qr_stats').add({
                qrCode: 'scan1',
                ipAddress: ip,
                scannedAt: new Date(),
            });

            return h.redirect('https://phoenixgarden.id/social-sip-events/');
        },
    });

    // Endpoint untuk QR Code 2
    server.route({
        method: 'GET',
        path: '/scan2',
        handler: async (request, h) => {
            const ip = request.info.remoteAddress;

            await firestore.collection('qr_stats').add({
                qrCode: 'scan2',
                ipAddress: ip,
                scannedAt: new Date(),
            });

            return h.redirect('https://phoenixgarden.id/social-sip-events/');
        },
    });

    // Endpoint untuk mengambil statistik
    server.route({
        method: 'GET',
        path: '/stats',
        handler: async (request, h) => {
            const scan1 = await firestore.collection('qr_stats').where('qrCode', '==', 'scan1').get();
            const scan2 = await firestore.collection('qr_stats').where('qrCode', '==', 'scan2').get();

            return {
                qrCode1: scan1.size,
                qrCode2: scan2.size,
                total: scan1.size + scan2.size,
            };
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

init();
