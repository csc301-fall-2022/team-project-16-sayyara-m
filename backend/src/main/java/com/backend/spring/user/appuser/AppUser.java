package com.backend.spring.user.appuser;

import com.backend.spring.user.role.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import static javax.persistence.CascadeType.MERGE;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class AppUser {
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    protected Long id;
    @ManyToOne(cascade = MERGE)
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    protected Role role;
    @Column(name = "first_name", nullable = false)
    protected String firstName;
    @Column(name = "last_name", nullable = false)
    protected String lastName;
    @Column(name = "email", nullable = false)
    protected String email;
    @Column(name = "phone_number", nullable = false)
    protected String phoneNumber;
    @Column(name = "username", nullable = false)
    protected String username;
    @Column(name = "password", nullable = false)
    @JsonIgnore // don't display when returning from API endpoint
    protected String password;

    public AppUser(Role role, String firstName, String lastName, String email, String phoneNumber, String username, String password) {
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
    }

}
