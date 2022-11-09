package com.backend.spring.user.appuser;

import com.backend.spring.user.shopowner.ShopOwner;
import com.backend.spring.user.shopowner.ShopOwnerSaveHelper;
import com.backend.spring.user.vehicleowner.VehicleOwner;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AppUserService {
    private final AppUserRepository userRepository;
    private final ShopOwnerSaveHelper shopOwnerSaveHelper;


    public List<AppUser> getAllAppUsers() {
        return userRepository.findAll();
    }

    public AppUser getAppUser(long id) {
        return userRepository.findById(id).orElseThrow(IllegalStateException::new);
    }

    public ShopOwner createShopOwner(ShopOwner shopOwner) {
        // TODO: Change to get shop and address as input
        return shopOwnerSaveHelper.save(shopOwner, shopOwner.getShop(), shopOwner.getShop().getAddress());
    }

    public VehicleOwner createVehicleOwner(VehicleOwner vehicleOwner) {
        return userRepository.save(vehicleOwner);
    }

    public void deleteAppUser(long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public void updateAppUser(Long userId, String firstName, String lastName, String email, String phoneNumber, String username, String password) {
        AppUser appUser = userRepository.findById(userId).orElseThrow(IllegalStateException::new);

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
