

const refreshTpl = require('./refresh_tpl.js');

const stockTemplate = {
    "type": "Container",
    "height": "40dp",
    "width": "100%",
    "flex-direction": "row",
    "items": [{
        "type": "Text",
        "font-size": "24px",
        "text": "${data.stock_name}",
        "margin-right": "10dp",
    }, {
        "type": "Text",
        "font-size": "24px",
        "text": "${data.stock_symbol}",
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
        "text": "${data.p_name}",
        "margin-right": "10dp",
    }, {
        "type": "Text",
        "font-size": "14px",
        "text": "总收益：${data.total_gain}",
        "margin-right": "10dp",
    }, {
        "type": "Text",
        "font-size": "14px",
        "text": "年化收益：${data.annualized_gain_rate}",
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
            "src": "${data.buy_sell_icon}"
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