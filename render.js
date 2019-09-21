const BaseBot = require('bot-sdk');
const fs = require('fs');

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

// const pic = "http://47.94.136.153:8000/fig/BTC.png"
// const data = [
//     [{
//         "img": pic,
//         "title": "DAX",
//         "factor": "VOL",
//         "value": "+4.08%"
//     }, {
//         "img": pic,
//         "title": "DAX",
//         "factor": "VOL",
//         "value": "+4.08%"
//     }, {
//         "img": pic,
//         "title": "DAX",
//         "factor": "VOL",
//         "value": "+2.08%"
//     }, {
//         "img": pic,
//         "title": "白酒",
//         "factor": "VOL",
//         "value": "+4.08%"
//     }, {
//         "img": pic,
//         "title": "白酒",
//         "factor": "VOL",
//         "value": "+4.08%"
//     }]
// ]


const itemTemplate = index => ({
    "type": "Container",
    "height": "100dp",
    "width": "160dp",
    "margin-right": "12dp",
    "position": "relative",
    "background-color": "#ffffff",
    "items": [{
            "type": "Image",
            "width": "100%",
            "height": "100%",
            "position": "absolute",
            "scale-type": "fitXY",
            "src": "${data["+index+"].img}"
        }, {
            "type": "Text",
            "font-size": "39px",
            "text": "${data["+index+"].title}",
            "margin-left": "10dp",
        }, {
            "type": "Text",
            "font-size": "19px",
            "text": "${data["+index+"].factor}",
            "margin-top": "22dp",
            "margin-left": "10dp",
        }, {
            "type": "Text",
            "font-size": "19px",
            "color": "#F2564E",
            "text": "${data["+index+"].value}",
            "text-align": "right",
            "position": "relative",
            "top": "-26dp",
            "margin-right": "10dp"
        }, 
    ]
})

const rowItemTemplate = {
    "type": "Container",
    "height": "100dp",
    "width": "100%",
    "margin-bottom": "28dp",
    "flex-direction": "row",
    "items": [
        itemTemplate(0), 
        itemTemplate(1), 
        itemTemplate(2), 
        itemTemplate(3), 
        itemTemplate(4)]
}

const left = ({data}) => ({
    "type": "Container",
    "height": "100%",
    "width": "933dp",
    "padding-left": '20dp',
    "padding-top": '60dp',
    "items": [
        {
            "type": "List",
            "height": "100%",
            "width": "100%",
            "direction": "vertical",
            "data": data,
            "items": [rowItemTemplate]
        }
    ]
})

const cycleRequest = {
    "onLoaded": [
        {
            "type": "Sequential",
            "delayInMilliseconds": 3000,
            "repeatCount": 1,
            "commands": [
                {
                    "type": "SendEvent",
                    "componentId": "REFRESH"
                }
            ]
        }
    ]
}

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

const right = {
    "type": "Container",
    "height": "100%",
    "width": "66dp",
    "position": "absolute",
    "right": "0dp",
    "top": "0dp",
    "background-color": "#30333F",
    "items": [
        btnTemplate("MENU.Radar", true, "radar.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T04%3A21%3A05Z%2F-1%2F%2F65c92d68d73fdd2aeb68bcbdaeef34bbec4c4eb2ebd5d1cc53cedefa2cf5fb22"), 
        btnTemplate("MENU.News", false, "news.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T04%3A21%3A04Z%2F-1%2F%2F25e5ad481ebd9af2a1c91904f7e8ac4e912bc7eebdc093be8950e5c8a9fc8b4f"), 
        btnTemplate("MENU.Signal", false, "singal.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T04%3A21%3A04Z%2F-1%2F%2Fa9f56e0c1cbc85d23702a99b9982c6b606a6fbadc48bc8ea0dffe560e0d6c1c9"),
        btnTemplate("MENU.Live", false, "live.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T04%3A21%3A04Z%2F-1%2F%2F71d9b2f25a9f4155decb14d6f88f15a07dea5b91b12b23d8829f0e6af998f146")]
}


const {getdata} = require('./getdata');

module.exports = function render() {
    return new Promise((resolve, reject) => {
        getdata().then(data => {
            data = JSON.parse(JSON.stringify(data))
            console.log(data)
            const data2 = [[data[0],data[1],data[2],data[3],data[4]]]
            console.log('\n\ndata2:\n' + JSON.stringify(data2))
            const doc = template(
                [
                    {
                        ...body([left({ data: data2 }), right]),
                        ...cycleRequest,
                    }
                ]
            )
            const document = new Document(doc)
            const DPLDirective = new RenderDocument()
            DPLDirective.setDocument(document)

            resolve({
                directives: [DPLDirective],
                // outputSpeech: '测试一下'
            })
        })
    })
}