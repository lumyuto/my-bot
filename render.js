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

const data = [
    {
        "src": "https://duerstatic.bj.bcebos.com/dbp-image%2FDPLMaterial%2Fimage2019-6-24_19-18-26.png",
        "leftText": "1",
        "body1": "小度在家1S白",
        "body2": "大屏触控，海量资源，儿童模式，分龄伴学",
        "tail": " 369 元"
    },
    {
        "src": "https://duerstatic.bj.bcebos.com/dbp-image/DPLMaterial/image2019-6-24_19-19-6.png",
        "leftText": "2",
        "body1": "小度在家1S红",
        "body2": "大屏触控，海量资源，儿童模式，分龄伴学",
        "tail": "369 元"
    },
    {
        "src": "https://duerstatic.bj.bcebos.com/dbp-image/DPLMaterial/image2019-6-24_19-19-49.png",
        "leftText": "3",
        "body1": "小度音箱",
        "body2": "国民音箱，海量音乐与有声内容",
        "tail": "90 元"
    },
    {
        "src": "https://duerstatic.bj.bcebos.com/dbp-image%2FDPLMaterial%2Fimage2019-6-24_19-21-37.png",
        "leftText": "4",
        "body1": "小度音箱1S",
        "body2": "音箱+遥控器，强大声场，人气爆款",
        "tail": "149 元"
    },
    {
        "src": "https://duerstatic.bj.bcebos.com/dbp-image/DPLMaterial/image2019-6-24_19-17-43.png",
        "leftText": "5",
        "body1": "小度大金刚",
        "body2": "钢铁设计，极客风格，进击小钢炮",
        "tail": "199 元"
    },
    {
        "src": "https://duerstatic.bj.bcebos.com/dbp-image/DPLMaterial/image2019-6-24_19-20-22.png",
        "leftText": "6",
        "body1": "小度电视伴侣",
        "body2": "人工智能家庭影院，三合一体验",
        "tail": "799 元"
    }
]

const rightItemTemplate = {
    "type": "Container",
    "height": "100dp",
    "width": "173px",
    "flex-direction": "row",
    "items": [
        // {
        //     "type": "Text",
        //     "font-size": "40dp",
        //     "margin-left": "40dp",
        //     "margin-top": "7dp",
        //     "text": "${data.leftText}"
        // },
        {
            "type": "Image",
            "width": "20%",
            "height": "75dp",
            "border-radius": "5%",
            "margin-left": "1dp",
            "src": "${data.src}"
        },
        // {
        //     "type": "Container",
        //     "height": "75dp",
        //     "width": "45%",
        //     "flex-direction": "column",
        //     "margin-left": "20dp",
        //     "items": [
        //         {
        //             "type": "Text",
        //             "font-size": "30dp",
        //             "text": "${data.body1}"
        //         },
        //         {
        //             "type": "Text",
        //             "font-size": "20dp",
        //             "margin-top": "8dp",
        //             "text": "${data.body2}"
        //         }
        //     ]
        // }
    ]
}

const left = ({data}) => ({
    "type": "Container",
    "height": "100%",
    "width": "959px",
    "items": [
        {
            "type": "List",
            "height": "100%",
            "width": "100%",
            "direction": "vertical",
            "data": data,
            "items": [rightItemTemplate, rightItemTemplate, rightItemTemplate, rightItemTemplate]
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
                    "componentId": "Image01"
                }
            ]
        }
    ]
}

const right = {
    "type": "Container",
    "height": "100%",
    "width": "65px",
    "background-color": "#30333F",
    "items": [
        {
            "type": "Image",
            "componentId": "Image01",
            "position": "absolute",
            "top": "0dp",
            "left": "0dp",
            "src": "https://duerstatic.bj.bcebos.com/dbp-image%2FDPLMaterial%2Fimage2019-6-24_18-57-352.jpg",
            "height": "100%",
            "width": "65dp"
        }
    ]
}

module.exports = function render() {
    const doc = template(
        [body([
            left({data}), 
            right
        ])]
    )
    const document = new Document(doc)
    const DPLDirective = new RenderDocument()
    DPLDirective.setDocument(document)
    return {
        directives: [DPLDirective],
        outputSpeech: '测试一下'
    };
}