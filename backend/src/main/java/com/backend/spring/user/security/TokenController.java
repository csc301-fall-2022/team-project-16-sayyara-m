package com.backend.spring.user.security;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.backend.spring.user.security.SecurityConstants.ALGORITHM;
import static com.backend.spring.user.security.SecurityConstants.EXPIRATION_TIME_SHORT;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin
@RequestMapping("token")
@RequiredArgsConstructor
public class TokenController {

    @GetMapping("/refresh")
    public void getRefreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        AuthHeaderParser authHeaderParser = new AuthHeaderParser(request.getHeader(AUTHORIZATION));
        String username = authHeaderParser.getUsername();
        String refreshToken = authHeaderParser.getToken();

        String access_token = JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME_SHORT))
                .withIssuer(request.getRequestURL().toString())
                .sign(ALGORITHM);

        Map<String, String> headers = new HashMap<>();
        headers.put("access_token", access_token);
        headers.put("refresh_token", refreshToken);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), headers);
    }
}
