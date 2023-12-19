import json
from pprint import pprint 

INFECTED_INDEX = 8

def get_profile_info(profile_data, id):
    # find entry in profile data
    # char id > story text audio > first > stories > story text > codename etc.
    # ['[Code Name] ', '[Gender] ', '[Combat Experience] ', '[Place of Birth] ', '[Date of Birth] ', '[Race] ', '[Height] '
    return profile_data[id]["storyTextAudio"][0]["stories"][0]["storyText"].split('\n')

def get_infected_status(profile_info, name):
    infected_msg = ' '.join(profile_info[8:]).strip().lower()

    if infected_msg == '':
        infected_msg = ' '.join(profile_info[7:]).strip().lower()

    if "no infection" in infected_msg or "uninfected" in infected_msg or "non-infected" in infected_msg:
        infected = "No"
    elif "infection confirmed" in infected_msg or "confirmed infected" in infected_msg:
        infected = "Yes"
    else:
        # Outliers
        # Weird wording for first few
        if name == "Fang" or name == "Ptilopsis" or name == "Schwarz" or name == "Specter":
            infected = "Yes"
        # Ch'en being infected is spoilers so its unknown in her entry
        elif name == "Nian" or name == "Ch'en":
            infected = "Undisclosed"
        else: # Robots
            infected = "N/A"

    return infected

def get_group(info):
    group = "None" if info["groupId"] == None else info["groupId"]
    team = "Ægir" if info["teamId"] == "egir" else ("None" if info["teamId"] == None else info["teamId"])

    if team == "Ægir":
        print(info["name"])

    # if group then no team. If team then no group.
    if group != "None":
        group = group
    elif team != "None":
        group = team
    else:
        return ''

    group = group.strip().lower()

    # Format
    if group == "student":
        group = "Ursus Student Self-Governing Group"
    elif group == "lee":
        group = "Lee's Detective Agency"
    elif group == "penguin":
        group = "Penguin Logistics"    
    elif group == "rainbow":
        group = "Rainbow 6" 
    elif group == "lgd":
        group = "LDG"
    elif group == "abyssal":
        group = "Abyssal Hunter"
    elif group == "rhine":
        group = "Rhine Lab"
    elif group == "elite":
        group = "Elite Operators"
    elif group == "action4":
        group = "Action 4"
    elif group == "karlan":
        group = "Karlan Trade"
    elif group == "chiave":
        group = "Chiave's Gang"
    elif group == "pinus":
        group = "Pinus Sylvestris"
    elif group == "sweep":
        group = "S.W.E.E.P."
    elif "reserve" in group:
        group = "Reserve " + group[-1]
    else:
        group = group.capitalize()

    return group

def get_nation(info):
    nation = info["nationId"]
    
    if nation == None:
        nation = "None"
    elif nation == "rhodes":
        nation = "Rhodes Island"
    elif nation == "rim":
        nation = "Rim Billiton"
    elif nation == "egir":
        nation = 'Ægir'
    else:
        nation = nation.capitalize()

    return nation

def get_class(info):
    _class = info["profession"].lower()
    if _class == "pioneer":
        _class = "Vanguard"
    elif _class == "tank":
        _class = "Defender"
    elif _class == "warrior":
        _class = "Guard"
    elif _class == "special":
        _class = "Specialist"
    elif _class == "support":
        _class = "Supporter"
    else:
        _class = _class.lower().capitalize()

    return _class

def handleRaceCases(race):
    if "unknown" in race.lower() or "undisclosed" in race.lower(): # afaik, Ch'en and Nian special case
        race = "Unknown/Undisclosed"
    elif any(char.isdigit() for char in race): # Robots special case
        race = "Robot"
    elif race == 'Cautus/Chimera': # Amiya Special case
        race = 'Chimera'
    elif race == "Phidia": # Serpents diferent name case
        race = "Pythia"
    elif race == "Reproba": # Hyena diferent name case
        race = "Rebbah"

    return race

def main():
    ignored = []
    nations = set()
    races = set()
    groups = set()
    with open('./operator_db/character_table.json', 'r', encoding="utf-8") as f:
        char_data = json.load(f)

        with open('./operator_db/profile_table.json', 'r', encoding="utf-8") as ff:
            profile_data = json.load(ff)["handbookDict"]

    operators = {}

    for id, info in char_data.items():
        name = info["name"]

        if not id.startswith('char'):
            continue
        
        try:
            profile_info = get_profile_info(profile_data, id)
        except:
            ignored.append(name)
            continue

        name = info["name"]
        infected = get_infected_status(profile_info, name)
        gender = profile_info[1].split(']')[1].strip()
        race = handleRaceCases(profile_info[5].split(']')[1].strip())
        group = get_group(info)
        nation = get_nation(info)
        position = info["position"].lower().capitalize()

        profession = get_class(info)
        archetype = info["subProfessionId"].capitalize()
        rarity = info["rarity"] + 1
        e0_cost = info["phases"][0]["attributesKeyFrames"][0]["data"]["cost"]
        e2_cost = info["phases"][-1]["attributesKeyFrames"][0]["data"]["cost"]

        operators[name] = {
            "charId": id,
            "gender": gender,
            "race": race,
            "group": group,
            "nation": nation,
            "position": position,
            "profession": profession,
            "archetype": archetype,
            "rarity": rarity,
            "cost": (e0_cost, e2_cost),
            "infected": infected,
        }

        races.add(race)
        groups.add(group)
        nations.add(nation)

    operators = dict(sorted(operators.items(), key=lambda item: item))

    # pprint(operators)
    # as of 19/11/2023, Mulsyse/Lone Trail isn't added to the Aceship Github
    # 277 ops added
    # 290 ops total
    # Missing 8 operators + 5 Reserve operators which makes up the difference
    # Shalem has 2 entries
    print("Ignored operators: " + str(len(ignored)))
    print(ignored)
    print(str(len(nations)) + ' unique nations')
    print(sorted(nations))
    print(str(len(races)) + ' unique races')
    print(sorted(races))
    print(str(len(groups)) + ' unique groups')
    print(sorted(groups))
    print(str(len(operators)) + ' operators')
    with open('./operator_db/operator_db.json', 'w', encoding='utf-8') as f:
        json.dump(operators, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()