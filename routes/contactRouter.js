const express = require('express');

const Contact = require('../model/contact');

const contactRouter = express.Router();

contactRouter.route('/')
    .get((req, res) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('GET method not supported on /contact');
    })

    .post((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Your EMAIL: "${req.body.email}", SUBJECT: "${req.body.subject}", and MESSAGE: "${req.body.message}", was sent to Peter!`);
    })

    .put((req, res) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('PUT method not supported on /contact');
    })

    .delete((req, res) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('DELETE method not supported on /contact');
    })

module.exports = contactRouter;