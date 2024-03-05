// SERVER
const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./module/replaceTemplate");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf8"
);
const temptProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // Overview
  if (pathname === "/" || pathname == "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(temptProduct, product);
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    //Not found
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
