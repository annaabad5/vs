// Genera pictogramas por cantidad
function generarIconos(selector, cantidad, tamaño = '👤') {
  const contenedor = document.querySelector(selector);
  const total = Math.round(cantidad);
  for (let i = 0; i < total; i++) {
    const icon = document.createElement('span');
    icon.textContent = tamaño;
    contenedor.appendChild(icon);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  generarIconos('.icons', 25);       // 255 millones / 10
  generarIconos('.icons.small', 11); // 114 millones / 10
});
