const express = require("express");
const req = require("express/lib/request");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.listen(PORT);

app.get("/api/quotes/random", (req, res) => {
  res.send({ quote: getRandomElement(quotes) });
});

app.get("/api/quotes", (req, res) => {
  const requestedPerson = req.query.person;
  const quotesArray = [];
  if (requestedPerson) {
    quotes.forEach((quote) => {
      if (quote.person === requestedPerson) {
        quotesArray.push(quote);
      }
    });
  } else {
    quotes.forEach((quote) => {
      quotesArray.push(quote);
    });
  }
  const objectToReturn = {
    quotes: quotesArray,
  };
  res.send(objectToReturn);
});

app.post("/api/quotes", (req, res) => {
  const quote = {
    quote: req.query.quote,
    person: req.query.person,
  };

  if (req.query.quote && req.query.person) {
    res.status(201).send({ quote: quote });
  } else {
    res.status(400).send();
  }
});
