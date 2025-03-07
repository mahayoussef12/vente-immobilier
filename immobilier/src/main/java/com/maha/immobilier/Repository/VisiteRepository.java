package com.maha.immobilier.Repository;

import com.maha.immobilier.Model.BienImmobilier;
import com.maha.immobilier.Model.Visite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface VisiteRepository extends JpaRepository<Visite,Long> {
    boolean existsByBienId(Long bienId);
    boolean existsByBienAndDateAndTime(BienImmobilier bien, LocalDate date, LocalTime time);
}
