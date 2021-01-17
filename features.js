const { call } = require('@google-cloud/vision/build/src/helpers');
var async = require('async');

 module.exports = {

    detectFullText : async function (filePath, callback) {

        // Imports the Google Cloud client library
        const vision = require('@google-cloud/vision');

        // Creates a client
        const client = new vision.ImageAnnotatorClient();

        // Read a local image as a text document
        const [result] = await client.documentTextDetection(filePath);
        const fullTextAnnotation = result.fullTextAnnotation.text;
        callback(null, fullTextAnnotation);
    },

    NLP : async function (str) {
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
        var entity, categories;

        try {
            [entity] = await client.analyzeEntitySentiment({ document: document, encodingType: "UTF8" });
        }
        catch (e) {
            entity = ''
        }
        try {
            [categories] = await client.classifyText({ document: document, encodingType: "UTF8" });
        }
        catch (e) {
            categories = '';
        }

        return [categories, entity];
    }
}
