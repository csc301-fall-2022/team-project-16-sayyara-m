package com.backend.spring.user.appuser;

import com.backend.spring.user.role.Role;
import com.backend.spring.user.shopowner.ShopOwner;
import com.backend.spring.user.vehicleowner.VehicleOwner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AppUserService {
    private final AppUserRepository repository;

    public List<AppUser> getAllAppUsers() {
        return repository.findAll();
    }

    public AppUser getAppUser(long id) {
        return repository.findById(id).orElseThrow(IllegalStateException::new);
    }
    
    public ShopOwner createShopOwner(ShopOwner shopOwner) {
        return repository.save(shopOwner);
    }

    public VehicleOwner createVehicleOwner(VehicleOwner vehicleOwner) {
        return repository.save(vehicleOwner);
    }

    public void deleteAppUser(long id) {
        repository.deleteById(id);
    }
    
    @Transactional
    public void updateAppUser(Long userId, Role role, String firstName, String lastName, String email, String phoneNumber, String username, String password) {
        AppUser appUser = repository.findById(userId).orElseThrow(IllegalStateException::new);

        if (role != null) {
            appUser.setRole(role);
        }

        if (firstName != null && firstName.length() > 0) {
            appUser.setFirstName(firstName);
        }
        if (lastName != null && lastName.length() > 0) {
            appUser.setLastName(lastName);
        }
        if (email != null && email.length() > 0) {
            appUser.setEmail(email);
        }
        if (phoneNumber != null && phoneNumber.length() > 0) {
            appUser.setPhoneNumber(phoneNumber);
        }
        if (username != null && username.length() > 0) {
            appUser.setUsername(username);
        }
        if (password != null && password.length() > 0) {
            appUser.setPassword(password);
        }
    }
}
