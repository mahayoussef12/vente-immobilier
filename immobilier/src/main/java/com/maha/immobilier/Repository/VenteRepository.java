package com.maha.immobilier.Repository;

import com.maha.immobilier.Model.Vente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenteRepository extends JpaRepository<Vente, Long> {
    List<Vente> findByAcheteurId(String acheteurId);
}
