import express from "express";
import React from "react";
import { renderToString } from "react-dom/server"
import "regenerator-runtime/runtime.js"

import Index from "../pages/index/Index"
import FourOFour from "../pages/index/FourOFour"

import Register from "../pages/auth/Register"
import Login from "../pages/auth/Login"
import ForgotPassword from "../pages/auth/ForgotPassword"
import ResetPassword from "../pages/auth/ResetPassword"

import UserCosting from "../pages/user/UserCosting"

import { decode } from "jsonwebtoken"

const jwt = require('jsonwebtoken')
const router = express.Router()
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')

var bodyParser = require('body-parser')

router.use(bodyParser.json())

var cookieParser = require('cookie-parser')
router.use(cookieParser()) 

router.use(bodyParser.urlencoded({ extended: true }))
const nodemailer = require("nodemailer");
var pool = require('./mysqlConnector');

router.use('/auth', require('./auth'))
router.use('/admin', require('./admin'))
router.use('/user', require('./user'))

const asyncMiddleware = require('./asyncMiddleware');

router.get('/', asyncMiddleware( async(req, res, next) => {
  console.log('req.url', req.url)
  const meta = await getMeta('/')
  const reactComp = renderToString( <Index/> )
  res.status(200).render('pages/Index', { reactApp: reactComp, meta: meta})
})) 

router.get('/register', asyncMiddleware( async (req, res, next) => { res.status(200).render('auth/Register', { reactApp: renderToString(<Register/>), meta: [] }) }))

router.get('/login', asyncMiddleware( async (req, res, next) => { res.status(200).render('auth/Login', { reactApp: renderToString(<Login/>), meta: [] }) }))
router.get('/forgotPassword', asyncMiddleware( async (req, res, next) => { res.status(200).render('auth/ForgotPassword', { reactApp: renderToString(<ForgotPassword/>), meta: [] }) }))
router.get('/resetPassword/:id', asyncMiddleware( async (req, res, next) => { res.status(200).render('auth/ResetPassword', { reactApp: renderToString(<ResetPassword/>), meta: [] }) }))
// router.get('/404', asyncMiddleware( async (req, res, next) => { const meta = await getMeta('/404'); res.status(200).render('pages/FourOFour', { reactApp: renderToString(<FourOFour/>), meta: meta }) }))


router.get('/user/admin', asyncMiddleware( async (req, res, next) => { res.status(200).render('user/UserCosting', { reactApp: renderToString(<UserCosting/>), meta: [] }) }))
router.get('/user/costing', asyncMiddleware( async (req, res, next) => { res.status(200).render('user/UserCosting', { reactApp: renderToString(<UserCosting/>), meta: [] }) }))












function getMeta(url) {
  return new Promise((resolve, reject) => {
    let sql =   `SELECT title, description, keyword FROM metas WHERE url='${url}';
                SELECT title, description, keyword FROM metas WHERE url='default'`
    pool.query(sql, [1,2], (err, rows) => {
      try{
        if(rows){ 
          if(rows[0].length){ resolve(rows[0]) }else{ resolve(rows[1]) } }
      }catch(e){
        logError(e, 'Function get Meta in Index')
        res.status(403);
        return;
      }
    });
  })
}

function verifyToken(req, res, next){
  if(req.cookies.jwt){
    const bearerHeader = req.cookies.jwt
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
  }
}

function verifyAdmin(req, res, next){
  if(req.cookies.jwt){
    const bearerHeader = req.cookies.jwt
    try{
      const user = jwt.verify(bearerHeader,'secretkey')
        if (user.user.role!=='Admin'){
          res.redirect('/blog')
          res.end()
          return;
        }
        next();
      } catch(e){
        logError(e, 'Function verifyAdmin in Index')
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
  //     <p>There has been error in AmitKK. Please check if website is running or not.</p>
  //     <p>Then check the log</p>
  //     ${e}<br/>
  //     ${func}
  //     <p>Warm Regards</p>
  //     <p>Team AmitKK</p>
  // `
  // let transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'amit@amitkk.com', pass: 'coderBhai@2203',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });
  // let mailOptions = { to: 'amit.khare588@gmail.com', from: 'amit@amitkk.com', subject: "Error on ✔ www.amitkk.com", html: mailBody }
  // transporter.sendMail( mailOptions, (error, info)=>{
  //     res.send({ success: true, message: "Please check your mail" })
  // })
}

function logError(e, func){
  sendMailOnError(e, func)
}

export default router;