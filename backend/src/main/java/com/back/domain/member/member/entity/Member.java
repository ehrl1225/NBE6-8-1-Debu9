package com.back.domain.member.member.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "members")
public class Member extends BaseEntity {

    @Column(unique = true, nullable = false)
    private String email;

    public Member(String email) {
        this.email = email;
    }
}