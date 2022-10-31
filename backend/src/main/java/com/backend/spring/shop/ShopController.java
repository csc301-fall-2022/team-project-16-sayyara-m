package com.backend.spring.shop;

import com.backend.spring.address.Address;
import com.backend.spring.shop.Shop;
import com.backend.spring.shop.ShopService;
import com.backend.spring.user.shopowner.ShopOwner;
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
@RequestMapping(path = "api/shops")
public class ShopController {
    private final ShopService service;

    @Autowired
    public ShopController(ShopService service) {
        this.service = service;
    }

    @GetMapping
    public List<Shop> getAllShops() {
        return service.getAllShops();
    }

    @GetMapping
    public Shop getShop(long id) {
        return service.getShop(id);
    }

    @PostMapping
    public Shop createShop(@RequestBody Shop shop) {
        return service.createShop(shop);
    }

    @DeleteMapping(path = "{shop_id}")
    public void deleteShop(@PathVariable("shop_id") long id) {
        service.deleteShop(id);
    }

    @PutMapping(path = "{shop_id}")
    public void updateShop(@PathVariable("shop_id") Long id,
                           @RequestParam(required = false) ShopOwner shopOwner,
                           @RequestParam(required = false) Address address,
                           @RequestParam(required = false) String phoneNumber,
                           @RequestParam(required = false) String email) {
        service.updateShop(id, shopOwner, address, phoneNumber, email);
    }
}
