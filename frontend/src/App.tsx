import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import api from './config/configApi'
import  {Simulador}  from './simuladosESP32/Simulador'

type Nivel = {
  createdAt: string;
  updatedAt: string;
  nivel: number;
};

const TamanhoGrafico = {
  widthPerDay: 350,
  height: 700,
};

const TunelD3 = () => {
  const [nivel, setNivel] = useState<Nivel[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

useEffect(() => {
  const carregarDados = async () => {
    try {
      const res = await api('/nivel');
      const data = res.data;
      const tresDiasAtras = new Date();
      tresDiasAtras.setDate(tresDiasAtras.getDate() - 3);
      const filtrado = data.filter((n: Nivel) => new Date(n.createdAt) >= tresDiasAtras);
      setNivel(filtrado);
    } catch (err) {
      console.error("Erro ao carregar níveis:", err);
    }
  };

  carregarDados(); // primeira vez
  const intervalo = setInterval(carregarDados, 30000); // atualiza a cada 30s

  return () => clearInterval(intervalo); // limpa o intervalo ao desmontar
}, []);

  useEffect(() => {
    if (nivel.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const dataPorDia = d3.groups(nivel, d => new Date(d.createdAt).toLocaleDateString('pt-BR'));

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = TamanhoGrafico.widthPerDay * dataPorDia.length;
    const height = TamanhoGrafico.height;

    svg.attr("width", width)
       .attr("height", height + 60);

    const colorScale = d3.scaleLinear<string>()
      .domain([0, 50, 100])
      .range(["blue", "yellow", "red"]);

    dataPorDia.forEach(([dia, dadosDia], index) => {
      const xOffset = index * TamanhoGrafico.widthPerDay;

      const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top]);

      // Cilindro (simulado como retângulo com gradiente radial)
      svg.append("rect")
        .attr("x", xOffset + margin.left)
        .attr("y", margin.top)
        .attr("width", TamanhoGrafico.widthPerDay - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom)
        .attr("rx", 40)
        .attr("fill", "url(#gradCilindro)");

      // Definição do gradiente
      const defs = svg.append("defs");
      const gradient = defs.append("radialGradient")
        .attr("id", "gradCilindro")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ddd");
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#999");

      svg.selectAll(`circle-dia-${index}`)
        .data(dadosDia)
        .enter()
        .append("circle")
        .attr("cx", xOffset + TamanhoGrafico.widthPerDay / 2)
        .attr("cy", d => yScale(d.nivel))
        .attr("r", 20)
        .attr("fill", d => colorScale(d.nivel));

      const maxNivel = d3.max(dadosDia, d => d.nivel);
      const minNivel = d3.min(dadosDia, d => d.nivel);

      svg.append("text")
        .attr("x", xOffset + TamanhoGrafico.widthPerDay / 2)
        .attr("y", height + 15)
        .attr("text-anchor", "middle")
        .text(`Dia: ${dia}`);

      svg.append("text")
        .attr("x", xOffset + TamanhoGrafico.widthPerDay / 2)
        .attr("y", height + 35)
        .attr("text-anchor", "middle")
        .text(`Max: ${maxNivel} | Min: ${minNivel}`);
    });

  }, [nivel]);

  return (
    <div className='container-fluid-ms' style={{textAlign:'center'}}>
      <h1 style={{textAlign:'center'}}>Túnel de Medições (Últimos 3 dias)</h1>
      <Simulador/>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default TunelD3;
