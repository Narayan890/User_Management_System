const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const con = await mongoose.connect("mongodb+srv://admin:admin@123@cluster0.5nydc.mongodb.net/users?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("DataBase Connected " + con.connection.host);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

// create model
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    status: String
})

const userDB = mongoose.model("userDB", schema);

//create new user

const create = (req, res) => {
    //validate user
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }
    //new user
    const user = new userDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    //save user in database
    user
        .save(user)
        .then(data => {
            //res.send(data);
            res.redirect("/");
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

// retrive all users
const find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        userDB.findById(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });

    } else {
        userDB.find()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err.message })
            });
    }
}

// update user by user id

const update = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }
    const id = req.params.id;
    userDB.findByIdAndUpdate(id, req.body, { userFindAndModify: false })
        .then(data => {
            res.send(data);

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

}

// delete a user by id

const deleteUser = (req, res) => {
    const id = req.params.id;
    userDB.findByIdAndDelete(id)
        .then(data => {
            res.send({ message: "Delete Successfully" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

module.exports = { connectDB, userDB, create, find, update, deleteUser };