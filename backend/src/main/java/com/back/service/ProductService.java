package com.back.service;

import com.back.dto.ProductDto;
import com.back.entity.Product;
import com.back.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductDto update(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) return null;

        product.setName(productDto.getName());
        product.setOrigin(productDto.getOrigin());
        product.setPrice(productDto.getPrice());
        product.setDescription(productDto.getDescription());

        Product saved = productRepository.save(product);

        ProductDto result = new ProductDto();
        result.setId(saved.getId());
        result.setName(saved.getName());
        result.setOrigin(saved.getOrigin());
        result.setPrice(saved.getPrice());
        result.setDescription(saved.getDescription());

        return result;
    }
}