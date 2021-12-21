var express = require("express");
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const dbConfig = require("./db.config.js");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
sequelize.sync().then(() => console.log("synced")).catch(err => console.log(err));
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
sequelize.authenticate().then(() => { console.log("Connected to the database") }).catch((err) => { console.log("unable to connect to database" + err) })
db.policy = require("./models/policy.model.js")(sequelize, Sequelize);
db.credentials = require("./models/credentials.model")(sequelize, Sequelize);
const policy = db.policy;
const credentials = db.credentials;


app.get('/getAllPolicies', function(req, res) {


    policy.findAll({ raw: true }).
    then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send("Error Occured " + err))

})

app.get('/getPolicyById/:Id', function(req, res) {

    policy.findByPk(Number(req.params.Id)).then((data) => res.status(200).send(data))
        .catch((err) => res.status(400).send("Error Occured " + err))
})

app.post('/insertPolicyData', function(req, res) {
    const myPolicy = {
        PolicyNumber: req.body.PolicyNumber,
        Name: req.body.Name,
        Amount: req.body.Amount,
        MaturityAmount: req.body.MaturityAmount,
        Nominee: req.body.Nominee

    }
    policy.create(myPolicy)
        .then((data) => res.status(200).send("Record submitted successfully"))
        .catch(err => res.status(400).send("Erro Occured " + err));

})

app.put('/updatePolicyData', function(req, res) {
    policy.update({
        Name: req.body.Name,
        Amount: req.body.Amount,
        MaturityAmount: req.body.MaturityAmount,
        Nominee: req.body.Nominee
    }, {
        where: { PolicyNumber: req.body.PolicyNumber }
    }).then(data => res.status(200).send("Records updated successfully ")).catch(err => res.status(400).send("Error occured" + err))


})



app.delete('/deletePolicyData/:Id', function(req, res) {

    policy.destroy({
        where: {
            PolicyNumber: Number(req.params.Id)
        }
    }).then(() => res.status(200).send("Record deleted successfully")).catch(err => res.status(400).send("Erro Occured " + err));



})

app.post('/register', function(req, res) {

    const myUser = {
        User_ID: req.body.User_ID,
        Password: req.body.Password,
        Role: req.body.Role

    }
    credentials.create(myUser)
        .then(() => res.status(200).send("Registration successful"))
        .catch(err => res.status(400).send("Erro Occured " + err));

});
app.post('/login', function(req, res) {


    credentials.findByPk(req.body.User_ID).then((data) => {

        if (data) {
            if (data.Password === req.body.Password) {
                res.json("Successfully Loggedin")
            } else {
                res.send("Check user name or password")
            }
        }

    }).catch(err => res.status(401).send("Error occured"));



})



app.listen(3000, function(req, res) {
    console.log("Server is running at port 3000");
});