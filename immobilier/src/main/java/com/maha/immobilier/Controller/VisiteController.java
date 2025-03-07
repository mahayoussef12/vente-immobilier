package com.maha.immobilier.Controller;

import com.maha.immobilier.Model.Visite;
import com.maha.immobilier.Service.VisiteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins ="*")
@Tag(name = "Visites", description = "Visites Api ")
@RestController
@RequestMapping("/api/visites")
public class VisiteController {
    @Autowired
    private  VisiteService visiteService;

    @GetMapping
    public List<Visite> getAllVisites() {
        return visiteService.getAllVisites();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Visite> getVisiteById(@PathVariable Long id) {
        return visiteService.getVisiteById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Visite> createVisite(@RequestBody Visite visite) {
        Visite createdVisite = visiteService.createVisite(visite);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVisite);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisite(@PathVariable Long id) {
        visiteService.deleteVisite(id);
        return ResponseEntity.noContent().build();
    }
}
