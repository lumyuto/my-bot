const BaseBot = require('bot-sdk');
const fs = require('fs');

const Document = BaseBot.Directive.DPL.Document
const RenderDocument = BaseBot.Directive.DPL.RenderDocument

module.exports = function render() {
    const doc = JSON.parse(fs.readFileSync('./launchDPL.json').toString())
    const document = new Document(doc)
    const DPLDirective = new RenderDocument()
    DPLDirective.setDocument(document)
    return {
        directives: [DPLDirective],
        outputSpeech: '测试一下'
    };
}