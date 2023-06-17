import pickle
import sys
import warnings
import numpy as np

# Load the dumped .pkl file
model_pkl_path = sys.argv[1]  # Path to the .pkl file passed as a command-line argument

# Load the model
with open(model_pkl_path, 'rb') as file:
    future_df = pickle.load(file)

with warnings.catch_warnings():

    year = future_df[['Year']]
    population = future_df[['Population']]
    growth_rate = future_df[['Growth Rate']]

    datas  = population.values.tolist()
    g_data = growth_rate.values.tolist()

    populations = []
    growth = []
    for v in datas:
        populations.append(v[0])


    print(populations)
   

