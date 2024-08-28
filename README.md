APLICACIÓN DE ANÁLISIS DE REGLAS DE CALIDAD DE DATOS
Clase Application: La clase Application es la clase principal de la aplicación encargada de coordinar el flujo de ejecución y el procesamiento de los datos. Tiene los siguientes métodos principales:
•	openFile(filePath: string): Este método abre un cuadro de diálogo de selección de archivo y carga el contenido del archivo seleccionado en la instancia de la clase TextFile. Luego, llama al método processFile() para procesar el contenido del archivo.
•	processFile(): Este método lee el contenido del archivo de la instancia de TextFile, divide el contenido en registros y aplica las reglas de calidad de datos a cada registro llamando al método applyQualityRules(). Después, llama al método displayResults() para mostrar los resultados en la interfaz de usuario.
•	applyQualityRules(record: string): Este método recibe un registro y aplica las reglas de calidad de datos a cada atributo del registro utilizando la clase QualityRulesChecker. Almacena los resultados en las propiedades correspondientes.
•	displayResults(): Este método muestra los resultados en la interfaz de usuario creando elementos HTML dinámicamente y agregándolos al contenedor de resultados.
Clase TextFile: La clase TextFile se utiliza para almacenar el contenido de un archivo de texto. Tiene las siguientes propiedades y métodos principales:
•	content: Es una propiedad que almacena el contenido del archivo.
•	setContent(content: string): Este método establece el contenido del archivo.
•	getContent(): string: Este método devuelve el contenido del archivo.
Clase DataRecord: La clase DataRecord representa un registro de datos con varios atributos. Tiene las siguientes propiedades y métodos principales:
•	identificacion, nombres, apellidos, celular, correo: Son propiedades que representan los atributos del registro.
•	getIdentificacion(): string: Este método devuelve el valor del atributo "identificacion".
•	getNombres(): string: Este método devuelve el valor del atributo "nombres".
•	getApellidos(): string: Este método devuelve el valor del atributo "apellidos".
•	getCelular(): string: Este método devuelve el valor del atributo "celular".
•	getCorreo(): string: Este método devuelve el valor del atributo "correo".
Clase QualityRulesChecker: La clase QualityRulesChecker se encarga de verificar las reglas de calidad de datos para cada atributo de un registro. Tiene los siguientes métodos principales:
•	checkRule1(attribute: string): string: Este método verifica la regla de calidad 1 para un atributo y devuelve el atributo si cumple la regla o un mensaje de error si no.
•	checkRule2(attribute: string): string: Este método verifica la regla de calidad 2 para un atributo y devuelve el atributo si cumple la regla o un mensaje de error si no.
•	checkRule3(attribute: string): string: Este método verifica la regla de calidad 3 para un atributo y devuelve el atributo si cumple la regla o un mensaje de error si no.
•	checkRule4(attribute: string): string: Este método verifica la regla de calidad 4 para un atributo y devuelve el atributo si cumple la regla o un mensaje de error si no.
•	checkRule5(attribute: string): string: Este método verifica la regla de calidad 5 para un atributo y devuelve el atributo si cumple la regla o un mensaje de error si no.
USO DE LA APLICACIÓN:
El código proporcionado consiste en una aplicación que abre un archivo de texto, aplica reglas de calidad de datos a cada registro y muestra los resultados en una interfaz de usuario. La aplicación se utiliza siguiendo los siguientes pasos:
       1. Se crea una instancia de la clase Application llamada "app".
2. Se llama al método "openFile(filePath: string)" de la instancia "app" para abrir y procesar un archivo de texto. Se proporciona la ruta del archivo como argumento.
3. El contenido del archivo se lee y se divide en registros.
4. Se aplican las reglas de calidad de datos a cada atributo de cada registro utilizando la clase QualityRulesChecker.
5. Los resultados de cada regla se almacenan en las propiedades correspondientes de la instancia de Application.
6. Los resultados se muestran en una interfaz de usuario generada mediante código HTML y JavaScript.
El código HTML proporciona una interfaz de usuario básica con un formulario que permite al usuario seleccionar un archivo de texto y un botón para procesarlo. Los resultados se muestran en una tabla en la misma página. Además, se menciona que el código hace referencia a un archivo JavaScript llamado "app.js", el cual se asume que es el resultado de compilar un archivo TypeScript llamado "app.ts". Esto implica que se debe utilizar un compilador de TypeScript para generar el archivo JavaScript antes de ejecutar la aplicación. En resumen, la aplicación utiliza reglas de calidad de datos para analizar y verificar los registros de un archivo de texto, y proporciona una interfaz sencilla para visualizar los resultados en una tabla.
Primero, desde el mismo cmd se debe instalar la librería así "npm install express". Para abrirlo se ejecuta el cmd, se accede a la carpeta de "Proyecto Poo" y se ejecuta como node server.js y luego vas a esta url: http://localhost:3000 
Ingresa a “Seleccionar archivo” (tiene que ser .txt) y luego a procesar archivo y te sale la tabla con todo, y si está mal escrito con algún carácter que no corresponde sale el aviso de error.
