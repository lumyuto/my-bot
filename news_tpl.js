

const refreshTpl = require('./refresh_tpl.js');

const rowItemTemplate = ({
    "type": "Container",
    "height": "38dp",
    "margin-bottom": "12dp",
    "width": "100%",
    "flex-direction": "row",
    "items": [{
            "type": "Text",
            "font-size": "22px",
            "width": '100dp',
            "text": "${data.time}",
            "margin-right": "10dp",
        }, {
            "type": "Text",
            "font-size": "22px",
            "width": '600dp',
            "text": "${data.title}",
            "max-lines": 1,
            "text-overflow": "ellipsis"
        }
    ]
})

const header = require('./header.js')

const left = ({data}) => ({
    "type": "Container",
    "height": "100%",
    "width": "933dp",
    "padding-left": '60dp',
    "padding-top": '10dp',
    "background-color": '#353A47',
    "items": [
        header(['智能', '关注', '国际', 'A股', '数字货币', '大宗商品', '贵金属']),
        {
            "type": "List",
            "height": "480dp",
            "width": "100%",
            "direction": "vertical",
            "data": data,
            "items": [rowItemTemplate]
        }
    ],
    ...refreshTpl(25, 'News')
})

module.exports = {
    news_tpl: left
}