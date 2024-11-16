import csv
import json

FILE_PATHS = (
    ("edgeComms", "Dylan's 3-Style Learning Sheet - UF Comms.tsv"),
    ("edgeTypes", "Dylan's 3-Style Learning Sheet - UF Types.tsv"),
    ("cornerComms", "Dylan's 3-Style Learning Sheet - UFR Comms.tsv"),
    ("cornerTypes", "Dylan's 3-Style Learning Sheet - UFR Types.tsv")
)


two_dimensional_array = []
with open("Dylan's 3-Style Learning Sheet - UF Comms.tsv", 'r') as file:
    tsv_reader = csv.reader(file, delimiter='\t')
    for row in tsv_reader:
        two_dimensional_array.append(row)

my_dict = {}
for i in range(1, len(two_dimensional_array)):
    for j in range(1, len(two_dimensional_array[0])):
        first_letter = two_dimensional_array[0][j][0]
        second_letter = two_dimensional_array[i][0][0]
        my_dict[f"{first_letter}{second_letter}"] = two_dimensional_array[i][j]

print(json.dumps(my_dict, indent=4))
        