document.getElementById("formulario").addEventListener("submit", function(event){
    event.preventDefault(); // Evita que el formulario se envíe
    // Captura de los datos del formulario
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var telefono = document.getElementById("telefono").value;
    var email = document.getElementById("email").value;
    var comentario = document.getElementById("comentario").value;

    alert("Gracias por sus comentarios su consulta ha sido enviada.");


    document.getElementById("formulario").reset();
});