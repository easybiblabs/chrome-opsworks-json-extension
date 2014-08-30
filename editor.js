var stackjson   = null;
var loadingdone = false;

function initEditor() {
  var div = document.createElement('div');
  div.id = 'jsoneditor';
  div.style.position = 'absolute';
  div.style.top = '0px';
  div.style.left = '0px';
  div.style.width = '500px';
  div.style.height = '500px';
  
  var textarea = document.getElementById('stack_custom_json');

  if(textarea) {
    $(div).insertBefore(textarea);
    stackjson = new JSONEditor(div, {
        mode:   'code',
        modes:  ['code', 'view', 'tree'],
        change: function () {
          if(stackjson && loadingdone) {
            document.getElementById('stack_custom_json').value =  stackjson.getText();
          }
        }
    });
    stackjson.setText(textarea.value);
    loadingdone = true;
  }
}

function DOMModificationHandler(){
    $(this).unbind('DOMSubtreeModified');
    
    //This default value seems a bit weird, but the textarea at opsworks has
    //a default value of "JSON" until the actual JSON has been loaded.
    
    var val = 'JSON';
    if (document.getElementById('stack_custom_json')) {
      val = document.getElementById('stack_custom_json').value;
    }
    
    if(val != 'JSON') {
      initEditor();
    } else {
      setTimeout(function(){
        $('#c').bind('DOMSubtreeModified',DOMModificationHandler);
      },100);
    }
}
$('#c').bind('DOMSubtreeModified',DOMModificationHandler);