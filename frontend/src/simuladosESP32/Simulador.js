import React, { useEffect } from 'react';
import api from '../config/configApi';

export const Simulador = () => {
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

  return(
    <div>
      <p> Atualiza a cada 30s </p>
    </div>
  )
};


