package com.back.domain.product.product.service;

import com.back.domain.product.product.dto.ProductDto;
import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // 전체 상품 조회
    public List<ProductDto> findAll() {
        return productRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 특정 상품 조회
    public ProductDto findById(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) return null;

        return convertToDto(product);
    }

    // 상품 추가
    public ProductDto create(ProductDto productDto) {
        // 1. DTO를 Entity로 변환
        Product product = new Product(
                productDto.getName(),
                productDto.getImage_url(),
                productDto.getPrice()
        );

        // 2. 저장
        Product saved = productRepository.save(product);

        // 3. DTO로 변환해서 반환
        return convertToDto(saved);
    }

    public ProductDto update(Long id, ProductDto productDto) {
        // 1. 기존 상품 찾기
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) return null;

        // 2. 상품 정보 수정
        product.modify(
                productDto.getName(),
                productDto.getImage_url(),
                productDto.getInfo(),
                productDto.getPrice(),
                productDto.getEng_name()
        );

        // 3. 저장
        Product saved = productRepository.save(product);

        // 4. DTO로 변환해서 반환
        return convertToDto(saved);
    }

    // 상품 삭제 (DELETE)
    public boolean delete(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) return false;

        productRepository.deleteById(id);
        return true;
    }

    // Entity를 DTO로 변환하는 공통 메서드
    private ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setEng_name(product.getEng_name());
        dto.setPrice(product.getPrice());
        dto.setImage_url(product.getImage_url());
        return dto;
    }
}