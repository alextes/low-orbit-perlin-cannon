import polka from "polka";
import { json } from "body-parser";
import perlin from "./perlin";
import send from "@polka/send-type";

let count = 0;

const app = polka().listen(8080, (err: Error) => {
  if (err) throw err;
  console.log(`> perlin server listening`);
});

app.use(json());

app.options("/perlin", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});
app.post("/perlin", (req, res) => {
  count++;
  if (count % 1000 === 0) {
    console.log(`${count} requests handled`);
  }
  const noise = perlin(req.body, false);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  send(res, 200, { noise });
});
