# PROYECTO DE AGENDA (MÓVIL)

Aplicación de agenda que permite a los usuarios registrarse, iniciar sesión, crear y gestionar notas.

## Estructura del Proyecto

- **/src**: Código fuente de la aplicación React Native.

## Requisitos Previos

- Node.js y npm (https://nodejs.org/)

## Instalación

### 1. Configuración del Frontend

1. Descargamos el repositorio dandole click en "<> Code" y seleccionamos "Download ZIP":

2. Una vez descargado, nos aparecerá como "AgendaAplicacion-main.zip", le damos click derecho, seleccionamos "Extraer archivos" y esperamos a que nos descargue la carpeta

3. Luego buscamos nuestro Visual Studio Code y lo abrimos.

4. Una vez abierto, seleccionamos "File", damos click en "Open Folder" y seleccionamos la carpeta del proyecto que descargamos.

5. Una vez abierto, configuramos la dirección IP del servidor en los archivos de la aplicación de acuerdo al equipo de cómputo
    ```javascript
    const API_URL = 'http://<tu-ip-local>';

    ('http://<tu-ip-local>/agenda/<nombre_del_php>');

    ```

6. Vamos abriendo una terminal, dentro de ella le damos 'cd Agenda' para dirigirnos a la carpeta de Agenda, introducimos 'npm start' ejecutando nuestro proyecto y en caso de quererlo correr en android, ponemos "a":
    ```bash
    cd Agenda
    
    npm start

    a
     ```

7. Es recomendable tener un emulador de dispositivo android para que lo pueda detectar el programa, o en su debido caso, tener descargado "Expo Go" en su dispositivo móvil y dentro de la aplicación, seleccionar "Scan QR code" y apunta su cámara al QR que aparece en la terminal al momento de ejecutarlo con "npm start" y se abrirá en su dispositivo móvil.

8. Para el repositorio de mi backend, lo dejare aqui:
https://github.com/ChristopherGonzalezRamos/WebServiceBackEnd