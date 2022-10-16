Blockly.JavaScript['type_player_nickname'] = function (block) {
    var nickname = block.getFieldValue('nickname');
    if(nickname != "") return nickname;
    return '....\n';
}

let blocks = [
    {
        "type": "type_player_nickname",
        "message0": "플레이어: %1",
        "args0": [
            {
                'type': 'field_input',
                'name': 'nickname',
                'text': 'Player'
            }
        ],
        "output": "player",
        "colour": 240,
        "tooltip": "입력된 닉네임의 플레이어를 지정합니다.",
        "helpUrl": "",
        "function": function (block) {
            let nickname = block.getFieldValue('nickname');
            return nickname;
        }
    },
    {
        "type": "type_entity_uuid",
        "message0": "UUID: %1",
        "args0": [
            {
                'type': 'field_input',
                'name': 'uuid',
                'text': '12345678-1234-1234-1234-123456789012'
            }
        ],
        "output": "entity",
        "colour": 240,
        "tooltip": "입력된 UUID를 가진 엔티티를 지정합니다.",
        "helpUrl": "",
        "function": function (block) {
            let nickname = block.getFieldValue('uuid');
            return nickname;
        }
    },
    {
        "type": "type_entity_selector",
        "message0": "",
        "args0": [],
        "output": "entity",
        "colour": 240,
        "tooltip": "사용자 지정 선택자를 통해 엔티티를 지정합니다.",
        "helpUrl": "",
        "mutator": "type_entity_selector_mutator",
        "function": function (block) {
            let selector = block.getFieldValue('selector');
            let command = '@' + selector + '[';
            
            let distance = block.getFieldValue('distance');
            if (distance) command += 'distance=' + distance + ',';
            else {
                let range_from = block.getFieldValue('range_from');
                if (range_from) {
                    let range_to = block.getFieldValue('range_to');
                    command += 'distance=' + range_from + '..' + range_to + ',';
                }
            }
            
            let name = block.getFieldValue('name')
            if (name) command += 'name=' + name + ',';
            
            if(command.length == 3) command = command.substring(0,2);
            else command = command.substring(0, command.length-1) + ']';
            
            return command;
        }
    },
    {
        "type": "type_entity_selector_root",
        "message0": "선택자 %1",
        "args0": [
          {
            "type": "input_statement",
            "name": "options"
          }
        ],
        "colour": 230,
        "tooltip": "사용자 지정 선택자를 통해 엔티티를 지정합니다.",
        "helpUrl": ""
    },
    {
        "type": "type_entity_selector_distance",
        "message0": "🎯 거리 ( 범위 %1 )",
        "args0": [
          {
            "type": "field_checkbox",
            "name": "range",
            "checked": false
          }
        ],
        "previousStatement": "selector",
        "nextStatement": "selector",
        "colour": 230,
        "tooltip": "특정 거리에 있는 엔티티를 지정합니다.",
        "helpUrl": ""
    },
    {
        "type": "type_entity_selector_name",
        "message0": "이름",
        "previousStatement": "selector",
        "nextStatement": "selector",
        "colour": 230,
        "tooltip": "특정 이름을 가진 엔티티를 지정합니다.",
        "helpUrl": ""
      }
]

for (let block of blocks) {
    Blockly.Blocks[block.type] = {
        init: function() {
            this.jsonInit(block);
        }
    }
    Blockly.JavaScript[block.type] = block.function;
}

/*Blockly.Blocks['type_player_mode'] = {
    init: function() {
        this.jsonInit(
            {
                "type": "type_player_mode",
                "message0": "%1",
                "args0": [
                  {
                    "type": "field_dropdown",
                    "name": "mode",
                    "options": [
                      [ "🔤 이름", "nickname" ],
                      [ "⚙️ 선택자", "selector" ],
                      [ "🔢 UUID", "uuid"],
                    ]
                  }
                ],
                "nextStatement": "selector",
                "colour": 230,
                "tooltip": "",
                "helpUrl": ""
              }
        )
    }
}*/

