package com.nhom2.sell_BE.services.impl.lnguyen;

import com.nhom2.sell_BE.entities.Account;
import com.nhom2.sell_BE.entities.Order;
import com.nhom2.sell_BE.entities.User;
import com.nhom2.sell_BE.exception.DataNotFoundException;
import com.nhom2.sell_BE.payload.response.lnguyen.OrderResponse;
import com.nhom2.sell_BE.repositories.AccountRepository;
import com.nhom2.sell_BE.repositories.OrderRepository;
import com.nhom2.sell_BE.repositories.UserRepositories;
import com.nhom2.sell_BE.services.lnguyen.OrderUserService;
import com.nhom2.sell_BE.utils.GetUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderUserServiceImpl implements OrderUserService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepositories userRepository;

    @Override
    public List<OrderResponse> getAllOrderByUser() {
        User user = getUser();
        List<Order> orders = orderRepository.findAllByUser(user);

        return orders.stream().map(OrderResponse::new).collect(Collectors.toList());
    }

    public User getUser(){
        Account account = accountRepository.findByusername(new GetUserUtil().GetUserName());
        User user = userRepository.findById(account.getUser().getUserId()).orElseThrow(()->new DataNotFoundException("User does not exist"));
        return user;
    }

    @Override
    public OrderResponse createOrder(Order order) {
        //Lấy người dùng hiện tại
        User user = getUser();

        //Gán người dùng cho đơn hàng
        order.setUser(user);

        //Lưu đơn hàng vào trong database
        Order savedOrder = orderRepository.save(order);

        // Chuyển đổi đơn hàng thành đối tượng OrderResponse
        return new OrderResponse(savedOrder);
    }
}
