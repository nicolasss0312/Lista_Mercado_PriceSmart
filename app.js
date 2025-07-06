// Espera a que todo el contenido del HTML se cargue
document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleccionar los elementos del HTML
    const productoInput = document.getElementById('producto');
    const precioInput = document.getElementById('precio');
    const agregarBtn = document.getElementById('btn-agregar');
    const listaProductos = document.getElementById('lista-productos');
    const totalSpan = document.getElementById('total');

    let total = 0;

    // 2. Escuchar el clic en el botón "Agregar"
    agregarBtn.addEventListener('click', () => {
        const producto = productoInput.value.trim();
        const precio = parseFloat(precioInput.value);

        // Validación
        if (producto === '' || isNaN(precio) || precio <= 0) {
            alert('Por favor, ingresa un producto y un precio válido.');
            return;
        }

        // Formatear el precio a moneda colombiana (sin decimales)
        const precioFormateado = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(precio);

        // Crear un nuevo elemento en la lista
        const nuevoItem = document.createElement('li');
        nuevoItem.textContent = `${producto}: ${precioFormateado}`;

        // Agregar el nuevo item a la lista visible
        listaProductos.appendChild(nuevoItem);

        // Actualizar el total
        total += precio;
        totalSpan.textContent = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(total);

        // Limpiar los campos para la próxima entrada
        productoInput.value = '';
        precioInput.value = '';
        productoInput.focus(); // Poner el cursor de nuevo en el campo del producto
    });
});