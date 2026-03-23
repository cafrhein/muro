---
layout: default
title: Radar de Vínculos
---

<div class="fb-card" style="padding: 30px;">
    <h1 style="text-align: center; color: var(--fb-blue); margin-bottom: 10px;">Radar de Ingeniería Humana</h1>
    <p style="text-align: center; color: var(--fb-text-sec); margin-bottom: 30px;">
        Mide la solidez de tu Red Humana basándote en la reciprocidad y la interdependencia.
    </p>

    <div id="quiz-container">
        <div class="quiz-question" style="margin-bottom: 25px;">
            <p><strong>1. Apertura al Cuidado:</strong> ¿Qué tanto permites que otros te ayuden cuando pasas por un mal momento?</p>
            <input type="range" min="1" max="5" value="3" class="radar-slider" id="q1" style="width: 100%;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--fb-text-sec);">
                <span>Me aíslo</span><span>Me dejo cuidar</span>
            </div>
        </div>

        <div class="quiz-question" style="margin-bottom: 25px;">
            <p><strong>2. Honestidad Relacional:</strong> ¿Eres transparente sobre tus errores y necesidades con tus vínculos cercanos?</p>
            <input type="range" min="1" max="5" value="3" class="radar-slider" id="q2" style="width: 100%;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--fb-text-sec);">
                <span>Oculto</span><span>Soy honesto</span>
            </div>
        </div>

        <div class="quiz-question" style="margin-bottom: 25px;">
            <p><strong>3. Reparación de Daños:</strong> ¿Qué tan rápido buscas sanar un vínculo cuando sabes que lastimaste a alguien?</p>
            <input type="range" min="1" max="5" value="3" class="radar-slider" id="q3" style="width: 100%;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--fb-text-sec);">
                <span>Evado</span><span>Reparo</span>
            </div>
        </div>

        <div class="quiz-question" style="margin-bottom: 25px;">
            <p><strong>4. Reciprocidad:</strong> ¿Equilibras el pedir ayuda con el estar presente para los demás?</p>
            <input type="range" min="1" max="5" value="3" class="radar-slider" id="q4" style="width: 100%;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--fb-text-sec);">
                <span>Desequilibrio</span><span>Recíproco</span>
            </div>
        </div>

        <div class="quiz-question" style="margin-bottom: 30px;">
            <p><strong>5. No-Autosuficiencia:</strong> ¿Reconoces que tu estabilidad depende de otros y no solo de tu voluntad?</p>
            <input type="range" min="1" max="5" value="3" class="radar-slider" id="q5" style="width: 100%;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--fb-text-sec);">
                <span>"Yo puedo solo"</span><span>Interdependiente</span>
            </div>
        </div>

        <button onclick="generateRadar()" style="width: 100%; padding: 15px; background: var(--fb-blue); color: white; border: none; border-radius: 8px; font-weight: 800; cursor: pointer; font-size: 1.1rem;">
            Generar Diagnóstico de Red
        </button>
    </div>

    <div id="result-container" style="display: none; margin-top: 40px;">
        <canvas id="radarChart"></canvas>
        <div id="radar-feedback" style="margin-top: 25px; padding: 20px; background: var(--fb-bg); border-radius: 8px; font-style: italic; text-align: center;">
            </div>
        <button onclick="window.location.reload()" style="margin-top: 20px; background: none; border: 1px solid var(--fb-blue); color: var(--fb-blue); padding: 10px 20px; border-radius: 8px; cursor: pointer; width: 100%;">
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
    
    // Configuración del Radar
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Cuidado', 'Honestidad', 'Reparación', 'Reciprocidad', 'Vínculos'],
            datasets: [{
                label: 'Tu Red Humana',
                data: vals,
                fill: true,
                backgroundColor: 'rgba(24, 119, 242, 0.2)',
                borderColor: 'rgb(24, 119, 242)',
                pointBackgroundColor: 'rgb(24, 119, 242)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(24, 119, 242)'
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

    // Feedback dinámico
    const avg = vals.reduce((a, b) => parseInt(a) + parseInt(b), 0) / 5;
    let msg = "";
    if(avg < 3) msg = "Tu red está debilitada por la autosuficiencia. Es momento de dejarte cuidar.";
    else if(avg < 4.5) msg = "Tienes vínculos sólidos, pero aún hay áreas donde la transparencia puede mejorar.";
    else msg = "Felicidades, Carlos. Tu nivel de interdependencia es óptimo para mantener la estabilidad.";
    
    document.getElementById('radar-feedback').innerText = msg;
}
</script>

<style>
.radar-slider {
    -webkit-appearance: none;
    height: 8px;
    border-radius: 5px;
    background: var(--fb-border);
    outline: none;
    margin: 15px 0;
}
.radar-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--fb-blue);
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
}
</style>
