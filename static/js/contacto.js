document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(event) {
        // Evita que el formulario se envíe antes de la validación
        event.preventDefault();
        
        if (validateForm()) {
            alert("Formulario enviado correctamente.");
            form.submit();
        } else {
            alert("Por favor, completa correctamente todos los campos.");
        }
    });

    function validateForm() {
        let isValid = true;

        // Validación del nombre
        const nombre = document.getElementById("nombre");
        if (nombre.value.trim() === "") {
            isValid = false;
            showError(nombre, "El nombre es obligatorio.");
        } else {
            removeError(nombre);
        }

        // Validación del apellido
        const apellido = document.getElementById("apellido");
        if (apellido.value.trim() === "") {
            isValid = false;
            showError(apellido, "El apellido es obligatorio.");
        } else {
            removeError(apellido);
        }

        // Validación de la dirección
        const direccion = document.getElementById("direccion");
        if (direccion.value.trim() === "") {
            isValid = false;
            showError(direccion, "La dirección es obligatoria.");
        } else {
            removeError(direccion);
        }

        // Validación de la ciudad
        const ciudad = document.getElementById("ciudad");
        if (ciudad.value.trim() === "") {
            isValid = false;
            showError(ciudad, "La ciudad es obligatoria.");
        } else {
            removeError(ciudad);
        }

        // Validación del estado
        const state = document.getElementById("state");
        if (state.value === "") {
            isValid = false;
            showError(state, "Por favor, selecciona una opción.");
        } else {
            removeError(state);
        }

        // Validación del email
        const email = document.getElementById("email");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === "") {
            isValid = false;
            showError(email, "El email es obligatorio.");
        } else if (!emailRegex.test(email.value)) {
            isValid = false;
            showError(email, "El email no es válido.");
        } else {
            removeError(email);
        }

        // Validación del teléfono
        const telefono = document.getElementById("telefono");
        const telefonoRegex = /^\d{10}$/; // Ejemplo para un número de 10 dígitos
        if (telefono.value.trim() === "") {
            isValid = false;
            showError(telefono, "El teléfono es obligatorio.");
        } else if (!telefonoRegex.test(telefono.value)) {
            isValid = false;
            showError(telefono, "El teléfono debe tener 10 dígitos.");
        } else {
            removeError(telefono);
        }

        // Validación del motivo de contacto
        const motivo = document.getElementById("motivo");
        if (motivo.value === "") {
            isValid = false;
            showError(motivo, "Por favor, selecciona un motivo.");
        } else {
            removeError(motivo);
        }

        // Validación del mensaje
        const mensaje = document.getElementById("mensaje");
        if (mensaje.value.trim() === "") {
            isValid = false;
            showError(mensaje, "El mensaje es obligatorio.");
        } else {
            removeError(mensaje);
        }

        // Validación del tipo de servicio
        const subscription = document.querySelector('input[name="subscription"]:checked');
        if (!subscription) {
            isValid = false;
            showError(document.querySelector('input[name="subscription"]'), "Por favor, selecciona un tipo de servicio.");
        } else {
            removeError(document.querySelector('input[name="subscription"]'));
        }

        return isValid;
    }

    function showError(input, message) {
        const errorElement = document.createElement("div");
        errorElement.className = "error";
        errorElement.textContent = message;
        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains("error")) {
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
    }

    function removeError(input) {
        if (input.nextElementSibling && input.nextElementSibling.classList.contains("error")) {
            input.nextElementSibling.remove();
        }
    }
});
