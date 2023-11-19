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

def get_allegiance(info):
    nation = "Ægir" if info["nationId"] == "egir" else ("None" if info["nationId"] == None else info["nationId"])
    group = "None" if info["groupId"] == None else info["groupId"]
    team = "Ægir" if info["teamId"] == "egir" else ("None" if info["teamId"] == None else info["teamId"])

    # if group then no team. If team then no group.
    if group != "None":
        allegiance = group
    elif team != "None":
        allegiance = team
    else:
        allegiance = nation

    allegiance = allegiance.strip()

    # Format
    if allegiance == "rhodes":
        allegiance = "Rhodes Island"
    elif allegiance == "student":
        allegiance = "Students of Ursus"
    elif allegiance == "lee":
        allegiance = "Lee's Detective Agency"
    elif allegiance == "penguin":
        allegiance = "Penguin Logistics"    
    elif allegiance == "rainbow":
        allegiance = "Rainbow 6" 
    elif allegiance == "lgd":
        allegiance = "LDG"
    elif allegiance == "abyssal":
        allegiance = "Abyssal Hunter"
    elif allegiance == "rhine":
        allegiance = "Rhine Lab"
    elif allegiance == "rim":
        allegiance = "Rim Billiton"
    elif allegiance == "elite":
        allegiance = "Elite Operators"
    elif allegiance == "action4":
        allegiance = "Action 4"
    elif "reserve" in allegiance:
        allegiance = "Reserve " + allegiance[-1]
    else:
        allegiance = allegiance.capitalize()

    return allegiance

def main():
    ignored = []
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
        race = profile_info[5].split(']')[1].strip()
        allegiance = get_allegiance(info)
        position = info["position"].lower().capitalize()
        rarity = info["rarity"] + 1
        cost = info["phases"][-1]["attributesKeyFrames"][0]["data"]["cost"]

        operators[name] = {
            "charId": id,
            "gender": gender,
            "race": race,
            "allegiance": allegiance,
            "position": position,
            "rarity": rarity,
            "cost": cost,
            "infected": infected,
        }

    operators = dict(sorted(operators.items(), key=lambda item: item))

    # pprint(operators)
    # as of 19/11/2023, Mulsyse/Lone Trail isn't added to the Aceship Github
    # 277 ops added
    # 290 ops total
    # Missing 8 operators + 5 Reserve operators which makes up the difference
    # Shalem has 2 entries
    print("Ignored operators: " + str(len(ignored)))
    pprint(ignored)
    print(len(operators))
    with open('./operator_db/operator_db.json', 'w', encoding='utf-8') as f:
        json.dump(operators, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()