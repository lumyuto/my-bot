

const refreshTpl = require('./refresh_tpl.js');

const rowItemTemplate = ({
    "type": "Container",
    "height": "38dp",
    "margin-bottom": "12dp",
    "width": "100%",
    "flex-direction": "row",
    "items": [{
            "type": "Text",
            "font-size": "19px",
            "width": '100dp',
            "text": "${data.time}",
            "margin-right": "10dp",
        }, {
            "type": "Text",
            "font-size": "19px",
            "width": '600dp',
            "text": "${data.title}",
            "text-overflow": "ellipsis"
        }
    ]
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
    ...refreshTpl(30)
})

module.exports = {
    news_tpl: left
}