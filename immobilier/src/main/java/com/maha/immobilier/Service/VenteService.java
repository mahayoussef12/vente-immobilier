package com.maha.immobilier.Service;



import com.maha.immobilier.Model.Vente;
import com.maha.immobilier.Repository.VenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class VenteService {

    @Autowired
    private  VenteRepository venteRepository;


    // ✅ Ajouter une vente
    public Vente ajouterVente(Vente vente) {
        return venteRepository.save(vente);
    }

    // ✅ Récupérer une vente par ID
    public Optional<Vente> getVenteById(Long id) {
        return venteRepository.findById(id);
    }

    // ✅ Récupérer toutes les ventes
    public List<Vente> getAllVentes() {
        return venteRepository.findAll();
    }

    // ✅ Récupérer les ventes d'un acheteur spécifique
    public List<Vente> getVentesByAcheteur(String acheteurId) {
        return venteRepository.findByAcheteurId(acheteurId);
    }

    // ✅ Supprimer une vente
    public void supprimerVente(Long id) {
        venteRepository.deleteById(id);
    }
}
