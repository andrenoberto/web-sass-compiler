const express = require('express');
const router = express.Router();
const runGulpTask = require('run-gulp-task');
const path = require('path');

router.get('/', (req, res) => {
    runGulpTask('default', path.join(process.cwd(), 'gulpfile.js'))
        .then(() => {
            console.log('task completed');
            res.status(200).json({compiled: true});
        })
        .catch(err => {
            console.log('Error', err);
            res.status(500).end();
        });
});

module.exports = router;