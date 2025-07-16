package com.back.domain.order.order.service;

import com.back.domain.order.order.entity.Order;
import com.back.domain.order.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    // 주문 삭제
    public boolean delete(int id) {
        // 1. 주문이 존재하는지 확인
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            return false;
        }

        // 2. 주문 삭제
        orderRepository.deleteById(id);
        return true;
    }
}
