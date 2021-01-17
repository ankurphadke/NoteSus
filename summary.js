const deepai = require('deepai');

deepai.setApiKey('API-KEY');

module.exports = {

    summarize: async function (txt) {
        var resp;
        try {
            resp = await deepai.callStandardApi("summarization", {
                text: txt,
            });
        }
        catch (e) {
            resp = ''
        }
        return resp;
    }
}
