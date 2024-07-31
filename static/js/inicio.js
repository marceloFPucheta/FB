
const tarjetas = document.querySelectorAll('.tarjetaPromo a');

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('click', function(e) {
            e.preventDefault(); // Evita que el enlace navegue a otra página
            const titulo = this.querySelector('.tituloTarjeta').textContent;
            alert(`Compraste la promo con destino a: ${titulo}`);
        });
    });



});