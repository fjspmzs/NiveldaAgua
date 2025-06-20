const axios = require('axios');

setInterval(async () => {
  const nivelSimulado = (Math.random() * 100).toFixed(2); // simula nível entre 0 e 100 cm
  await axios.post('http://localhost:8080/nivel', { nivel: nivelSimulado });
  console.log(`Enviado nível simulado: ${nivelSimulado} cm`);
}, 5000); // envia a cada 5 segundos

