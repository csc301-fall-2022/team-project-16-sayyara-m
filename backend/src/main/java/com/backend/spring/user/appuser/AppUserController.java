package com.backend.spring.user.appuser;

import com.backend.spring.user.role.Role;
import com.backend.spring.user.shopowner.ShopOwner;
import com.backend.spring.user.vehicleowner.VehicleOwner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/appUsers")
public class AppUserController {
    private final AppUserService service;

    @Autowired
    public AppUserController(AppUserService service) {
        this.service = service;
    }

    @GetMapping
    public List<AppUser> getAllAppUsers() {
        return service.getAllAppUsers();
    }

    @GetMapping(path = "{appUser_id}")
    public AppUser getAppUser(long id) {
        return service.getAppUser(id);
    }

    @PostMapping(path = "shopOwner")
    public AppUser createShopOwner(@RequestBody ShopOwner shopOwner) {
        return service.createShopOwner(shopOwner);
    }

    @PostMapping(path = "vehicleOwner")
    public AppUser createVehicleOwner(@RequestBody VehicleOwner vehicleOwner) {
        return service.createVehicleOwner(vehicleOwner);
    }

    @DeleteMapping(path = "{appUser_id}")
    public void deleteAppUser(@PathVariable("appUser_id") long id) {
        service.deleteAppUser(id);
    }

    @PutMapping(path = "{appUser_id}")
    public void updateAppUser(@PathVariable("appUser_id") Long id,
                              @RequestParam(required = false) Role role,
                              @RequestParam(required = false) String firstName,
                              @RequestParam(required = false) String lastName,
                              @RequestParam(required = false) String email,
                              @RequestParam(required = false) String phoneNumber,
                              @RequestParam(required = false) String username,
                              @RequestParam(required = false) String password) {
        service.updateAppUser(id, role, firstName, lastName, email, phoneNumber, username, password);
    }
}
