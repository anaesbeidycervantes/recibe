document.addEventListener('DOMContentLoaded', function() {
    const speechResult = document.getElementById('speechResult');
    let ultimaOrdenEjecutada = null; // Variable para almacenar la última orden ejecutada

    // Función para obtener y mostrar la última orden realizada
    function obtenerUltimaOrden() {
        // URL del MockAPI
        const urlMockAPI = 'https://6639b9141ae792804bec926c.mockapi.io/registros';

        // Obtener el último registro del MockAPI
        fetch(urlMockAPI)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud GET a MockAPI');
                }
                return response.json();
            })
            .then(data => {
                // Obtener la última orden del último registro
                const ultimaOrden = data.length > 0 ? data[data.length - 1].orden : null;
                // Mostrar la última orden realizada en el elemento speechResult
                mostrarOrden(ultimaOrden);
                console.log("Última orden obtenida:", ultimaOrden);
                // Ejecutar la última orden si es diferente a la última orden ejecutada y no es nula
                if (ultimaOrden && ultimaOrden !== ultimaOrdenEjecutada) {
                    ejecutarOrden(ultimaOrden);
                    ultimaOrdenEjecutada = ultimaOrden; // Actualizar la última orden ejecutada
                    console.log("Orden ejecutada:", ultimaOrden);
                } else {
                    console.log("No hay nuevas órdenes o es la misma que la última ejecutada.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    // Función para mostrar la última orden realizada
    function mostrarOrden(orden) {
        speechResult.innerHTML = "<strong>Última Orden:</strong> " + (orden ? orden : "No hay órdenes realizadas");
    }

    // Función para ejecutar una orden específica
    function ejecutarOrden(orden) {
        switch (orden) {
            case 'abrir google':
                window.open("https://www.google.com", "_blank");
                break;
            case 'abrir netflix':
                window.open("https://www.netflix.com", "_blank");
                break;
            case 'buscar color morado':
                buscarEnNavegador("morado");
                break;
            case 'buscar tec de pachuca':
                buscarEnNavegador("Tec de Pachuca");
                break;
            default:
                console.log('Orden no reconocida.');
        }
    }

    // Función para buscar en el navegador
    function buscarEnNavegador(termino) {
        let url;
        if (termino === "morado") {
            // Enlace específico para "morado"
            url = "https://www.google.com/search?q=morado&oq=morado&gs_lcrp=EgZjaHJvbWUyDAgAEEUYORixAxiABDIKCAEQABixAxiABDIKCAIQABixAxiABDIKCAMQABixAxiABDIHCAQQABiABDIKCAUQABixAxiABDIHCAYQABiABDIGCAcQRRg90gEIMTE4MmowajeoAgCwAgA&sourceid=chrome&ie=UTF-8";
        } else {
            // Enlace genérico para otros términos
            url = "https://www.google.com/search?q=" + encodeURIComponent(termino);
        }
        window.open(url, "_blank");
    }

    // Obtener y ejecutar la última orden al cargar la página
    obtenerUltimaOrden();

    // Actualizar automáticamente cada 5 segundos
    setInterval(obtenerUltimaOrden, 5000);
});
