// Elementos existentes
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupText = document.getElementById('popup-text');
const popupClose = document.getElementById('popup-close');
const sudokuContainer = document.getElementById('sudoku-container');
const planets = document.querySelectorAll('.planet');

const planetMessages = {
  1: { title: "☕ Bebidas calientes ☕", text: "- Americano ......... 4.000\n- Americano doble ......... 5.000\n- Latte ......... 5.000\n- Capuccino ......... 6.500\n- Capuccino  maní ......... 9.500\n- Capuccino de vainilla ......... 7.000\n- Capuccino con amaretto ......... 8.500\n- Capuccino de baileys ......... 9.500\n- Afogatto ......... 7.000\n- Espresso ......... 3.000\n- Espresso doble ......... 5.000\n- Café bombón ......... 6.500\n- Milo caliente ......... 6.000\n- Te chai caliente ......... 8.000\n- Chocolate caliente en agua ......... 3.000\n- Chocolate caliente en leche ......... 5.000\n- Aromática (frutos rojos o frutos amarillos) ......... 6.500" },
  2: { title: "🧁 Productos dulces 🧁", text: "- Pastel de arequipe ........... 4.000\n- Canelón ......... 4.500\n- Torta de zanahoria ......... 8.500\n- Torta de frutos rojos y arándanos ......... 8.500\n- Torta de temporada ......... 9.000\n- Cheesecake vasco ......... 12.000\n- Brownie ......... 5.500\n- Brownie con helado ......... 10.000\n- Alfajor ......... 3.000\n- Galleta rellena de nutella ......... 6.000\n- Galleta rellena de nutella y helado ......... 10.000\n- Galletica con chips de chocolate ......... 2.000\n- Croissant con fresas ......... 10.000" },
  3: { title: "🥐 Productos salados 🥐", text: "- Pastel de jamón y queso .......... 4.500\n- Palito de queso ......... 4.500\n- Waffle enyucado con queso ........ 10.000\n- Pastel de tocineta y espinaca ......... 5.000\n- Pastel de carne y chicharrón ......... 6.500\n- Pastel de carne molida y mozzarella ......... 6.500\n- Waffle enyucado con queso y mermelada ........ 12.000\n- Pastel de pollo y champiñones ......... 5.000\n- Pandebono ......... 4.500\n- Croissant de mantequilla ......... 5.500\n- Buñuelo de pandeyuca y mermelada ......... 2.500\n- Platanitos con sour cream ......... 8.500" },
  4: { title: "🥤 Bebidas frías 🥤", text: "- Coca cola .......... 4.000\n- Qatro ......... 4.000\n- Bretaña ........ 4.000\n- Soda Hatsu ........ 5.500\n- Soda saborizada (frutos rojos o frutos amarillos) ........ 9.000\n- Cold Brew tradicional ........ 7.500\n- Cold Brew Arbóreo  ........ 9.000\n- Milo frío ......... 6.500\n- Te chai frío ......... 8.500\n- Botella de agua ......... 2.000" },
  5: { title: "🍺 Licores 🍺", text: "- Heineken ........ 9.000\n- Costeñita ....... 4.500\n- Corona ......... 8.500\n- Poker ......... 5.000\n- Águila ......... 5.000\n- Águila light ......... 5.500\n- Club Colombia ......... 5.500\n- Stella ......... 10.000\n- Corona ......... 8.500\n- 3 Cordillrras rosada ......... 7.000\n- 1/2 Aguardiente ......... 40.000\n- 1/2 Ron de caldas ......... 45.000\n- Trago de aguardiente ......... 4.000\n- Trago de Ron de Caldas ......... 5.000\n- Copa de vino ......... 11.000" },
  6: { title: "🎲 Juegos de mesa 🎲", text: "- Carcassonne\n- Catán\n- Uno\n- Virus\n- Naipes\n- Parqués\n- Get on board\n- Dominó\n- Jenga\n- Ticket to ride\n- Hues and cues\n- Sushi Go\n- The mind\n- Monopoly (Mario Bros)\n- Pictionary\n- Scrabble\n- Azul\n- Risk\n- Basta 2.0\n- Looping plane\n- Polilla tramposa\n- Fantasma Blitz\n- Astucia naval\n- Cards vs Gravity\n- Trastreo (de la casa)\n- Duelistas (de la casa)\n- Ranas y moscas (de la casa)" },
  7: { title: "🧮 ¡Sudoku! 🧮", text: "" } // Sudoku específico
};

