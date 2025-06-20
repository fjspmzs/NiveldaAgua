
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(
  process.env.DB_NAME || 'pmzspy',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'rootpmzs',
  {
    host: process.env.DB_HOST || 'mysql',
    dialect: 'mysql'
  }
  
);
console.log('Conectando ao banco em:', process.env.DB_HOST);
const Nivel = sequelize.define('Nivel', {
  nivel: { type: DataTypes.FLOAT, allowNull: false }
}, { timestamps: true });

sequelize.sync();

app.post('/nivel', async (req, res) => {
  const { nivel } = req.body;
  await Nivel.create({ nivel });
  res.send('Dado armazenado no MySQL!');
});

app.get('/nivel', async (req, res) => {
  const niveis = await Nivel.findAll({ order: [['createdAt', 'DESC']]});
  res.json(niveis);
});
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log(`Backend rodando na porta ${port}`);
});
