package com.maha.immobilier.Controller;

import com.maha.immobilier.Model.BienImmobilier;
import com.maha.immobilier.Service.BienImmobilierService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins ="*")
@Tag(name = "BienImmobilier", description = "BienImmobilier Api ")
@RestController
@RequestMapping("/api/biens")
public class BienImmobilierController {


    @Autowired
     BienImmobilierService bienService;


    @PostMapping
    public ResponseEntity<BienImmobilier> ajouterBien(@RequestBody BienImmobilier bien) {
        BienImmobilier nouveauBien = bienService.ajouterBien(bien);
        return ResponseEntity.ok(nouveauBien);
    }

    @GetMapping
    public ResponseEntity<List<BienImmobilier>> obtenirTousLesBiens() {
        return ResponseEntity.ok(bienService.obtenirTousLesBiens());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BienImmobilier> obtenirBienParId(@PathVariable Long id) {
        return bienService.obtenirBienParId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> supprimerBien(@PathVariable Long id) {
        bienService.supprimerBien(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value ="/findSearchPagination")
    public ResponseEntity<Page<BienImmobilier>> findAllFullFeature(@RequestParam(defaultValue = "0") int page,
                                                                   @RequestParam(defaultValue = "10") int perPage,
                                                                   @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection,
                                                                   @RequestParam(required = false) String searchValue) {
        return ResponseEntity.ok( bienService.getImmobilierListFullFeature(page,perPage,sortDirection,searchValue));

    }
}
