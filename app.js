document.addEventListener('DOMContentLoaded', () => {

    // --- SELECCIÓN DE ELEMENTOS ---
    const productoInput = document.getElementById('producto');
    const cantidadInput = document.getElementById('cantidad'); // Nuevo elemento
    const precioInput = document.getElementById('precio');
    const agregarBtn = document.getElementById('btn-agregar');
    const listaProductos = document.getElementById('lista-productos');
    const totalSpan = document.getElementById('total');
    const contadorSpan = document.getElementById('contador-productos');

    // --- VARIABLES Y FORMATOS ---
    let total = 0;
    let contadorProductos = 0;
    const formatoMoneda = {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    };

    function actualizarTotales() {
        contadorSpan.textContent = contadorProductos;
        totalSpan.textContent = new Intl.NumberFormat('es-CO', formatoMoneda).format(total);
    }

    precioInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value ? new Intl.NumberFormat('es-CO').format(value) : '';
    });

    // --- LÓGICA PRINCIPAL AL AGREGAR ---
    agregarBtn.addEventListener('click', () => {
        const producto = productoInput.value.trim();
        const cantidad = parseInt(cantidadInput.value, 10); // Obtener cantidad
        const precioString = precioInput.value.replace(/\./g, '');
        const precio = parseFloat(precioString);

        // Validación mejorada
        if (producto === '' || isNaN(precio) || precio <= 0 || isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor, ingresa un producto, cantidad y precio válidos.');
            return;
        }
        
        // --- CÁLCULOS ACTUALIZADOS ---
        const precioTotalItem = precio * cantidad; // Multiplicar precio por cantidad
        
        contadorProductos += cantidad; // El contador ahora suma la cantidad de unidades
        total += precioTotalItem; // El total general suma el precio total del item

        const precioTotalItemFormateado = new Intl.NumberFormat('es-CO', formatoMoneda).format(precioTotalItem);

        // --- CREAR Y AGREGAR EL NUEVO ELEMENTO A LA LISTA ---
        const nuevoItem = document.createElement('li');
        // Guardamos el precio total del item (precio x cantidad) para que el botón de eliminar funcione bien
        nuevoItem.dataset.price = precioTotalItem;
        // Guardamos también la cantidad para poderla restar del contador al eliminar
        nuevoItem.dataset.quantity = cantidad;
        
        // Se añade la cantidad a la descripción del producto
        nuevoItem.innerHTML = `
            <span class="product-quantity">(${cantidad}x)</span>
            <span class="product-name">${producto}</span>
            <span class="product-price">${precioTotalItemFormateado}</span>
            <button class="delete-btn">❌</button>
        `;
        listaProductos.appendChild(nuevoItem);

        actualizarTotales();

        // Limpiar campos y resetear cantidad a 1
        productoInput.value = '';
        precioInput.value = '';
        cantidadInput.value = 1; 
        productoInput.focus();
    });

    // --- LÓGICA DE ELIMINACIÓN ACTUALIZADA ---
    listaProductos.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const itemParaEliminar = e.target.parentElement;
            const precioItem = parseFloat(itemParaEliminar.dataset.price);
            const cantidadItem = parseInt(itemParaEliminar.dataset.quantity, 10);

            // Actualizar totales restando los valores guardados
            total -= precioItem;
            contadorProductos -= cantidadItem;
            actualizarTotales();

            itemParaEliminar.classList.add('fade-out');

            setTimeout(() => {
                itemParaEliminar.remove();
            }, 500);
        }
    });
});