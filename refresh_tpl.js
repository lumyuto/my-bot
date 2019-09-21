

const cycleRequest = (delay=10) => ({
    "onLoaded": [
        {
            "type": "Sequential",
            "delayInMilliseconds": delay*1000,
            "repeatCount": 1,
            "commands": [
                {
                    "type": "SendEvent",
                    "componentId": "REFRESH"
                }
            ]
        }
    ]
})

module.exports = cycleRequest