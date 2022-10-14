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
            return nickname != "" ? nickname : "Player";
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
        "mutator": "type_entity_selector_mutator"
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
    }
]

for (let block of blocks) {
    Blockly.Blocks[block.type] = {
        init: function() {
            this.jsonInit(block);
        }
    }
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

    mutationToDom: function() {
        console.log('mutationToDom');
        const container = Blockly.utils.xml.createElement('mutation');
        
        container.setAttribute('useDistance', this.useDistance);
        if (this.useDistance) container.setAttribute('useDistanceRange', this.useDistanceRange);

        return container;
    },

    domToMutation: function(xmlElement) {
        console.log('domToMutation');

        this.useDistance = xmlElement.getAttribute('useDistance') == 'true';
        if (this.useDistance) this.useDistanceRange = xmlElement.getAttribute('useDistanceRange') == 'true';
        else this.useDistanceRange = false;

        // this.rebuildShape();
        this.updateShape();
    },

    saveExtraState: function() {
        console.log('saveExtraState');
        const state = Object.create(null);

        state['useDistance'] = this.useDistance;
        if (this.useDistance) state['useDistanceRange'] = this.useDistanceRange;

        console.log(state);
        return state;
    },

    loadExtraState: function(state) {
        console.log('loadExtraState');

        this.useDistance = state['useDistance'];
        if (this.useDistance) this.useDistanceRange = state['useDistanceRange'];
        else this.useDistanceRange = false;
        
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
            console.log(connection)
        }

        /*if (this.useNickname) {
            containerBlock.setNextStatement(false);
        }

        if (!this.useNickname) {
            containerBlock.setNextStatement(true);
            let connection = containerBlock.nextConnection();
            // other things
        }*/

        return containerBlock;
    },
    compose: function(containerBlock) {
        console.log('compose');

        options = containerBlock.getDescendants(true);

        this.useDistance = this.useDistanceRange = false;

        for (let i=1;i<options.length;i++) {
            let option = options[i];

            switch (option.type) {
                case 'type_entity_selector_distance':
                    this.useDistance = true;
                    let range = option.getFieldValue('range');
                    this.useDistanceRange = range == 'TRUE';
                    break;
                default:
                    throw new Error('Unknown selector subtype ' + option.type);
            }
        }
        console.log(this.useDistance)

        /*console.log(containerBlock)

        if (containerBlock.nextConnection) {
            let clauseBlock = containerBlock.nextConnection.targetBlock();
            let connections = [null];
            while (clauseBlock) {
                if (clauseBlock.isInsertionMarker()) {
                    clauseBlock = clauseBlock.getNextBlock();
                    continue;
                }
                switch (clauseBlock.type) {
                    case 'type_entity_selector_distance': {
                        this.useDistance = true;
                        this.useDistanceRange = clauseBlock.getFieldValue('range');
                        connections.push(clauseBlock.statementConnection);
                        break;
                    }
                    default:
                        throw TypeError('Unknown block type: ' + clauseBlock.type);
                }
                clauseBlock = clauseBlock.getNextBlock();
            }
        }*/
        this.updateShape();
        // this.reconnectChildBlocks(connections);
    },

    /*saveConnections: function(containerBlock) {
        console.log('saveConnections');
        console.log(containerBlock)
        if (containerBlock.nextConnection) {
            let cluaseBlock = containerBlock.nextConnection.targetBlock();
            while (cluaseBlock) {
                if (cluaseBlock.isInsertionMarker()) {
                    clauseBlock = clauseBlock.getNextBlock();
                    continue;
                }
                switch(clauseBlock.type) {
                    case 'type_player_nickname': {
                        const nickname = this.getInput('nickname');
                        clauseBlock.valueConnection = 
                            nickname && nickname.connection.targetConnection;
                        break;
                    }
                    default:
                        throw TypeError('Unknown block type: ' + clauseBlock.type);
                }
                clauseBlock = clauseBlock.getNextBlock();
            }
        }
    },*/

    /*rebuildShape: function() {
        const connections = [null];
        if (this.getInput('nickname')) {
            const nickname = this.getInput('nickname');
            connections.push(nickname.connection.targetConnection);
        }
        else {
            // other things
        }
        this.updateShape();
        // this.reconnectChildBlocks(connections)
    },*/
    updateShape: function() {
        console.log('updateshape');
        // if (this.getInput('nickname')) {
        //     this.removeInput('nickname');
        // }
        // // remove other things

        this.removeAllInputs(this, ['selector', 'distance', 'distance_range']);

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
                let field_label = new Blockly.FieldLabel('블록만큼 떨어져 있음')
                input.appendField('블록')
                input.appendField(field_distance, 'distance');
                input.appendField('개만큼 떨어져 있음')
            }
            else {
                let input = this.appendDummyInput('distance_range');
                let field_from = new Blockly.FieldNumber(5, 0, null, 0);
                let field_to = new Blockly.FieldNumber(5, 0, null, 0);
                input.appendField('블록');
                input.appendField(field_from, 'range_from');
                input.appendField('~');
                input.appendField(field_to, 'range_to');
                input.appendField('개만큼 떨어져 있음');
            }
        }
    },
    /*reconnectChildBlocks: function(connections) {
        Blockly.Mutator.reconnect(connections[0], this, 'nickname');
        // @TODO support other things
    }*/

    removeAllInputs: function(block, arr) {
        for (let s of arr) {
            if(block.getInput(s)) block.removeInput(s);
        }
    }
};
Blockly.Extensions.registerMutator('type_entity_selector_mutator', TYPE_ENTITY_SELECTOR_MUTATOR, undefined, 
    ['type_entity_selector_distance'])
