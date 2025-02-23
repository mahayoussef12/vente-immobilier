package com.maha.immobilier.Service;

import com.maha.immobilier.Model.BienImmobilier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class EstimationPrixService {

    private final RestTemplate restTemplate;

    public EstimationPrixService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public double estimerPrix(BienImmobilier bien) {
        String url = "http://localhost:5000/predict"; // Correction de l'URL

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, bien, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return (double) response.getBody().get("prix_estime"); // Extraction correcte du JSON
            } else {
                throw new RuntimeException("Erreur lors de l'estimation du prix");
            }
        } catch (Exception e) {
            throw new RuntimeException("Impossible de contacter l'API d'estimation", e);
        }
    }
}
