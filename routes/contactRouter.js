const express = require('express');
const cors = require('./cors');
const Contact = require('../model/contact');
const authenticate = require('../authenticate');

const contactRouter = express.Router();

contactRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
    .get(cors.cors, (req, res, next) => {
        Contact.find()
            .then(contact => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(contact);
            })
            .catch(err => next(err));

    })

    .post(cors.corsWithOptions, (req, res, next) => {
        Contact.create(req.body)
            .then(contact => {
                console.log("---POST LOG:", contact);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(contact);
            })
            .catch(err => {
                console.log("---POST LOG ERROR: ", err)
                next(err)
            });

    })

    .put(cors.corsWithOptions, (req, res) => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        res.end('PUT method not supported on /contact');
    })

    .delete(cors.corsWithOptions, (req, res, next) => {
        Contact.deleteMany()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response)
            })
            .catch(err => next(err));
    })

module.exports = contactRouter;