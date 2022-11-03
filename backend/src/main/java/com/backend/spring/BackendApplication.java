package com.backend.spring;

import com.backend.spring.user.role.Role;
import com.backend.spring.user.role.RoleEnum;
import com.backend.spring.user.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(RoleRepository roleRepository) {
        return args -> {
            Set<Role> roles = new HashSet<>(Set.of(new Role(RoleEnum.SHOP_OWNER), new Role(RoleEnum.VEHICLE_OWNER)));
            roleRepository.saveAll(roles);
        };
    }
}
