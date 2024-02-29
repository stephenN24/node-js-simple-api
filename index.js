// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOut = `This is what we know about avocado: ${textIn}.\nCreate on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// console.log("Will read file");

///////////////////////
// SERVER
const fs = require("fs");
const http = require("http");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName == "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "blahblah",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
