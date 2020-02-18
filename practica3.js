let fs = require('fs');
let path = require('path');
let express = require("express");
let llamada = express();

llamada.use("/dni", function(peticion, respuesta) {
    if (peticion.query.num) {

        var letras = "TRWAGMYFPDXBNJZSQVHLCKET";
        var posicion = parseInt(peticion.query.num) % 23;
        var dni = peticion.query.num + letras.charAt(posicion);

        respuesta.send("El DNI correspondiente es: " + dni);



    } else {
        fs.readFile('instrucciones.html', function(err, dato) {
            respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            respuesta.write(dato);
            respuesta.end();
        });
    }

})

llamada.use("/escribir", function(peticion, respuesta) {
    let mkdirSync = function(dirPath) {
        try {
            fs.mkdirSync(dirPath);
        } catch (err) {
            if (err.code !== 'EEXIST') throw err
        }
    }

    mkdirSync(path.resolve('./Copia'))

    fs.appendFile('./Copia/holaMundo.txt', 'Alberto Rus Gómez', (error) => {
        if (error) {
            throw error;
        }
        console.log("El archivo se ha creado exitosamente.")
    });
});

llamada.listen(8083, '127.0.0.3', function() {
    console.log('Servidor ejecutándose en http://127.0.0.3:8083');
});