const express = require('express');
const router = express.Router();
const runGulpTask = require('run-gulp-task');
const path = require('path');
const fs = require('fs');

const writeFile = (fileName, data) => {
    const filePath = path.join(process.cwd(), `src/styles/variables/_${fileName}.scss`);
    fs.writeFileSync(filePath, '');
    if (data.imports) {
        for (let i in data.imports) {
            fs.appendFileSync(filePath, `@import "${data.imports[i]}";\n`);
        }
    }
    for (let i in data) {
        if (i === 'imports') continue;
        fs.appendFileSync(filePath, `$${i}: ${data[i]};\n`);
    }
}

router.post('/', (req, res) => {
    if (req.body) {
        for (let i in req.body) {
            writeFile(i, req.body[i]);
        }
    }
    runGulpTask('default', path.join(process.cwd(), 'gulpfile.js'))
        .then(() => {
            console.log('task completed');
            res.status(200).json({ compiled: true });
        })
        .catch(err => {
            console.log('Error', err);
            res.status(500).end();
        });
});

module.exports = router;