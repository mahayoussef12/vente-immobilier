package com.maha.immobilier.Service;

import com.maha.immobilier.Model.BienImmobilier;
import com.maha.immobilier.Repository.BienImmobilierRepository;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BienImmobilierService {
    @Autowired
    private  BienImmobilierRepository repository;
    @Autowired
    private  EstimationPrixService estimationPrixService;


    public BienImmobilier ajouterBien(BienImmobilier bien) {
        double prixEstime = estimationPrixService.estimerPrix(bien);
        bien.setPrix(prixEstime);
        return repository.save(bien);
    }


    public List<BienImmobilier> obtenirTousLesBiens() {
        return repository.findAll();
    }

    public Optional<BienImmobilier> obtenirBienParId(Long id) {
        return repository.findById(id);
    }

    public void supprimerBien(Long id) {
        repository.deleteById(id);
    }


    public Page<BienImmobilier> getImmobilierListFullFeature(int page, int perPage, Sort.Direction sortDirection, String searchValue) {
        String sortBy="titre";
        return repository.findAll(
                Specification.where(buildSearchQueryFullFeature(searchValue)),
                PageRequest.of(page, perPage, Sort.by(sortDirection, sortBy))
        );
    }
    public Specification<BienImmobilier> buildSearchQueryFullFeature(String searchValue) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicateList = new ArrayList<>();

            if (searchValue != null && !searchValue.isEmpty()) {
              String likePattern = "%" + searchValue.toLowerCase() + "%";
                predicateList.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("titre")), likePattern));
                predicateList.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), likePattern));
                predicateList.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("adresse")), likePattern));
                predicateList.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("type")), likePattern));
                try {
                    double numericValue = Double.parseDouble(searchValue);
                    // Recherche par surface, nombre de pièces et prix (approximation)
                    predicateList.add(criteriaBuilder.equal(root.get("surface"), numericValue));
                    predicateList.add(criteriaBuilder.equal(root.get("nombrePieces"), (int) numericValue));
                    predicateList.add(criteriaBuilder.between(root.get("prix"), numericValue * 0.9, numericValue * 1.1)); // +/-10% du prix
                } catch (NumberFormatException ignored) {
                }

            }
            return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
        };
    }


}
