package com.back.domain.product.product.service;

import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public long count() {
        return productRepository.count();
    }

    public Optional<Product> findById(int id) {
        return productRepository.findById(id);
    }

    public void modify(Product product, String name, String imageUrl, String info, int price, String engName) {
        product.modify(name, imageUrl, info, price, engName);
    }
}
