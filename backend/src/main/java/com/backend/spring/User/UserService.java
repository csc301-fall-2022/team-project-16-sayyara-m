package com.backend.spring.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public ShopOwner addNewShopOwner(ShopOwner shopOwner) {
        return userRepository.save(shopOwner);
    }

    public VehicleOwner addNewVehicleOwner(VehicleOwner vehicleOwner) {
        return userRepository.save(vehicleOwner);
    }

    @Transactional
    public void updateUser(Long userId, String firstName, String lastName, String email, String phone, String username, String password) {
        User user = userRepository.findById(userId).orElseThrow(IllegalStateException::new);

        if (firstName != null && firstName.length() > 0) {
            user.setFirstName(firstName);
        }
        if (lastName != null && lastName.length() > 0) {
            user.setFirstName(lastName);
        }
        if (email != null && email.length() > 0) {
            user.setFirstName(email);
        }
        if (phone != null && phone.length() > 0) {
            user.setFirstName(phone);
        }
        if (username != null && username.length() > 0) {
            user.setFirstName(username);
        }
        if (password != null && password.length() > 0) {
            user.setFirstName(password);
        }
    }
}
