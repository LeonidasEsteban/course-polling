const express = require('express')
const next = require('next')
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const mongoose = require('mongoose');
const axios = require('axios');
const dotenv = require('dotenv')
const uuidv1 = require('uuid/v1');

dotenv.config()
mongoose.connect('mongodb+srv://alminiltladol:NV7Z8ii273jNP3P@cluster0-kcdnj.azure.mongodb.net/test?retryWrites=true');

const CourseModel = mongoose.model('CourseModel', {
  courseId: String,
  date: Date,
  title: String,
  description: String,
  sections: [{
      title: String,
      description: String
  }],
  comments: [{
      comment: String,
      votes: [{
          userId: String,
          voteUp: Boolean
      }]
  }],
  votes: [{
      userId: String,
      voteUp: Boolean
  }],
  author: {
      name: String
  }
})

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

const setApiKey = function (req, res, next) {
  req.api_key = process.env.api_key;
  next();
};

app.prepare().then(async () => {
  await app.prepare()
  const server = express()

  server.use(bodyParser.json());
  server.use(setApiKey);
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  server.post('/courses', upload.array(), (req, res) => {
    console.log(req.body);

    const course = new IssueModel({
      courseId: uuidv1(),
      date: req.params.date,
      title: req.params.title,
      description: req.params.description,
      sections: req.params.sections.map(e => ({title: e.title, description: e.description})),
      comments: [],
      votes: [],
      author: {
          name: req.params.userName,
          uid: req.params.uid
      }
    });

    course
      .save()
      .then(c => {
        console.log(c);
        res.end('course created')
      });
  });

  server.get('/courses', (req, res) => {
    const courseId = req.params.uid
    console.log(courseId);
    IssueModel.find({ courseId: courseId }, (err, courses) => {
      console.log(err, courses);
      res.json(course);
    })
  });

  server.get('/courses/:curseId', (req, res) => {
    const courseId = req.params.uid
    console.log(courseId);
    IssueModel.findOne({ courseId: courseId }, (err, courses) => {
      console.log(err, courses);
      res.json(course);
    })
  });

  server.put('/courses/:curseId', (req, res) => {
    const courseId = req.params.uid
    console.log(courseId);
    IssueModel.findAndUpdate({ courseId: courseId }, (err, courses) => {
      console.log(err, courses);
      res.json(course);
    })
  });

  server.get('*', (req, res) => {
    handle(req, res)
  })


  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`)
})
