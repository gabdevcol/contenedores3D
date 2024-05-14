
getInfo = (dataCnt, sigla) => {
    dataCnt.forEach(item => {
        if (item['sigla'] == sigla) seleccion = item;
    })
    return seleccion;
}

layoutDraw = (layout) => {

    const contenedor = document.getElementById("contenedor");
    const info = document.getElementById("info");
    layout.forEach(item => {

        const bloque = item[0];
        const bahias = item[1];
        const filas = item[2];
        
        const alto = alto_max;

        const BloqueContainer = document.createElement("div");
        BloqueContainer.classList.add("bloque-container");
        BloqueContainer.setAttribute('id', bloque);
        BloqueContainer.style.backgroundColor = '#f2f7fb';
        BloqueContainer.innerHTML = "<B>Bloque " + bloque + "</B>";
        contenedor.appendChild(BloqueContainer);

        for (let i = 1; i <= bahias; i += 2) {

            const tablaContainer = document.createElement("div");
            tablaContainer.classList.add("tabla-container");

            // Crear encabezado
            tablaContainer.innerHTML = "<B>Bahia " + i + "</B>";

            const tabla = document.createElement("table");
            tabla.setAttribute("id", bloque + i);

            // Crear filas y columnas
            for (let j = 0; j <= alto; j++) {

                const fila = tabla.insertRow();
                
                for (let k = 1; k <= filas; k++) {

                    const celda = fila.insertCell();

                    celda.addEventListener("mouseover", function (e) {
                        if (celda.textContent.length > celda_vacia) {
                            info.style.display = "block";
                            info.style.top = e.pageY.toString() + "px";
                            info.style.left = e.pageX.toString() + "px";
                            dataInfo = getInfo(dataCnt, celda.textContent.slice(0, 11));
                            info.innerHTML = '<li>' + dataInfo['linea'] + '<li>' + dataInfo['tam'] + dataInfo['tipo'] + '<li>' + dataInfo['condicion'];
                        }
                    });
                    celda.addEventListener("mouseout", function () { info.style.display = "none"; });

                    celda.addEventListener("click", function () { 
                        alert("mover");
                    });

                    if (j == 0) { celda.innerHTML = "<b>L" + k + "</B>"; } else {layout_capacidad += 1;}

                }
            }

            // Agregar la tabla al contenedor
            tablaContainer.appendChild(tabla);
            BloqueContainer.appendChild(tablaContainer);

        }
        document.getElementById('layout_capacidad').innerHTML = '<b>' + layout_capacidad + '  </b> nt';

    });

}

layoutLoadData = () => {
    // Obtener data
    const data = document.getElementById("matrix").getAttribute('data');

    // Convertir la cadena a una lista de diccionarios
    dataCnt = JSON.parse(data);

    let layout_condicion_a = 0
    let layout_condicion_b = 0
    let layout_condicion_c = 0
    let layout_condicion_i = 0
    dataCnt.forEach(item => {

        let location = item["location"].split(":");
        let bloque = location[0];
        let bahia = location[1];
        let linea = parseInt(location[2] - 1);
        let alto = alto_max + 1 - parseInt(location[3]);

        // Buscar bloque y bahia
        let layout_bahia = document.getElementById(bloque + bahia);

        if (alto > alto_max || alto < 1 || layout_bahia == null || layout_bahia.rows[alto] == undefined || layout_bahia.rows[alto].cells[linea] == undefined || layout_bahia.rows[alto].cells[linea].textContent.length > celda_vacia) {
            let men = "";
            if (alto < (alto_max + 1) && alto > 0 && layout_bahia != null && layout_bahia.rows[alto].cells[linea] != undefined && layout_bahia.rows[alto].cells[linea].textContent.length > celda_vacia) { men = " Ocupado" }
            document.getElementById('posicion').innerHTML = '<li>' + item['sigla'] + "  (Bloque: " + bloque + ", Bahia: " + bahia + ", Linea: " + location[2] + ", Alto: " + location[3] + " ) " + men;
        }
        else {
            // Actualizar la celda
            layout_bahia.rows[alto].cells[linea].innerHTML = '<span style="font-size:12px; font-weight: bolder;">' + item['sigla'] + '</span><br>' + item['dias'];
            // Rellenar con color
            if (item['dias'] <= limite_alerta) layout_bahia.rows[alto].cells[linea].classList.add("normal");
            if (limite_alerta < item['dias'] && item['dias'] < limite_demora) layout_bahia.rows[alto].cells[linea].classList.add("alerta");
            if (item['dias'] >= limite_demora) layout_bahia.rows[alto].cells[linea].classList.add("demora");

            // Contar condicion de contenedores
            if (item['condicion'] == 'A') {
                layout_condicion_a += 1;
            } else if (item['condicion'] == 'B') {
                layout_condicion_b += 1;
            } else if (item['condicion'] == 'C') {
                layout_condicion_c += 1;
            } else {
                layout_condicion_i += 1;
            }

        }

    });

    document.getElementById('layout_ocupacion').innerHTML = '<b>' + (((layout_condicion_a + layout_condicion_b + layout_condicion_c + layout_condicion_i) / layout_capacidad) * 100).toFixed(2) + ' %</b><br>';
    document.getElementById('layout_condicion_a').innerHTML = ' - A: ' + layout_condicion_a;
    document.getElementById('layout_condicion_b').innerHTML = ' - B: ' + layout_condicion_b;
    document.getElementById('layout_condicion_c').innerHTML = ' - C: ' + layout_condicion_c;
    document.getElementById('layout_condicion_i').innerHTML = ' - INOP: ' + layout_condicion_i;
}

resaltarCelda = (celda) => {
    var celdaPos = celda.getBoundingClientRect();
    var circulo = document.createElement('div');
    circulo.classList.add('highlight-circle');

    // Posiciona el círculo sobre la celda
    circulo.style.top = (celdaPos.top + window.scrollY) + 'px';
    circulo.style.left = (celdaPos.left + window.scrollX) + 'px';

    // Añade el círculo al documento para que se posicione con respecto al documento
    document.body.appendChild(circulo);
}

cntSeek = (sigla) => {
    const celdas = document.querySelectorAll('table tr td');
    celdas.forEach(celda => {
        if (celda.textContent.includes(sigla)) {
            resaltarCelda(celda);
        }
    });
}

