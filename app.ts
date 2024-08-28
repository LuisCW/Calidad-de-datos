class Application {
  private inputFile: TextFile;
  private result1: string;
  private result2: string;
  private result3: string;
  private result4: string;
  private result5: string;

  constructor() {
    this.inputFile = new TextFile();
    this.result1 = "";
    this.result2 = "";
    this.result3 = "";
    this.result4 = "";
    this.result5 = "";
  }

  public openFile(filePath: string): void {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".txt";
    fileInput.addEventListener("change", () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const fileContent = reader.result as string;
          this.inputFile.setContent(fileContent);
          this.processFile();
        };
        reader.readAsText(file);
      }
    });
    fileInput.click();
  }

  public processFile(): void {
    const fileContent = this.inputFile.getContent();
    const records = fileContent.split("\n");

    for (const record of records) {
      this.applyQualityRules(record);
    }

    this.displayResults();
  }

  private applyQualityRules(record: string): void {
    const attributes: string[] = record.split(",");

    if (attributes.length !== 5) {
      console.log("Error: Formato de registro incorrecto:", record);
      return;
    }

    const dataRecord: DataRecord = new DataRecord(
      attributes[0],
      attributes[1],
      attributes[2],
      attributes[3],
      attributes[4]
    );
    const ruleChecker: QualityRulesChecker = new QualityRulesChecker();

    const errors: string[] = [];

    // Verificar las reglas de calidad para cada atributo
    const rule1Error = ruleChecker.checkRule1(dataRecord.getIdentificacion());
    if (rule1Error !== dataRecord.getIdentificacion()) {
      errors.push(rule1Error);
    }

    const rule2Error = ruleChecker.checkRule2(dataRecord.getNombres());
    if (rule2Error !== dataRecord.getNombres()) {
      errors.push(rule2Error);
    }

    const rule3Error = ruleChecker.checkRule3(dataRecord.getApellidos());
    if (rule3Error !== dataRecord.getApellidos()) {
      errors.push(rule3Error);
    }

    const rule4Error = ruleChecker.checkRule4(dataRecord.getCelular());
    if (rule4Error !== dataRecord.getCelular()) {
      errors.push(rule4Error);
    }

    const rule5Error = ruleChecker.checkRule5(dataRecord.getCorreo());
    if (rule5Error !== dataRecord.getCorreo()) {
      errors.push(rule5Error);
    }

    if (errors.length > 0) {
      console.log("Errores encontrados para el registro:", record);
      console.log("Mensajes de error:");
      errors.forEach((error) => {
        console.log("- " + error);
      });
    }

    // Aplicar las reglas de calidad a cada atributo adecuado
    this.result1 = ruleChecker.checkRule1(dataRecord.getIdentificacion());
    this.result2 = ruleChecker.checkRule2(dataRecord.getNombres());
    this.result3 = ruleChecker.checkRule3(dataRecord.getApellidos());
    this.result4 = ruleChecker.checkRule4(dataRecord.getCelular());
    this.result5 = ruleChecker.checkRule5(dataRecord.getCorreo());
  }

  private displayResults(): void {
    const resultsContainer = document.getElementById("results-container");
  
    if (resultsContainer !== null) {
      resultsContainer.innerHTML = ""; // Limpiar el contenedor de resultados
  
      // Crear elementos HTML para mostrar los resultados
      const title = document.createElement("h2");
      title.textContent = "Resultados de calidad de datos";
      resultsContainer.appendChild(title);
  
      const table = document.createElement("table");
      resultsContainer.appendChild(table);
  
      // Crear la fila de encabezado
      const headerRow = document.createElement("tr");
      table.appendChild(headerRow);
  
      // Crear los encabezados de columna
      const headers = ["Resultado 1", "Resultado 2", "Resultado 3", "Resultado 4", "Resultado 5"];
      for (const header of headers) {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      }
  
      // Crear una fila para los resultados
      const resultRow = document.createElement("tr");
      table.appendChild(resultRow);
  
      // Agregar cada resultado a una celda de la fila
      const results = [this.result1, this.result2, this.result3, this.result4, this.result5];
      for (const result of results) {
        const td = document.createElement("td");
        td.textContent = result || ""; // Si el resultado es null o undefined, mostrar un valor vacío
        resultRow.appendChild(td);
      }
    }
  }  
}

class TextFile {
  private content: string;

  constructor() {
    this.content = "";
  }

  public setContent(content: string): void {
    this.content = content;
  }

  public getContent(): string {
    return this.content;
  }
}

class DataRecord {
  private identificacion: string;
  private nombres: string;
  private apellidos: string;
  private celular: string;
  private correo: string;

  constructor(
    identificacion: string,
    nombres: string,
    apellidos: string,
    celular: string,
    correo: string
  ) {
    this.identificacion = identificacion;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.celular = celular;
    this.correo = correo;
  }

  public getIdentificacion(): string {
    return this.identificacion;
  }

  public getNombres(): string {
    return this.nombres;
  }

  public getApellidos(): string {
    return this.apellidos;
  }

  public getCelular(): string {
    return this.celular;
  }

  public getCorreo(): string {
    return this.correo;
  }
}

class QualityRulesChecker {
  public checkRule1(attribute: string): string {
    if (!/^\d+$/.test(attribute)) {
      return "Error: El atributo debe contener solo números";
    }

    return attribute; 
  }

  public checkRule2(attribute: string): string {
    if (!/^[a-zA-Z\s]+$/.test(attribute)) {
      return "Error: El atributo debe contener solo letras y espacios";
    }
  
    return attribute;
  }
  
  public checkRule3(attribute: string): string {
    if (!/^[a-zA-Z\s]+$/.test(attribute)) {
      return "Error: El atributo debe contener solo letras y espacios";
    }
  
    return attribute;
  }  

  public checkRule4(attribute: string): string {
    if (!/^\d+$/.test(attribute)) {
      return "Error: El atributo debe contener solo números";
    }

    return attribute; 
  }

  public checkRule5(attribute: string): string {
    if (!/@/.test(attribute)) {
      return 'Error: El atributo debe contener un "@"';
    }

    return attribute; 
  }
}

// Uso de la aplicación
const app: Application = new Application();
app.openFile("datos.txt");
