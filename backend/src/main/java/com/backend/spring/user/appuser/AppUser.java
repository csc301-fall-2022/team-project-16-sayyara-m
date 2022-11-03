package com.backend.spring.user.appuser;

import com.backend.spring.user.role.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.Objects;

import static javax.persistence.CascadeType.MERGE;
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
    @ManyToOne(cascade = MERGE)
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    protected Role role;
    @Column(name = "first_name", nullable = false)
    protected String firstName;
    @Column(name = "last_name", nullable = false)
    protected String lastName;
    @Column(name = "email", nullable = false, unique = true)
    protected String email;
    @Column(name = "phone_number", nullable = false)
    protected String phoneNumber;
    @Column(name = "username", nullable = false)
    protected String username;
    @Column(name = "password", nullable = false)
    @JsonIgnore // don't display when returning from API endpoint
    protected String password;

    protected AppUser(String firstName, String lastName, String email, String phoneNumber, String username, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AppUser appUser)) return false;
        return Objects.equals(id, appUser.id) && Objects.equals(role, appUser.role) && Objects.equals(firstName, appUser.firstName) && Objects.equals(lastName, appUser.lastName) && Objects.equals(email, appUser.email) && Objects.equals(phoneNumber, appUser.phoneNumber) && Objects.equals(username, appUser.username) && Objects.equals(password, appUser.password);
    }
}
