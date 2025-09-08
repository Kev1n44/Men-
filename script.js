<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema Solar Interactivo</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            color: #fff;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }

        h1 {
            text-align: center;
            margin-bottom: 30px;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .solar-system {
            position: relative;
            width: 600px;
            height: 600px;
            margin: 0 auto;
        }

        .sun {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            background: radial-gradient(circle, #ffd700, #ff8c00, #ff4500);
            border-radius: 50%;
            box-shadow: 0 0 50px #ff4500, 0 0 100px #ff8c00;
            cursor: pointer;
            z-index: 10;
        }

        .orbit {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50%;
        }

        .planet {
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transform: translate(-50%, -50%);
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: bold;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .planet:hover {
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        }

        .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(15, 32, 39, 0.95);
            border: 2px solid #2c5364;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
            z-index: 1000;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
        }

        .popup-content {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            border-bottom: 1px solid #2c5364;
            padding-bottom: 10px;
        }

        #popup-title {
            margin: 0;
            color: #ffd700;
            text-align: center;
            flex-grow: 1;
        }

        .popup-body {
            flex-grow: 1;
            overflow-y: auto;
            max-height: 60vh;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.2);
        }

        #popup-text {
            white-space: pre-line;
            line-height: 1.6;
            margin: 0;
        }

        .sudoku-table {
            border-collapse: collapse;
            margin: 0 auto;
            width: 100%;
            max-width: 450px;
        }

        .sudoku-cell {
            width: 40px;
            height: 40px;
            border: 1px solid #ccc;
            text-align: center;
            font-size: 20px;
            background-color: rgba(255, 255, 255, 0.9);
            color: #333;
        }

        .sudoku-cell:focus {
            outline: 2px solid #ff8c00;
            background-color: #fff;
        }

        .popup-footer {
            display: flex;
            justify-content: center;
        }

        #popup-close {
            background: linear-gradient(to bottom, #ff8c00, #ff4500);
            color: white;
            border: none;
            padding: 10px 25px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        #popup-close:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(255, 140, 0, 0.7);
        }

        .hidden {
            display: none;
        }

        .tooltip {
            position: absolute;
            background: rgba(15, 32, 39, 0.9);
            border: 1px solid #2c5364;
            padding: 8px 12px;
            border-radius: 5px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1001;
            max-width: 250px;
        }

        .tooltip.visible {
            opacity: 1;
        }

        /* Estilos para la barra de scroll */
        .popup-body::-webkit-scrollbar {
            width: 8px;
        }

        .popup-body::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
        }

        .popup-body::-webkit-scrollbar-thumb {
            background: #2c5364;
            border-radius: 4px;
        }

        .popup-body::-webkit-scrollbar-thumb:hover {
            background: #ff8c00;
        }

        @media (max-width: 768px) {
            .solar-system {
                width: 350px;
                height: 350px;
            }
            
            .planet {
                width: 30px;
                height: 30px;
                font-size: 12px;
            }
            
            .sun {
                width: 50px;
                height: 50px;
            }
            
            .sudoku-cell {
                width: 30px;
                height: 30px;
                font-size: 16px;
            }
        }
    </style>
