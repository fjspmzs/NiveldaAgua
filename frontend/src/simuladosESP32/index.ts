import api from '../config/configApi';

setInterval(async () => {
  const nivelSimulado = (Math.random() * 100).toFixed(2); // simula nível entre 0 e 100 cm
  await api.post('/nivel', { nivel: nivelSimulado });
  console.log(`Enviado nível simulado: ${nivelSimulado} cm`);
}, 30000); // envia a cada 5 segundos