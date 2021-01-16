const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

deepai.setApiKey('7c0da8aa-d37b-4a6a-9fd0-bda506ec4b61');

(async function() {
        var resp = await deepai.callStandardApi("summarization", {
        text: "Considered to be one of the most dangerous diseases of the 21st Century, Cancer has claimed millions of lives. Till date, scientists have been unsuccessful in finding a cure that is 100% effective or that has no side-effects. Besides, there are numerous types of cancer and in many cases, the cancer is recurrent. But what if you could fight cancer by altering the very thing that defines your characteristics—your DNA. In order to fight B-cell acute lymphoblastic leukemia, a rare type of leukemia, researchers at the Leukemia and Lymphoma Society have devised a technique that involves altering the very genes of certain white blood cells. The technique uses certain “vectors” that are able to pave their way into the nucleus and modify the DNA. These vectors are certain viruses and bacteria that identify the target cells and insert their DNA into them. In this case, the vector is an inactive form of HIV. This technique is to be a one-time therapy according to the researchers. First, millions of T-cells, a type of WBC immune to this type of cancer, are removed from the patient’s blood stream. These T-cells are then purified and sent to a lab for genetic modification.",
    });
    console.log(resp.output);
})()