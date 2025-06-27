document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".notiFlex");
    let vis = document.getElementsByClassName("vistas");
    let vistas = Array.from(vis);

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            vistas.forEach(vista => vista.classList.remove("active"));
            const target = document.getElementById(`entre${index + 1}`);
            if (target) {
                target.classList.add("active");
            }

            // Resaltar el botón activo
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });
});
