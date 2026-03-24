---
layout: default
title: Radar de Vínculos
---

<div class="radar-container" style="padding: 30px; max-width: 800px; margin: 0 auto;">
    <h1 style="text-align: center; color: var(--rt-black); font-family: var(--font-heading); text-transform: uppercase; margin-bottom: 10px;">Radar de Ingeniería Humana</h1>
    <p style="text-align: center; color: #666; margin-bottom: 30px; font-family: var(--font-main);">
        Mide la solidez de tu Red Humana basándote en la reciprocidad y la interdependencia.
    </p>

    <div id="quiz-container">
        <div class="quiz-question" style="margin-bottom: 25px;">
            <p style="font-family: var(--font-main); color: var(--rt-black);"><strong>1. Apertura al Cuidado:</strong> ¿Qué tanto permites que otros te ayuden cuando pasas por un mal momento?</p>
            <input type="range" min="1" max="5" value="3" class="radar-slider" id="q1" style="width: 100%;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #888; font-family: var(--font-heading);">
                <span>ME AÍSLO</span><span>ME DEJO CUIDAR</span>
            </div>
        </div>

        <div class="quiz-question" style="margin-bottom: 25px;">
            <p style="font-family: var(--font-main); color: var(--rt-black);"><strong>2. Honestidad Relacional:</strong> ¿Eres transparente sobre tus errores y necesidades con tus vínculos cercanos?</p>
            <input type="range" min="1" max="5" value="3" class="radar-slider" id="q2" style="width: 100%;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #888; font-family: var(--font-heading);">
                <span>OCULTO</span><span>SOY HONESTO</span>
            </div>
        </div>

        <div class="quiz-question" style="margin-bottom: 25px;">
            <p style="font-family: var(--font-main); color: var(--rt-black);"><strong>3. Reparación de Daños:</strong> ¿Qué tan rápido buscas sanar un vínculo cuando sabes que lastimaste a alguien?</p>
            <input type="range" min="1" max="5" value="3" class="radar-slider" id="q3" style="width: 100%;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #888; font-family: var(--font-heading);">
                <span>EVADO</span><span>REPARO</span>
            </div>
        </div>

        <div class="quiz-question" style="margin-bottom: 25px;">
            <p style="font-family: var(--font-main); color: var(--rt-black);"><strong>4. Reciprocidad:</strong> ¿Equilibras el pedir ayuda con el estar presente para los demás?</p>
            <input type="range" min="1" max="5" value="3" class="radar-slider" id="q4" style="width: 100%;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #888; font-family: var(--font-heading);">
                <span>DESEQUILIBRIO</span><span>RECÍPROCO</span>
            </div>
        </div>

        <div class="quiz-question" style="margin-bottom: 30px;">
            <p style="font-family: var(--font-main); color: var(--rt-black);"><strong>5. No-Autosuficiencia:</strong> ¿Reconoces que tu estabilidad depende de otros y no solo de tu voluntad?</p>
            <input type="range" min="1" max="5" value="3" class="radar-slider" id="q5" style="width: 100%;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #888; font-family: var(--font-heading);">
                <span>"YO PUEDO SOLO"</span><span>INTERDEPENDIENTE</span>
            </div>
        </div>

        <button onclick="generateRadar()" style="width: 100%; padding: 18px; background: var(--rt-red); color: white; border: none; font-family: var(--font-heading); font-weight: 700; cursor: pointer; font-size: 1.2rem; text-transform: uppercase; letter-spacing: 1px;">
            Generar Diagnóstico de Red
        </button>
    </div>

    <div id="result-container" style="display: none; margin-top: 40px;">
        <canvas id="radarChart"></canvas>
        <div id="radar-feedback" style="margin-top: 25px; padding: 25px; background: #f9f9f9; border-left: 5px solid var(--rt-red); font-family: var(--font-main); font-size: 1.1rem; text-align: center; color: var(--rt-black);">
        </div>
        <button onclick="window.location.reload()" style="margin-top: 20px; background: transparent; border: 2px solid var(--rt-black); color: var(--rt-black); padding: 12px 20px; font-family: var(--font-heading); font-weight: 700; cursor: pointer; width: 100%; text-transform: uppercase;">
            Reiniciar Radar
        </button>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
function generateRadar() {
    const vals = [
        document.getElementById('q1').value,
        document.getElementById('q2').value,
        document.getElementById('q3').value,
        document.getElementById('q4').value,
        document.getElementById('q5').value
    ];

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';

    const ctx = document.getElementById('radarChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Cuidado', 'Honestidad', 'Reparación', 'Reciprocidad', 'Vínculos'],
            datasets: [{
                label: 'Tu Red Humana',
                data: vals,
                fill: true,
                backgroundColor: 'rgba(227, 6, 19, 0.2)', // Rojo RT con transparencia
                borderColor: 'rgb(227, 6, 19)',
                pointBackgroundColor: 'rgb(227, 6, 19)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(227, 6, 19)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { display: true },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    ticks: { stepSize: 1, display: false }
                }
            }
        }
    });

    const avg = vals.reduce((a, b) => parseInt(a) + parseInt(b), 0) / 5;
    let msg = "";
    if(avg < 3) msg = "Tu red está debilitada por la autosuficiencia. Es momento de dejarte cuidar.";
    else if(avg < 4.5) msg = "Tienes vínculos sólidos, pero aún hay áreas donde la transparencia puede mejorar.";
    else msg = "Tu nivel de interdependencia es óptimo para mantener la estabilidad.";
    
    document.getElementById('radar-feedback').innerText = msg;
}
</script>

<style>
.radar-slider {
    -webkit-appearance: none;
    height: 6px;
    border-radius: 3px;
    background: #eee;
    outline: none;
    margin: 15px 0;
}
.radar-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--rt-red);
    cursor: pointer;
    border: 2px solid #fff;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
}
</style>
