const fs = require('fs');
//alternative plus moderne
//import fs from 'fs';


// fs.readFile('file.txt', 'utf8', (err,data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('contenu du fichier: ')
//   console.log(data);
//
// })
//
// fs.readFileSync('file.txt', 'utf8', (err,data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('contenu du fichier: ')
//   console.log(data);
// })

//ecriture dans un fichier en synchrone
fs.writeFileSync('file.txt','Bienvenue sur nodeJs!' ,'utf8' )