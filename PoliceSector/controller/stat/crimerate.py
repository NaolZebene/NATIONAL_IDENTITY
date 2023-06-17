import pickle
import json

import sys

import warnings

from collections import defaultdict
# Load the serialized model from the .pkl file

model_pkl_path = sys.argv[1]

with open(model_pkl_path, 'rb') as file:
    future_prediction = pickle.load(file)


datas = defaultdict(list)
with warnings.catch_warnings():
    all_datas = future_prediction.values.tolist()
    for place, year, data in all_datas:
        datas[str(place)].append((year, data))

json_data  = json.dumps(datas)

print(json_data)