package com.backend.spring.controllers;

import com.backend.spring.entities.Address;
import com.backend.spring.entities.Shop;
import com.backend.spring.security.WebSecurityConfig;
import com.backend.spring.services.ShopService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ShopController.class)
@Import(ShopController.class)
@ContextConfiguration(classes = {WebSecurityConfig.class})
class ShopControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ShopService service;

    private Shop shop;

    @BeforeEach
    void setUp() {
        shop = new Shop();
        shop.setName("Shop");
        shop.setEmail("shop123@gmail.com");
        shop.setPhoneNumber("1234567890");
        shop.setAddress(new Address("12", "Jane", "Toronto", "ON", "M1M1M1"));
    }

    @Test
    void getAllShops() throws Exception {
        Mockito.when(service.getAllShops()).thenReturn(List.of(shop));

        mockMvc.perform(get("/shops"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }
}