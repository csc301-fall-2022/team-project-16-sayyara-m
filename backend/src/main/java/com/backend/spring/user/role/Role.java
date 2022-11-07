package com.backend.spring.user.role;

import com.backend.spring.user.appuser.AppUser;
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
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;
import static lombok.AccessLevel.NONE;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @SequenceGenerator(name = "role_sequence", sequenceName = "role_sequence", allocationSize = 1)
    @GeneratedValue(strategy = SEQUENCE, generator = "role_sequence")
    @Column(name = "role_id")
    private Long id;

    @Getter(NONE)
    @Column(name = "role_name", unique = true, nullable = false)
    private String name;

    @ToString.Exclude
    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private Set<AppUser> users = new HashSet<>();

    public Role(RoleEnum role) {
        this.name = role.getValue();
    }

    /**
     * @return RoleEnum
     */
    public RoleEnum getName() {
        return RoleEnum.fromString(name);
    }
}
