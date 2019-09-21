

const refreshTpl = require('./refresh_tpl.js');
const bug_img = 'http://dbp-resource.gz.bcebos.com/2428e786-8d60-d103-925a-55f1b4739400/buy.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T19%3A50%3A29Z%2F-1%2F%2Fd0e3f0acebcd7965a57282061ee1b5c92139c27fcbe5ff83030a7692340957a2'
const sell_img = 'http://dbp-resource.gz.bcebos.com/2428e786-8d60-d103-925a-55f1b4739400/sell.png?authorization=bce-auth-v1%2Fa4d81bbd930c41e6857b989362415714%2F2019-09-21T19%3A50%3A29Z%2F-1%2F%2Fa4493d560a68f23c8205c1d03c7a5dcb8b23609fddb617675553f639d742a618'

const stockTemplate = {
    "type": "Container",
    "height": "40dp",
    "width": "100%",
    "flex-direction": "row",
    "items": [{
        "type": "Text",
        "font-size": "24px",
        "text": "贵州茅台",
        "margin-right": "10dp",
    }, {
        "type": "Text",
        "font-size": "24px",
        "text": "600519",
        "margin-right": "10dp",
    }, {
        "type": "Text",
        "font-size": "18px",
        "text": "+5.02%",
        "color": "#F1554D",
        "margin-right": "10dp",
    }],
}
const pTemplate = {
    "type": "Container",
    "height": "30dp",
    "width": "100%",
    "flex-direction": "row",
    "items": [{
        "type": "Text",
        "font-size": "14px",
        "text": "日进斗金岁岁稳盈",
        "margin-right": "10dp",
    }, {
        "type": "Text",
        "font-size": "19px",
        "text": "",
        "margin-right": "10dp",
    }, {
        "type": "Text",
        "font-size": "19px",
        "text": "",
        "margin-right": "10dp",
    }]
}

const rowItemTemplate = ({
    "type": "Container",
    "height": "80dp",
    "margin-bottom": "12dp",
    "width": "100%",
    "flex-direction": "row",
    "items": [{
            "type": "Image",
            "width": "56dp",
            "height": "56dp",
            "scale-type": "fitXY",
            "src": bug_img
        }, {
            "type": "Container",
            "height": "100%",
            "width": "800dp",
            "margin-left": '25dp',
            "flex-direction": "column",
            "items": [stockTemplate, pTemplate]
        }]
})

const left = ({data}) => ({
    "type": "Container",
    "height": "100%",
    "width": "933dp",
    "padding-left": '60dp',
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
    ],
    ...refreshTpl(25)
})

module.exports = {
    singnal_tpl: left
}