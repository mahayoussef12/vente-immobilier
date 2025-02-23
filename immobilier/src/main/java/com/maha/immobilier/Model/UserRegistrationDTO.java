package com.maha.immobilier.Model;

public class UserRegistrationDTO {

    private String email;
    private String firstName;
    private String lastName;
    private String password;

    // Constructeur
    public UserRegistrationDTO(String email, String firstName, String lastName, String password) {

        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    public UserRegistrationDTO() {

    }

    // Getters et setters (vous pouvez également utiliser Lombok pour générer ces méthodes automatiquement)



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

