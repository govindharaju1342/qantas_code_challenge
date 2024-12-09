/* eslint-disable no-restricted-globals */

/// <reference lib="webworker" />

self.onmessage = function (e: MessageEvent) {
    const data = e.data 
    const processedData = data.map((item: any) => {
        return { ...item, processed: true }
    })
    self.postMessage(processedData)
}

export {}