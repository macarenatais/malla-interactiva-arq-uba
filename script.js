const materias = [
  { nombre: "ICSE", nivel: 1 },
  { nombre: "IPC", nivel: 1 },
  { nombre: "ICP1", nivel: 1 },
  { nombre: "ICP2", nivel: 1 },
  { nombre: "Matemática", nivel: 1 },
  { nombre: "Filosofía", nivel: 1 },
  { nombre: "T. de Dibujo", nivel: 1 },

  { nombre: "AI", nivel: 2, correlativas: ["ICSE", "IPC", "ICP1", "ICP2", "Matemática", "Filosofía", "T. de Dibujo"] },
  { nombre: "IAC", nivel: 2, correlativas: ["ICSE", "IPC", "ICP1", "ICP2", "Matemática", "Filosofía", "T. de Dibujo"] },
  { nombre: "SRG", nivel: 2, correlativas: ["ICSE", "IPC", "ICP1", "ICP2", "Matemática", "Filosofía", "T. de Dibujo"] },
  { nombre: "ITC", nivel: 2, correlativas: ["ICSE", "IPC", "ICP1", "ICP2", "Matemática", "Filosofía", "T. de Dibujo"] },
  { nombre: "ITE", nivel: 2, correlativas: ["ICSE", "IPC", "ICP1", "ICP2", "Matemática", "Filosofía", "T. de Dibujo"] },
  { nombre: "FAA", nivel: 2, correlativas: ["ICSE", "IPC", "ICP1", "ICP2", "Matemática", "Filosofía", "T. de Dibujo"] },
  { nombre: "MAT2", nivel: 2, correlativas: ["ICSE", "IPC", "ICP1", "ICP2", "Matemática", "Filosofía", "T. de Dibujo"] },

  { nombre: "A2", nivel: 3, correlativas: ["A1", "SRG", "ITC"] },
  { nombre: "RA", nivel: 3, correlativas: ["SRG"] },
  { nombre: "H1", nivel: 3, correlativas: ["IAC"] },
  { nombre: "M1", nivel: 3, correlativas: ["SRG"] },
  { nombre: "C1", nivel: 3, correlativas: ["ITC", "ITE", "MAT2"] },
  { nombre: "E1", nivel: 3, correlativas: ["ITC", "ITE", "MAT2"] },
  { nombre: "I1", nivel: 3, correlativas: ["ITC", "FAA", "MAT2"] },

  { nombre: "A3", nivel: 4, correlativas: ["A2", "M1", "RA", "IAC", "C1", "I1", "E1"] },
  { nombre: "MP", nivel: 4, correlativas: ["A2", "M1", "RA", "IAC", "C1", "I1", "E1"] },
  { nombre: "M2", nivel: 4, correlativas: ["A1", "M1", "RA"] },
  { nombre: "H2", nivel: 4, correlativas: ["A1", "SRG", "H1"] },
  { nombre: "C2", nivel: 4, correlativas: ["A1", "SRG", "C1"] },
  { nombre: "E2", nivel: 4, correlativas: ["A1", "SRG", "C1", "E1"] },
  { nombre: "I2", nivel: 4, correlativas: ["A1", "SRG", "C1", "I1"] },

  { nombre: "A4", nivel: 5, correlativas: ["IAC", "ITC", "ITE", "FAA", "MAT2", "A3", "M2", "MP", "H1", "E1", "I2", "C2"] },
  { nombre: "T", nivel: 5, correlativas: ["IAC", "ITC", "ITE", "FAA", "MAT2", "A3", "M2", "MP", "H1", "E1", "I1", "C1"] },
  { nombre: "H3", nivel: 5, correlativas: ["IAC", "ITC", "ITE", "FAA", "MAT2", "A2", "M1", "RA", "H2"] },
  { nombre: "C3", nivel: 5, correlativas: ["IAC", "ITC", "ITE", "FAA", "MAT2", "A2", "M1", "RA", "C2"] },
  { nombre: "E3", nivel: 5, correlativas: ["IAC", "ITC", "ITE", "FAA", "MAT2", "A2", "M1", "RA", "E2"] },
  { nombre: "I3", nivel: 5, correlativas: ["IAC", "ITC", "ITE", "FAA", "MAT2", "A2", "M1", "RA", "C2", "I2"] },
  { nombre: "PU", nivel: 5, correlativas: ["IAC", "ITC", "ITE", "FAA", "MAT2", "A3", "M1", "RA", "H1", "E1", "I1", "H2"] },
  { nombre: "PPA", nivel: 5, correlativas: ["A3", "MP", "M2", "H2", "C2", "E2", "I2"] },

  { nombre: "Proy. Urb.", nivel: 6, correlativas: ["A4", "H1", "C1", "E1", "I1", "T", "H3", "C3", "E3", "I3"] },
  { nombre: "Proy. Arq.", nivel: 6, correlativas: ["Proy. Urb."] },
  { nombre: "DLO", nivel: 6, correlativas: ["A4", "H1", "C1", "E1", "I1", "H2", "C2", "E2", "I2", "C3", "I3"] },
  { nombre: "DPC", nivel: 6, correlativas: ["A2", "M1", "RA", "IAC", "C1", "I1", "E1"] },
  { nombre: "Práctica Inv.", nivel: 6, correlativas: ["A1", "IAC", "SRG", "ITC", "ITE", "FAA", "MAT2"] }
];

