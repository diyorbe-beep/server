const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
  origin: 'https://my-ser-tnvw.onrender.com',  // Frontend URLni to'g'ri qo'yish
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const users = []; // Oddiy massivga saqlayapmiz (realda bu DB bo‘ladi)

app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;

  // Username allaqachon borligini tekshiramiz
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Bu foydalanuvchi allaqachon mavjud' });
  }

  const newUser = { username, password };
  users.push(newUser);

  console.log('Yangi foydalanuvchi:', newUser);

  res.status(201).json({ message: 'Foydalanuvchi saqlandi', user: newUser });
});

// Login endpointini qo'shish
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Foydalanuvchi topilishini tekshiramiz
  const existingUser = users.find(u => u.username === username && u.password === password);
  if (!existingUser) {
    return res.status(400).json({ message: 'Foydalanuvchi topilmadi yoki parol noto‘g‘ri' });
  }

  console.log('Login muvaffaqiyatli:', existingUser);

  res.status(200).json({ message: 'Muvaffaqiyatli kirish', user: existingUser });
});

app.listen(port, () => {
  console.log(`🚀 Server https://my-ser-tnvw.onrender.com:${port} da ishlayapti`);
});
