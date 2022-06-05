// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from 'fs';
import { off } from 'process';
// http://127.0.0.1:3000/api/getblog?slug=how-to-learn-nodejs
export default function handler(req, res) {
  fs.readFile(`blogdata/${req.query.slug}.json`, 'utf-8', (err, data) => {
    // console.log(typeof(data));
    if (err) {
      res.status(500).json({ error: "No such blog found" });
    }
    console.log(req.query.slug);
    res.status(200).json(JSON.parse(data))
  })
}
