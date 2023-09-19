package com.nhom2.sell_BE.services;

import java.util.List;

import com.nhom2.sell_BE.payload.response.OrderResponse;

public interface OrderUserService {

    List<OrderResponse> getAllOrderByUser();
}
