EZCommand.registerBlocks([
    {
        "type": "world_teleport_entity",
        "message0": "%1 이(가) %2 에게 이동하기",
        "args0": [
          {
            "type": "input_value",
            "name": "from",
            "check": "entity"
          },
          {
            "type": "input_value",
            "name": "to",
            "check": "entity"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": "",
        "function": (block) => {
            let command = 'tp '
            let from = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('from'), true);
            let to = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('to'));
            if(from != '@s') command += from + ' ';
            command += to;
            return command;
        }
    },
])
