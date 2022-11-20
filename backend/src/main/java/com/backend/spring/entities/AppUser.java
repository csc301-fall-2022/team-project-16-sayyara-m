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
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.FetchType.EAGER;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public abstract class AppUser extends UserInfo {
    @Column(name = "username", nullable = false, unique = true)
    protected String username;
    @Column(name = "password", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // don't display when returning from API endpoint
    protected String password;

    @JsonIgnore
    @ManyToMany(fetch = EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    )
    protected Set<Role> roles = new HashSet<>();

    protected AppUser(String firstName, String lastName, String email, String phoneNumber, String username, String password) {
        super(firstName, lastName, email, phoneNumber);
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
}
