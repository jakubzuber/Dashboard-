const express = require('express');
const dbOperation = require('./dbFiles/dbOperations');
const cors = require('cors')
//const path = require('path')

const API_PORT = process.env.POT || 5000;
const app = express();

let client;
let sesion;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//const root = require('path').join(__dirname, 'build');

// ZAPYTANIA DO BAZY DASHBOARD

app.get('/apiPlaner', async(req, res) => {
    const result = await dbOperation.getDataDashboard(req.body);
    res.send(result.recordset)
});

app.post('/apiPostSort', async(req, res) => {
    dbOperation.insertIndexDashboard(req.body)
    res.status(200).json({ success: true})
});

app.post('/apiPostRamp', async(req, res) => {
    dbOperation.insertRampDashboard(req.body)
    res.status(200).json({ success: true })
});

/// ZAPYTANIA DO BAZY SPEED

app.get('/getSelfTransport', async(req, res) => {
    const result = await dbOperation.getSelfCollectionAndDeliveryData(req.body)
    res.send(result.recordset)
});

app.get('/apiRoutesImports', async(req, res) => {
    const result = await dbOperation.getDataRoutesImports(req.body);
    res.send(result.recordset)
});

app.get('/apiRoutesExports', async(req, res) => {
    const result = await dbOperation.getDataRoutesExports(req.body);
    res.send(result.recordset)
});

app.get('/getDataOrders', async(req, res) => {
    const result = await dbOperation.getDataOrders(req.body);
    res.send(result.recordset)
})

app.get('/getDataOrdersDetails', async(req, res) => {
    const result = await dbOperation.getDataOrdersDetails(req.body);
    res.send(result.recordset)
})

app.get('/apiRoutesDomesticArrival', async(req, res) => {
    const result = await dbOperation.getDataRoutesDomesticArrival(req.body);
    res.send(result.recordset)
});
 
app.get('/apiRoutesDomesticDeparture', async(req, res) => {
    const result = await dbOperation.getDataRoutesDomesticDeparture(req.body);
    res.send(result.recordset)
});

app.get('/apiCalendar', async (req, res) => {
    const result = await dbOperation.getDataCalendar(req.body);
    res.send(result.recordset)
})

//app.use(express.static(root))

//app.use('/*', (req, res) => {
//    res.sendFile(path.join(__dirname, 'build', 'index.html'))
//})

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));