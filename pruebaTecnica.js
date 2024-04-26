const localCalls = [
  { duration: 30, hour: 10, day: "Monday" },
  { duration: 20, hour: 19, day: "Wednesday" },
];

const nationalCalls = [
  { duration: 45, locality: "Buenos Aires" },
  { duration: 10, locality: "Córdoba" },
  { duration: 18, locality: "Santa Fe" },
  { duration: 20, locality: "Misiones" },
  { duration: 30, locality: "Tucumán" },
];

const nationalRates = {
  "Buenos Aires": 0.3,
  Córdoba: 0.25,
  Tucumán: 0.25,
  "Santa Fe": 0.25,
  Misiones: 0.25,
};

const internationalCalls = [
  { duration: 60, country: "United States" },
  { duration: 20, country: "Argentina" },
  { duration: 40, country: "Sweden" },
  { duration: 25, country: "Italy" },
  { duration: 10, country: "Spain" },
];

const internationalRates = {
  "United States": 0.3,
  Spain: 0.5,
  Argentina: 0.25,
  Sweden: 0.2,
  Italy: 0.3,
};

class Invoice {
  constructor(
    basicFee,
    localCallsConsumption,
    nationalCallsConsumption,
    internationalCallsConsumption
  ) {
    this.basicFee = basicFee;
    this.localCallsConsumption = localCallsConsumption;
    this.nationalCallsConsumption = nationalCallsConsumption;
    this.internationalCallsConsumption = internationalCallsConsumption;
  }

  showCallBreakdown() {
    console.log("Detail of local calls:");
    this.localCallsConsumption.forEach((call) => {
      console.log(`Duration: ${call.duration} minutes`);
    });

    console.log("Detail of national calls:");
    this.nationalCallsConsumption.forEach((call) => {
      console.log(
        `Duration: ${call.duration} minutes, Locality: ${call.locality}`
      );
    });

    console.log("Detail of international calls:");
    this.internationalCallsConsumption.forEach((call) => {
      console.log(
        `Duration: ${call.duration} minutes, Country: ${call.country}`
      );
    });
  }

  showCallRates() {
    console.log("Rates applied to calls:");
    console.log("Rates for local calls:");
    console.log("Business hours: $0.20 per minute");
    console.log("Rest of the day and weekends: $0.10 per minute");

    console.log("Rates for national calls:");
    for (const locality in nationalRates) {
      console.log(
        `Locality: ${locality}, Rate: $${nationalRates[locality]} per minute`
      );
    }

    console.log("Rates for international calls:");
    for (const country in internationalRates) {
      console.log(
        `Country: ${country}, Rate: $${internationalRates[country]} per minute`
      );
    }
  }

  calculateTotalToPay() {
    let totalLocalCalls = 0;
    let totalNationalCalls = 0;
    let totalInternationalCalls = 0;
    let totalOverall = 0;

    this.localCallsConsumption.forEach((call) => {
      let callCost = 0;
      const isBusinessDay =
        call.day.toLowerCase() !== "saturday" &&
        call.day.toLowerCase() !== "sunday";

      if (isBusinessDay && call.hour >= 8 && call.hour < 20) {
        callCost = call.duration * 0.2;
      } else {
        callCost = call.duration * 0.1;
      }
      totalLocalCalls += callCost;
    });

    this.nationalCallsConsumption.forEach((call) => {
      let callCost = 0;
      const rate = nationalRates[call.locality];
      if (rate) {
        callCost = call.duration * rate;
      } else {
        console.log(`No rate found for locality "${call.locality}"`);
      }
      totalNationalCalls += callCost;
    });

    this.internationalCallsConsumption.forEach((call) => {
      let callCost = 0;
      const rate = internationalRates[call.country];

      if (rate) {
        callCost = call.duration * rate;
      } else {
        console.log(`No rate found for country "${call.country}"`);
      }
      totalInternationalCalls += callCost;
    });
    totalOverall =
      totalLocalCalls + totalNationalCalls + totalInternationalCalls;
    return totalOverall;
  }
}

const invoice = new Invoice(50, localCalls, nationalCalls, internationalCalls);
console.log("Total to pay: " + invoice.calculateTotalToPay());

console.log("Call details:");
invoice.showCallBreakdown();

console.log("\nCall rates:");
invoice.showCallRates();
