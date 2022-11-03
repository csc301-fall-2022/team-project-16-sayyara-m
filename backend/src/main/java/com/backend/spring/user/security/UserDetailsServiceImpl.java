package com.backend.spring.user.security;

import com.backend.spring.user.appuser.AppUser;
import com.backend.spring.user.appuser.AppUserRepository;
import com.backend.spring.user.shopowner.ShopOwnerSaveHelper;
import com.backend.spring.user.vehicleowner.VehicleOwnerSaveHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collection;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final ShopOwnerSaveHelper shopOwnerSaveHelper;
    private final VehicleOwnerSaveHelper vehicleOwnerSaveHelper;
    private final AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByUsername(username);
        if (appUser == null)
            throw new UsernameNotFoundException("username " + username + " not found");
        if (appUser.getRoles() == null || appUser.getRoles().isEmpty())
            // TODO: Add custom exception for this
            throw new RuntimeException("User " + username + " has no roles");

        Collection<GrantedAuthority> authorities = appUser.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().getValue())).collect(Collectors.toList());

        // Can change later to add additional user info such as account locked/expired etc.
        return new User(appUser.getUsername(), appUser.getPassword(), authorities);
    }
}
