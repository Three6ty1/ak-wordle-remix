import json
import io

with open('./operator_db/character_table.json', 'r', encoding="utf-8") as f:
    data = json.load(f)

operators = {}
for id, info in data.items():

    if id.startswith('char'):
        operators[info["name"]] = {
            "charId": id,
            "nationId": info["nationId"],
            "groupId": info["groupId"],
            "teamId": info["teamId"],
            "position": info["position"],
            "rarity": info["rarity"] + 1,
            "cost": info["phases"][-1]["attributesKeyFrames"][0]["data"]["cost"]
        }

operators = dict(sorted(operators.items(), key=lambda item: item))
print(len(operators))