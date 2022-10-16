EZCommand.registerBlocks([
    {
        "type": "type_pos",
        "message0": "x: %1 y: %2 z: %3",
        "args0": [
          {
            "type": "field_number",
            "name": "x",
            "value": 0,
            "min": -60000000,
            "max": 60000000
          },
          {
            "type": "field_number",
            "name": "y",
            "value": 4,
            "min": -60000000,
            "max": 60000000
          },
          {
            "type": "field_number",
            "name": "z",
            "value": 0,
            "min": -60000000,
            "max": 60000000
          }
        ],
        "output": "pos",
        "colour": 230,
        "tooltip": "좌표를 지정합니다.",
        "helpUrl": "",
        "function": (block) => {
            let x = block.getFieldValue('x');
            let y = block.getFieldValue('y');
            let z = block.getFieldValue('z');
            return x + ' ' + y + ' ' + z;
        }
    }
])