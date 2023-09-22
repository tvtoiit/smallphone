package com.nhom2.sell_BE.services.lnguyen;

import com.nhom2.sell_BE.payload.response.lnguyen.OrderResponse;

import java.util.List;

public interface OrderUserService {

    List<OrderResponse> getAllOrderByUser();
}
