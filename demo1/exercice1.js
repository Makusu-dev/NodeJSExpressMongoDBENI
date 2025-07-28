import os from 'os';
// import StringBuilder from "node-stringbuilder";
// const systemInfo = new StringBuilder("");


// systemInfo.append('Le système d\'exploitation: ' + os.version() );
// console.log(systemInfo.toString());


console.log('Le système d\'exploitation:');
console.log(os.version())
console.log('La plateforme : ');
console.log(os.platform())
console.log('La machine? : ');
console.log(os.machine());
console.log('La memoire : ');
console.log(os.totalmem())
console.log('Le processeur : ');
console.log(os.cpus())
console.log('L\'architecture : ');
console.log(os.arch())
console.log('Le boutisme : ');
console.log(os.endianness())
console.log('le réseau: ');
console.log(os.networkInterfaces());