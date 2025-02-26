package com.maha.immobilier.Repository;

import com.maha.immobilier.Model.Visite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisiteRepository extends JpaRepository<Visite,Long> {
    boolean existsByBienId(Long bienId);

}
