import tkinter as tk
from tkinter import ttk, messagebox

# --- Lógica de la Aplicación ---
def agregar_producto():
    """Toma los valores de los campos de entrada y los agrega a la lista."""
    producto = entry_producto.get()
    precio_str = entry_precio.get()

    # Validación simple: no agregar si los campos están vacíos
    if not producto or not precio_str:
        messagebox.showwarning("Campos Vacíos", "Por favor, ingresa el nombre y el precio del producto.")
        return

    try:
        # Intenta convertir el precio a un número flotante
        precio_float = float(precio_str)
        # Formatea el precio como moneda colombiana
        precio_formateado = f"${precio_float:,.0f} COP"
    except ValueError:
        messagebox.showerror("Error de Precio", "El precio debe ser un número válido.")
        return

    # Inserta el producto y su precio en la lista visible
    lista_productos.insert(tk.END, f"{producto.capitalize()}: {precio_formateado}")

    # Limpiar los campos de entrada para el siguiente producto
    entry_producto.delete(0, tk.END)
    entry_precio.delete(0, tk.END)
    entry_producto.focus_set() # Pone el cursor de nuevo en el campo del producto

def eliminar_producto():
    """Elimina el producto seleccionado de la lista."""
    seleccionados = lista_productos.curselection()
    if not seleccionados:
        messagebox.showwarning("Sin Selección", "Por favor, selecciona un producto para eliminar.")
        return
    # curselection() devuelve una tupla, tomamos el primer índice
    lista_productos.delete(seleccionados[0])


# --- Configuración de la Interfaz Gráfica ---
# 1. Ventana principal
ventana = tk.Tk()
ventana.title("🛒 Lista de Mercado")
ventana.geometry("400x500") # Ancho x Alto
ventana.resizable(False, False)

# 2. Frame principal para organizar los elementos
frame = ttk.Frame(ventana, padding="10")
frame.pack(fill=tk.BOTH, expand=True)

# 3. Etiquetas y Campos de Entrada
ttk.Label(frame, text="Producto:").pack(pady=2)
entry_producto = ttk.Entry(frame, width=40)
entry_producto.pack(pady=2)

ttk.Label(frame, text="Precio (COP):").pack(pady=2)
entry_precio = ttk.Entry(frame, width=40)
entry_precio.pack(pady=5)

# 4. Botones
frame_botones = ttk.Frame(frame)
frame_botones.pack(pady=10)

boton_agregar = ttk.Button(frame_botones, text="Agregar Producto", command=agregar_producto)
boton_agregar.pack(side=tk.LEFT, padx=5)

boton_eliminar = ttk.Button(frame_botones, text="Eliminar Seleccionado", command=eliminar_producto)
boton_eliminar.pack(side=tk.LEFT, padx=5)

# 5. Lista de productos
ttk.Label(frame, text="Productos a Comprar:").pack(pady=5)
lista_productos = tk.Listbox(frame, height=15)
lista_productos.pack(fill=tk.BOTH, expand=True)

# Iniciar el bucle de la aplicación
ventana.mainloop()