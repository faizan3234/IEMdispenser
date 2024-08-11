const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/public/', express.static('./public'));

// Replace with your email credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'khanfaizan3234@gmail.com',    // Your email
        pass: 'vpra mojw jrup vckn'          // Your email password
    }
});

app.get('/', (req, res) => {
    const flag = 0;
    res.render('home', { 'flag': flag });
});

app.get('/newpage', (req, res) => {
    const flag = 1;
    res.render('home', { 'flag': flag });
});

app.post('/send-mail', async (req, res) => {
    const flag = 0;
    const customerEmail = req.body.customerEmail;
    const ammount = req.body.ammount; // Fixed spelling from 'ammount' to 'amount'
    console.log(req.body);
    console.log(customerEmail);

    var mailOptions = {
        from: 'khanfaizan3234@gmail.com',
        to: customerEmail,
        subject: 'Your Bill from Coke Dispenser',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Bill</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        color: #333;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        padding: 20px;
                        background: #fff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #007bff;
                        font-size: 24px;
                        margin-bottom: 10px;
                    }
                    p {
                        font-size: 16px;
                        line-height: 1.5;
                        margin-bottom: 20px;
                    }
                    .footer {
                        font-size: 14px;
                        color: #777;
                        text-align: center;
                        margin-top: 20px;
                    }
                    .logo {
                        display: block;
                        max-width: 100px;
                        margin: 0 auto 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <img src="https://media.licdn.com/dms/image/D4D22AQGWjSvohKv_fw/feedshare-shrink_2048_1536/0/1723144376438?e=1726099200&v=beta&t=oe3e0Juu0h2U6LQhAUkKNbocNHEC_e_g-fPYnDB8Es8" alt="Company Logo" class="logo">
                    <h1>Thank You for Your Purchase!</h1>
                    <p>Dear Customer,</p>
                    <p>We appreciate your business with our Coke dispenser service. Here are the details of your recent transaction:</p>
                    <p><strong>Grand Total: </strong>₹${ammount}</p>
                    <p>If you have any questions or need further assistance, please do not hesitate to contact us (9163606455).</p>
                    <p>Thank you for choosing us!</p>
                    <div class="footer">
                        <p>&copy; 2024, IEM Dispenser. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
        res.redirect('/newpage');
    } catch (error) {
        console.error('Error sending email:', error);
        res.send("Mail Not Sent");
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});