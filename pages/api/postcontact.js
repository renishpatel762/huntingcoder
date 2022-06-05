import * as fs from 'fs';
export default async function handler(req, res) {
    if (req.method === 'POST') {
        // console.log(req.body);
        //process a post request
        let data = await fs.promises.readdir('contactdata');
        // console.log(data.length);
        fs.promises.writeFile(`contactdata/${data.length + 1}.json`, JSON.stringify(req.body));
        res.status(200).json(["data added"]);
    } else {
        // handle any other http request
        res.status(420).json((["aljflds"]));
    }
}