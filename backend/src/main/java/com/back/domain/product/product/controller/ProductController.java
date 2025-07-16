package com.back.domain.product.product.controller;

import com.back.domain.product.product.dto.ProductDto;
import com.back.domain.product.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // 전체 상품 조회
    @GetMapping
    public List<ProductDto> getAllProducts() {
        return productService.findAll();
    }

    // 특정 상품 조회
    @GetMapping("/{id}")
    public ProductDto getProduct(@PathVariable Long id) {
        return productService.findById(id);
    }

    // 상품 추가
    @PostMapping
    public ProductDto createProduct(@RequestBody ProductDto productDto) {
        return productService.create(productDto);
    }

    // 상품 수정
    @PutMapping("/{id}")
    public ProductDto updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
        return productService.update(id, productDto);
    }

    // 상품 삭제
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        boolean deleted = productService.delete(id);
        if (deleted) {
            return "상품이 삭제되었습니다.";
        } else {
            return "상품을 찾을 수 없습니다.";
        }
    }
}
