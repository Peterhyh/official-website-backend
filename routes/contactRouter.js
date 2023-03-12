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
        Contact.create(req.body)
            .then(contact => {
                console.log("---LOG:", contact);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(contact);
            })
            .catch(err => next(err));

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