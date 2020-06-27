const express = require('express');
const bodyParser = require('body-parser');
const writeJsonFile = require('write-json-file');


const cdn = express();
cdn.use(bodyParser());

cdn.post('/json', async (req, res) => {
    const clientJSON = req.body;
    try {
        await writeJsonFile('./clientJSON/clientJSON.json', clientJSON);
    } catch(error) {
        res.status(400).send('ERROR: Could not write JSON to file.');
    }
    res.download('./clientJSON/clientJSON.json', error => {
        res.status(400).send({err:'ERROR: Failed to send downloadable JSON to client', error});
    });
});

cdn.listen(5000, () => console.log('CDN is listening at port 5000...'));