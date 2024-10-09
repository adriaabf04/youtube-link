
# youtube-link

![Static Badge](https://img.shields.io/badge/license-mit-green)
![Static Badge](https://img.shields.io/badge/project_version-1.0.0-blue)
![Static Badge](https://img.shields.io/badge/windows-not_available-red)
![Static Badge](https://img.shields.io/badge/mac-not_available-red)


Convertidor de videos de Youtube a MP4 y MP3




![imagen](https://github.com/user-attachments/assets/92665496-5c97-4522-8d88-3cd0428b523b)


### Pre-requisitos 📋

_Una cosa imprescindible que necesitas es que el requirements.txt pasado en el proyecto y abrir dos pestañas en la terminal para ejecutar el back y el front por separado._

_Y otra de la que debes de disponer es que necesitas el ffmepg. Pon en la terminal lo siguiente:_

```
sudo apt install ffmepg
```

### Instalación 🔧

Estos serian los pasos para instalar el proyecto 

#### Instalación del backend

_Paso 1: Crear el entorno virtual_

```
python3 -m venv nombre_entorno
```

_Paso 2: Ejecutar el entorno virtual_

En Linux

```
source nombre_entorno/bin/activate
```

_Paso 3: Instalar los requirements del proyecto_

DISPONIBLE EN EL REPOSITORIO

```
pip install -r requirements.txt
```

#### Instalación del frontend

_Paso 1: Ir a la carpeta frontend _

```
cd frontend/
```

_Paso 2: Instalar las dependencias del front _

```
npm install
```

## Ejecutando ⚙️

_Aquí ejecutaremos el proyecto en dos pestañas de terminal por la estructura del proyecto_

_En la pestaña del backend pondremos: _

```
python main.py 
```

Y en esta pestaña de terminal se verán los logs del backend. No accederemos a la ruta que nos asigna

_En la pestaña del frontend pondremos: _

```
npm run dev
```
Y en esta pestaña de terminal se verán los logs del frontend.
Accederemos a la ruta/s correspondiente y nos saldrá lo siguiente

![imagen](https://github.com/user-attachments/assets/f905cb73-2382-4246-8217-f3c50c1fce73)

Donde insertaremos la URL del video deseado para descargar en video o audio :)


## Construido con 🛠️

* [React](http://www.dropwizard.io/1.0.2/docs/) - Framework para realizar la estética de la web
* [Flask](https://flask.palletsprojects.com/en/3.0.x/) - Framework de Python para construir la API


## Autores ✒️

* **Adrián Bolufer** - *Trabajo Inicial* - [adriaabf04](https://github.com/adriaabf04)


## Licencia 📄

Este proyecto está bajo la Licencia (MIT) - mira el archivo [LICENSE.md](LICENSE.md) para detalles

