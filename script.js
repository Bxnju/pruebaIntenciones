document.addEventListener('DOMContentLoaded', function () {
    // Reemplaza 'ID_DE_TU_HOJA_DE_CÁLCULO' con el ID de tu hoja de cálculo.
    const spreadsheetId = '1tKrc0mqib5PPuiOiDtNAoXbMFtJKMrbpt529FOm1Z6Q';
    const sheetName = 'Respuestas_pruebas'; // Nombre de la hoja que contiene los datos.
    const apiKey = 'AIzaSyAnKtoEapc41RnXlfDeM-jgoOm4AMrCWsk'; // Tu clave de API.

    // URL para obtener datos de la hoja de cálculo.
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

    const fechaMasRecienteMostrada = localStorage.getItem('fechaMasRecienteMostrada') || '1/1/2000';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const values = data.values;
            const tableBody = document.querySelector('#data-table tbody');
            let nuevosRegistros = [];

            // Itera sobre los datos en orden inverso para obtener los registros más recientes primero, omitiendo la primera fila
            for (let i = values.length - 1; i > 0; i--) {
                const row = values[i];
                nuevosRegistros.push([row[1], row[2], row[3]]);
            }

            // Itera sobre los nuevos registros y crea filas para la tabla.
            nuevosRegistros.forEach(row => {
                const newRow = document.createElement('tr');
                row.forEach(cell => {
                    const newCell = document.createElement('td');
                    newCell.textContent = cell;
                    newRow.appendChild(newCell);
                });
                tableBody.appendChild(newRow);
            });
        })
        .catch(error => console.error('Error:', error));
});