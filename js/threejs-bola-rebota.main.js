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
	var bola, bola_vel_x, bola_vel_z;
	var pala_jugador, pala_jugador_vel_x, puntos_jugador;
	var pala_ia, pala_ia_vel_x, puntos_ia;


	// Datos extra.

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	var stats, contador_jugador, contador_ia;

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

			// Información en consola javascript del navegador.
			console.info("Estado: Licencia.");

			// TODO
		}// FIN if( estado == 'licencia' ).


	// ESTADO: MENÚ.

		else if( estado == 'menu' ) {

			// Información en consola javascript del navegador.
			console.info("Estado: Menú.");

			bola.position.x = 0;
			bola.position.z = 0;
			bola_vel_x = 32;
			bola_vel_z = -16;

			pala_jugador.position.x = 0;
			pala_ia.position.x = 0;

			puntos_jugador = 0;
			puntos_ia = 0;

		}// FIN if( estado == 'menu' ).


	// ESTADO: JUEGO.

		else if( estado == 'juego' ) {

			// Información en consola javascript del navegador.
			console.info("Estado: Juego.");


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
				puntos_jugador ++;

			}


			// Colision con borde inferior.
			if( bola.position.z > 30 * metros ) {

				// Respeta el límite.
				bola.position.z = 30 * metros;

				// Rebota.
				bola_vel_z *= -1;

				// Punto para la IA.
				puntos_ia ++;

			}

			// Colision con pala jugador.
			if( bola.position.x + 1 * metros >= pala_jugador.position.x - 3 * metros
				&& bola.position.x - 1 * metros <= pala_jugador.position.x + 3 * metros
				&& bola.position.z + 1 * metros > pala_jugador.position.z - 1 * metros ) {

				// Información en consola javascript del navegador.
				console.info('colisión pala jugador');

				// Respeta el límite.
				bola.position.z = pala_jugador.position.z - 2 * metros;

				// Rebota.
				bola_vel_z = -16; // TODO random.

			}

			// Colision con pala IA.
			if( bola.position.x + 1 * metros >= pala_ia.position.x - 3 * metros
				&& bola.position.x - 1 * metros <= pala_ia.position.x + 3 * metros
				&& bola.position.z - 1 * metros < pala_ia.position.z + 1 * metros ) {

				// Información en consola javascript del navegador.
				console.info('colisión pala ia');

				// Respeta el límite.
				bola.position.z = pala_ia.position.z + 2 * metros;

				// Rebota.
				bola_vel_z = 16; // TODO random.

			}


		// ACTUALIZA EL ESTADO DE LA PALA DEL JUGADOR.

			// Si está dentro de los límites.
			if( pala_jugador.position.x - 3.5 * metros >= -20 * metros
				&& pala_jugador.position.x + 3.5 * metros <= 20 * metros )
				// Se mueve.
				pala_jugador.position.x += pala_jugador_vel_x;

			// Se asegura de que no sobrepasa el límite izquierdo.
			if( pala_jugador.position.x - 3.5 * metros < -20 * metros )
				pala_jugador.position.x = -20 * metros + 3.5 * metros;

			// Se asegura de que no sobrepasa el límite derecho.
			if( pala_jugador.position.x + 3.5 * metros > 20 * metros )
				pala_jugador.position.x = 20 * metros - 3.5 * metros;


		// ACTUALIZA EL ESTADO DE LA PALA DE LA IA.

			// Si está dentro de los límites.
			if( pala_ia.position.x - 3.5 * metros >= -20 * metros
				&& pala_ia.position.x + 3.5 * metros <= 20 * metros ) {

				if( pala_ia.position.x >= bola.position.x )
					// Acelera izquierda.
					pala_ia_vel_x = -32;

				if( pala_ia.position.x <= bola.position.x )
					// Acelera derecha.
					pala_ia_vel_x = 32;

			}
			else
				pala_ia_vel_x = 0;

			// Se mueve.
			pala_ia.position.x += pala_ia_vel_x;

			// Se asegura de que no sobrepasa el límite izquierdo.
			if( pala_ia.position.x - 3.5 * metros < -20 * metros )
				pala_ia.position.x =  -20 * metros + 3.5 * metros;

			// Se asegura de que no sobrepasa el límite derecho.
			if( pala_ia.position.x + 3.5 * metros > 20 * metros )
				pala_ia.position.x = 20 * metros - 3.5 * metros;


		// ACTUALIZA EL ESTADO.

			// Si jugador obtiene 3 puntos, jugador gana.
			if( puntos_jugador >= 3 ) {

				estado = 'ganador';

			}


			// Si IA obtiene 3 puntos, jugador pierde.
			if( puntos_ia >= 3 ) {

				estado = 'perdedor';

			}


			if( debug_mode ) {
				// Actualiza las estadísticas de FPS.
				stats.update();
			}

			// Actualiza los contadores.
			contador_jugador.html( puntos_jugador );
			contador_ia.html( puntos_ia );

			// Actualiza los gráficos del canvas.
			renderer.render( scene, camera );

		}// FIN if( estado == 'juego' ).


	// ESTADO: PAUSA.

		else if( estado == 'pausa' ) {

			// Información en consola javascript del navegador.
			console.info("Estado: Pausa.");

		}// FIN if( estado = 'ganador' ).


	// ESTADO: GANADOR.

		else if( estado == 'ganador' ) {

			// Información en consola javascript del navegador.
			console.info("Estado: Ganador.");

			$('#divMensajeGanador').show();

		}// FIN if( estado = 'ganador' ).


	// ESTADO: PERDEDOR.

		else if( estado == 'perdedor' ) {

			// Información en consola javascript del navegador.
			console.info("Estado: Perdedor.");

			$('#divMensajePerdedor').show();

		}// FIN if( estado = 'perdedor' ).


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
		stats.domElement.style.float = 'left';
		stats.domElement.style.margin = '0px 1em';
		container.append( stats.domElement );


		// Contadores.
		contador_jugador = $('#divContadorJugador');
		contador_ia = $('#divContadorIA');


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


		// ESTADO: JUEGO.

			else if( estado == 'juego' ) {

				// Si pulsa alguna tecla...
				switch (keychar) {

				// Si pulsa la tecla espacio.
					case ' ':

						estado = 'pausa';

						$('#divMensajePausa').fadeIn('fast');

					break;

				// Si pulsa caracteres no imprimibles.
					default:

					// Si pulsa la tecla flecha izquierda.
						if( keycode == 37 ) {

							pala_jugador_vel_x = -16;

						}

					// Si pulsa la tecla flecha izquierda.
						if( keycode == 39 ) {

							pala_jugador_vel_x = 16;

						}

					break;

				}

			}// FIN if( estado == 'juego' ).


		// ESTADO: PAUSA.

			else if( estado == 'pausa' ) {

				// Si pulsa alguna tecla...
				switch (keychar) {

				// Si pulsa la tecla espacio.
					case ' ':

						$('#divMensajePausa').fadeOut(
							'slow',
							function() {
								estado = 'juego';
							}
						);

					break;

				}

			}// FIN if( estado == 'pausa' ).


		// ESTADO: GANADOR Ó PERDEDOR.

			else if( estado == 'ganador' || estado == 'perdedor' ) {

				// Si pulsa alguna tecla...
				switch (keychar) {

				// Si pulsa la tecla espacio.
					case ' ':

						estado = null;

						$('#divGameScreen').fadeOut(
							250,
							function() {

								$('#divMensajeGanador').fadeOut(
									250,
									function() {

										$('#divMensajePerdedor').fadeOut(
											250,
											function() {

												$('#divGameLicense').fadeIn(
													1000,
													function() {

														estado = 'licencia';

													}// END FUNCTION.
												);
											}//END FUNCTION.
										);

									}// END FUNCTION.
								);

							}// END FUNCTION.
						);

					break;

				}

			}// FIN if( estado == 'ganador' || estado == 'perdedor' ).


			// El evento continúa normalmente.
			return true;
		});// FIN $(window).keydown.


		// Evento de tecla levantada.
		$(window).keyup(function (e) {

			// Información en consola javascript del navegador.
			console.info("Evento window.onkeyup (" + e.keyCode + ":" + String.fromCharCode(e.keyCode) + ", " + e.which + ":" + String.fromCharCode(e.which) + ")");
			console.info(e);

			pala_jugador_vel_x = 0;

		});// FIN $(window).keyup.


		// Ejecuta el bucle principal.
		buclePrincipal();

	});// FIN $(document).ready.

// Información en consola javascript del navegador.
console.info("Incluído threejs-bola-rebota.main.js");
