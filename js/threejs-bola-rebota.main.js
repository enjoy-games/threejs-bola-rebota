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


	// Elementos comunes en 3D.
	var scene, camera, renderer;


	// Elementos de juego 3D.
	var pista_de_juego;
	var barras_de_seguridad = new Array();
	/*
		BARRAS DE SEGURIDAD.
		0 - Izquierda inferior.
		1 - Izquierda superior.
		2 - Derecha inferior.
		3 - Derecha superior.
	*/
	var bola, pala_jugador, pala_ia;
	var bola_vel_x = 16, bola_vel_z = -8;


	// Datos extra.

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	var stats;

	var debug_mode = true;

	var estado;
	/*
		ESTADO (Distintos estados posibles del juego).
		licencia,
		menu,
		juego,
		pausa,
		ganador,
		perdedor
	*/


// FUNCIONES.    --------//

	// Actualiza los datos necesarios en cada 'fps'.
	function buclePrincipal() {

		// Crea un hilo de ejecución para el siguiente frame.
		mainLoop = window.requestAnimationFrame(buclePrincipal);


	// ESTADO: LICENCIA.

		if( estado == 'licencia' ) {
			// TODO
		}// FIN if( estado == 'licencia' ).


	// ESTADO: MENÚ.

		else if( estado == 'menu' ) {
			// TODO
		}// FIN if( estado == 'menu' ).


	// ESTADO: JUEGO.

		else if( estado == 'juego' ) {

		// ACTUALIZA EL ESTADO DE LA BOLA.

			// Desplazamiento.
			bola.position.x += bola_vel_x;
			bola.position.z += bola_vel_z;

			// Colision con borde derecho.
			if( bola.position.x > 20 * metros ) {

				// Respeta el límite.
				bola.position.x = 20 * metros;

				// Rebota.
				bola_vel_x *= -1; // TODO random.

			}

			// Colision con borde izquierdo.
			if( bola.position.x < -20 * metros ) {

				// Respeta el límite.
				bola.position.x = -20 * metros;

				// Rebota.
				bola_vel_x *= -1; // TODO random.

			}

			// Colision con borde superior.
			if( bola.position.z < -30 * metros ) {

				// Respeta el límite.
				bola.position.z = -30 * metros;

				// Rebota.
				bola_vel_z *= -1;

				// Punto para el jugador.
				//puntos_jugador ++;

			}

			// Colision con borde inferior.
			if( bola.position.z > 30 * metros ) {

				// Respeta el límite.
				bola.position.z = 30 * metros;

				// Rebota.
				bola_vel_z *= -1;

				// Punto para la IA.
				//puntos_ia ++;

			}


			if( debug_mode ) {
				// Actualiza las estadísticas de FPS.
				stats.update();
			}

			// Actualiza los gráficos del canvas.
			renderer.render( scene, camera );

		}// FIN if( estado == 'juego' ).

	}// FIN buclePrincipal.


