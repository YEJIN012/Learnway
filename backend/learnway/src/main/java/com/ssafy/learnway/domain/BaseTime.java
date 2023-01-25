package com.ssafy.learnway.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass // 상속할 경우 createdDate, modifiedDate를 컬럼으로 인식
@EntityListeners(AuditingEntityListener.class) // Auditing 기능 포함

// createdDate와 modifiedDate 자동 관리
// BaseTimeEntity를 entity의 상위클래스로 선언하면 DB에 entity를 삽입하기 전/ 갱신하니 전 날짜 데이터를 등록/수정함
public class BaseTime {

    @CreatedDate // entity가 생성되어 저장될 때 시간이 자동 저장
    private LocalDateTime createdDate;

    @LastModifiedDate // entity 값을 변경할 때 시간이 자동 저장
    private LocalDateTime modifiedDate;

}
