var Application = /** @class */ (function () {
    function Application() {
        this.inputFile = new TextFile();
        this.result1 = "";
        this.result2 = "";
        this.result3 = "";
        this.result4 = "";
        this.result5 = "";
    }
    Application.prototype.openFile = function (filePath) {
        var _this = this;
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".txt";
        fileInput.addEventListener("change", function () {
            if (fileInput.files && fileInput.files.length > 0) {
                var file = fileInput.files[0];
                var reader_1 = new FileReader();
                reader_1.onload = function () {
                    var fileContent = reader_1.result;
                    _this.inputFile.setContent(fileContent);
                    _this.processFile();
                };
                reader_1.readAsText(file);
            }
        });
        fileInput.click();
    };
    Application.prototype.processFile = function () {
        var fileContent = this.inputFile.getContent();
        var records = fileContent.split("\n");
        for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
            var record = records_1[_i];
            this.applyQualityRules(record);
        }
        this.displayResults();
    };
    Application.prototype.applyQualityRules = function (record) {
        var attributes = record.split(",");
        if (attributes.length !== 5) {
            console.log("Error: Formato de registro incorrecto:", record);
            return;
        }
        var dataRecord = new DataRecord(attributes[0], attributes[1], attributes[2], attributes[3], attributes[4]);
        var ruleChecker = new QualityRulesChecker();
        var errors = [];
        // Verificar las reglas de calidad para cada atributo
        var rule1Error = ruleChecker.checkRule1(dataRecord.getIdentificacion());
        if (rule1Error !== dataRecord.getIdentificacion()) {
            errors.push(rule1Error);
        }
        var rule2Error = ruleChecker.checkRule2(dataRecord.getNombres());
        if (rule2Error !== dataRecord.getNombres()) {
            errors.push(rule2Error);
        }
        var rule3Error = ruleChecker.checkRule3(dataRecord.getApellidos());
        if (rule3Error !== dataRecord.getApellidos()) {
            errors.push(rule3Error);
        }
        var rule4Error = ruleChecker.checkRule4(dataRecord.getCelular());
        if (rule4Error !== dataRecord.getCelular()) {
            errors.push(rule4Error);
        }
        var rule5Error = ruleChecker.checkRule5(dataRecord.getCorreo());
        if (rule5Error !== dataRecord.getCorreo()) {
            errors.push(rule5Error);
        }
        if (errors.length > 0) {
            console.log("Errores encontrados para el registro:", record);
            console.log("Mensajes de error:");
            errors.forEach(function (error) {
                console.log("- " + error);
            });
        }
        // Aplicar las reglas de calidad a cada atributo adecuado
        this.result1 = ruleChecker.checkRule1(dataRecord.getIdentificacion());
        this.result2 = ruleChecker.checkRule2(dataRecord.getNombres());
        this.result3 = ruleChecker.checkRule3(dataRecord.getApellidos());
        this.result4 = ruleChecker.checkRule4(dataRecord.getCelular());
        this.result5 = ruleChecker.checkRule5(dataRecord.getCorreo());
    };
    Application.prototype.displayResults = function () {
        var resultsContainer = document.getElementById("results-container");
        if (resultsContainer !== null) {
            resultsContainer.innerHTML = ""; // Limpiar el contenedor de resultados
            // Crear elementos HTML para mostrar los resultados
            var title = document.createElement("h2");
            title.textContent = "Resultados de calidad de datos";
            resultsContainer.appendChild(title);
            var table = document.createElement("table");
            resultsContainer.appendChild(table);
            // Crear la fila de encabezado
            var headerRow = document.createElement("tr");
            table.appendChild(headerRow);
            // Crear los encabezados de columna
            var headers = ["Resultado 1", "Resultado 2", "Resultado 3", "Resultado 4", "Resultado 5"];
            for (var _i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
                var header = headers_1[_i];
                var th = document.createElement("th");
                th.textContent = header;
                headerRow.appendChild(th);
            }
            // Crear una fila para los resultados
            var resultRow = document.createElement("tr");
            table.appendChild(resultRow);
            // Agregar cada resultado a una celda de la fila
            var results = [this.result1, this.result2, this.result3, this.result4, this.result5];
            for (var _a = 0, results_1 = results; _a < results_1.length; _a++) {
                var result = results_1[_a];
                var td = document.createElement("td");
                td.textContent = result || ""; // Si el resultado es null o undefined, mostrar un valor vacío
                resultRow.appendChild(td);
            }
        }
    };
    return Application;
}());
var TextFile = /** @class */ (function () {
    function TextFile() {
        this.content = "";
    }
    TextFile.prototype.setContent = function (content) {
        this.content = content;
    };
    TextFile.prototype.getContent = function () {
        return this.content;
    };
    return TextFile;
}());
var DataRecord = /** @class */ (function () {
    function DataRecord(identificacion, nombres, apellidos, celular, correo) {
        this.identificacion = identificacion;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.celular = celular;
        this.correo = correo;
    }
    DataRecord.prototype.getIdentificacion = function () {
        return this.identificacion;
    };
    DataRecord.prototype.getNombres = function () {
        return this.nombres;
    };
    DataRecord.prototype.getApellidos = function () {
        return this.apellidos;
    };
    DataRecord.prototype.getCelular = function () {
        return this.celular;
    };
    DataRecord.prototype.getCorreo = function () {
        return this.correo;
    };
    return DataRecord;
}());
var QualityRulesChecker = /** @class */ (function () {
    function QualityRulesChecker() {
    }
    QualityRulesChecker.prototype.checkRule1 = function (attribute) {
        if (!/^\d+$/.test(attribute)) {
            return "Error: El atributo debe contener solo números";
        }
        return attribute;
    };
    QualityRulesChecker.prototype.checkRule2 = function (attribute) {
        if (!/^[a-zA-Z\s]+$/.test(attribute)) {
            return "Error: El atributo debe contener solo letras y espacios";
        }
        return attribute;
    };
    QualityRulesChecker.prototype.checkRule3 = function (attribute) {
        if (!/^[a-zA-Z\s]+$/.test(attribute)) {
            return "Error: El atributo debe contener solo letras y espacios";
        }
        return attribute;
    };
    QualityRulesChecker.prototype.checkRule4 = function (attribute) {
        if (!/^\d+$/.test(attribute)) {
            return "Error: El atributo debe contener solo números";
        }
        return attribute;
    };
    QualityRulesChecker.prototype.checkRule5 = function (attribute) {
        if (!/@/.test(attribute)) {
            return 'Error: El atributo debe contener un "@"';
        }
        return attribute;
    };
    return QualityRulesChecker;
}());
// Uso de la aplicación
var app = new Application();
app.openFile("datos.txt");
