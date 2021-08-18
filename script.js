const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const secondsSphere = document.getElementById('seconds-sphere');

//variables
let stopwatchInterval; // lleva cuenta del espacio recorrido por segundo
let runningTime = 0; // lleva cuenta del tiempo 

const playPause = () => {
    const isPaused = !playPauseButton.classList.contains('running'); // si el boton esta en running aparece el boton pausa 
    if (isPaused) {
        playPauseButton.classList.add('running');
        start();
    } else {
        playPauseButton.classList.remove('running'); 
        pause();
    }
}

const pause = () => {
    secondsSphere.style.animationPlayState = 'paused';// sedetiene la animacion
    clearInterval(stopwatchInterval);// se borra la animacion mientras esteactivada la pausa
}

const stop = () => {
    secondsSphere.style.transform = 'rotate(-90deg) translateX(60px)';
    secondsSphere.style.animation = 'none';// se devuelve el segundero a cero
    playPauseButton.classList.remove('running');
    runningTime = 0;
    clearInterval(stopwatchInterval);
    stopwatch.textContent = '00:00';
}

const start = () => {
    secondsSphere.style.animation = 'rotacion 60s linear infinite';
    let startTime = Date.now() - runningTime; //inicia en cero, cero
    secondsSphere.style.animationPlayState = 'running';
    stopwatchInterval = setInterval( () => {
        runningTime = Date.now() - startTime;
        stopwatch.textContent = calculateTime(runningTime);
    }, 1000) //hace modificacion cada mil milisegundos para generar un movimiento
}

const calculateTime = runningTime => {
    const total_seconds = Math.floor(runningTime / 1000);
    const total_minutes = Math.floor(total_seconds / 60);

    const display_seconds = (total_seconds % 60).toString().padStart(2, "0");// aqui cuando la cuenta de segundos este en 60, se divide por 60 para que empiece la cuenta desde cero

    const display_minutes = total_minutes.toString().padStart(2, "0");

    return `${display_minutes}:${display_seconds}` 
}