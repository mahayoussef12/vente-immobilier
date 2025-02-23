package com.maha.immobilier.Controller;

import com.maha.immobilier.Model.Vente;
import com.maha.immobilier.Service.VenteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins ="*")
@Tag(name = "Ventes", description = "Ventes Api ")
@RestController
@RequestMapping("/api/ventes")
public class VenteController {
    @Autowired
    private  VenteService venteService;



    // ✅ Ajouter une vente (Accès réservé aux rôles "AGENT" ou "ADMIN")
    @PreAuthorize("hasAnyRole('AGENT', 'ADMIN')")
    @PostMapping
    public Vente ajouterVente(@RequestBody Vente vente) {
        return venteService.ajouterVente(vente);
    }

    // ✅ Récupérer une vente par ID (Accessible à tous les utilisateurs authentifiés)
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public Optional<Vente> getVenteById(@PathVariable Long id) {
        return venteService.getVenteById(id);
    }

    // ✅ Récupérer toutes les ventes (Accessible à "ADMIN" uniquement)
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Vente> getAllVentes() {
        return venteService.getAllVentes();
    }

    // ✅ Récupérer les ventes d'un acheteur spécifique (Accès réservé aux acheteurs)
    @PreAuthorize("#acheteurId == authentication.name or hasRole('ADMIN')")
    @GetMapping("/acheteur/{acheteurId}")
    public List<Vente> getVentesByAcheteur(@PathVariable String acheteurId) {
        return venteService.getVentesByAcheteur(acheteurId);
    }

    // ✅ Supprimer une vente (Accessible à "ADMIN" uniquement)
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void supprimerVente(@PathVariable Long id) {
        venteService.supprimerVente(id);
    }
}
