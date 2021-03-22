const express = require('express');
<<<<<<< HEAD
const app = express();
const PORT = 5000;

const { User, Activity} = require('./models/user.model.js');
const { ContactModel } = require('./models/contacts.model.js');
=======
const cors = require('cors');
const app = express();
// require('dotenv').config();
const {uri} = require('./config/config.js');

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Credentials',true);
    res.header('Access-Control-Allow-Origin','*') ; 
    res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-with,Content-Type,Accept,Authorization");
    res.setHeader('Access-Control-Allow-Headers','record-count,my-token,x-auth');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    next();
})
>>>>>>> 5fee3e519521ccd54afe5deed773021d69225f9b

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

require('./config/config.js');

require('../server/routes/contactRoute.js')(app);
require('../server/routes/userActivityRoute.js')(app);
app.use("/auth1",require("./routes/userRoute"))

app.use("/reps",require("./routes/repRoute"))
app.use(express.static('images'));

<<<<<<< HEAD
app.get('/users', async (req, res) => {
    try {
        const data = await User.find({});
        res.send(data);

    } catch (error) {
        res.send(400).send('Failed to Get Data');
    }
})

app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findById(id);

        res.send(data);

    } catch (error) {
        res.send(400).send('Failed to Get Data');
    }
})

app.post('/contact', async (req, res) => {

    try {
        const ContactBody = new ContactModel({
            name : req.body.name,
            email : req.body.email,
            message: req.body.message,
            createdAt : new Date()
        })

        console.log(ContactBody);

        await ContactBody.save()
        .then( (msg) => {
            console.log(msg);
        } )
        .catch( (e) => {
            console.log(e.message);
        })

        res.send({
            msg : 'Contacts data added succesfully',
            ContactBody
        })

    } catch (error) {
        res.status(400).send('Failed to Add contact us data');    
    }
})

app.post('/user/register', async (req, res) => {
    try {
        const UserPost = new User({
            name : req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            gender: req.body.gender,
            city: req.body.city,
            address : {
                pincode: req.body.address.pincode,
                street: req.body.address.street,
                houseNumber: req.body.address.houseNumber
            },
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
        })

        await UserPost.save()
        .then( (res) => {
            console.log(res);
        })
        .catch( (e) => {
            console.log(e.message)
        });

        res.send({
            msg : 'Data entered successfully'
        })

    } catch (error) {
        res.status(400).send('Failed to add');
    }
})

// create a new activity for a user (user id passed as parameter)
app.post('/user/activity/:id', async (req, res) => {

    try {
        const id = req.params.id;
        console.log(id);

        const data = await User.findById(id);
        const finalData = data.activity;

        const activityPost = new Activity(
            {
                status: req.body.status,
                bioDegradable: req.body.bioDegradable,
                nonBioDegradable: req.body.nonBioDegradable,
                donation:
                    [
                        {
                        itemName: req.body.donation.itemName,
                        category: req.body.donation.category
                    },
                ]
            }
        )

        finalData.push(activityPost);
        console.log(activityPost);
        await User.findById(id , {
            
        })

        await User.findByIdAndUpdate(id, {
            activity : finalData 
        })

        res.send({
            msg : 'Activity Added Successfully'
        })
        
    } catch (error) {
        res.status(400).send('Failed to post activity')
    }
})

app.listen(PORT, () => {
    console.log(`Running at ${PORT}`);
});
=======
app.get('/', (req, res) => {
    res.json({
        msg : 'Hello World'
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
>>>>>>> 5fee3e519521ccd54afe5deed773021d69225f9b
