package com.backend.spring.user.appuser;

import com.backend.spring.user.shopowner.ShopOwner;
import com.backend.spring.user.vehicleowner.VehicleOwner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AppUserService {
    private final AppUserRepository appUserRepository;

    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    public ShopOwner createShopOwner(ShopOwner shopOwner) {
        return appUserRepository.save(shopOwner);
    }

    public VehicleOwner createVehicleOwner(VehicleOwner vehicleOwner) {
        return appUserRepository.save(vehicleOwner);
    }

    @Transactional
    public void updateUser(Long userId, String firstName, String lastName, String email, String phoneNumber, String username, String password) {
        AppUser user = appUserRepository.findById(userId).orElseThrow(IllegalStateException::new);

        if (firstName != null && firstName.length() > 0) {
            user.setFirstName(firstName);
        }
        if (lastName != null && lastName.length() > 0) {
            user.setLastName(lastName);
        }
        if (email != null && email.length() > 0) {
            user.setEmail(email);
        }
        if (phoneNumber != null && phoneNumber.length() > 0) {
            user.setPhoneNumber(phoneNumber);
        }
        if (username != null && username.length() > 0) {
            user.setUsername(username);
        }
        if (password != null && password.length() > 0) {
            user.setPassword(password);
        }
    }
}
