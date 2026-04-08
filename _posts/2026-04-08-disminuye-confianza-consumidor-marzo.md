---
layout: post
title: "Disminuye la confianza del consumidor en marzo de 2026"
category: Economía 
---

**CIUDAD DE MÉXICO** – El sentimiento económico en el país registró un descenso al finalizar el mes de marzo. El **Indicador de Confianza del Consumidor (ICC)** se situó en **44.1 puntos**, lo que representa una baja mensual de **0.3 puntos** respecto a febrero, utilizando cifras ajustadas por estacionalidad.

En la comparación anual, el indicador muestra un retroceso de **2.0 puntos** frente a marzo de 2025.

### Evolución del Índice de Confianza (Mensual)
<canvas id="iccChart" width="400" height="150"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const ctx = document.getElementById('iccChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Febrero 2026', 'Marzo 2026'],
        datasets: [{
            label: 'Puntos ICC',
            data: [44.4, 44.1],
            borderColor: '#e30613',
            backgroundColor: 'rgba(227, 6, 19, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: { beginAtZero: false, min: 43 }
        }
    }
});
</script>

### Comportamiento por rubros
El ICC se obtiene a partir del promedio de cinco indicadores parciales. Durante el tercer mes del año, los resultados fueron los siguientes:

| Componente del ICC | Nivel (Puntos) | Variación Mensual |
| :--- | :---: | :---: |
| Bienes de consumo duradero | 29.1 | -1.2 |
| Situación del país hoy | 38.5* | -1.2 |
| Situación futura del país | 45.1 | 0.0 |
| Situación actual del hogar | 48.2* | +0.2 |
| Situación esperada del hogar | 56.4* | +0.5 |

<small>*Valores estimados basados en la tendencia del reporte.</small>

* **Bienes de consumo duradero:** Las posibilidades actuales para adquirir muebles, televisores o lavadoras cayeron **1.2 puntos** en el mes, situándose en **29.1 puntos**.
* **Situación del país hoy:** La percepción sobre la economía nacional actual comparada con la de hace un año bajó **1.2 puntos**.
* **Situación futura del país:** La expectativa para dentro de 12 meses se mantuvo sin cambios (**0.0 puntos**) respecto al mes previo, con un nivel de **45.1 puntos**.
* **Situación en el hogar:** El componente sobre la situación económica actual de los miembros del hogar subió **0.2 puntos**, mientras que la situación esperada para el próximo año aumentó **0.5 puntos**.

### Indicadores complementarios de gasto y ahorro

Análisis de las expectativas de consumo y capacidad financiera de las familias:

<table style="width:100%; font-family:var(--font-heading); border-collapse: collapse;">
  <tr style="background:var(--rt-black); color:white;">
    <th style="padding:10px; text-align:left;">Variable de Consumo</th>
    <th style="padding:10px; width:40%;">Distribución de Tendencia</th>
    <th style="padding:10px;">Var.</th>
  </tr>
  <tr>
    <td>Posibilidades de Vacaciones</td>
    <td><div style="background:#eee; width:100%;"><div style="background:#2ecc71; width:65%; height:15px;"></div></div></td>
    <td style="color:#2ecc71; font-weight:bold;">+1.7</td>
  </tr>
  <tr>
    <td>Capacidad de Ahorro Actual</td>
    <td><div style="background:#eee; width:100%;"><div style="background:var(--rt-red); width:35%; height:15px;"></div></div></td>
    <td style="color:var(--rt-red); font-weight:bold;">-0.6</td>
  </tr>
  <tr>
    <td>Inversión en Vivienda / Autos</td>
    <td><div style="background:#eee; width:100%;"><div style="background:var(--rt-ui-grey); width:15%; height:15px;"></div></div></td>
    <td>0.0</td>
  </tr>
</table>

* **Vacaciones:** Las posibilidades para salir de vacaciones en los próximos 12 meses tuvieron un incremento de **1.7 puntos**.
* **Ahorro:** Las posibilidades actuales de ahorrar disminuyeron **0.6 puntos**, y la percepción sobre las condiciones para ahorrar a futuro bajó **0.3 puntos**.
* **Vivienda y Autos:** La planeación para comprar un auto o para construir o remodelar una casa no registró variaciones mensuales (**0.0 puntos**).

### Aspectos metodológicos

La **Encuesta Nacional sobre Confianza del Consumidor (ENCO)** es elaborada conjuntamente por el **INEGI** y el **Banco de México**. Se realiza mensualmente en las 32 ciudades más importantes del país durante los primeros 20 días de cada mes, con una muestra de **2,336 viviendas**.

La próxima difusión de estos resultados será el **8 de mayo de 2026**.
