
import { useEffect, useRef } from "react";

export default function Biblioteca3D({ libros = [], onSeleccionarLibro }) {
    const contenedorRef = useRef(null);

    useEffect(() => {
        let renderer;
        let animationId;
        let observer;
        let limpiar = () => {};
        let activo = true;

        async function iniciarBiblioteca() {
            const THREE = await window.threeReady;

            if (!activo || !contenedorRef.current) return;

            const contenedor = contenedorRef.current;

            // =====================================
            // 1. ESCENA Y CAMARA
            // =====================================

            const escena = new THREE.Scene();
            escena.background = new THREE.Color("#080d1c");
            escena.fog = new THREE.Fog("#080d1c", 14, 38);

            const camara = new THREE.PerspectiveCamera(
                65,
                contenedor.clientWidth / contenedor.clientHeight,
                0.1,
                100
            );

            camara.position.set(0, 3, 10);
            camara.lookAt(0, 3, -5);

            // =====================================
            // 2. RENDERIZADOR
            // =====================================

            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: false
            });

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(
                contenedor.clientWidth,
                contenedor.clientHeight
            );

            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.outputColorSpace = THREE.SRGBColorSpace;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.2;

            contenedor.appendChild(renderer.domElement);

            // =====================================
            // 3. ILUMINACION
            // =====================================

            escena.add(
                new THREE.HemisphereLight("#a9c8ff", "#101020", 2)
            );

            const luzPrincipal = new THREE.DirectionalLight("#ffffff", 3);
            luzPrincipal.position.set(3, 8, 6);
            luzPrincipal.castShadow = true;
            escena.add(luzPrincipal);

            const luzAzul = new THREE.PointLight("#1677ff", 35, 18);
            luzAzul.position.set(-5, 4, -3);
            escena.add(luzAzul);

            const luzVioleta = new THREE.PointLight("#8b5cf6", 30, 18);
            luzVioleta.position.set(5, 5, -3);
            escena.add(luzVioleta);

            // =====================================
            // 4. MATERIALES
            // =====================================

            const materialPared = new THREE.MeshStandardMaterial({
                color: "#111a30",
                roughness: 0.8
            });

            const materialSuelo = new THREE.MeshStandardMaterial({
                color: "#101827",
                metalness: 0.45,
                roughness: 0.35
            });

            const materialEstante = new THREE.MeshStandardMaterial({
                color: "#263653",
                metalness: 0.65,
                roughness: 0.3
            });

            // =====================================
            // 5. FUNCION PARA CREAR CAJAS
            // =====================================

            function crearCaja(
                ancho,
                alto,
                profundidad,
                x,
                y,
                z,
                material
            ) {
                const geometria = new THREE.BoxGeometry(
                    ancho,
                    alto,
                    profundidad
                );

                const objeto = new THREE.Mesh(geometria, material);

                objeto.position.set(x, y, z);
                objeto.castShadow = true;
                objeto.receiveShadow = true;

                escena.add(objeto);

                return objeto;
            }

            // =====================================
            // 6. CONSTRUCCION DE LA BIBLIOTECA
            // =====================================

            // Suelo
            crearCaja(
                30, 0.2, 30,
                0, -0.1, 0,
                materialSuelo
            );

            // Pared del fondo
            crearCaja(
                25, 10, 0.3,
                0, 5, -7,
                materialPared
            );

            // Pared izquierda
            crearCaja(
                0.3, 10, 25,
                -12, 5, 0,
                materialPared
            );

            // Pared derecha
            crearCaja(
                0.3, 10, 25,
                12, 5, 0,
                materialPared
            );

            // Detalles luminosos
            const materialNeon = new THREE.MeshBasicMaterial({
                color: "#168bff"
            });

            for (let i = 0; i < 5; i++) {
                crearCaja(
                    0.035, 8, 0.035,
                    -9 + i * 4.5, 4, -6.7,
                    materialNeon
                );
            }

            // =====================================
            // 7. CATEGORIAS
            // =====================================

            // Estos IDs deben coincidir con idCategoria en Supabase.
            const categorias = [
                { id: 1, nombre: "Literatura" },
                { id: 2, nombre: "Historia" },
                { id: 3, nombre: "Cultura" },
                { id: 4, nombre: "Ciencia" },
                { id: 5, nombre: "Educación" }
            ];

            const niveles = [1.35, 2.85, 4.35, 5.85, 7.35];

            const librosInteractivos = [];

            const anchoLibro = 0.34;
            const altoLibro = 1.12;
            const profundidadLibro = 0.58;

            const colores = [
                "#b91c1c",
                "#1d4ed8",
                "#047857",
                "#7e22ce",
                "#b45309",
                "#0f766e",
                "#4338ca",
                "#9f1239"
            ];

            // =====================================
            // 8. PORTADAS DE LOS LIBROS
            // =====================================

            function crearTexturaLibro(libro, color) {
                const canvas = document.createElement("canvas");

                canvas.width = 256;
                canvas.height = 512;

                const ctx = canvas.getContext("2d");

                ctx.fillStyle = color;
                ctx.fillRect(0, 0, 256, 512);

                ctx.fillStyle = "rgba(0,0,0,0.18)";
                ctx.fillRect(0, 0, 20, 512);

                ctx.fillStyle = "#ffffff";
                ctx.textAlign = "center";
                ctx.font = "bold 23px Arial";

                const palabras = (libro.titulo || "Libro").split(" ");

                let linea = "";
                let y = 190;

                for (const palabra of palabras) {
                    const prueba = linea + palabra + " ";

                    if (ctx.measureText(prueba).width > 210) {
                        ctx.fillText(linea, 128, y);
                        linea = palabra + " ";
                        y += 32;
                    } else {
                        linea = prueba;
                    }
                }

                if (linea) {
                    ctx.fillText(linea, 128, y);
                }

                ctx.font = "17px Arial";

                ctx.fillText(
                    libro.autor || "Autor desconocido",
                    128,
                    390,
                    220
                );

                const textura = new THREE.CanvasTexture(canvas);
                textura.colorSpace = THREE.SRGBColorSpace;

                return textura;
            }

            // =====================================
            // 9. LETREROS DE CATEGORIAS
            // =====================================

            function crearLetrero(nombre, altura) {
                const canvas = document.createElement("canvas");

                canvas.width = 1024;
                canvas.height = 180;

                const ctx = canvas.getContext("2d");

                ctx.fillStyle = "#101d38";
                ctx.fillRect(0, 0, 1024, 180);

                ctx.strokeStyle = "#38bdf8";
                ctx.lineWidth = 8;
                ctx.strokeRect(5, 5, 1014, 170);

                ctx.fillStyle = "#ffffff";
                ctx.font = "bold 75px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.fillText(nombre.toUpperCase(), 512, 90);

                const textura = new THREE.CanvasTexture(canvas);

                const material = new THREE.MeshBasicMaterial({
                    map: textura
                });

                const letrero = new THREE.Mesh(
                    new THREE.PlaneGeometry(5, 0.88),
                    material
                );

                letrero.position.set(0, altura + 0.48, -6.78);

                escena.add(letrero);
            }

            // =====================================
            // 10. ESTANTERIAS Y LIBROS POR CATEGORIA
            // =====================================

            categorias.forEach((categoria, nivel) => {
                const altura = niveles[nivel];

                // Base
                crearCaja(
                    12.5, 0.14, 0.85,
                    0, altura, -5.9,
                    materialEstante
                );

                // Soportes laterales
                crearCaja(
                    0.15, 1.5, 0.85,
                    -6.15, altura + 0.7, -5.9,
                    materialEstante
                );

                crearCaja(
                    0.15, 1.5, 0.85,
                    6.15, altura + 0.7, -5.9,
                    materialEstante
                );

                // Letrero
                crearLetrero(categoria.nombre, altura);

                // Luz de la estantería
                crearCaja(
                    11.8, 0.025, 0.035,
                    0, altura + 0.1, -5.42,
                    materialNeon
                );

                // Filtrar libros por categoría
                const librosCategoria = libros.filter(
                    libro => Number(libro.idCategoria) === categoria.id
                );

                librosCategoria.slice(0, 14).forEach((libro, indice) => {
                    const x = -5.5 + indice * 0.85;
                    const y = altura + altoLibro / 2 + 0.08;
                    const z = -5.9;

                    const color = colores[indice % colores.length];

                    const material = new THREE.MeshStandardMaterial({
                        color: "#ffffff",
                        map: crearTexturaLibro(libro, color),
                        roughness: 0.7
                    });

                    const geometria = new THREE.BoxGeometry(
                        anchoLibro,
                        altoLibro,
                        profundidadLibro
                    );

                    const objeto = new THREE.Mesh(geometria, material);

                    objeto.position.set(x, y, z);
                    objeto.rotation.y = (Math.random() - 0.5) * 0.08;

                    objeto.castShadow = true;
                    objeto.receiveShadow = true;

                    objeto.userData.libro = libro;

                    escena.add(objeto);
                    librosInteractivos.push(objeto);
                });
            });

            // =====================================
            // 11. PISO DECORATIVO
            // =====================================

            const grid = new THREE.GridHelper(
                30,
                30,
                "#164e83",
                "#1b2942"
            );

            grid.position.y = 0.015;
            escena.add(grid);

            // =====================================
            // 12. INTERACCION CON LOS LIBROS
            // =====================================

            const raycaster = new THREE.Raycaster();
            const puntero = new THREE.Vector2();

            let libroEnCursor = null;

            let objetivoX = 0;
            let objetivoY = 0;

            function actualizarPuntero(evento) {
                const rect = renderer.domElement.getBoundingClientRect();

                puntero.x =
                    ((evento.clientX - rect.left) / rect.width) * 2 - 1;

                puntero.y =
                    -((evento.clientY - rect.top) / rect.height) * 2 + 1;

                objetivoX = puntero.x;
                objetivoY = puntero.y;
            }

            function obtenerLibroBajoCursor() {
                raycaster.setFromCamera(puntero, camara);

                const intersecciones = raycaster.intersectObjects(
                    librosInteractivos
                );

                return intersecciones.length
                    ? intersecciones[0].object
                    : null;
            }

            // El clic selecciona el libro.
            // La selección NO se pierde al mover el cursor.
            function seleccionarLibro() {
                const libro = obtenerLibroBajoCursor();

                if (libro) {
                    onSeleccionarLibro?.(libro.userData.libro);
                }
            }

            renderer.domElement.addEventListener(
                "pointermove",
                actualizarPuntero
            );

            renderer.domElement.addEventListener(
                "click",
                seleccionarLibro
            );

            // =====================================
            // 13. REDIMENSIONAMIENTO
            // =====================================

            function redimensionar() {
                if (!contenedor.clientWidth || !contenedor.clientHeight) {
                    return;
                }

                camara.aspect =
                    contenedor.clientWidth / contenedor.clientHeight;

                camara.updateProjectionMatrix();

                renderer.setSize(
                    contenedor.clientWidth,
                    contenedor.clientHeight
                );
            }

            observer = new ResizeObserver(redimensionar);
            observer.observe(contenedor);

            // =====================================
            // 14. ANIMACION
            // =====================================

            function animar() {
                animationId = requestAnimationFrame(animar);

                // Movimiento suave de cámara
                camara.position.x +=
                    (objetivoX * 0.65 - camara.position.x) * 0.025;

                camara.position.y +=
                    (3 + objetivoY * 0.25 - camara.position.y) * 0.025;

                camara.lookAt(
                    objetivoX * 0.8,
                    3 + objetivoY * 0.2,
                    -5
                );

                // Detectar libro bajo el cursor solo para iluminarlo
                const nuevoLibro = obtenerLibroBajoCursor();

                if (nuevoLibro !== libroEnCursor) {
                    if (libroEnCursor) {
                        libroEnCursor.scale.set(1, 1, 1);
                    }

                    libroEnCursor = nuevoLibro;

                    if (libroEnCursor) {
                        libroEnCursor.scale.set(1.08, 1.08, 1.08);
                    }

                    contenedor.style.cursor =
                        libroEnCursor ? "pointer" : "grab";
                }

                renderer.render(escena, camara);
            }

            animar();

            // =====================================
            // 15. LIMPIEZA
            // =====================================

            limpiar = () => {
                cancelAnimationFrame(animationId);
                observer?.disconnect();

                renderer.domElement.removeEventListener(
                    "pointermove",
                    actualizarPuntero
                );

                renderer.domElement.removeEventListener(
                    "click",
                    seleccionarLibro
                );

                escena.traverse((objeto) => {
                    objeto.geometry?.dispose();

                    if (Array.isArray(objeto.material)) {
                        objeto.material.forEach((material) => {
                            material.map?.dispose();
                            material.dispose();
                        });
                    } else if (objeto.material) {
                        objeto.material?.map?.dispose();
                        objeto.material?.dispose();
                    }
                });

                renderer.dispose();
                renderer.domElement.remove();
            };
        }

        iniciarBiblioteca().catch((error) => {
            console.error("Error iniciando la biblioteca 3D:", error);
        });

        return () => {
            activo = false;
            limpiar();
        };

    }, [libros, onSeleccionarLibro]);

    return (
        <div
            ref={contenedorRef}
            className="absolute inset-0 w-full h-full"
        />
    );
}