</head>
<body>
    <h1>☕ Café Sistema Solar ☕</h1>
    
    <div class="solar-system">
        <div class="sun" data-popup="0"></div>
        
        <div class="orbit" style="width: 150px; height: 150px;"></div>
        <div class="planet" data-popup="1" style="top: 50%; left: calc(50% + 75px); background: linear-gradient(to bottom, #8B4513, #A0522D);">P1</div>
        
        <div class="orbit" style="width: 200px; height: 200px;"></div>
        <div class="planet" data-popup="2" style="top: calc(50% - 100px); left: 50%; background: linear-gradient(to bottom, #FFD700, #DAA520);">P2</div>
        
        <div class="orbit" style="width: 250px; height: 250px;"></div>
        <div class="planet" data-popup="3" style="top: 50%; left: calc(50% - 125px); background: linear-gradient(to bottom, #32CD32, #228B22);">P3</div>
        
        <div class="orbit" style="width: 300px; height: 300px;"></div>
        <div class="planet" data-popup="4" style="top: calc(50% + 150px); left: 50%; background: linear-gradient(to bottom, #1E90FF, #0000FF);">P4</div>
        
        <div class="orbit" style="width: 350px; height: 350px;"></div>
        <div class="planet" data-popup="5" style="top: 50%; left: calc(50% + 175px); background: linear-gradient(to bottom, #FF6347, #DC143C);">P5</div>
        
        <div class="orbit" style="width: 400px; height: 400px;"></div>
        <div class="planet" data-popup="6" style="top: calc(50% - 200px); left: 50%; background: linear-gradient(to bottom, #9370DB, #4B0082);">P6</div>
        
        <div class="orbit" style="width: 450px; height: 450px;"></div>
        <div class="planet" data-popup="7" style="top: 50%; left: calc(50% - 225px); background: linear-gradient(to bottom, #FF69B4, #C71585);">P7</div>
    </div>
    
    <div id="popup" class="popup hidden">
        <div class="popup-content">
            <div class="popup-header">
                <h2 id="popup-title"></h2>
            </div>
            <div class="popup-body">
                <p id="popup-text"></p>
                <div id="sudoku-container" class="hidden"></div>
            </div>
            <div class="popup-footer">
                <button id="popup-close">Aceptar</button>
            </div>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Elementos existentes
            const popup = document.getElementById('popup');
            const popupTitle = document.getElementById('popup-title');
            const popupText = document.getElementById('popup-text');
            const popupClose = document.getElementById('popup-close');
            const sudokuContainer = document.getElementById('sudoku-container');
            const planets = document.querySelectorAll('.planet');

            const planetMessages = {
              1: { title: "☕ Bebidas calientes ☕", text: "- Americano ......... 4.000\n- Americano doble ......... 5.000\n- Colombianazo ......... 5.000\n- Latte ......... 5.000\n- Capuccino ......... 6.500\n- Capuccino  maní ......... 9.500\n- Capuccino de vainilla ......... 7.000\n- Capuccino con amaretto ......... 8.500\n- Capuccino de baileys ......... 9.500\n- Afogatto ......... 7.000\n- Espresso ......... 3.000\n- Espresso doble ......... 5.000\n- Café bombón ......... 6.500\n- Milo caliente ......... 6.000\n- Te chai caliente ......... 8.000\n- Chocolate caliente en agua ......... 4.000\n- Chocolate caliente en leche ......... 5.000\n- Chocolate caliente en leche de almendras ......... 7.000\n- Aromática (frutos rojos o frutos amarillos) ......... 6.500" },
              2: { title: "🧁 Productos dulces 🧁", text: "- Tarta de zanahoria ......... 8.500\n- Torta de temporada ......... 9.000\n- Torta de chocolate ......... 11.000\n- Torta de almojábana ......... 10.000\n- Vasca tradicional ......... 12.000\n- Vasca de limón ......... 13.000\n- Pastel de arequipe y queso ......... 5.500\n- Brownie ......... 6.000\n- Brownie con helado ......... 11.000\n- Alfajor ......... 4.000\n- Galleta rellena de nutella o mantequilla de maní ......... 6.000\n- Galleta rellena de nutella o mantequilla de maní y helado ......... 10.000\n- Croissant con fresas ......... 10.000" },
              3: { title: "🥐 Productos salados 🥐", text: "- Palito de queso ......... 5.000\n- Waffle enyucado con queso ........ 10.000\n- Waffle enyucado con queso y mermelada ........ 12.000\n- Pastel de tocineta y espinaca ......... 5.500\n- Pastel de carne y chicharrón ......... 6.500\n- Pastel napolitano ......... 6.500\n- Palito de carne y queso ......... 6.500\n- Croissant de mantequilla ......... 5.500\n- Buñuelo de pandeyuca y mermelada ......... 3.000" },
              4: { title: "🥤 Bebidas frías 🥤", text: "- Coca cola 350ml .......... 5.000\n- Coca cola 250ml ......... 3.500\n- Qatro ......... 5.000\n- Bretaña ........ 4.000\n- Soda Hatsu ........ 5.500\n- Soda saborizada (frutos rojos o frutos amarillos) ........ 10.000\n- Milo frío ......... 6.500\n- Te chai frío ......... 8.500\n- Jugo de mora en agua ......... 6.000\n- Jugo de mora en leche ......... 7.000\n- Limonada de coco ......... 7.500\n- Botella de agua ......... 2.000" },
              5: { title: "🍺 Licores 🍺", text: "- Costeñita ....... 4.500\n- Corona ......... 8.500\n- Heineken ......... 9.000\n- Póker ......... 5.000\n- Águila ......... 5.500\n- Águila light ......... 5.500\n- Club Colombia ......... 5.500\n- Stella ......... 10.000\n- 3 Cordilleras rosada ......... 8.000\n- 3 Cordilleras negra ......... 8.500\n- 1/2 Aguardiente rojo ......... 45.000\n- 1/2 Ron de caldas ......... 45.000\n- Trago de aguardiente ......... 4.000\n- Trago de Ron de Caldas ......... 5.000\n- Copa de vino ......... 11.000" },
              6: { title: "🎲 Juegos de mesa 🎲", text: "- Carcassonne\n- Catán\n- Uno\n- Virus\n- Naipes\n- Parqués\n- Get on board\n- Dominó\n- Jenga\n- Ticket to ride\n- Hues and cues\n- Sushi Go\n- The mind\n- Pictionary\n- Scrabble\n- Azul\n- Risk\n- Basta 2.0\n- Looping plane\n- Polilla tramposa\n- Fantasma Blitz\n- Astucia naval\n- Cards vs Gravity\n- Spot it\n- Dos\n- Rummy Q\n- Adivina quién\n- Flip 7\n- Cabo\n- Sleeping Queens\n- Cranium\n- Take 6\n- Hockey elástico\n- Gatitos explosivos\n- Monopoly Deal\n- Bandido\n- Cockroach Poker\n- Ajedrez\n- Trastreo (de la casa)\n- Duelistas (de la casa)\n- Ranas y moscas (de la casa)\n- Morse (de la casa)" },
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

                // Verificar si existe el mensaje para este planeta
                if (!planetMessages[id]) {
                    console.error("No se encontró mensaje para el planeta con id:", id);
                    return;
                }

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
        });
    </script>
</body>
</html>