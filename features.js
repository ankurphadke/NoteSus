const { call } = require('@google-cloud/vision/build/src/helpers');
var async = require('async');
var res = null;

 module.exports = {

    detectFullText : async function (filePath, callback) {

        // Imports the Google Cloud client library
        const vision = require('@google-cloud/vision');

        // Creates a client
        const client = new vision.ImageAnnotatorClient();

        // Read a local image as a text document
        const [result] = await client.documentTextDetection(filePath);
        const fullTextAnnotation = result.fullTextAnnotation.text;
        console.log(fullTextAnnotation);
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
        const [entity] = await client.analyzeEntitySentiment({ document: document, encodingType: "UTF8" });
        const [categories] = await client.classifyText({ document: document, encodingType: "UTF8" });
        // result = result.entities;
        // res = result;
        const returnValue = [categories, entity];
        return returnValue;
    }
}

function imageToText(path) {
    async.waterfall([
        async.apply(detectFulltext, path),
        NLP,
    ], function(err,response){
        console.log("hello");
    });
}

// NLP("Thousands of Canadians are thumbing their noses at government advice to stay home and hopping international flights to sunny destinations even as the COVID-19 crisis worsens in many parts of the country, CBC News has found. Canadian air carriers operated more than 1,500 flights between Canada and 18 popular vacation destinations since Oct. 1, even as caseloads rise and the health crisis deepens.\
// // It has prompted many questions from Canadians about why there is no outright travel ban, especially given recent high-profile resignations and firings involving politicians, doctors and civic leaders who've taken vacations outside the country.\
// With the new state of emergency and recent lockdown measures, why hasn't the government considered restrictions for airline travel either international or even Canadian travel between provinces? asked Brenda LacLaurin of Ottawa, who contacted CBC News.")