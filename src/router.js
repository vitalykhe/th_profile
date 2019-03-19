const Profile = require("./profile.js");
const renderer = require("./renderer.js")
const queryString = require("querystring")

const commonHeader = {"Content-type" : "text/html"};

function homeRoute(request, response) {
  if( request.url === '/') {
    if(request.method.toLowerCase() === "get") {
      response.writeHead(200, commonHeader);
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
    } else {
      //post case: get post data from body, extract username and redirect to userRoute
      request.on("data", body => {

        body = body.toString();
        console.log(body);
        //extract username value
        let query = queryString.parse(body);
        response.writeHead(303, {"Location" : "/" + query.username});
        response.end();

      });
    }
  }
}

function routerMessage(message) {
  console.log("Router message: ", message);
}

function userRoute(request, response) {
  let username = request.url.replace("/", "");

  if( username.length > 0) {
    response.writeHead(200, commonHeader);
    renderer.view("header", {}, response);
    const studentProfile = new Profile(username);
    studentProfile.on("end", (profileJSON) => {
      routerMessage("Event 'end' has listened, reading JSON from Profile instance..")
      //show profile
      console.log("values are: " , profileJSON);
      renderer.view("profile", profileJSON, response);
      renderer.view("footer", {}, response);
    });

    studentProfile.on("error", (error) => {
      //show error
      renderer.view("error", { "error" : error.message }, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
    });
  }
}

module.exports.home = homeRoute;
module.exports.user = userRoute;
