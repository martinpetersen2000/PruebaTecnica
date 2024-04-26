const llamadasLocales = [
  { duracion: 30, hora: 10, dia: "lunes" },
  { duracion: 20, hora: 19, dia: "miércoles" },
];

const llamadasNacionales = [
  { duracion: 45, localidad: "Buenos Aires" },
  { duracion: 10, localidad: "Córdoba" },
  { duracion: 18, localidad: "Santa Fe" },
  { duracion: 20, localidad: "Misiones" },
  { duracion: 30, localidad: "Tucumán" },
];
const tarifasNacionales = {
  "Buenos Aires": 0.3,
  Córdoba: 0.25,
  Tucumán: 0.25,
  "Santa Fe": 0.25,
  Misiones: 0.25,
};

const llamadasInternacionales = [
  { duracion: 60, pais: "Estados Unidos" },
  { duracion: 20, pais: "Argentina" },
  { duracion: 40, pais: "Suecia" },
  { duracion: 25, pais: "Italia" },
  { duracion: 10, pais: "España" },
];

const tarifasInternacionales = {
  "Estados Unidos": 0.3,
  España: 0.5,
  Argentina: 0.25,
  Suecia: 0.2,
  Italia: 0.3,
};
class Factura {
  constructor(
    abonoBasico,
    consumoLlamadasLoc,
    consumoLlamadasNac,
    consumoLlamadasInt
  ) {
    this.abonoBasico = abonoBasico;
    this.consumoLlamadasLoc = consumoLlamadasLoc;
    this.consumoLlamadasNac = consumoLlamadasNac;
    this.consumoLlamadasInt = consumoLlamadasInt;
  }
  mostrarDesgloseLlamadas() {
    console.log("Detalle de llamadas locales:");
    this.consumoLlamadasLoc.forEach((llamada) => {
      console.log(`Duración: ${llamada.duracion} minutos`);
    });

    console.log("Detalle de llamadas nacionales:");
    this.consumoLlamadasNac.forEach((llamada) => {
      console.log(
        `Duración: ${llamada.duracion} minutos, Localidad: ${llamada.localidad}`
      );
    });

    console.log("Detalle de llamadas internacionales:");
    this.consumoLlamadasInt.forEach((llamada) => {
      console.log(
        `Duración: ${llamada.duracion} minutos, País: ${llamada.pais}`
      );
    });
  }

  mostrarTarifasLlamadas() {
    console.log("Tarifas aplicadas a las llamadas:");
    console.log("Tarifas de llamadas locales:");
    console.log("Horario hábil: $0.20 por minuto");
    console.log("Resto del día y fines de semana: $0.10 por minuto");

    console.log("Tarifas de llamadas nacionales:");
    for (const localidad in tarifasNacionales) {
      console.log(
        `Localidad: ${localidad}, Tarifa: $${tarifasNacionales[localidad]} por minuto`
      );
    }

    console.log("Tarifas de llamadas internacionales:");
    for (const pais in tarifasInternacionales) {
      console.log(
        `País: ${pais}, Tarifa: $${tarifasInternacionales[pais]} por minuto`
      );
    }
  }
  calcularTotalAPagar() {
    let totalLlamadasLocales = 0;
    let totalLlamadasNacionales = 0;
    let totalLlamadasInternacionales = 0;
    let totalGeneral = 0;

    this.consumoLlamadasLoc.forEach((llamada) => {
      let costoLlamada = 0;
      const esDiaHabil =
        llamada.dia.toLowerCase() !== "sabado" &&
        llamada.dia.toLowerCase() !== "domingo";

      if (esDiaHabil && llamada.hora >= 8 && llamada.hora < 20) {
        costoLlamada = llamada.duracion * 0.2;
      } else {
        costoLlamada = llamada.duracion * 0.1;
      }
      totalLlamadasLocales += costoLlamada;
    });

    this.consumoLlamadasNac.forEach((llamada) => {
      let costoLlamada = 0;
      const tarifa = tarifasNacionales[llamada.localidad];
      if (tarifa) {
        costoLlamada = llamada.duracion * tarifa;
      } else {
        console.log(
          `No se encontró una tarifa para la localidad "${llamada.localidad}"`
        );
      }
      totalLlamadasNacionales += costoLlamada;
    });

    this.consumoLlamadasInt.forEach((llamada) => {
      let costoLlamada = 0;
      const tarifa = tarifasInternacionales[llamada.pais];

      if (tarifa) {
        costoLlamada = llamada.duracion * tarifa;
      } else {
        console.log(`No se encontró una tarifa para el país "${llamada.pais}"`);
      }
      totalLlamadasInternacionales += costoLlamada;
    });
    totalGeneral =
      totalLlamadasLocales +
      totalLlamadasNacionales +
      totalLlamadasInternacionales;
    return totalGeneral;
  }
}

const factura = new Factura(
  50,
  llamadasLocales,
  llamadasNacionales,
  llamadasInternacionales
);
console.log("Total a pagar: " + factura.calcularTotalAPagar());

console.log("Detalle de llamadas:");
factura.mostrarDesgloseLlamadas();

console.log("\nTarifas de las llamadas:");
factura.mostrarTarifasLlamadas();
