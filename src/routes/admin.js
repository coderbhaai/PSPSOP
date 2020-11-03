import express from "express"
import { decode } from "jsonwebtoken"

var pool = require('./mysqlConnector')
const asyncMiddleware = require('./asyncMiddleware')

const jwt = require('jsonwebtoken')
const router = express.Router()
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
const upload = require('express-fileupload')
const fs = require('fs')
router.use(upload())
var path = require('path')
var cookieParser = require('cookie-parser')
router.use(cookieParser())
const nodemailer = require("nodemailer")














function verifyToken(req,res,next){
    if(req.cookies.token){
      const bearerHeader = req.cookies.token
      if(typeof bearerHeader !== 'undefined'){
        req.token = bearerHeader
        const { exp }  = decode(bearerHeader)
        if (Date.now() >= exp * 1000) { 
          res.redirect('/login?e=' + encodeURIComponent('LoggedOut'));
          return;
        }
        next()
      }else{
        res.sendStatus(403)
        return
      }
    }else{
      res.redirect('/login?e=' + encodeURIComponent('LoggedOut'));
      return;
    }
}

function verifyAdmin(req,res,next){
if(req.cookies.token){
    const bearerHeader = req.cookies.token
    try{
        const user = jwt.verify(bearerHeader,'secretkey')
        if (user.user.role!=='Admin'){
        res.redirect('/blog')
        res.end()
        return;
        }
        next();
    } catch(e){  
        logError(e)        
        res.status(403);
        return;
    }
    }else{
    res.redirect('/login?e=' + encodeURIComponent('LoggedOut'));
    }
}

function sendMailOnError(e, func) {
    // const mailBody =`
    //     <h2><strong>Hi</h2>
    //     <p>There has been error in Study Spectrum. Please check if website is running or not.</p>
    //     <p>Then check the log</p>
    //     ${e}<br/>
    //     ${func}
    //     <p>Warm Regards</p>
    //     <p>Team Study Spectrum</p>
    // `
    // let transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'amit@amitkk.com', pass: 'coderBhai@2203',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });
    // let mailOptions = { to: 'amit.khare588@gmail.com', from: 'amit@amitkk.com', subject: "Error on ✔ www.studyspectrum.com", html: mailBody }
    // transporter.sendMail( mailOptions, (error, info)=>{
    //     res.send({ success: true, message: "Please check your mail" })
    // })
}

function logError(e, func){
    sendMailOnError(e, func)
    console.log('e', e)
    console.log('func', func)
}

module.exports = router