



const header = items => ({
    "type": "Container",
    "height": "40dp",
    "width": "100%",
    "flex-direction": "row",
    "margin-bottom": '20dp',
    "items": items.map(item => ({
            "type": "Text",
            "font-size": "19px",
            "vertical-align": "bottom",
            "text": item,
            "margin-right": "30dp",
        }))
})

module.exports = header