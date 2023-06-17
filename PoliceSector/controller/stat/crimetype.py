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
    for crime_type, year,rate in all_datas:
        datas[str(crime_type)].append([year, rate])

json_data  = json.dumps(datas)

print(json_data)