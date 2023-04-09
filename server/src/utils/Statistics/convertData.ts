// import * as fs from 'fs';
import * as path from 'path';


export const convertData = () => {
    const fs = require('fs');
    const jsonString = fs.readFileSync('../../data/orders.json', 'utf-8');
    const jsonArray = JSON.parse(jsonString);

    console.log("JSON em array",jsonArray);
    return jsonArray;
}
