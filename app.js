document.addEventListener('DOMContentLoaded', () => {

    const productoInput = document.getElementById('producto');
    const precioInput = document.getElementById('precio');
    const agregarBtn = document.getElementById('btn-agregar');
    const listaProductos = document.getElementById('lista-productos');
    const totalSpan = document.getElementById('total');
    const contadorSpan = document.getElementById('contador-productos');

    let total = 0;
    let contadorProductos = 0;

    // --- FUNCIÓN PARA FORMATEAR EL PRECIO MIENTRAS SE ESCRIBE ---
    precioInput.addEventListener('input', (e) => {
        let value = e.target.value;
        // 1. Quitar cualquier caracter que no sea un dígito
        value = value.replace(/\D/g, '');
        // 2. Formatear con puntos de mil
        value = new Intl.NumberFormat('es-CO').format(value);
        // 3. Actualizar el valor del input, si está vacío no pone nada
        e.target.value = value === '0' ? '' : value;
    });

    agregarBtn.addEventListener('click', () => {
        const producto = productoInput.value.trim();
        // Obtener el precio y quitarle los puntos para poder convertirlo a número
        const precioString = precioInput.value.replace(/\./g, '');
        const precio = parseFloat(precioString);

        if (producto === '' || isNaN(precio) || precio <= 0) {
            alert('Por favor, ingresa un producto y un precio válido.');
            return;
        }

        // --- ACTUALIZAR CONTADOR Y TOTAL ---
        contadorProductos++;
        total += precio;

        // --- FORMATEAR VALORES PARA MOSTRAR ---
        const formatoMoneda = {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        };
        const precioFormateado = new Intl.NumberFormat('es-CO', formatoMoneda).format(precio);
        const totalFormateado = new Intl.NumberFormat('es-CO', formatoMoneda).format(total);

        // --- CREAR Y AGREGAR EL NUEVO ELEMENTO A LA LISTA ---
        const nuevoItem = document.createElement('li');
        // Usamos spans para poder darles estilos diferentes si se necesita
        nuevoItem.innerHTML = `<span class="product-name">${producto}</span> <span class="product-price">${precioFormateado}</span>`;
        listaProductos.appendChild(nuevoItem);

        // --- ACTUALIZAR VISUALES ---
        contadorSpan.textContent = contadorProductos;
        totalSpan.textContent = totalFormateado;

        // Limpiar los campos
        productoInput.value = '';
        precioInput.value = '';
        productoInput.focus();
    });
});