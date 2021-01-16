const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey('7c0da8aa-d37b-4a6a-9fd0-bda506ec4b61');

async function summarize(txt) {
        var resp = await deepai.callStandardApi("summarization", {
        text: txt,
    });
    console.log(resp.output);
};

summarize();
