package com.backend.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppUserDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String username;
}
