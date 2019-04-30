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
    const model = {
      courseId: uuidv1(),
      date: new Date(),
      title: req.body.title,
      description: req.body.description,
      sections: req.body.sections,
      comments: [],
      votes: [],
      author: {
          name: req.body.userName,
      }
    }
    console.log(model)
    const course = new CourseModel(model);
    console.log(course)

    course
      .save()
      .then(c => {
        console.log(c);
        res.end('course created')
      })
      .catch((err) => {
        console.log(err)
      });
  });

  server.get('/courses', (req, res) => {
    CourseModel.find({}, (err, courses) => {
      // console.log(err, courses);
      res.json(courses);
    })
  });

  server.get('/courses/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    console.log(courseId);
    CourseModel.findOne({ courseId: courseId }, (err, courses) => {
      console.log(err, courses);
      res.json(course);
    })
  });

  server.put('/courses/:courseId', (req, res) => {
    const courseId = req.params.courseId;
    const updateObj = {};
    if(req.body.title) {
      updateObj.title = req.body.title;
    }
    if(req.body.description) {
      updateObj.description = req.body.description;
    }
    if(req.body.sections) {
      updateObj.sections = req.body.sections;
    }
    console.log(courseId);
    CourseModel.findOneAndUpdate({ courseId: courseId }, {
      $set: {
        ...{updateObj}
      }
    }, (err, courses) => {
      console.log(err, courses);
      res.json(course);
    })
  });

  server.put('/courses/:courseId/vote', (req, res) => {
    const courseId = req.params.courseId;
    console.log(courseId);
    console.log(req.body.vote);
    CourseModel.findOneAndUpdate({ courseId: courseId }, {
      $set: {
        "votes.$.vote": req.body.vote
      }
    }, (err, courses) => {
      if (err) return res.send(err)
      res.send(result)
    })
  });

  server.put('/courses/:courseId/comment', (req, res) => {
    const courseId = req.params.courseId;
    console.log(courseId);
    console.log(req.body.vote);
    CourseModel.findOneAndUpdate({ courseId: courseId }, {
      $push: {
        "comments": {
          comment: req.body.comment,
          votes: []
        }
      }
    }, (err, courses) => {
      if (err) return res.send(err)
      res.send(result)
    })
  });

  // server.put('/courses/:courseId/comment/:commentId', (req, res) => {
  //   const courseId = req.params.courseId;
  //   const commentId = req.params.commentId;
  //   console.log(courseId);
  //   console.log(req.body.vote);
  //   CourseModel.findOne({courseId: courseId})
  //   .findOneAndUpdate({ courseId: courseId }, {
  //     $push: {
  //       "comments.$.id": {
  //         comment: req.body.comment,
  //         votes: []
  //       }
  //     }
  //   }, (err, courses) => {
  //     if (err) return res.send(err)
  //     res.send(result)
  //   })
  // });

  server.get('*', (req, res) => {
    handle(req, res)
  })


  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`)
})
