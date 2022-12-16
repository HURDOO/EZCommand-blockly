Blockly.JavaScript['world_weather'] = function(block) {
    var dropdown_weather = block.getFieldValue('weather');
    return 'weather ' + dropdown_weather + '\n';
};

Blockly.Blocks['world_weather'] = {
    init: function() {
        this.jsonInit(
            {
                "type": "world_weather",
                "message0": "날씨를 %1 하기",
                "args0": [
                  {
                    "type": "field_dropdown",
                    "name": "weather",
                    "options": [
                      [
                        "☀️ 맑게",
                        "clear"
                      ],
                      [
                        "🌧️ 비가 오게",
                        "rain"
                      ],
                      [
                        "⛈️ 폭퐁우가 오게",
                        "thunder"
                      ]
                    ]
                  }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 230,
                "tooltip": "날씨를 변경합니다.",
                "helpUrl": "https://ezcommand.kro.kr"
            }
        )
    }
}
