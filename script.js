// Reemplazá con el ID de tu hoja
const SHEET_ID = '1lw15yJQVb4EktYMaCKSDkPG8g16lOd7PDO_baK4KtgM'; 
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

async function loadSheetData() {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();

    // El JSON de Google Sheets viene envuelto en texto, así que lo limpiamos:
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows.map(r => r.c.map(c => c?.v));

    renderTable(rows);
  } catch (error) {
    document.getElementById('data-container').innerText = 'Error al cargar los datos 😢';
    console.error(error);
  }
}

function renderTable(rows) {
  if (!rows.length) return;
  const container = document.getElementById('data-container');

  let html = '<table><thead><tr>';
  rows[0].forEach(header => (html += `<th>${header}</th>`));
  html += '</tr></thead><tbody>';

  rows.slice(1).forEach(row => {
    html += '<tr>';
    row.forEach(cell => (html += `<td>${cell ?? ''}</td>`));
    html += '</tr>';
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

loadSheetData();
