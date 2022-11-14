package com.backend.spring.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.GenerationType.SEQUENCE;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class AppUser {
    @Id
    @SequenceGenerator(name = "app_user_sequence", sequenceName = "app_user_sequence", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "app_user_sequence")
    @Column(name = "user_id")
    protected Long id;

    @JsonIgnore
    @ManyToMany(fetch = EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    )
    protected Set<Role> roles = new HashSet<>();
    @Column(name = "first_name", nullable = false)
    protected String firstName;
    @Column(name = "last_name", nullable = false)
    protected String lastName;
    @Column(name = "email", nullable = false, unique = true)
    protected String email;
    @Column(name = "phone_number", nullable = false)
    protected String phoneNumber;
    @Column(name = "username", nullable = false, unique = true)
    protected String username;
    @Column(name = "password", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // don't display when returning from API endpoint
    protected String password;

    protected AppUser(String firstName, String lastName, String email, String phoneNumber, String username, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
    }

    public void addRole(Role role) {
        for (Role curRole : this.roles) {
            if (curRole.getName().equals(role.getName()))
                return;
        }
        this.roles.add(role);
    }

    public void updateUserInfo(AppUser newUser) {
        this.firstName = newUser.firstName;
        this.lastName = newUser.lastName;
        this.email = newUser.email;
        this.phoneNumber = newUser.phoneNumber;
        this.username = newUser.username;
    }
}
