package com.maha.immobilier.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "biens")
public class BienImmobilier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;
    private String description;
    private String adresse;
    private double surface;
    private int nombrePieces;
    private String type; // "Appartement", "Maison", "Villa"
    private double prix;
    private String imageUrl;
}
