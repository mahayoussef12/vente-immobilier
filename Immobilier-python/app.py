from flask import Flask, request, jsonify
import numpy as np
import pickle
import pandas as pd

app = Flask(__name__)

# Charger le modèle
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

# Dictionnaire d'encodage pour les types de biens
type_mapping = {"Appartement": 0, "Maison": 1}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Encodage de l'adresse (remplacer par une vraie logique si besoin)
        adresse_mapping = {"Paris": 0, "Lyon": 1, "Marseille": 2, "Lille": 3, "Nice": 4}
        adresse_encoded = adresse_mapping.get(data["adresse"], -1)

        # Encodage du type de bien
        type_encoded = type_mapping.get(data["type"], -1)
        if type_encoded == -1 or adresse_encoded == -1:
            return jsonify({"error": "Valeur de 'adresse' ou 'type' non reconnue"}), 400

        # Préparation des features
        features = np.array([
            data["surface"],
            data["nombrePieces"],
            adresse_encoded,
            type_encoded
        ]).reshape(1, -1)

        # Prédiction du prix
        prix_estime = model.predict(features)[0]

        return jsonify({"prix_estime": round(prix_estime, 2)})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
