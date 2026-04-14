package com.financeiro.spring.jpa.postgresql.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping
    public ResponseEntity<Map<String, String>> test() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "API está funcionando corretamente"
        ));
    }
}
