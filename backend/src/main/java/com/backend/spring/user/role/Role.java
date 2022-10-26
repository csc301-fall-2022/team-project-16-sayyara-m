package com.backend.spring.user.role;

import com.backend.spring.user.appuser.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.NONE;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue
    @Column(name = "role_id")
    private Long id;

    @Getter(NONE)
    @Column(name = "role_name", unique = true, nullable = false)
    private String name;

    @OneToMany(mappedBy = "role", fetch = FetchType.EAGER)
    private List<AppUser> users = new ArrayList<>();

    public Role(RoleEnum role) {
        this.name = role.getValue();
    }

    /**
     * @return RoleEnum
     */
    public RoleEnum getName() {
        return RoleEnum.valueOf(name);
    }
}
