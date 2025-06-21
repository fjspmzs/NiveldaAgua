import { useEffect } from 'react';
import api from './config/configApi';

const SimuladorNivel: React.FC = () => {
  useEffect(() => {
    const intervalo = setInterval(async () => {
      const nivelSimulado = (Math.random() * 100).toFixed(2);
      try {
        await api.post('/nivel', { nivel: parseFloat(nivelSimulado) });
        console.log(`Nível simulado enviado: ${nivelSimulado} cm`);
      } catch (err) {
        console.error('Erro ao enviar nível simulado:', err);
      }
    }, 30000); // a cada 30 segundos

    return () => clearInterval(intervalo); // limpa se o componente for desmontado
  }, []);

  return (
    <div>
      <p>Simulador de nível rodando... (envia a cada 30s)</p>
    </div>
  );
};

export default SimuladorNivel;
