function receiveMessage(event) {
    if (event.data.message == 'fetch-json') {
        var opsworksJson = document.getElementById('stack_custom_json').value;
        $('#jsoneditoriframe').get(0).contentWindow.postMessage({
            jsonFromOpsworks: opsworksJson
        }, chrome.extension.getURL(''));
    }
    if (event.data.message == 'write-json') {
        document.getElementById('stack_custom_json').value = event.data.jsonFromEditor;
    }
}
addEventListener("message", receiveMessage, false);

function initEditor() {
    var iframe = document.createElement('iframe');
    iframe.id = 'jsoneditoriframe';
    iframe.style.width = '700px';
    iframe.style.height = '500px';
    iframe.src = chrome.extension.getURL('editor-iframe.html');
    var textarea = document.getElementById('stack_custom_json');
    if (textarea) {
        $(iframe).insertBefore(textarea);
        textarea.rows = 10;
        textarea.readOnly = true;
        textarea.style.height = '100px';
    }
}

function DOMModificationHandler() {
    $(this).unbind('DOMSubtreeModified');
    //This default value seems a bit weird, but the textarea at opsworks has
    //a default value of "JSON" until the actual JSON has been loaded.
    var val = 'JSON';
    if (document.getElementById('stack_custom_json')) {
        val = document.getElementById('stack_custom_json').value;
    }
    if (val != 'JSON') {
        initEditor();
    } else {
        setTimeout(function() {
            $('#c').bind('DOMSubtreeModified',
                DOMModificationHandler);
        }, 100);
    }
}
$('#c').bind('DOMSubtreeModified', DOMModificationHandler);