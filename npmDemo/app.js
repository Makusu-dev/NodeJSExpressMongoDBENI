const SSN = require('french-ssn');

console.log(SSN.parse('2 55 08 14 168 025 38'))

console.log(SSN.validate("2 55 08 14 168 025 12")); // false)
console.log(SSN.validate("2 55 08 14 168 025 38")); // true
console.log(SSN.getControlKey("2 55 08 14 168 025")) // "38"
console.log(SSN.make({ gender: 1, month: 5, year: 78, place: "99330", rank: 108 })); // "178059933010817"
console.log(SSN.format("178059933010817")); // "1 78 05 99 330 108 17"