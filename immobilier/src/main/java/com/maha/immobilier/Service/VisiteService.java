package com.maha.immobilier.Service;

import com.maha.immobilier.Model.BienImmobilier;
import com.maha.immobilier.Model.Visite;
import com.maha.immobilier.Repository.BienImmobilierRepository;
import com.maha.immobilier.Repository.VisiteRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VisiteService {
    private final VisiteRepository visiteRepository;
    private final BienImmobilierRepository bienImmobilierRepository;

    public List<Visite> getAllVisites() {
        return visiteRepository.findAll();
    }

    public Optional<Visite> getVisiteById(Long id) {
        return visiteRepository.findById(id);
    }

    public Visite createVisite(Visite visite) {
        if (visiteRepository.existsByBienAndDateAndTime(visite.getBien(), visite.getDate(), visite.getTime())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "BIEN_DEJA_EN_VISITE");
        }
        return visiteRepository.save(visite);
    }


    public void deleteVisite(Long id) {
        if (!visiteRepository.existsById(id)) {
            throw new EntityNotFoundException("Visite not found");
        }
        visiteRepository.deleteById(id);
    }
}