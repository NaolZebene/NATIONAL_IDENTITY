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
   
    growth_rate = future_df[['Growth Rate']]

   
    g_data = growth_rate.values.tolist()

  
    growth = []


    for g in g_data:
        growth.append(g[0])


    print(growth)
   

