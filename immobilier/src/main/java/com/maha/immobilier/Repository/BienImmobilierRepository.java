package com.maha.immobilier.Repository;

import com.maha.immobilier.Model.BienImmobilier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BienImmobilierRepository extends JpaRepository<BienImmobilier, Long> {
    Page<BienImmobilier> findAll(Specification<BienImmobilier> spec, Pageable pageable);

}

