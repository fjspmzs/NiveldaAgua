const axios = require('axios');
import api from '../frontend/src/config/configApi'
setInterval(async () => {
  const nivelSimulado = (Math.random() * 100).toFixed(2); // nível entre 0 e 100 cm
  try {
    const res = await api.post('/nivel', { nivel: nivelSimulado });
    console.log(`Nível enviado: ${nivelSimulado} cm - ${res.status}`);
  } catch (err) {
    console.error('Erro ao enviar simulação:', err.message);
  }
}, 5000); // a cada 5 segundos