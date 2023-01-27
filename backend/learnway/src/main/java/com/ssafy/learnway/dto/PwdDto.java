package com.ssafy.learnway.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PwdDto {

    String userEmail;
    String newPassword;

    String newPasswordConfirm;

}
