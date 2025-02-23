import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import pickle

# Jeu de données fictif basé sur ta structure
data = {
    "surface": [50, 80, 120, 150, 200],
    "nombrePieces": [2, 3, 4, 5, 6],
    "adresse": ["Paris", "Lyon", "Marseille", "Lille", "Nice"],  # Exemple d'adresses
    "type": ["Appartement", "Maison", "Maison", "Appartement", "Maison"],  
    "prix": [150000, 250000, 350000, 450000, 600000]
}

# Conversion des variables catégoriques en numériques
df = pd.DataFrame(data)

# Encodage des variables catégoriques (adresse et type)
df["adresse"] = df["adresse"].astype("category").cat.codes  # Ex: Paris=0, Lyon=1...
df["type"] = df["type"].map({"Appartement": 0, "Maison": 1})  # Appartement = 0, Maison = 1

# Séparer les variables (X = caractéristiques, y = prix)
X = df.drop(columns=["prix"])
y = df["prix"]

# Entraîner le modèle
model = LinearRegression()
model.fit(X, y)

# Sauvegarder le modèle
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Modèle entraîné et sauvegardé avec succès !")
