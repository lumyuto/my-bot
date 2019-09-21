

const refreshTpl = require('./refresh_tpl.js');

const itemTemplate = index => ({
    "type": "Container",
    "height": "30dp",
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
            "width": '400dp',
            "text": "${data.title}",
        }
    ]
})

const rowItemTemplate = {
    "type": "Container",
    "height": "100dp",
    "width": "100%",
    "margin-bottom": "5dp",
    "flex-direction": "row",
    "items": [itemTemplate]
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
    ],
    ...refreshTpl(30)
})

module.exports = {
    news_tpl: left
}