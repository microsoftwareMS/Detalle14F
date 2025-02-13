// Array para almacenar las posiciones ocupadas
let occupiedPositions = [];

function createRandomHeart() {
    const heart = document.createElement('span'); // Crear un nuevo span
    heart.classList.add('material-symbols-outlined', 'hearts-fondo');
    heart.textContent = 'favorite'; // Texto para el ícono de corazón

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let xPos, yPos;
    let positionOccupied = true;

    // Intentar encontrar una posición no ocupada
    while (positionOccupied) {
        xPos = Math.random() * screenWidth;
        yPos = Math.random() * screenHeight;

        // Verificar si la nueva posición está ocupada
        positionOccupied = occupiedPositions.some(pos => {
            const distance = Math.sqrt(Math.pow(xPos - pos.x, 2) + Math.pow(yPos - pos.y, 2));
            return distance < 100; // Si está a menos de 100px de cualquier otra posición, se considera ocupada
        });
    }

    // Almacenar la nueva posición ocupada
    occupiedPositions.push({ x: xPos, y: yPos });

    // Asignar la posición en el CSS
    heart.style.left = `${xPos}px`;
    heart.style.top = `${yPos}px`;

    // Asignar una opacidad aleatoria (entre 0.3 y 0.7)
    heart.style.opacity = Math.random() * (0.7 - 0.3) + 0.3;

    // Animación de tamaño aleatorio usando transform: scale
    heart.style.animation = `scaleHeart ${Math.random() * 2 + 1}s ease-in-out infinite`;

    // Agregar el corazón al cuerpo de la página
    document.body.appendChild(heart);
}

// Crear 10 corazones aleatorios al cargar la página
window.onload = function () {
    for (let i = 0; i < 30; i++) {
        createRandomHeart(); // Crear cada corazón aleatorio
    }
};

document.getElementById('start-btn').addEventListener('click', function () {
    document.querySelector('.welcome').style.display = 'none'; // Oculta la sección de bienvenida
    document.getElementById('message-container').classList.remove('hidden'); // Muestra el mensaje final
});


const envelope = document.querySelector('.envelope-wrapper');
const letter = document.querySelector('.letter');


document.addEventListener('click', (e) => {
    if (
        e.target.matches(".envelope") ||
        e.target.matches(".tap-right") ||
        e.target.matches(".tap-left") ||
        e.target.matches(".heart")
    ) {
        envelope.classList.toggle('flap');
    } else if (e.target.matches(".envelope *")) {
        if (!letter.classList.contains('opened')) {
            letter.classList.add("letter-opening");

            setTimeout(() => {
                letter.classList.remove('letter-opening');
                letter.classList.add('opened');
            }, 500);
            envelope.classList.add("disable-envelope")
        } else {
            letter.classList.add('closing-letter')
            envelope.classList.remove("disable-envelope")
            letter.classList.remove('opened')
            setTimeout(() => {
                letter.classList.remove('closing-letter');
                letter.classList.remove('opened');
            }, 500);
        }
    }
});

function actualizarCronometro() {
    const fechaObjetivo = new Date(new Date().getFullYear(), 1, 14, 0, 0, 0); // 14 de febrero
    const ahora = new Date();
    const diferencia = fechaObjetivo - ahora;

    const cronometroElement = document.getElementById('cronometro');
    const welcomeElement = document.querySelector('.welcome');

    if (diferencia <= 0) {
        cronometroElement.style.display = 'none'; // Ocultar cronómetro
        welcomeElement.style.display = 'flex';  // Mostrar mensaje de bienvenida
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    cronometroElement.innerHTML = `⏳ ${dias}d ${horas}h ${minutos}m ${segundos}s`;

    setTimeout(actualizarCronometro, 1000);
}

actualizarCronometro();