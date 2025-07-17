package com.back.domain.order.order.service;

import com.back.domain.order.order.entity.Order;
import com.back.domain.order.order.repository.OrderRepository;
import com.back.domain.order.orderItem.entity.OrderItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {
    private final OrderRepository orderRepository;

    public long count() {
        return orderRepository.count();
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public Optional<Order> findById(int id) {
        return orderRepository.findById(id);
    }

    public Order write(int userId, int productId, String address) {
        Order order = new Order(userId, productId, address);

        return orderRepository.save(order);
    }

    public boolean delete(int id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public void modifyitem(OrderItem orderItem, int count, LocalDateTime expectedDeliveryDate, String deliveryState) {
        orderItem.modify(count, expectedDeliveryDate, deliveryState);
    }
}
