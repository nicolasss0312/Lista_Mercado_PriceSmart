document.addEventListener('DOMContentLoaded', () => {

    // --- SELECCIÓN DE ELEMENTOS ---
    const productoInput = document.getElementById('producto');
    const precioInput = document.getElementById('precio');
    const agregarBtn = document.getElementById('btn-agregar');
    const listaProductos = document.getElementById('lista-productos');
    const totalSpan = document.getElementById('total');
    const contadorSpan = document.getElementById('contador-productos');

    // --- VARIABLES GLOBALES ---
    let total = 0;
    let contadorProductos = 0;
    const formatoMoneda = {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    };

    // --- FUNCIÓN PARA ACTUALIZAR LOS TOTALES EN PANTALLA ---
    function actualizarTotales() {
        contadorSpan.textContent = contadorProductos;
        totalSpan.textContent = new Intl.NumberFormat('es-CO', formatoMoneda).format(total);
    }

    // --- EVENTO PARA FORMATEAR EL PRECIO MIENTRAS SE ESCRIBE ---
    precioInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value ? new Intl.NumberFormat('es-CO').format(value) : '';
    });

    // --- EVENTO PARA AGREGAR PRODUCTO ---
    agregarBtn.addEventListener('click', () => {
        const producto = productoInput.value.trim();
        const precioString = precioInput.value.replace(/\./g, '');
        const precio = parseFloat(precioString);

        if (producto === '' || isNaN(precio) || precio <= 0) {
            alert('Por favor, ingresa un producto y un precio válido.');
            return;
        }

        contadorProductos++;
        total += precio;

        const precioFormateado = new Intl.NumberFormat('es-CO', formatoMoneda).format(precio);

        const nuevoItem = document.createElement('li');
        // Guardamos el precio numérico en un 'data attribute' para poderlo recuperar al borrar
        nuevoItem.dataset.price = precio;
        nuevoItem.innerHTML = `
            <span class="product-name">${producto}</span>
            <span class="product-price">${precioFormateado}</span>
            <button class="delete-btn">❌</button>
        `;
        listaProductos.appendChild(nuevoItem);

        actualizarTotales();

        productoInput.value = '';
        precioInput.value = '';
        productoInput.focus();
    });

    // --- EVENTO PARA ELIMINAR PRODUCTO (USANDO DELEGACIÓN DE EVENTOS) ---
    listaProductos.addEventListener('click', (e) => {
        // Si el elemento clickeado es un botón de eliminar
        if (e.target.classList.contains('delete-btn')) {
            const itemParaEliminar = e.target.parentElement;
            const precioItem = parseFloat(itemParaEliminar.dataset.price);

            // Actualizar totales
            total -= precioItem;
            contadorProductos--;
            actualizarTotales();

            // Añadir clase para la animación de salida
            itemParaEliminar.classList.add('fade-out');

            // Esperar que la animación termine para borrar el elemento del DOM
            setTimeout(() => {
                itemParaEliminar.remove();
            }, 500); // 500ms, igual que la duración de la animación
        }
    });
});