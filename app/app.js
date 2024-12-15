const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const uri = process.env.MONGODB_URI;
const session = require('express-session');
require("./database/conn");
const Register = require("./model/register");
const quiz=require("./model/test");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../app/assets");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set('views', path.join(__dirname, 'views'));
app.use('/models', express.static(path.join(__dirname, 'models')));
app.set("view engine", "hbs");
app.get("/", (req, res) => {
    res.render("index")
});
app.get("/login", (req, res) => {
    res.render("login")
});
app.get("/register", (req, res) => {
    res.render("register")
});
app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: true
  })); 
app.post("/register", async(req, res) => {
    try {
        const FirstName = req.body.FirstName;
        const LastName = req.body.LastName;
        const Gmail = req.body.Gmail;
        const date = req.body.date;
        const PhoneNumber = req.body.PhoneNumber;
        const gender = req.body.gender;
        const Nationality = req.body.Nationality;
        const FatherName = req.body.FatherName;
        const FatherPhone = req.body.FatherPhone;
        const MotherName = req.body.MotherName;
        const MotherPhone = req.body.MotherPhone;
        const Address = req.body.Address;
        const Pincode = req.body.Pincode;
        const Landmark = req.body.Landmark;
        const SchoolName = req.body.SchoolName;
        const TenthCGPA = req.body.TenthCGPA;
        const CollegeName = req.body.CollegeName;
        const IntermediateCGPA = req.body.IntermediateCGPA;
        const UniversityName = req.body.UniversityName;
        const UniversityCGPA = req.body.UniversityCGPA;
        const company = req.body.company;
        const Duration = req.body.Duration;
        const skills = req.body.skills;
        const certificates = req.body.certificates;
        const Password = req.body.password;
        const CPassword = req.body.confirmpassword;
        if (Password === CPassword) {
            const registerCandidate = new Register({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Gmail: req.body.Gmail,
                date: req.body.date,
                PhoneNumber: req.body.PhoneNumber,
                gender: req.body.gender,
                Nationality: req.body.Nationality,
                FatherName: req.body.FatherName,
                FatherPhone: req.body.FatherPhone,
                MotherName: req.body.MotherName,
                MotherPhone: req.body.MotherPhone,
                Address: req.body.Address,
                Pincode: req.body.Pincode,
                Landmark: req.body.Landmark,
                SchoolName: req.body.SchoolName,
                TenthCGPA: req.body.TenthCGPA,
                CollegeName: req.body.CollegeName,
                IntermediateCGPA: req.body.IntermediateCGPA,
                UniversityName: req.body.UniversityName,
                UniversityCGPA: req.body.UniversityCGPA,
                company : req.body.company,
                Duration : req.body.Duration,
                skills : req.body.skills,
                certificates : req.body.certificates,
                Password: Password,
                ConfirmPassword: CPassword
            })

            const registered = await registerCandidate.save();
            res.status(201).render("confirm_register");
        } else {
            res.send(`Dear ${FirstName}.Your password are not matching.`)
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/login", async(req, res) => {
    try {
        const Gmail = req.body.Gmail;
        const password = req.body.Password;
        const useremail = await Register.findOne({ Gmail: Gmail });
        if (useremail.Password === password) {
            req.session.user = req.body.Gmail;
            res.status(201).render("user");
        } else {
            res.send("Password is invalid.Pls enter correct password");
        }
    } catch (error) {
        res.status(400).send("Invalid Gmail")
    }
});
app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  });
// const bcrypt = require("bcryptjs");
// const securePassword = async(password) => {
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);
// }
// securePassword("123");
app.listen(port, () => {
    console.log(`Server running at port no ${port}`);
})
