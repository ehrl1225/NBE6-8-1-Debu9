package com.back.global.initData;

import com.back.domain.order.order.entity.Order;
import com.back.domain.order.order.service.OrderService;
import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

@Configuration
@RequiredArgsConstructor
public class BaseInitData {
    @Autowired
    @Lazy
    private BaseInitData self;
    private final ProductService productService;
    private final OrderService orderService;

    @Bean
    ApplicationRunner baseInitDataApplicationRunner() {
        return args -> {
            self.work2();
        };
    }

    @Transactional
    public void work1() {
        if (productService.count() > 0) return;

        Product product1 = productService.write("상품1", "이미지1.jpg", "상품1 정보", 10000, "상품1 영문명");
        Product product2 = productService.write("상품2", "이미지2.jpg", "상품2 정보", 20000, "상품2 영문명");
        Product product3 = productService.write("상품3", "이미지3.jpg", "상품3 정보", 30000, "상품3 영문명");
    }

    @Transactional
    public void work2() {
        if (orderService.count() >0) return;

        Order order1 = orderService.write(1, 1, "서울시 강남구 역삼동", "배송중");
        Order order2 = orderService.write(2, 12, "대전광역시 동구 자양동", "배송완료");
        Order order3 = orderService.write(3, 3, "부산광역시 해운대구 우동", "배송준비중");
    }
}