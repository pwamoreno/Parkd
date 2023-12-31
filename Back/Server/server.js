const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'scapeshaper',
      password : '',
      database : 'parkd'
    }
});


const saltRounds = 10;


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send(knex.users);
    // res.send(knex.select('*').from('users'))
})

//signin --> POST = success/fail
app.post('/signin', (req, res) => {
    knex.select('username', 'hash').from('login')
    .where('username', '=', req.body.username)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if(isValid){
            knex.select('*').from('users')
            .where('username', '=', req.body.username)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status(400).json('Cannot get user'))
        }else {
            res.status(400).json('Wrong username or password')
        }
    })
    .catch(err => res.status(400).json('Wrong credentials'))
})

//register --> POST = user
app.post('/register', (req, res) => {
    const {name, username, password} = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    knex.transaction(trx => {
        trx.insert({
            hash: hash,
            username: username
        })
        .into('login')
        .returning('username')
        .then(loginUsername => {
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    username: loginUsername[0].username
                })
                .then(user => {
                    res.json(user[0])
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    
    .catch(err => res.status(400).json('User already exists'))
    
})

//dashboard --> GET = user
app.get('/dashboard/:id', (req, res) => {
    const {id} = req.params;
    knex.select('*').from('users').where({id})
    .then(user => {
        if(user.length){
            res.json(user[0])
        }else {
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('Error getting user'));
})

//book parking slot --> POST = vehicle
app.post('/booking', (req, res) => {
    const {username, vehiclePlate, checkin, checkout, price, spot} = req.body;
    knex.transaction(trx => {
        trx.insert({
            vin: vehiclePlate,
            checkin: checkin,
            checkout: checkout,
            spot: spot,
            price: price,
            username: username
        })
        .into('exitable')
        .returning(['vin', 'checkin', 'checkout', 'spot', 'price'])
        .then(exitData => {
            return trx('vehicle_history')
            .returning('*')
            .insert({
                checkout: exitData[0].checkout,
                checkin: exitData[0].checkin,
                price: exitData[0].price,
                spot: exitData[0].spot,
                vin: exitData[0].vin
            })
            .then(vechileData => {
                res.json(vechileData[0]);
            });
        })
        .catch(err => res.status(400).json(
            'Bad request'
        ))
        .then(trx.commit)
        .then(trx.rollback)
    })
    .catch(err => res.status(400).json('Error getting vehicle data'));
})

//delete entry from exitable -> DELETE = success/failure
app.delete('/delete', (req, res) => {
    const {username} = req.body;
    knex.select('*').from('exitable').where({username}).del()
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Enter Vehicle'))
})

//display all parked vehicles -> POST = userdata
app.get('/exit', (req, res) => {
    knex.select('id', 'vin', 'checkin', 'spot', 'username', 'checkout', 'price').from('exitable')
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('Could not get data'))
})






app.listen(4000, () => {
    console.log("Running on port 4000")
}); 