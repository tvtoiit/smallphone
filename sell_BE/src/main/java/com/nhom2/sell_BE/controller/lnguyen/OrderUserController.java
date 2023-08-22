package com.nhom2.sell_BE.controller.lnguyen;

import com.nhom2.sell_BE.services.lnguyen.OrderUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/order-user")
public class OrderUserController {

    @Autowired
    private OrderUserService orderUserService;

    @GetMapping("")
    public ResponseEntity<?> getAllOrderByUser() {
        return new ResponseEntity<>(orderUserService.getAllOrderByUser(), HttpStatus.OK);
    }
}
