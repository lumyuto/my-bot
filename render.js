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

const pic = "http://dbp-resource.gz.bcebos.com/2428e786-8d60-d103-925a-55f1b4739400/item.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T04%3A41%3A47Z%2F-1%2F%2F85c3639276a62cff43ff547fb6e80f94d4ce3028a742026b06d46cd61ee63cf6"
const data = [
    [{
        "img": pic,
        "title": "DAX",
        "factor": "VOL",
        "value": "+4.08%"
    },{
        "img": pic,
        "title": "DAX",
        "factor": "VOL",
        "value": "+4.08%"
    },{
        "img": pic,
        "title": "DAX",
        "factor": "VOL",
        "value": "+4.08%"
    },{
        "img": pic,
        "title": "DAX",
        "factor": "VOL",
        "value": "+4.08%"
    }]
]


// const data = [
//     {
//         "src": "https://duerstatic.bj.bcebos.com/dbp-image%2FDPLMaterial%2Fimage2019-6-24_19-18-26.png",
//         "leftText": "1",
//         "body1": "小度在家1S白",
//         "body2": "大屏触控，海量资源，儿童模式，分龄伴学",
//         "tail": " 369 元"
//     },
//     {
//         "src": "https://duerstatic.bj.bcebos.com/dbp-image/DPLMaterial/image2019-6-24_19-19-6.png",
//         "leftText": "2",
//         "body1": "小度在家1S红",
//         "body2": "大屏触控，海量资源，儿童模式，分龄伴学",
//         "tail": "369 元"
//     },
//     {
//         "src": "https://duerstatic.bj.bcebos.com/dbp-image/DPLMaterial/image2019-6-24_19-19-49.png",
//         "leftText": "3",
//         "body1": "小度音箱",
//         "body2": "国民音箱，海量音乐与有声内容",
//         "tail": "90 元"
//     },
//     {
//         "src": "https://duerstatic.bj.bcebos.com/dbp-image%2FDPLMaterial%2Fimage2019-6-24_19-21-37.png",
//         "leftText": "4",
//         "body1": "小度音箱1S",
//         "body2": "音箱+遥控器，强大声场，人气爆款",
//         "tail": "149 元"
//     },
//     {
//         "src": "https://duerstatic.bj.bcebos.com/dbp-image/DPLMaterial/image2019-6-24_19-17-43.png",
//         "leftText": "5",
//         "body1": "小度大金刚",
//         "body2": "钢铁设计，极客风格，进击小钢炮",
//         "tail": "199 元"
//     },
//     {
//         "src": "https://duerstatic.bj.bcebos.com/dbp-image/DPLMaterial/image2019-6-24_19-20-22.png",
//         "leftText": "6",
//         "body1": "小度电视伴侣",
//         "body2": "人工智能家庭影院，三合一体验",
//         "tail": "799 元"
//     }
// ]

const itemTemplate = {
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
            "src": "${data[0].pic}"
        }, {
            "type": "Text",
            "font-size": "39px",
            "text": "${data[0].title}",
            "margin-left": "10dp",
        }, {
            "type": "Text",
            "font-size": "19px",
            "text": "${data[0].factor}",
            "margin-top": "22dp",
            "margin-left": "10dp",
        }, {
            "type": "Text",
            "font-size": "19px",
            "color": "#F2564E",
            "text": "${data[0].value}",
            "text-align": "right",
            "position": "relative",
            "top": "-26dp",
            "margin-right": "10dp"
        }, 
    ]
}

const rowItemTemplate = {
    "type": "Container",
    "height": "100dp",
    "width": "100%",
    "margin-bottom": "28dp",
    "flex-direction": "row",
    "items": [itemTemplate, itemTemplate, itemTemplate, itemTemplate, itemTemplate]
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

module.exports = function render() {
    const doc = template(
        [
            {
                ...body([left({data}), right]),
                ...cycleRequest,
            }
        ]
    )
    const document = new Document(doc)
    const DPLDirective = new RenderDocument()
    DPLDirective.setDocument(document)
    return {
        directives: [DPLDirective],
        // outputSpeech: '测试一下'
    };
}