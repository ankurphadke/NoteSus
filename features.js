var async = require('async');


async function detectFulltext(filePath, callback) {

    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Read a local image as a text document
    const [result] = await client.documentTextDetection(filePath);
    const fullTextAnnotation = result.fullTextAnnotation.text;
    console.log(fullTextAnnotation);
    callback(null, fullTextAnnotation);
}

async function NLP(str) {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');

    // Instantiates a client
    const client = new language.LanguageServiceClient();

    const document = {
        "type": "PLAIN_TEXT",
        "language": "EN",
        "content": str
    }

    // Detects the sentiment of the text
    const [result] = await client.analyzeEntities({ document: document, encodingType: "UTF8" });
    console.log(result);
}

function imageToText(path) {
    async.waterfall([
        async.apply(detectFulltext, path),
        NLP,
    ]);
}
imageToText("h5.jpg");
