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

router.get('/userCosting/:id', [verifyToken, verifyUser], asyncMiddleware( async(req, res, next) => {
    console.log('req.params.id', req.params.id)
    let sql = `SELECT section, subsection, sop, updated_at FROM sop WHERE userId = ${req.params.id}`
        pool.query(sql, (err, results) => {
            try{
                if(err) throw err;
                res.send({ data: results });
            }catch(e){
                logError(e, req.url)
                res.status(403);
                return;
            }
        })
}))

router.post('/addCosting', asyncMiddleware( async(req, res, next) => {
    const values = [
        [ req.body.userId, 'costing', 'procedure', req.body.procedure, time, time ],
        [ req.body.userId, 'costing', 'methodology', req.body.methodology, time, time ],
        [ req.body.userId, 'costing', 'assignemnt', req.body.assignemnt, time, time ],
        [ req.body.userId, 'costing', 'period', req.body.period, time, time ],
        [ req.body.userId, 'costing', 'reports', req.body.reports, time, time ]
      ];


    // let post= {
    //     "userId":                     req.body.userId,
    //     "procedure":                  req.body.procedure,
    //     "methodology":                req.body.methodology,
    //     "assignemnt":                 req.body.assignemnt,
    //     "period":                     req.body.period,
    //     "reports":                    req.body.reports,
    //     "created_at":                 time,
    //     "updated_at":                 time,
    // }
    // let sql = 'INSERT INTO sop SET ?'
    // pool.query(sql, post, (err, results) => {
        const sql = "INSERT INTO sop(userId, section, subsection, sop, created_at, updated_at ) VALUES ?";
        pool.query(sql, [values], (err, result)=> {
        try{
            if(err){ res.send({ success: false, message: err.sqlMessage }) }
            res.send({ success: true, message: 'Costing Added Successfuly' });
        }catch(e){
            logError(e, req.url)
            res.status(403);
            return;
        }
    })
}))








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

function verifyUser(req,res,next){
    if(req.cookies.token){
        const bearerHeader = req.cookies.token
        try{
            const user = jwt.verify(bearerHeader,'secretkey')
            if (user.user.role!=='User'){
            res.redirect('/')
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