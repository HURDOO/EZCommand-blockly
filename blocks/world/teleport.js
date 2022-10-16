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
        "tooltip": "지정된 엔티티가 특정 엔티티에게 이동합니다.",
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
    {
        "type": "world_teleport_pos",
        "message0": "%1 이(가) %2 로 이동하기",
        "args0": [
          {
            "type": "input_value",
            "name": "from",
            "check": "entity"
          },
          {
            "type": "input_value",
            "name": "to",
            "check": "pos"
          }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "지정된 엔티티가 특정 좌표로 이동합니다.",
        "helpUrl": "",
        "mutator": "world_teleport_pos_mutator",
        "function": (block) => {
            return "";
        }
    },
    {
        "type": "world_teleport_pos_direction",
        "message0": "이동 후 %1 바라보기",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "direction",
            "options": [
              [ "🚩 기존 방향", "KEEP_ORIGINAL" ],
              [ "🚀 특정 방향", "DEFINE_FACING" ],
              [ "🎯 특정 좌표를 향해", "DEFINE_POS" ],
              [ "🐵 특정 엔티티를 향해", "DEFINE_ENTITY" ],
            ]
          }
        ],
        "colour": 230,
        "tooltip": "이동 후에 바라볼 방향을 지정합니다.",
        "helpUrl": ""
    }
])

const WORLD_TELEPORT_POS_MUTATOR = {

    direction: 'KEEP_ORIGINAL',

    mutationToDom: function() {
        console.log('mutationToDom');

        const container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('direction', this.useDirection);
        
        return container;
    },

    domToMutation: function(xmlElement) {
        console.log('domToMutation');
        
        this.direction = this.DIRECTION_MODE.validate(xmlElement.getAttribute('direction'));
        this.updateShape();
    },

    saveExtraState: function() {
        console.log('saveExtraState');

        state = {
            'direction': this.direction
        };

        return state;
    },

    loadExtraState: function(state) {
        console.log('loadExtraState');
        
        this.direction = this.DIRECTION_MODE.validate(state['direction']);
        this.updateShape();
    },

    decompose: function(workspace) {
        console.log('decompose');

        const containerBlock = workspace.newBlock('world_teleport_pos_direction');
        containerBlock.initSvg();
        containerBlock.setFieldValue(this.direction, 'direction');

        return containerBlock;
    },

    compose: function (containerBlock) {
        console.log('compose');

        this.direction = containerBlock.getFieldValue('direction');
        this.updateShape();
    },

    updateShape: function() {
        console.log('updateShape');

        console.log(this.direction);

        switch(this.direction) {
            case this.DIRECTION_MODE.KEEP_ORIGINAL:
                this.removeAllDirectionInputs();
                break;

            case this.DIRECTION_MODE.DEFINE_FACING: {
                if (this.getInput('facing')) break;
                this.removeAllDirectionInputs();

                let input = this.appendDummyInput('facing');
                let field_x = new Blockly.FieldNumber(180, -180, 180, 0); // default, min, max, round
                let field_y = new Blockly.FieldNumber(90, -90, 90, 0);

                input.appendField('X:');
                input.appendField(field_x, 'direction_x');
                input.appendField('Y:');
                input.appendField(field_y, 'direction_y');
                input.appendField('방향 바라보기');
                break;
            }

            case this.DIRECTION_MODE.DEFINE_POS:  {
                if (this.getInput('pos')) break;
                this.removeAllDirectionInputs();

                let input_pos = this.appendValueInput('pos');
                input_pos.setCheck('pos')
                let input_label = this.appendDummyInput('label');

                input_label.appendField('을(를) 향해 바라보기')
                break;
            }

            case this.DIRECTION_MODE.DEFINE_ENTITY: {
                if (this.getInput('entity')) break;
                this.removeAllDirectionInputs();
                
                let input_entity = this.appendValueInput('entity');
                input_entity.setCheck('entity');
                let input_label = this.appendDummyInput('label');

                input_label.appendField('을(를) 향해 바라보기');
                break;
            }
        }
    },

    DIRECTION_MODE: {
        KEEP_ORIGINAL: 'KEEP_ORIGINAL',
        DEFINE_FACING: 'DEFINE_FACING',
        DEFINE_POS: 'DEFINE_POS',
        DEFINE_ENTITY: 'DEFINE_ENTITY',
    
        validate: function(str) {
            switch(str.toUpperCase()) {
                case 'KEEP_ORIGINAL':
                case 'DEFINE_FACING':
                case 'DEFINE_POS':
                case 'DEFINE_ENTITY':
                    return str.toUpperCase();
                case null:
                case undefined:
                    return 'KEEP_ORIGINAL';
                default:
                    throw new Error('Unknown direction_mode: ' + str);
            }
        }
    },

    removeAllDirectionInputs: function() {
        for (let inputName of ['facing', 'pos', 'entity', 'label']) {
            if(this.getInput(inputName))
            {
                this.removeInput(inputName);
                console.log('Removed ' + inputName);
            }
        }
    }
}

Blockly.Extensions.registerMutator('world_teleport_pos_mutator', WORLD_TELEPORT_POS_MUTATOR, null, null)
