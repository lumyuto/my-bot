

const cycleRequest = (delay=10, name='') => ({
    "onLoaded": [
        {
            "type": "Sequential",
            "delayInMilliseconds": delay*1000,
            "repeatCount": 1,
            "commands": [
                {
                    "type": "SendEvent",
                    "componentId": "REFRESH." + name
                }
            ]
        }
    ]
})

module.exports = cycleRequest