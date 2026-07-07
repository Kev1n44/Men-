// Elementos existentes
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupText = document.getElementById('popup-text');
const popupClose = document.getElementById('popup-close');
const sudokuContainer = document.getElementById('sudoku-container');
const planets = document.querySelectorAll('.planet');

const planetMessages = {
  1: { title: "☕ Bebidas calientes ☕", text: "- Americano ......... 4.500\n- Americano doble ......... 7.500\n- Colombianazo ......... 5.500\n- Latte ......... 6.000\n- Capuccino ......... 7.500\n- Capuccino  maní ......... 10.500\n- Capuccino de vainilla ......... 8.000\n- Capuccino con amaretto ......... 10.000\n- Capuccino con crema de whiskey ......... 11.000\n- Afogatto ......... 8.000\n- Afogatto maní ......... 10.000\n- Espresso ......... 4.000\n- Espresso doble ......... 7.000\n- Café bombón ......... 8.000\n- Te chai caliente ......... 8.500\n- Milo caliente ......... 7.000\n- Chocolate caliente en agua ......... 5.000\n- Chocolate caliente en leche ......... 6.500\n- Chocolate en leche con masmelos ......... 8.500\n- Chocolate caliente en leche de avena ......... 8.000\n- Aromática (frutos rojos o frutos amarillos) ......... 7.000\n- Aromática de bolsita ......... 3.000" },
  2: { title: "🧁 Productos dulces 🧁", text: "- Torta de temporada ......... 12.000\n- Torta de almojábana ......... 11.000\n- Torta de chocolate ......... 8.000\n- Torta de zanahoria ......... 10.000\n- Vasca tradicional ......... 14.000\n- Vasca de limón ......... 14.000\n- Vasca de chocolate ......... 14.000\n- Flan de queso ricotta ......... 12.500\n- Torta de limón y amapola ......... 12.500\n- Brownie ......... 7.000\n Brownie con helado ......... 12.000\n- Alfajor ......... 4.000\n- Galleta rellena de nutella ......... 7.000\n- Galleta rellena de nutella y helado ......... 11.000\n- Copa frutos rojos ......... 16.000\n- Copa brownie ......... 16.000" },
  3: { title: "🥐 Productos salados 🥐", text: "- Pastel napolitano .......... 7.500\n- Palito de queso ......... 5.000\n- Pastel de carne y chicharrón ......... 7.500\n- Pastel de queso, tocineta y arequipe ......... 7.500\n- Waffle enyucado ........ 11.000\n- Waffle enyucado con mermelada ........ 13.000\n- Palito de carne y queso ........ 7.500\n- Pan de maíz con quesocrema ........ 5.000\n- Buñuelo de pandeyuca y mermelada ........ 4.000" },
  4: { title: "🥤 Bebidas frías 🥤", text: "- Coca cola 237ml ......... 4.000\n- Qatro 237ml ......... 4.000\n- Bretaña ........ 5.000\n- Soda Hatsu ........ 6.500\n- Te Hatsu ........ 7.000\n- Soda saborizada (frutos rojos o amarillos) ......... 11.000\n- Milo frío ......... 7.500\n- Te chai frío ......... 9.000\n- Latte frío ......... 9.000\n- Latte de óreo ......... 11.000\n- Latte chai ......... 11.000\n- Capuccino frío ......... 9.000\n- Limonada de café ......... 10.000\n- Limonada de coco ......... 11.000\n- Limonada de cereza ......... 11.000\n- Limonada de mango biche ......... 11.000\n- Botella de agua ......... 3.000" },
  5: { title: "🍺 Licores 🍺", text: "- Heineken 330ml ....... 9.500\n- Costeñita ....... 5.000\n- Poker ......... 5.500\n- Águila ......... 5.500\n- Águila light ......... 5.500\n- Club Colombia trigo o dorada ......... 7.000\n- 3 cordilleras rosada, negra o roja ......... 9.000\n- Hidromiel ......... 20.000\n- 1/2 Aguardiente rojo ......... 45.000\n- 1/2 Ron de caldas ......... 50.000\n- Trago de aguardiente rojo ......... 5.000\n- Trago de aguardiente azul ......... 4.500\n- Trago de Ron de Caldas ......... 5.500\n- Trago de Baileys ......... 10.000\n- Copa de vino ......... 13.000" },
  6: { title: "🎲 Juegos de mesa 🎲", text: "- Carcassonne\n- Catán\n- Uno\n- Dos\n- Virus\n- Naipes\n- Parqués\n- Get on board\n- Dominó\n- Jenga\n- Ticket to ride\n- Hues and cues\n- Sushi Go\n- The mind\n- Pictionary\n- Scrabble\n- Azul\n- Risk\n- Basta 2.0\n- Looping plane\n- Polilla tramposa\n- Fantasma Blitz\n- Monopoly Deal\n- Flip 7\n- Ajedrez\n- Take 6\n- Astucia naval\n- Spot it\n- Gatitos explosivos\n- Cabo\n- Cranium\n- Adivina Quién\n- Sling Hockey\n- Sleeping queens\n- Cockroach poker\n- Bandido\n- Cards vs Gravity\n- Taco, gato, cabra, queso, pizza\n- Naipes\n- Tinderblox\n- Kollide\n- King Domino\n- Go Town\n- Mor-c (de la casa)\n- Creactiva (de la casa)\n- Monta la ola (de la casa)\n- Incoleto (de la casa)\n- Palabras de pelos (de la casa)" },
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
