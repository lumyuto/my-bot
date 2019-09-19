const BaseBot = require('bot-sdk');
const fs = require('fs');


module.exports = function render() {
    const doc = JSON.parse(fs.readFileSync('./launchDPL.json').toString())
    const document = new Bot.Directive.DPL.Document(doc)
    const DPLDirective = new Bot.Directive.DPL.RenderDocument()
    DPLDirective.setDocument(document)
    return {
        directives: [DPLDirective],
        outputSpeech: '测试一下'
    };
}