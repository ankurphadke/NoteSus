const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'notesenderrr@gmail.com',
        pass:'banananote'
    }
});

var mailOptions = {
    from:'notesenderrr@gmail.com',
    to:'shivamajmera@hotmail.com',
    subject:'Your note',
    text:'Hey there, this is your note!'
};

transporter.sendMail(mailOptions,function(err,info){
    if(err){
        console.log(err);

    }
    else {
        console.log('Email Sent:' + info.response);

    }
});
