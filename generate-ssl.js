//   openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -sha256 -config "C:\Program Files (x86)\GnuWin32\share\openssl.cnf"
// Can't get it working locally (might, not actually be a thing.. anyways it's only for signalling)

// var https = require("https");
// var pem = require("pem");

// pem.createCertificate(
//   {
//     days: 30,
//     selfSigned: true
//   },
//   function(err, keys) {
//     if (err) {
//       throw err;
//     }
//     https
//       .createServer(
//         {
//           key: keys.serviceKey,
//           cert: keys.certificate
//         },
//         function(req, res) {
//           res.end("o hai!");
//         }
//       )
//       .listen(443);
//   }
// );
