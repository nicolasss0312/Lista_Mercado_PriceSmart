document.addEventListener('DOMContentLoaded', () => {

    // --- SELECCIÓN DE ELEMENTOS DEL HTML ---
    const productoInput = document.getElementById('producto');
    const cantidadInput = document.getElementById('cantidad');
    const precioInput = document.getElementById('precio');
    const fotoInput = document.getElementById('foto');
    const agregarBtn = document.getElementById('btn-agregar');
    const listaProductos = document.getElementById('lista-productos');
    const totalSpan = document.getElementById('total');
    const contadorSpan = document.getElementById('contador-productos');

    // --- DATOS Y FORMATOS DE LA APP ---
    let lista = []; // Array que contendrá todos los productos como objetos

    const formatoMoneda = {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    };

    // --- FUNCIONES PRINCIPALES ---

    /**
     * Guarda el estado actual del array 'lista' en el localStorage del navegador.
     */
    function guardarLista() {
        localStorage.setItem('listaDeMercado', JSON.stringify(lista));
    }

    /**
     * Lee el array 'lista' y redibuja toda la lista de productos en el HTML.
     * También actualiza los contadores de total y cantidad.
     */
    function renderizarLista() {
        listaProductos.innerHTML = ''; // Limpia la lista visual para evitar duplicados
        let totalGeneral = 0;
        let contadorGeneral = 0;

        lista.forEach((item, index) => {
            const precioTotalItemFormateado = new Intl.NumberFormat('es-CO', formatoMoneda).format(item.precioTotal);
            
            // Si hay una imagen, crea la etiqueta img; si no, deja el string vacío.
            const imagenHtml = item.imagenUrl 
                ? `<img src="${item.imagenUrl}" alt="${item.producto}" class="product-image">` 
                : '';

            const nuevoItem = document.createElement('li');
            nuevoItem.dataset.id = index; // Asigna el índice como un ID para poder borrarlo
            
            nuevoItem.innerHTML = `
                ${imagenHtml}
                <div class="product-info">
                    <div class="product-details">
                        <span class="product-quantity">(${item.cantidad}x)</span>
                        <span class="product-name">${item.producto}</span>
                    </div>
                    <span class="product-price">${precioTotalItemFormateado}</span>
                </div>
                <button class="delete-btn">❌</button>
            `;
            listaProductos.appendChild(nuevoItem);
            
            totalGeneral += item.precioTotal;
            contadorGeneral += item.cantidad;
        });
        
        totalSpan.textContent = new Intl.NumberFormat('es-CO', formatoMoneda).format(totalGeneral);
        contadorSpan.textContent = contadorGeneral;
    }

    /**
     * Carga la lista guardada en localStorage cuando la página se abre por primera vez.
     */
    function cargarDatosIniciales() {
        const listaGuardada = localStorage.getItem('listaDeMercado');
        if (listaGuardada) {
            lista = JSON.parse(listaGuardada);
            // Filtra cualquier posible imagen guardada, ya que no son persistentes
            lista.forEach(item => item.imagenUrl = null);
            renderizarLista();
        }
    }

    // --- EVENTOS DE LA APLICACIÓN ---

    // Evento para formatear el precio mientras se escribe
    precioInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value ? new Intl.NumberFormat('es-CO').format(value) : '';
    });

    // Evento principal para agregar un producto a la lista
    agregarBtn.addEventListener('click', () => {
        const producto = productoInput.value.trim();
        const cantidad = parseInt(cantidadInput.value, 10);
        const precioString = precioInput.value.replace(/\./g, '');
        const precio = parseFloat(precioString);

        if (producto === '' || isNaN(precio) || precio <= 0 || isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor, ingresa un producto, cantidad y precio válidos.');
            return;
        }

        const archivoFoto = fotoInput.files[0];
        
        const nuevoProducto = {
            producto: producto,
            cantidad: cantidad,
            precioUnidad: precio,
            precioTotal: precio * cantidad,
            imagenUrl: null // La imagen se añadirá después si existe
        };
        
        const finalizarAgregado = () => {
            lista.push(nuevoProducto);
            renderizarLista();
            guardarLista();

            // Limpiar campos
            productoInput.value = '';
            precioInput.value = '';
            cantidadInput.value = 1; 
            fotoInput.value = ''; // Limpia el campo de archivo
            productoInput.focus();
        };

        if (archivoFoto) {
            const reader = new FileReader();
            reader.onload = function(evento) {
                nuevoProducto.imagenUrl = evento.target.result; // Asigna la URL de la imagen leída
                finalizarAgregado();
            };
            reader.readAsDataURL(archivoFoto); // Inicia la lectura del archivo
        } else {
            finalizarAgregado(); // Si no hay foto, finaliza directamente
        }
    });

    // Evento para eliminar un producto (usando delegación de eventos)
    listaProductos.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const itemParaEliminar = e.target.closest('li');
            const id = parseInt(itemParaEliminar.dataset.id, 10);
            
            lista.splice(id, 1); // Elimina el item del array por su índice

            renderizarLista();
            guardarLista();
        }
    });
    
    // --- INICIO DE LA APP ---
    cargarDatosIniciales();
});