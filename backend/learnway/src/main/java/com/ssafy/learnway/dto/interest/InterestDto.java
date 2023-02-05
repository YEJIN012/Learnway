package com.ssafy.learnway.dto.interest;

import com.ssafy.learnway.domain.Interest;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@ToString
@Builder
@AllArgsConstructor
public class InterestDto {

    int interestId;

    String field;

    public Interest toEntity(){
        return Interest.builder()
                .interestId(interestId)
                .field(field).build();
    }
}
