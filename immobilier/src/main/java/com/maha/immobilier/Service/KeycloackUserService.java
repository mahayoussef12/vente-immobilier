package com.maha.immobilier.Service;

import com.maha.immobilier.Model.UserRegistrationDTO;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.*;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class KeycloackUserService {

    @Value("immobilier")
    private String realm;

    @Autowired
    private Keycloak keycloak;
    public UserRepresentation creatUser(UserRegistrationDTO userRegistrationRecord) {
        // Vérifier si un utilisateur avec l'e-mail existe déjà
        UsersResource usersResource = getUsersResource();
        List<UserRepresentation> existingUsers = usersResource.search(userRegistrationRecord.getEmail());

        if (!existingUsers.isEmpty()) {
            // Lancer une exception HTTP 409 si l'email existe déjà
            throw new ResponseStatusException(HttpStatus.CONFLICT, "EMAIL_ALREADY_EXISTS");
        }

        UserRepresentation user = new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(userRegistrationRecord.getEmail());
        user.setEmail(userRegistrationRecord.getEmail());
        user.setFirstName(userRegistrationRecord.getFirstName());
        user.setLastName(userRegistrationRecord.getLastName());
        user.setEmailVerified(false);

        CredentialRepresentation credentialRepresentation = new CredentialRepresentation();
        credentialRepresentation.setValue(userRegistrationRecord.getPassword());
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);

        List<CredentialRepresentation> list = new ArrayList<>();
        list.add(credentialRepresentation);
        user.setCredentials(list);

        Response response = usersResource.create(user);

        if (response.getStatus() == 201) { // Vérifie si la création est réussie
            String location = response.getHeaderString("Location");
            if (location != null && location.contains("/")) {
                String userId = location.substring(location.lastIndexOf('/') + 1);
                user.setId(userId);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "USER_CREATION_FAILED");
        }

        return user;
    }


    private UsersResource getUsersResource() {
        RealmResource realm1 = keycloak.realm("immobilier");
        return realm1.users();
    }
    public RealmResource getRealmResource() {
        return keycloak.realm("immobilier");  // Replace "your-realm" with the actual realm name
    }
    public UserRepresentation getUserById(String userId) {
        UserRepresentation userRepresentation = getUsersResource().get(userId).toRepresentation();

        // Récupérer les rôles de l'utilisateur
        List<RoleRepresentation> realmRoleRepresentations = getUsersResource().get(userId).roles().realmLevel().listEffective();

        // Extraire les noms des rôles
        List<String> realmRoles = new ArrayList<>();
        for (RoleRepresentation roleRepresentation : realmRoleRepresentations) {
            realmRoles.add(roleRepresentation.getName());
        }

        // Attribuer les noms des rôles à la représentation de l'utilisateur
        userRepresentation.setRealmRoles(realmRoles);

        return userRepresentation;
    }


    public void emailVerification(String userId){
        UsersResource usersResource = getUsersResource();
        usersResource.get(userId).sendVerifyEmail();

    }

    public List<UserRepresentation> getAllUsers() {

        RealmResource realmResource = keycloak.realm("immobilier");
        UsersResource usersResource = realmResource.users();

        List<UserRepresentation> users = usersResource.list();

        for (UserRepresentation user : users) {
            // Récupérer l'ID de l'utilisateur
            String userId = user.getId();

            // Récupérer les rôles de l'utilisateur
            List<RoleRepresentation> userRoles = usersResource.get(userId).roles().realmLevel().listAll();

            // Ajouter les rôles à l'utilisateur
            user.setRealmRoles(userRoles.stream().map(RoleRepresentation::getName).collect(Collectors.toList()));
        }

        return users;
    }





    public void updateUser(String userId, UserRegistrationDTO userDTO, String roleToUpdate) {
        // Récupérer la ressource utilisateur
        UserResource userResource = keycloak.realm("immobilier").users().get(userId);

        // Récupérer la représentation de l'utilisateur
        UserRepresentation userRepresentation = userResource.toRepresentation();

        // Mettre à jour les informations de l'utilisateur
        userRepresentation.setFirstName(userDTO.getFirstName());
        userRepresentation.setLastName(userDTO.getLastName());
        // Ajoutez d'autres attributs de l'utilisateur si nécessaire

        // Mettre à jour les rôles de l'utilisateur en utilisant la ressource de mappage de rôle
        RoleMappingResource roleMappingResource = userResource.roles();

        // Supprimer tous les rôles sauf 'default-roles-portal'
        List<RoleRepresentation> currentUserRoles = roleMappingResource.realmLevel().listAll();
        if (!currentUserRoles.isEmpty()) {
            List<RoleRepresentation> rolesToRemove = currentUserRoles.stream()
                    .filter(role -> !role.getName().equals("default-roles-portal"))
                    .collect(Collectors.toList());
            if (!rolesToRemove.isEmpty()) {
                roleMappingResource.realmLevel().remove(rolesToRemove);
            }
        }

        // Ajouter le nouveau rôle
        RoleRepresentation newRole = keycloak.realm("immobilier").roles().get(roleToUpdate).toRepresentation();
        roleMappingResource.realmLevel().add(Collections.singletonList(newRole));

        // Mettre à jour l'utilisateur avec la nouvelle représentation
        userResource.update(userRepresentation);
    }


    public Page<UserRepresentation> getUserListFullFeature(int page, int perPage, Sort.Direction sortDirection, String searchValue) {
        RealmResource realmResource = keycloak.realm("immobilier");
        UsersResource usersResource = realmResource.users();

        List<UserRepresentation> users = usersResource.list();

        // Filter users based on the search value
        List<UserRepresentation> filteredUsers = users.stream()
                .filter(buildSearchQueryFullFeature(searchValue))
                .collect(Collectors.toList());

        // Sort the filtered users
        String sortBy = "username"; // Change this to the desired field
        Sort sort = Sort.by(sortDirection, sortBy);

        // Paginate the sorted and filtered users
        int start = Math.min(page * perPage, filteredUsers.size());
        int end = Math.min((page + 1) * perPage, filteredUsers.size());
        List<UserRepresentation> pagedUsers = filteredUsers.subList(start, end);

        // Add roles to users
        for (UserRepresentation user : pagedUsers) {
            String userId = user.getId();
            List<RoleRepresentation> userRoles = usersResource.get(userId).roles().realmLevel().listAll();
            user.setRealmRoles(userRoles.stream().map(RoleRepresentation::getName).collect(Collectors.toList()));
        }

        return new PageImpl<>(pagedUsers, PageRequest.of(page, perPage, sort), filteredUsers.size());
    }

    private Predicate<? super UserRepresentation> buildSearchQueryFullFeature(String searchValue) {
        return user -> {
            if (searchValue == null || searchValue.isEmpty()) {
                return true;
            }
            String lowerCaseSearchValue = searchValue.toLowerCase();
            return (user.getUsername() != null && user.getUsername().toLowerCase().contains(lowerCaseSearchValue))
                    || (user.getEmail() != null && user.getEmail().toLowerCase().contains(lowerCaseSearchValue))
                    || (user.getFirstName() != null && user.getFirstName().toLowerCase().contains(lowerCaseSearchValue))
                    || (user.getLastName() != null && user.getLastName().toLowerCase().contains(lowerCaseSearchValue));
        };
    }

    public void toggleUserEnabledStatus(String userId) {
        // Récupérer la ressource utilisateur
        UserResource userResource = keycloak.realm("immobilier").users().get(userId);

        // Récupérer la représentation de l'utilisateur
        UserRepresentation userRepresentation = userResource.toRepresentation();

        // Basculer le statut activé/désactivé de l'utilisateur
        userRepresentation.setEnabled(!userRepresentation.isEnabled());

        // Mettre à jour l'utilisateur avec la nouvelle représentation
        userResource.update(userRepresentation);
    }


    public UserResource getUserResource(String userId){
        UsersResource usersResource = getUsersResource();
        return usersResource.get(userId);
    }

    public void assignRole(String userId, String roleName) {

        UserResource userResource =getUserResource(userId);
        RolesResource rolesResource = getRolesResource();
        RoleRepresentation representation = rolesResource.get(roleName).toRepresentation();
        userResource.roles().realmLevel().add(Collections.singletonList(representation));

    }
    private RolesResource getRolesResource(){
        return keycloak.realm(realm).roles();
    }

}