const estado = JSON.parse(localStorage.getItem("estadoMaterias")) || {};
const contenedor = document.getElementById("niveles");

const nivelesAgrupados = {};
materias.forEach(m => {
  if (!nivelesAgrupados[m.nivel]) nivelesAgrupados[m.nivel] = [];
  nivelesAgrupados[m.nivel].push(m);
});

const nivelDivs = {};

function render() {
  contenedor.innerHTML = "";

  for (const nivel in nivelesAgrupados) {
    const grupo = document.createElement("div");
    grupo.className = "nivel";
    grupo.dataset.nivel = nivel;

    const titulo = document.createElement("h2");
    titulo.dataset.nivel = nivel;
    grupo.appendChild(titulo);
    nivelDivs[nivel] = { grupo, titulo };

    nivelesAgrupados[nivel].forEach(m => {
      const div = document.createElement("div");
      div.className = "materia";
      div.textContent = m.nombre;

      div.dataset.nombre = m.nombre;
      div.dataset.nivel = m.nivel;
      if (m.correlativas) div.dataset.correlativas = m.correlativas.join(",");

      div.addEventListener("click", () => {
        const estadoActual = estado[m.nombre];
        if (estadoActual === "aprobada") {
          delete estado[m.nombre];
        } else if (estadoActual === "cursada") {
          estado[m.nombre] = "aprobada";
        } else {
          estado[m.nombre] = "cursada";
        }

        localStorage.setItem("estadoMaterias", JSON.stringify(estado));
        updateUI();
      });

      grupo.appendChild(div);
    });

    contenedor.appendChild(grupo);
  }

  updateUI();
}

function updateUI() {
  document.querySelectorAll(".materia").forEach(div => {
    const nombre = div.dataset.nombre;
    const correlativas = div.dataset.correlativas ? div.dataset.correlativas.split(",") : [];
    const habilitada = correlativas.length === 0 || correlativas.every(c => estado[c] === "aprobada");

    const estadoActual = estado[nombre];
    div.className = "materia";

    if (estadoActual === "aprobada") {
      div.classList.add("aprobada");
    } else if (estadoActual === "cursada") {
      div.classList.add("cursada");
    } else if (habilitada) {
      div.classList.add("habilitada");
    } else {
      div.classList.add("bloqueada");
    }
  });

  for (const nivel in nivelesAgrupados) {
    const total = nivelesAgrupados[nivel].length;
    const aprobadasNivel = nivelesAgrupados[nivel].filter(m => estado[m.nombre] === "aprobada").length;
    nivelDivs[nivel].titulo.textContent = `${nivel}º Nivel (${aprobadasNivel}/${total})`;
  }
}

render();
