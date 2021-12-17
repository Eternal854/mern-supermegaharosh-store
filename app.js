const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/user', require('./routes/user.routes'));
app.use('/api/item', require('./routes/item.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, './client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Приложение запущено на порте ${PORT}`));
  } catch (error) {
    console.log('Ошибка сервера', error.message);
    process.exit(1);
  }
}

start();
