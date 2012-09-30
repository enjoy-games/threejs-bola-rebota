/*
                                ESPAÑOL

  Este archivo es parte de 'threejs-bola-rebota'.

  Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>

  'threejs-bola-rebota' es software libre: usted puede redistribuirlo y/o
  modificarlo bajo los términos de la Licencia Pública General GNU publicada
  por la Fundación para el Software Libre, ya sea la versión 3 de la Licencia,
  o (a su elección) cualquier versión posterior.

  'threejs-bola-rebota' se distribuye con la esperanza de que sea útil, pero
  SIN GARANTÍA ALGUNA; ni siquiera la garantía implícita MERCANTIL o de
  APTITUD PARA UN PROPÓSITO DETERMINADO. Consulte los detalles de la Licencia
  Pública General GNU para obtener una información más detallada.

  Debería haber recibido una copia de la Licencia Pública General GNU junto a
  'threejs-bola-rebota'. En caso contrario, consulte
  <http://www.gnu.org/licenses/>.


                                ENGLISH

  This file is part of 'threejs-bola-rebota'.

  Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>

  'threejs-bola-rebota' is free software: you can redistribute it and/or
  modify it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or (at your
  option) any later version.

  'threejs-bola-rebota' is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
  Public License for more details.

  You should have received a copy of the GNU General Public License along with
  'threejs-bola-rebota'. If not, see <http://www.gnu.org/licenses/>.

*/
;
// VARIABLES GLOBALES.    --------//

	// Medidas estándar.
	var metros = 10, grados = Math.PI / 180;

	// Datos extra.

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	var stats;

	var debug_mode = true;

	// Objeto estados (Distintos estados posibles del juego).
	/*
		licencia,
		menu,
		juego,
		pausa,
		ganador,
		perdedor
	*/
	var estados;


// FUNCIONES.    --------//

	// Actualiza los datos necesarios en cada 'fps'.
	function buclePrincipal() {

		// Crea un hilo de ejecución para el siguiente frame.
		mainLoop = window.requestAnimationFrame(buclePrincipal);


	// ESTADO: LICENCIA.

		if( estados == 'licencia' ) {

		}// FIN if( estados == 'licencia' ).

	}// FIN buclePrincipal.


// EVENTOS.    --------//

	// Evento de página cargada.
	$(document).ready(function() {
		// Información en consola javascript del navegador.
		console.info("Evento window.onload");

		// Estado inicial.
		estados = 'licencia';

		// Evento de menú contextual.
		window.oncontextmenu = function() {
			// Información en consola javascript del navegador.
			console.info("Evento window.oncontextmenu");

			// Desactivar menú contextual.
			return false;
		};// FIN window.oncontextmenu.

		// Ejecuta el bucle principal.
		buclePrincipal();

	});// FIN $(document).ready.

// Información en consola javascript del navegador.
console.info("Incluído threejs-bola-rebota.main.js");
