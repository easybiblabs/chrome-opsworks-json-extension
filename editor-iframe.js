var stackjson = false;
var loadingdone = false;

parent.postMessage({
        message: 'fetch-json'
    },
    "https://console.aws.amazon.com/"
);

function receiveMessage(event) {
    if (!stackjson) {
        startEditor(event.data.jsonFromOpsworks);
    }
}
addEventListener("message", receiveMessage, false);

function startEditor(content) {
    stackjson = new JSONEditor(document.getElementById('jsoneditor'), {
        mode: 'code',
        modes: ['code', 'view', 'tree'],
        change: function() {
            if (stackjson && loadingdone) {
                updateTextarea(stackjson.getText());
            }
        }
    });
    stackjson.setText(content);
    loadingdone = true;
}

function updateTextarea(content) {
    parent.postMessage({
            message: 'write-json',
            jsonFromEditor: content
        },
        "https://console.aws.amazon.com/"
    );
}