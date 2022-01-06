const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const app = express();

const cors = require('cors')({origin: true});

app.use(cors);


const anonymousUser = {
    id: "anon",
    name: "Anonymous",
    avater: ""
};

const checkUser = (req, res, next) => {
    req.user = anonymousUser;
    if (req.query.auth_token != undefined) {
        let idToken = req.query.auth_token;
        admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
            let authUser = {
                id: decodedIdToken.user_id,
                name: decodedIdToken.name,
                avater: decodedIdToken.picture
            };
            req.user = authUser;
            next();
        }).catch(error => {
            next();
        });
    } else {
        next();
    };
};

app.use(checkUser);


function createChannel(cname){
    let channlesRef = admin.database().ref('channels');
    let date1 = new Date();
    let date2 = new Date();
    date2.setSeconds(date2.getSeconds() + 1 );
    const defaultData = `{
        "messages" : {
            "1" : {
                "body" : "welcome to #${cname} channel!",
                "date" : "${date1.toJSON()}",
                "user" : {
                    "avater" : "",
                    "id" : "robot",
                    "name" : "Robot"
                }
            },
            "2" : {
                "body" : "初めてのメッセージを投稿してみましょう。",
                "date" : "${date2.toJSON()}",
                "user" : {
                    "avater" : "",
                    "id" : "robot",
                    "name" : "Robot"
                }
            },
        }
    }`;
    channlesRef.child(cname).set(JSON.parse(defaultData));
}

app.post('/channels', (req, res) => {
    let cname = req.body.cname;
    createChannel(cname);
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.status(201).json({result: 'ok'});    
});

app.get('/channels', (req, res) => {
    let channlesRef = admin.database().ref('channels');
    channlesRef.once('value', function(snapshot) {
        let items = new Array();
        snapshot.forEach(function(childSnapshot) {
            let cname = childSnapshot.key;
            items.push(cname);
        });
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.send({channels: items});
    });
});