package com.back.domain.member.member.service;

import com.back.domain.member.member.entity.Member;
import com.back.domain.member.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    public Member save(String email) {
        Member member = new Member(email);
        memberRepository.save(member);
        return member;
    }

    public Optional<Member> findById(int id) {
        return memberRepository.findById(id);
    }
}
