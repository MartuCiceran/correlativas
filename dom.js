// Para cursar esta materia necesitás aprobar todas las materias del array
let correlativas = {
    // Año 1 - Cuatrimestre 2
    I7231: ["I7203", "I9358"],
    I9328: ["I9358", "I9326"],
    I9341: ["I9326"],
    I9359: ["I9358"],
    
    // Año 2 - Cuatrimestre 1
    I7232: ["I7231"],
    I7233: ["I7231"],
    I9335: ["I9358"],
    I9343: ["I9328", "I9341"],
    
    // Año 2 - Cuatrimestre 2
    I7208: ["I7231"],
    I7234: ["I9359", "I7233"],
    I9324: ["I9328"],
    I9342: ["I9328"],
    
    // Año 3 - Cuatrimestre 1
    I7211: ["I7208", "I7234"],
    I7235: ["I7233"],
    I7236: ["I7233", "I7232"],
    I7237: ["I7234", "I9335"],
    
    // Año 3 - Cuatrimestre 2
    I7207: ["I7211"],
    I7238: ["I7211", "I7237", "I7236", "I7235"],
    I7239: ["I7234"],
    I9307: ["I9328"],
    
    // Año 4 - Cuatrimestre 1
    I7240: ["I7235"],
    I7241: ["I7237", "I7211"],
    I7242: ["I7207", "I7237"],
    I9375: ["I9307"],
    
    // Año 4 - Cuatrimestre 2
    I7225: ["I7234", "I9307"],
    I7227: ["I9324", "I7234"],
    I7244: ["I7207"],
    
    // Año 5 - Cuatrimestre 1
    I7220: ["I7207"],

    //Electivas
    I1650: ["I7237"],
    I1657: ["I7208"],
    I1682: ["I9328", "I7234", "I9324"],
    I2248: ["I9375"],
    I2315: ["I9358", "I7234"],
    I6108: ["I6132"],
    I6111: ["I6132"],
    I6113: ["I6132"],
    I6150: ["I6123"],
    I7229: ["I7234"],
    I7246: ["I7227"],
    I7249: ["I7242"],
    I7250: ["I7234"],
    I7251: ["I7242"],
    I7252: ["I9375", "I7234"],
    I7253: ["I7234"],
    I7254: ["I9324", "I7241"],
    I7255: ["I7232", "I7237"],
    I7258: ["I7234"],
    I7259: ["I7227"],
    I7260: ["I7234"],
    I7261: ["I7234"],
    I7265: ["I7234"],
    I7271: ["I7207", "I7237", "I7235"],
    I7274: ["I7231"],
    I7275: ["I9375", "I7234", "I9324"],
    I7279: ["I7227"],
    I7280: ["I7241"],
    I7282: ["I7241"],
    I7284: ["I7237"],
    I7285: ["I7232", "I7237"],
    I7286: ["I7297"],
    I7287: ["I7234"],
    I7288: ["I9375", "I9324", "I7234"],
    I7289: ["I7244"],
    I7290: ["I9307", "I9343"],
    I7292: ["I7241"],
    I7294: ["I7208"],
    I7296: ["I7238"],
    I7297: ["I7234"],
    I7321: ["I7238"],
    I7322: ["I7235"],
    I7330: ["I7235"],
    I7340: ["I7207", "I7235"],
    I7362: ["I7233", "I7211"],
    I7364: ["I7227"],
    I7380: ["I7244"],
    I7382: ["I7237"],
    I7384: ["I7227"],
    I7389: ["I7244"],
    I7398: ["I7297"],
    I8157: ["I7207", "I7237", "I7235"],
    I8208: ["I7232"],
    I8218: ["I9307"],
    I8221: ["I6123"]
};

let materias = document.querySelectorAll(".materia");

function todasCorrelativasAprobadas(id) {
    let requisitos = correlativas[id];
    console.log("requisitos: ",requisitos)
    if (!requisitos) return true; // No tiene requisitos, puede desbloquearse

    for (let i = 0; i < requisitos.length; i++) {
        let reqId = requisitos[i];
        let reqElem = document.getElementById(reqId);
        if (!reqElem || !reqElem.classList.contains("aprobada")) {
            return false; // Encontró un requisito no aprobado
        }
    }
    return true; // Todas aprobadas
}

// Función para actualizar el estado de desbloqueo de las materias
function actualizarDesbloqueo() {
    for (let i = 0; i < materias.length; i++) {
        let materia = materias[i];
        let id = materia.id;

        if (todasCorrelativasAprobadas(id)) {
            materia.classList.remove("bloqueada");
        } else {
            materia.classList.add("bloqueada");
            materia.classList.remove("aprobada"); // Si no cumple requisitos no puede estar aprobada
        }
    }
}

// Inicializar el estado al cargar la página
actualizarDesbloqueo();

for (let i = 0; i < materias.length; i++) {
    let materia = materias[i];

    materia.addEventListener("click", function() {
        let id = materia.id;

        // Si está bloqueada, no hacer nada
        if (materia.classList.contains("bloqueada")) return;

        // Si ya está aprobada, la desaprobamos
        if (materia.classList.contains("aprobada")) {
            materia.classList.remove("aprobada");
        } else {
            // Si no está aprobada, la aprobamos (solo si puede)
            if (todasCorrelativasAprobadas(id)) {
                materia.classList.add("aprobada");
            } else {
                alert("No podes aprobar esta materia porque no cumplís con todos los requisitos.");
                return;
            }
        }

        // Actualizamos los desbloqueos tras este cambio
        actualizarDesbloqueo();
    });
}