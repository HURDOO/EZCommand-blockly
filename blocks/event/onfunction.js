Blockly.JavaScript['event_onfunction'] = function(block) {
    var text_name = block.getFieldValue('name');
    return '# /function ' + text_name + '\n';
};

Blockly.Blocks['event_onfunction'] = {
    init: function() {
        this.jsonInit (
            {
                "type": "onfunction",
                "message0": "함수 %1",
                "args0": [
                  {
                    "type": "field_input",
                    "name": "name",
                    "text": "test:test"
                  }
                ],
                "nextStatement": null,
                "colour": 60,
                "tooltip": "특정 함수가 실행될 때 아래의 명령어들을 수행합니다.",
                "helpUrl": ""
              }
        )
    }
}