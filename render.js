const BaseBot = require('bot-sdk');

const Document = BaseBot.Directive.DPL.Document
const RenderDocument = BaseBot.Directive.DPL.RenderDocument

const template = items => ({
    "type": "DPL",
    "version": "1.0",
    "mainTemplate": {
        "parameters": [
            "payload"
        ],
        "items": items
    }
})

const body = items => ({
    "type": "Container",
    "flex-direction": "row",
    "width": "100%",
    "height": "100%",
    "items": items
})

const link = 'http://dbp-resource.gz.bcebos.com/2428e786-8d60-d103-925a-55f1b4739400/'
const btnTemplate = (id, active=false, img) => ({
    "type": "Container",
    "height": "88dp",
    "width": "66dp",
    "background-color": active ? "#353A47" : "#30333F",
    "items": [{
        "type": "Image",
        "width": "34dp",
        "height": "34dp",
        "position": "absolute",
        "top": "27dp",
        "left": "16dp",
        "src": link + img
    }],
    "onClick": [{
        "type": "SendEvent",
        "componentId": id
    }]
})

const right = activeIndex => ({
    "type": "Container",
    "height": "100%",
    "width": "66dp",
    "position": "absolute",
    "right": "0dp",
    "top": "0dp",
    "background-color": "#30333F",
    "items": [
        btnTemplate("MENU.Radar", activeIndex==1, "radar.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T04%3A21%3A05Z%2F-1%2F%2F65c92d68d73fdd2aeb68bcbdaeef34bbec4c4eb2ebd5d1cc53cedefa2cf5fb22"), 
        btnTemplate("MENU.News", activeIndex==2, "news.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T04%3A21%3A04Z%2F-1%2F%2F25e5ad481ebd9af2a1c91904f7e8ac4e912bc7eebdc093be8950e5c8a9fc8b4f"), 
        btnTemplate("MENU.Signal", activeIndex==3, "singal.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T04%3A21%3A04Z%2F-1%2F%2Fa9f56e0c1cbc85d23702a99b9982c6b606a6fbadc48bc8ea0dffe560e0d6c1c9"),
        btnTemplate("MENU.Live", activeIndex==4, "live.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T04%3A21%3A04Z%2F-1%2F%2F71d9b2f25a9f4155decb14d6f88f15a07dea5b91b12b23d8829f0e6af998f146")]
})


const {getRadarData, getNewsData, getSingalData} = require('./getdata');
const {radar_tpl} = require('./radar_tpl.js');
const {news_tpl} = require('./news_tpl.js');
const {singnal_tpl} = require('./singnal_tpl.js');


function renderRadar() {
    return new Promise((resolve, reject) => {
        getRadarData().then(data => {
            data = JSON.parse(JSON.stringify(data))

            const len = Math.floor(data.length /5)-1
            const data2 = [...Array(len).keys()].map(key =>
                [data[key*5+0],data[key*5+1],data[key*5+2],data[key*5+3],data[key*5+4]])

            const left = radar_tpl

            const doc = template(
                [body([
                    left({ data: data2 }), 
                    right(1)
                ])]
            )
            const document = new Document(doc)
            const DPLDirective = new RenderDocument()
            DPLDirective.setDocument(document)

            resolve({
                directives: [DPLDirective],
            })
        })
    })
}

function renderNews() {
    return new Promise((resolve, reject) => {
        getNewsData().then(data => {
            data = JSON.parse(JSON.stringify(data))

            console.log('\n\ndata:\n' + JSON.stringify(data))

            const left = news_tpl
            const doc = template(
                [body([
                    left({ data: data }), 
                    right(2)
                ])]
            )

            console.log('\n\ndoc:\n'+ JSON.stringify(doc))
            const document = new Document(doc)
            const DPLDirective = new RenderDocument()
            DPLDirective.setDocument(document)

            resolve({
                directives: [DPLDirective],
            })
        })
    })
}

function renderSingnal() {
    return new Promise((resolve, reject) => {
        getSingalData().then(data => {
            data = JSON.parse(JSON.stringify(data))

            console.log('\n\ndata:\n' + JSON.stringify(data))

            const left = singnal_tpl
            const doc = template(
                [body([
                    left({ data: data }), 
                    right(3)
                ])]
            )

            console.log('\n\ndoc:\n'+ JSON.stringify(doc))
            const document = new Document(doc)
            const DPLDirective = new RenderDocument()
            DPLDirective.setDocument(document)

            resolve({
                directives: [DPLDirective],
            })
        })
    })
}

module.exports = {
    renderRadar,
    renderNews,
    renderSingnal,
}