// Generador básico de Sudoku
function generateRandomSudoku() {
  const base = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const rows = shuffle([0, 1, 2]).concat(shuffle([3, 4, 5])).concat(shuffle([6, 7, 8]));
  const cols = shuffle([0, 1, 2]).concat(shuffle([3, 4, 5])).concat(shuffle([6, 7, 8]));

  return rows.map(row => cols.map(col => base[row][col]));
}

// Generar tablero de Sudoku en el contenedor
function renderSudokuBoard(container) {
  const board = generateRandomSudoku();
  container.innerHTML = "";

  const table = document.createElement('table');
  table.classList.add('sudoku-table');

  for (let i = 0; i < 9; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('td');
      cell.contentEditable = board[i][j] === 0;
      cell.textContent = board[i][j] !== 0 ? board[i][j] : "";
      cell.classList.add('sudoku-cell');

      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  container.appendChild(table);
}

// Validar Sudoku
function validateSudoku(container) {
  const rows = Array.from(container.querySelectorAll('tr')).map(row =>
    Array.from(row.querySelectorAll('td')).map(cell =>
      parseInt(cell.textContent) || 0
    )
  );

  // Validar filas
  const isValidRow = (row) => new Set(row.filter(n => n !== 0)).size === row.filter(n => n !== 0).length;

  // Validar columnas
  const isValidCol = (col) => new Set(rows.map(row => row[col]).filter(n => n !== 0)).size === rows.map(row => row[col]).filter(n => n !== 0).length;

  // Validar subcuadrículas
  const isValidGrid = (startRow, startCol) => {
    const nums = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        nums.push(rows[startRow + i][startCol + j]);
      }
    }
    return new Set(nums.filter(n => n !== 0)).size === nums.filter(n => n !== 0).length;
  };

  return (
    rows.every(isValidRow) &&
    rows[0].every((_, col) => isValidCol(col)) &&
    [0, 3, 6].every(row => [0, 3, 6].every(col => isValidGrid(row, col)))
  );
}

// Mostrar información en el popup al hacer clic en un planeta
planets.forEach(planet => {
  planet.addEventListener('click', () => {
    const id = planet.dataset.popup;

    // 1. Ocultar siempre el Sudoku cuando se hace clic en otro planeta (excepto P7)
    sudokuContainer.classList.add('hidden');
    
    // 2. Limpiar y ocultar cualquier contenido del Sudoku si ya está visible
    if (id !== '7') {
      sudokuContainer.innerHTML = ''; // Limpiar cualquier contenido de Sudoku
    }

    // 3. Mostrar la información del planeta
    popupTitle.textContent = planetMessages[id].title;

    // Si es el planeta P7, mostramos el Sudoku
    if (id === '7') {
      sudokuContainer.classList.remove('hidden');
      popupText.textContent = ''; // Limpiar texto para Sudoku
      renderSudokuBoard(sudokuContainer); // Generar tablero
    } else {
      popupText.textContent = planetMessages[id].text;
    }

    // Abrir el Popup
    popup.classList.remove('hidden');
  });
});

// Cerrar el popup con validación
popupClose.addEventListener('click', () => {
  if (popupTitle.textContent === planetMessages[7].title) {
    if (validateSudoku(sudokuContainer)) {
      alert("¡Buen trabajo!");
      popup.classList.add('hidden');
    } else {
      alert("Síguelo intentando");
    }
  } else {
    popup.classList.add('hidden');
  }
});



// Crear y gestionar el tooltip para mostrar títulos al pasar el cursor
const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
document.body.appendChild(tooltip);

planets.forEach(planet => {
  const id = planet.dataset.popup;
  const title = planetMessages[id]?.title || "Planeta desconocido";

  // Mostrar el tooltip al pasar el cursor
  planet.addEventListener('mouseover', (e) => {
    tooltip.textContent = title;
    tooltip.style.left = `${e.pageX + 10}px`; // Desplazamiento del cursor
    tooltip.style.top = `${e.pageY + 10}px`;
    tooltip.classList.add('visible');
  });

  // Mover el tooltip mientras el cursor se mueve
  planet.addEventListener('mousemove', (e) => {
    tooltip.style.left = `${e.pageX + 10}px`;
    tooltip.style.top = `${e.pageY + 10}px`;
  });

  // Ocultar el tooltip al salir del planeta
  planet.addEventListener('mouseout', () => {
    tooltip.classList.remove('visible');
  });
});