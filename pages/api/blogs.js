// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import * as fs from 'fs';
import { off } from 'process';

export default async function handler(req, res) {
  console.log(req.query.count);
  let data = await fs.promises.readdir("blogdata")
  data = data.slice(0, req.query.count);
  // res.status(200).json(data);
  let myFile;
  let allBlogs = [];
  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    console.log(item);
    myFile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
    console.log(myFile);
    allBlogs.push(JSON.parse(myFile));
  }
  res.status(200).json(allBlogs);
}
  // fs.promises.readdir("blogdata",'utf-8',(err,data)=>{
  //   let allBlogs=[];
  //   // console.log(typeof(data));
  //   data.forEach((item)=>{
  //     console.log(item);
  //     fs.readFile('/bogdata/'+item,(e,d)=>{
  //       allBlogs.push(d)
  //     })
  //   })
  //   res.status(200).json(allBlogs);
  // })

