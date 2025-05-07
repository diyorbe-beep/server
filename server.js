const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
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

app.listen(port, () => {
  console.log(`🚀 Server https://my-ser-tnvw.onrender.com:${port} da ishlayapti`);
});
