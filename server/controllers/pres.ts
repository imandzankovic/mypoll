// let gapi= require("https://apis.google.com/js/api.js");


//   module.exports.authenticate =function() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/presentations"})
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   module.exports.loadClient=function() {
//     gapi.client.setApiKey('AIzaSyDJRkktyw3DlRFR6wwF_i7Ilz15I9DdrHo');
//     return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/slides/v1/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   module.exports.execute=function() {
//     return gapi.client.slides.presentations.create({
//       "resource": {}
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
                
//               },
//               function(err) { console.error("Execute error", err); });
              
//   }
// //   function execute1() {
// //     return gapi.client.slides.presentations.get({
// //       "presentationId": "1yRce8YuFiTR0A4m9d4xd7s2-2FFEpoZNhrqFnTxYtRw"
// //     })
// //         .then(function(response) {
// //                 // Handle the results here (response.result has the parsed body).
// //                 console.log("Response", response.webViewLink);
                
// //               },
// //               function(err) { console.error("Execute error", err); });
// //   }

//   module.exports.execute1=function() {
//     return gapi.client.slides.presentations.get({
//       "presentationId": "1yRce8YuFiTR0A4m9d4xd7s2-2FFEpoZNhrqFnTxYtRw"
//     })
//         .then(function(response) {
           
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response.result.presentationId);
//                 console.log("https://docs.google.com/presentation/d/" + response.result.presentationId + "/edit?usp=drivesdk")
                
//                 openUrl("https://docs.google.com/presentation/d/" + response.result.presentationId + "/edit?usp=drivesdk")
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   function openUrl(link){
//     window.open(link);
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: "353142091842-tkbt8ut2eov4tlnkcv1c8hnqqtnk20b4.apps.googleusercontent.com"});
//   });