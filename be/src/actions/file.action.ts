const fs = require('fs');
const pdf = require('pdf-parse');
var mammoth = require('mammoth');

export const ExtractPdf = (file) => {
    let content = '';
    let dataBuffer = fs.readFileSync(file.path);
    pdf(dataBuffer).then(function (data) {
        // number of pages
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        console.log(data.metadata);
        // PDF text
        console.log(data.text);
        content = data.text;
    });
    return content;
};

export const ExtractDocx = async (file) => {
    let content = await mammoth.extractRawText({ path: file.path }).then((result) => {
        return result.value;
    });
    return content;
};
