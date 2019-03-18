const EventEmitter = require("events");
const https = require("https");
const http = require("http");
const util = require("util");

class Profile extends EventEmitter {

    constructor(username) {
      super();
      // need for  calling the  methods of EventEmitter
      let profileInstanceContext = this;

        const request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {

        let body = "";

        if (response.statusCode !== 200) {
          request.abort();
          //Status Code Error
          profileInstanceContext.emit("error", new Error("There was an error : " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
        }

        //Read the data
        response.on('data', chunk => {
          body += chunk;
          profileInstanceContext.emit("data", chunk);
        });

        response.on('end',  () => {
            if(response.statusCode === 200) {
              try {
                //Parse the data
                const profile = JSON.parse(body);
                profileInstanceContext._name = profile.name;
                console.log("User profile found for: ", profileInstanceContext._name, "\n emitting 'end'");

                profileInstanceContext.emit("end",
                {
                  "username" : profile.name,
                  "badges" : profile.badges.length,
                  "javascriptPoints" : profile.points.JavaScript,
                  "avatarURL": profile.gravatar_url
                });
              } catch (error) {
                profileInstanceContext.emit("error", error);
              }
            }

          });
          response.on("error", error  => {
              profileInstanceContext.emit("error", error);
              console.error(error);
            });
      });
    }

    get userData() {
      return this._name;
    }

    //Connect to the API URL (https://teamtreehouse.com/username.json)
}

module.exports = Profile;
