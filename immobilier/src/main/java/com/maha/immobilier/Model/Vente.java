package com.maha.immobilier.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "bien_id", nullable = false)
    private BienImmobilier bien;

    @Column(nullable = false)
    private String acheteurId; // ID Keycloak de l'acheteur

    private double montant;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateVente = LocalDate.now();
}
