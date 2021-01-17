const deepai = require('deepai');

deepai.setApiKey('7c0da8aa-d37b-4a6a-9fd0-bda506ec4b61');

module.exports = {

    summarize: async function (txt) {
        var resp;
        try {
            resp = await deepai.callStandardApi("summarization", {
                text: txt,
            });
            resp = resp.output
        }
        catch (e) {
            resp = ''
        }
        console.log(resp);
        return resp;
    }
}
