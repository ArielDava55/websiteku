<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const midtransClient = require('midtrans-client');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => {
    console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});

app.get('/produk', async (req, res) => {
    try {
        const semuaProduk = await Produk.find();
        res.json(semuaProduk);
      } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data produk' });
      }
    });

    // Ambil produk berdasarkan ID
app.get('/produk/:id', async (req, res) => {
    try {
        const produk = await Produk.findById(req.params.id);
        if (!produk) return res.status(404).json({ error: 'Produk tidak ditemukan' });
        res.json(produk);
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil produk' });
    }
});


app.use(express.static(path.join(__dirname)));

// Ganti ini dengan Server Key dari Midtrans (mode sandbox)
const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-haFk2iP258vLZVm-PSm1_Pwe'
});


app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pembayaran.html'));
});

app.get('/sukses', (req, res) => {
    res.sendFile(path.join(__dirname, 'sukses.html'));
  });
  

app.post('/cek-status', async (req, res) => {
    const { order_id } = req.body;

    try {
        const status = await snap.transaction.status(order_id);
        res.json({ status: status.transaction_status });
    } catch (err) {
        console.error('❌ Gagal cek status:', err);
        res.status(500).json({ error: 'Gagal cek status transaksi' });
    }
});


// Notifikasi dari Midtrans
app.post('/notifikasi-midtrans', async (req, res) => {
    try {
        const notification = req.body;

        const apiClient = new midtransClient.Snap({
            isProduction: false,
            serverKey: 'SB-Mid-server-haFk2iP258vLZVm-PSm1_Pwe'
        });

        // Validasi notifikasi dari Midtrans
        const statusResponse = await apiClient.transaction.notification(notification);

        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;

        console.log(`🔔 Notifikasi: ${orderId} - ${transactionStatus}`);


        res.status(200).send('Notifikasi diproses');
    } catch (err) {
        console.error('❌ Gagal proses notifikasi:', err);
        res.status(500).send('Gagal');
    }
});

app.post('/buat-transaksi', async (req, res) => {
    const { nama, email, produk, harga } = req.body;

    try {
        const order_id = 'ORDER-' + Date.now(); // <== letakkan DI SINI

        const parameter = {
            transaction_details: {
                order_id,
                gross_amount: harga
            },
            customer_details: {
                first_name: nama,
                email: email
            },
            item_details: [{
                id: produk,
                price: harga,
                quantity: 1,
                name: produk

            }],
            callbacks: {
                finish: "http://localhost:3000/sukses.html"  // <-- redirect ke halaman sukses kamu
            }
        };

        const transaction = await snap.createTransaction(parameter);
        
    console.log('✅ Token Midtrans:', transaction.token);
    res.json({ snapToken: transaction.token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal membuat transaksi' });
    }
});


app.listen(3000, () => {
    console.log('✅ Server berjalan di http://localhost:3000');
});
=======
const express = require('express');
const bodyParser = require('body-parser');
const midtransClient = require('midtrans-client');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(PORT, () => {
    console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});

app.get('/produk', async (req, res) => {
    try {
        const semuaProduk = await Produk.find();
        res.json(semuaProduk);
      } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil data produk' });
      }
    });

    // Ambil produk berdasarkan ID
app.get('/produk/:id', async (req, res) => {
    try {
        const produk = await Produk.findById(req.params.id);
        if (!produk) return res.status(404).json({ error: 'Produk tidak ditemukan' });
        res.json(produk);
    } catch (err) {
        res.status(500).json({ error: 'Gagal mengambil produk' });
    }
});


app.use(express.static(path.join(__dirname)));

// Ganti ini dengan Server Key dari Midtrans (mode sandbox)
const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-haFk2iP258vLZVm-PSm1_Pwe'
});


app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pembayaran.html'));
});

app.get('/sukses', (req, res) => {
    res.sendFile(path.join(__dirname, 'sukses.html'));
  });
  

app.post('/cek-status', async (req, res) => {
    const { order_id } = req.body;

    try {
        const status = await snap.transaction.status(order_id);
        res.json({ status: status.transaction_status });
    } catch (err) {
        console.error('❌ Gagal cek status:', err);
        res.status(500).json({ error: 'Gagal cek status transaksi' });
    }
});


// Notifikasi dari Midtrans
app.post('/notifikasi-midtrans', async (req, res) => {
    try {
        const notification = req.body;

        const apiClient = new midtransClient.Snap({
            isProduction: false,
            serverKey: 'SB-Mid-server-haFk2iP258vLZVm-PSm1_Pwe'
        });

        // Validasi notifikasi dari Midtrans
        const statusResponse = await apiClient.transaction.notification(notification);

        const orderId = statusResponse.order_id;
        const transactionStatus = statusResponse.transaction_status;

        console.log(`🔔 Notifikasi: ${orderId} - ${transactionStatus}`);


        res.status(200).send('Notifikasi diproses');
    } catch (err) {
        console.error('❌ Gagal proses notifikasi:', err);
        res.status(500).send('Gagal');
    }
});

app.post('/buat-transaksi', async (req, res) => {
    const { nama, email, produk, harga } = req.body;

    try {
        const order_id = 'ORDER-' + Date.now(); // <== letakkan DI SINI

        const parameter = {
            transaction_details: {
                order_id,
                gross_amount: harga
            },
            customer_details: {
                first_name: nama,
                email: email
            },
            item_details: [{
                id: produk,
                price: harga,
                quantity: 1,
                name: produk

            }],
            callbacks: {
                finish: "http://localhost:3000/sukses.html"  // <-- redirect ke halaman sukses kamu
            }
        };

        const transaction = await snap.createTransaction(parameter);
        
    console.log('✅ Token Midtrans:', transaction.token);
    res.json({ snapToken: transaction.token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal membuat transaksi' });
    }
});


app.listen(3000, () => {
    console.log('✅ Server berjalan di http://localhost:3000');
});
>>>>>>> 13e6416 (Resolve conflicts and update)
