import csv
import json

FILE_PATHS = (
    ("EDGE_COMMS", "Dylan's 3-Style Learning Sheet - UF Comms.tsv"),
    ("EDGE_TYPE", "Dylan's 3-Style Learning Sheet - UF Types.tsv"),
    ("CORNER_COMMS", "Dylan's 3-Style Learning Sheet - UFR Comms.tsv"),
    ("CORNER_TYPES", "Dylan's 3-Style Learning Sheet - UFR Types.tsv")
)
OUTPUT_PATH = "commutators.js"

output = ""

# process each tsv file
for label, path in FILE_PATHS:
    raw_array = []
    temp_dict = {}

    # read tsv file to an array
    with open(path, 'r') as file:
        tsv_reader = csv.reader(file, delimiter='\t')
        for row in tsv_reader:
            raw_array.append(row)

    # parse the array into a dict
    for row in range(1, len(raw_array)):
        for col in range(1, len(raw_array[0])):
            first_letter = raw_array[0][col][0]
            second_letter = raw_array[row][0][0]
            commutator = raw_array[row][col]
            temp_dict[f"{first_letter}{second_letter}"] = commutator
    
    # format output
    json_string = json.dumps(temp_dict, indent=4)
    output += f"const {label} = {json_string};\n"

# write output to file
with open(OUTPUT_PATH, "w") as js_file:
    js_file.write(output)

print(f"Processed data written to {OUTPUT_PATH}")
