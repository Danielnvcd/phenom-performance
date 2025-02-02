let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

// Configura EmailJS (reemplaza con tus credenciales)
emailjs.init("TU_USER_ID_DE_EMAILJS");

function agregarAlCarrito(id) {
    const producto = document.querySelector(`.producto[data-id="${id}"]`);
    const nombre = producto.querySelector('h3').innerText;
    const precio = parseFloat(producto.querySelector('p').innerText.replace('$', ''));

    carrito.push({ id, nombre, precio });
    total += precio;

    actualizarCarrito();
    mostrarModal();
    guardarEnLocalStorage();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');
    const contadorCarrito = document.getElementById('contador-carrito');

    listaCarrito.innerHTML = '';
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nombre} - $${item.precio.toFixed(2)}
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
    });

    totalElement.innerText = total.toFixed(2);
    contadorCarrito.innerText = carrito.length;
}

function eliminarDelCarrito(index) {
    const item = carrito[index];
    total -= item.precio;
    carrito.splice(index, 1);

    actualizarCarrito();
    guardarEnLocalStorage();
}

function vaciarCarrito() {
    carrito = [];
    total = 0;

    actualizarCarrito();
    guardarEnLocalStorage();
}

function mostrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 2000);
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function mostrarCarrito() {
    const carritoModal = document.getElementById('carrito-modal');
    carritoModal.style.display = 'block';
}

function cerrarCarrito() {
    const carritoModal = document.getElementById('carrito-modal');
    carritoModal.style.display = 'none';
}

function mostrarFormularioPago() {
    const pagoModal = document.getElementById('pago-modal');
    pagoModal.style.display = 'flex';
}

function cerrarPago() {
    const pagoModal = document.getElementById('pago-modal');
    pagoModal.style.display = 'none';
}

function procesarPago(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    // Simular procesamiento de pago
    setTimeout(() => {
        alert("Pago procesado con éxito.");
        enviarConfirmacionCorreo(nombre, email);
        vaciarCarrito();
        cerrarPago();
    }, 1000);
}

function enviarConfirmacionCorreo(nombre, email) {
    const templateParams = {
        to_name: nombre,
        to_email: email,
        total: total.toFixed(2),
    };

    emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", templateParams)
        .then(() => {
            alert("Correo de confirmación enviado.");
        })
        .catch((error) => {
            console.error("Error al enviar el correo:", error);
        });
}

function guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    localStorage.setItem('total', total);
}

// Inicializar carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
});