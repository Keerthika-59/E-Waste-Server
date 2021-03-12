const express = require('express');
const app = express();
const PORT = 5000;

const { User, Activity} = require('./models/user.model.js');
const { ContactModel } = require('./models/contacts.model.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