// EVENTOS.    --------//

	// Evento de página cargada.
	$(document).ready(function() {
		// Información en consola javascript del navegador.
		console.info("Evento window.onload");

		// Estado inicial.
		estado = 'licencia';

	// CREACIÓN DE ELEMENTOS.

		var container = $('#divGameScreen');

		// Estadística de FPS.
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		container.append( stats.domElement );


		// Escena.
		scene = new THREE.Scene();


		// Cámara.
		camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			5000
		);
		camera.position.y = 25 * metros;
		camera.position.z = 40 * metros;
		camera.rotation.x = -45 * grados;


		// Renderizador.
		if (Detector.webgl)
			renderer = new THREE.WebGLRenderer();
		else
			renderer = new THREE.CanvasRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.append( renderer.domElement );


		// Luz direccional (Sólo con renderizado WebGL).
		if (Detector.webgl) {
			var directionalLight = new THREE.DirectionalLight(0xffffff);
			directionalLight.position.set(1, 1, 1).normalize();
			scene.add( directionalLight );
		}


		// Pista de juego.
		pista_de_juego = new THREE.Mesh(
			new THREE.PlaneGeometry(
				40 * metros,
				60 * metros
			),
			new THREE.MeshBasicMaterial( {color: 0x535353} )
		);
		pista_de_juego.rotation.x = -90 * grados;
		pista_de_juego.overdraw = true;
		scene.add( pista_de_juego );


		// Barras de seguridad.
		for( var i = 0; i < 4; i++ ) {
			barras_de_seguridad[i] = new THREE.Mesh(
				new THREE.CylinderGeometry(
					0.5 * metros,
					0.5 * metros,
					60 * metros,
					50,
					50,
					false
				),
				new THREE.MeshLambertMaterial( {color: 0xe7ae93} )
			);
			scene.add( barras_de_seguridad[i] );
			barras_de_seguridad[i].rotation.x = -90 * grados;
			barras_de_seguridad[i].overdraw = true;
		}
		barras_de_seguridad[0].position.x =
		barras_de_seguridad[1].position.x = -20 * metros;
		barras_de_seguridad[0].position.y =
		barras_de_seguridad[2].position.y = 1.5 * metros;
		barras_de_seguridad[2].position.x =
		barras_de_seguridad[3].position.x = 20 * metros;
		barras_de_seguridad[1].position.y =
		barras_de_seguridad[3].position.y = 4 * metros;


		// Bola.
		bola = new THREE.Mesh(
			new THREE.SphereGeometry(
				1 * metros,
				50,
				50
			),
			new THREE.MeshLambertMaterial( {color: 0x3737ff} )
		);
		bola.position.y = 0.5 * metros;
		bola.overdraw = true;
		scene.add( bola );


		// Pala jugador.
		pala_jugador = new THREE.Mesh(
			new THREE.CylinderGeometry(
				1 * metros,
				1 * metros,
				6 * metros,
				50,
				50,
				false
			),
			new THREE.MeshLambertMaterial( {color: 0x80ff80} )
		);
		pala_jugador.position.y = 0.5 * metros;
		pala_jugador.position.z = 25 * metros;
		pala_jugador.rotation.z = 90 * grados;
		pala_jugador.overdraw = true;
		scene.add( pala_jugador );


		// Pala IA.
		pala_ia = new THREE.Mesh(
			new THREE.CylinderGeometry(
				1 * metros,
				1 * metros,
				6 * metros,
				50,
				50,
				false
			),
			new THREE.MeshLambertMaterial( {color: 0xcc0000} )
		);
		pala_ia.position.y = 0.5 * metros;
		pala_ia.position.z = -25 * metros;
		pala_ia.rotation.z = 90 * grados;
		pala_ia.overdraw = true;
		scene.add( pala_ia );


		// Evento resize.
		$(window).resize(function(){

			// Información en consola javascript del navegador.
			console.info("Evento window.resize");

			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );

		});// FIN $(window).resize.


		// Evento oncontextmenu.
		window.oncontextmenu = function() {
			// Información en consola javascript del navegador.
			console.info("Evento window.oncontextmenu");

			// Desactivar menú contextual.
			return false;
		};// FIN window.oncontextmenu.


		// Evento onkeydown.
		$(window).keydown(function (e) {
			// Información en consola javascript del navegador.
			console.info("Evento window.onkeydown (" + e.keyCode + ":" + String.fromCharCode(e.keyCode) + ", " + e.which + ":" + String.fromCharCode(e.which) + ")");
			console.info(e);

			// Almacena código numérico del caracter pulsado.
			var keycode = null;

			// Almacena el caracter pulsado.
			var keychar = null;

			// IE8 y anteriores.
			if (window.event)
				keycode = e.keyCode;
			// IE9/Firefox/Chrome/Opera/Safari.
			else if (e.which)
				keycode = e.which;

			// De código numérico(keycode) a carácter(keychar).
			keychar = String.fromCharCode(keycode);


		// ESTADO: LICENCIA.

			if( estado == 'licencia' ) {

				// Información en consola javascript del navegador.
				console.info("Estado: Menú.");

				$('#divGameLicense').fadeOut(
					1000,
					function() {
						$('#divGameMenu').fadeIn(
							1000,
							function() {
								estado = 'menu';
							}
						);
					}
				);

			}


		// ESTADO: MENU.

			else if( estado == 'menu' ) {

				// Si pulsa alguna tecla...
				switch (keychar) {

				// Si pulsa la tecla espacio.
					case ' ':

						// Información en consola javascript del navegador.
						console.info("Estado: Juego.");

						$('#divGameMenu').fadeOut(
							1000,
							function() {
								$('#divGameScreen').fadeIn(
									1000,
									function() {
										estado = 'juego';
									}
								);
							}
						);

					break;

				}

			}

			// El evento continúa normalmente.
			return true;
		});// FIN $(window).keydown.

		// Ejecuta el bucle principal.
		buclePrincipal();

	});// FIN $(document).ready.

// Información en consola javascript del navegador.
console.info("Incluído threejs-bola-rebota.main.js");
