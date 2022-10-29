EZCommand.registerBlocks([
    {
        "type": "entity_effect",
        "message0": "%1 %2 효과를 %3 초 동안 %4 %5 에게 부여하기 ( %6 입자 표시)",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "effect",
            "options": [
              [ "속도 증가", "speed" ],
              [ "속도 감소", "slowness" ],
              [ "성급함", "haste" ],
              [ "채굴 피로", "mining_fatigue" ],
              [ "힘", "strength" ],
              [ "즉시 회복", "instant_health" ],
              [ "즉지 피해", "instant_damage" ],
              [ "점프 강화", "jump_boost" ],
              [ "멀미", "nausea" ],
              [ "재생", "regeneration" ],
              [ "저항", "resistance" ],
              [ "화염 저항", "fire_resistance" ],
              [ "수중 호흡", "water_breathing" ],
              [ "투명", "invisibility" ],
              [ "실명", "blindness" ],
              [ "야간 투시", "night_vision" ],
              [ "허기", "hunger" ],
              [ "나약함", "weakness" ],
              [ "독", "poison" ],
              [ "시듦", "wither" ],
              [ "생명력 강화", "health_boost" ],
              [ "흡수", "absorption" ],
              [ "배고픔 재생", "saturation" ],
              [ "발광", "glowing" ],
              [ "공중 부양", "levitation" ],
              [ "행운", "luck" ],
              [ "불운", "unluck" ],
              [ "느린 낙하", "slow_falling" ],
              [ "전달체의 힘", "conduit_power" ],
              [ "돌고래의 가호", "dolphins_grace" ],
              [ "흉조", "bad_omen" ],
              [ "마을의 영웅", "hero_of_the_village" ],
              [ "어둠", "darkness" ],
            ]
          },
          {
            "type": "field_number",
            "name": "amplifier",
            "value": 1,
            "min": 0,
            "max": 255
          },
          {
            "type": "field_number",
            "name": "seconds",
            "value": 30,
            "min": 0,
            "max": 2100000000
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_value",
            "name": "NAME",
            "check": "entity"
          },
          {
            "type": "field_checkbox",
            "name": "NAME",
            "checked": true
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    }
])