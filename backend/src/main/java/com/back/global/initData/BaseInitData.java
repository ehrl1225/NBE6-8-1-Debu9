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

import java.util.List;

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
            self.BaseWork();
        };
    }

    @Transactional
    public List<Product> work1() { // 1. 생성된 Product 리스트를 반환하도록 변경
        if (productService.count() > 0) return productService.findAll();

        Product product1 = productService.write("상품1", "이미지1.jpg", "상품1 정보", 10000, "상품1 영문명");
        Product product2 = productService.write("상품2", "이미지2.jpg", "상품2 정보", 20000, "상품2 영문명");
        Product product3 = productService.write("상품3", "이미지3.jpg", "상품3 정보", 30000, "상품3 영문명");

        return List.of(product1, product2, product3);
    }

    @Transactional
    public void work2(List<Product> products) { // 2. Product 리스트를 파라미터로 받도록 변경
        if (orderService.count() > 0) return;

        // 3. 하드코딩된 ID 대신 실제 Product 객체의 ID를 사용
        Order order1 = orderService.write(1, products.get(0).getId(), "서울시 강남구 역삼동");
        Order order2 = orderService.write(2, products.get(1).getId(), "대전광역시 동구 자양동");
        Order order3 = orderService.write(3, products.get(2).getId(), "부산광역시 해운대구 우동");
    }

    @Transactional
    public void BaseWork() {
        List<Product> products = self.work1(); // work1의 결과를 받음
        self.work2(products);                 // work2에 전달
    }
}