const TYPE_ENTITY_SELECTOR_MUTATOR = {

    useDistance: false,
    useDistanceRange: false,
    useName: false,

    mutationToDom: function() {
        console.log('mutationToDom');
        const container = Blockly.utils.xml.createElement('mutation');
        
        container.setAttribute('useDistance', this.useDistance);
        if (this.useDistance) container.setAttribute('useDistanceRange', this.useDistanceRange);
        container.setAttribute('useName', this.useName);

        return container;
    },

    domToMutation: function(xmlElement) {
        console.log('domToMutation');

        this.useDistance = xmlElement.getAttribute('useDistance') == 'true';
        if (this.useDistance) this.useDistanceRange = xmlElement.getAttribute('useDistanceRange') == 'true';
        else this.useDistanceRange = false;
        this.useName = xmlElement.getAttribute('useName') == 'true';

        this.updateShape();
    },

    saveExtraState: function() {
        console.log('saveExtraState');
        const state = Object.create(null);

        state['useDistance'] = this.useDistance;
        if (this.useDistance) state['useDistanceRange'] = this.useDistanceRange;
        state['useName'] = this.useName;

        console.log(state);
        return state;
    },

    loadExtraState: function(state) {
        console.log('loadExtraState');

        this.useDistance = state['useDistance'];
        if (this.useDistance) this.useDistanceRange = state['useDistanceRange'];
        else this.useDistanceRange = false;
        this.useName = state['useName'];
        
        this.updateShape();
    },

    decompose: function(workspace) {
        console.log('decompose');

        const containerBlock = workspace.newBlock('type_entity_selector_root');
        containerBlock.initSvg();

        let connection = containerBlock.getInput('options').connection;
        console.log(containerBlock)
        console.log(this.useDistance)
        if (this.useDistance) {
            const distanceBlock = workspace.newBlock('type_entity_selector_distance');
            distanceBlock.initSvg();
            if (this.useDistanceRange) distanceBlock.setFieldValue(true, 'range');
            
            connection.connect(distanceBlock.previousConnection);
            connection = distanceBlock.nextConnection;
        }
        if(this.useName) {
            const nameBlock = workspace.newBlock('type_entity_selector_name');
            nameBlock.initSvg();
            connection.connect(nameBlock.previousConnection);
            connection = nameBlock.nextConnection;
        }

        return containerBlock;
    },
    compose: function(containerBlock) {
        console.log('compose');

        options = containerBlock.getDescendants(true);
        this.useDistance = this.useDistanceRange = this.useName = false;

        for (let i=1;i<options.length;i++) {
            let option = options[i];

            switch (option.type) {
                case 'type_entity_selector_distance':
                    this.useDistance = true;
                    let range = option.getFieldValue('range');
                    this.useDistanceRange = range == 'TRUE';
                    break;
                case 'type_entity_selector_name':
                    this.useName = true;
                    break;
                default:
                    throw new Error('Unknown selector subtype ' + option.type);
            }
        }
        
        this.updateShape();
    },

    updateShape: function() {
        console.log('updateshape');

        this.removeAllInputs(this, ['selector', 'distance', 'distance_range', 'name']);

        let input = this.appendDummyInput('selector');
        let field = new Blockly.FieldDropdown([
            ['🎯 가까운 플레이어', 'p'],
            ['🚀 랜덤 플레이어', 'r'],
            ['🐵 모든 엔티티', 'e'],
            ['👨‍👩‍👧‍👦 모든 플레이어', 'a'],
            ['🚩 자기 자신', 's'],
        ]);
        input.appendField(field, 'selector');
        
        if (this.useDistance) {
            if (!this.useDistanceRange) {
                let input = this.appendDummyInput('distance');
                let field_distance = new Blockly.FieldNumber(5, 0, null, 0); // default, min, max, round
                input.appendField('거리:')
                input.appendField(field_distance, 'distance');
                input.appendField('블록')
            }
            else {
                let input = this.appendDummyInput('distance_range');
                let field_from = new Blockly.FieldNumber(5, 0, null, 0);
                let field_to = new Blockly.FieldNumber(10, 0, null, 0);
                input.appendField('거리:');
                input.appendField(field_from, 'range_from');
                input.appendField('~');
                input.appendField(field_to, 'range_to');
                input.appendField('블록');
            }
        }

        if (this.useName) {
            let input = this.appendDummyInput('name');
            let field_name = new Blockly.FieldTextInput('Player');
            input.appendField('이름:');
            input.appendField(field_name, 'name');
        }
    },

    removeAllInputs: function(block, arr) {
        for (let s of arr) {
            if(block.getInput(s)) block.removeInput(s);
        }
    }
};
Blockly.Extensions.registerMutator('type_entity_selector_mutator', TYPE_ENTITY_SELECTOR_MUTATOR, undefined, 
    ['type_entity_selector_distance', 'type_entity_selector_name'])
