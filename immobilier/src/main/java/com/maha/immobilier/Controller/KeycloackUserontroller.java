package com.maha.immobilier.Controller;

import com.maha.immobilier.Model.UserRegistrationDTO;
import com.maha.immobilier.Service.KeycloackUserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@Tag(name = "Utilisateurs", description = "Utilisateurs Api ")
@CrossOrigin(origins ="*")
@RestController
@RequestMapping("/api/users")

public class KeycloackUserontroller {

    private final KeycloackUserService keycloackUserService;

    public KeycloackUserontroller(KeycloackUserService keycloackUserService) {
        this.keycloackUserService = keycloackUserService;
    }


    @PostMapping

    public UserRepresentation createUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {

       return keycloackUserService.creatUser(userRegistrationDTO);

   }

    @GetMapping("/{userId}")

    public UserRepresentation getUser(@PathVariable String userId) {

        return keycloackUserService.getUserById(userId);

    }

    @GetMapping("/All")

    public Page<UserRepresentation> getUsers(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "10") int perPage,
                                             @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection,
                                             @RequestParam(required = false) String searchValue) {
        return  keycloackUserService.getUserListFullFeature(page, perPage,sortDirection,searchValue);
    }
    @GetMapping("users")
    public List<UserRepresentation> getUserAll (){
       return  keycloackUserService.getAllUsers();
    }


    @PutMapping("/{userId}/update-user")
    public ResponseEntity<?> updateUser(
            @PathVariable String userId,
            @RequestBody UserRegistrationDTO userDTO,
            @RequestParam(required = false) String rolesToUpdate
    ) {
        try {
            // Mettre à jour les données utilisateur dans Keycloak avec les rôles
            keycloackUserService.updateUser(userId, userDTO, rolesToUpdate);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur s'est produite lors de la mise à jour de l'utilisateur.");
        }
    }

    @PutMapping("/{userId}/toggle-enabled-status")
    public ResponseEntity<?> toggleEnabledStatus(@PathVariable String userId) {
        try {
            // Basculer le statut activé/désactivé de l'utilisateur
            keycloackUserService.toggleUserEnabledStatus(userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur s'est produite lors de la mise à jour de l'état de l'utilisateur.");
        }
    }

    @PutMapping("/assign-role/user/{userId}")
    public ResponseEntity<?> assignRole(@PathVariable String userId, @RequestBody String roleName){

        keycloackUserService.assignRole(userId, roleName);
        return ResponseEntity.status(HttpStatus.CREATED).build();

    }


}
