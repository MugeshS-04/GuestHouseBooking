const nodemailer = require('nodemailer');
const express = require('express')

const Contactus = async function(req, res) {

    

    
        console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kecguesthouse77@gmail.com',
            pass: 'kecguesthouse123'
        }
    });

    const { email, name, message } = req.body;

    const mailOptions = {
        from: 'kecguesthouse77@gmail.com',
        to: email,
        subject: "Mr. " + name,
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info) {
        try{
        
            console.log('Email sent ' );
            res.send("success")
        }
    
    catch(error)
    {
        
        console.log(error)
    }
    });
}


module.exports = { Contactus };