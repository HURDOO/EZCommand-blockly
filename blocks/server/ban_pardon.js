EZCommand.registerBlocks([
    {
        "type": "server_ban",
        "message0": "%1 을(를) 서버에서 차단하기",
        "args0": [
          {
            "type": "input_value",
            "name": "player",
            "check": "player"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 345,
        "tooltip": "플레이어를 서버에서 차단하여 더 이상 서버에 접속할 수 없도록 합니다.",
        "helpUrl": ""
    },
    {
        "type": "server_pardon",
        "message0": "%1 을(를) 서버에서 차단 해제하기",
        "args0": [
          {
            "type": "input_value",
            "name": "player",
            "check": "player"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 120,
        "tooltip": "서버에서 차단한 플레이어의 차단을 해제하여 서버에 다시 접속할 수 있게 합니다.",
        "helpUrl": ""
      }
])