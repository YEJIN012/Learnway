package com.ssafy.learnway.service.user;

import com.ssafy.learnway.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.Random;

@PropertySource("classpath:application.properties")
@Slf4j
@RequiredArgsConstructor
@Service
public class MailService {

    private final JavaMailSender javaMailSender;
    private final RedisUtil redisUtil;

    //인증번호 생성
    private final String certNum = createKey();

    @Value("${spring.mail.username}")
    private String id;

    public MimeMessage createMessage(String to) throws UnsupportedEncodingException, javax.mail.MessagingException {
        log.info("보내는 대상 : "+ to);
        log.info("인증 번호 : " + certNum);
        MimeMessage  message = javaMailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, to); // to 보내는 대상
        message.setSubject("LEARNWAY Member registration verification code: "); //메일 제목

        // 메일 내용 메일의 subtype을 html로 지정하여 html문법 사용 가능
        String msg="";
        msg += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">LEARNWAY</h1>";
        msg += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">Please enter the confirmation code below on the membership screen.</p>";
        msg += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 0 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        msg += certNum;
        msg += "</td></tr></tbody></table></div>";

        message.setText(msg, "utf-8", "html"); //내용, charset타입, subtype
        message.setFrom(new InternetAddress(id,"learnway")); //보내는 사람의 메일 주소, 보내는 사람 이름

        return message;
    }

    // 인증코드 만들기
    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) { // 인증코드 6자리
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }

    /*
        실제로 메일 발송
        sendSimpleMessage의 매개변수로 들어온 to는 인증번호를 받을 메일주소
        MimeMessage 객체 안에 내가 전송할 메일의 내용을 담아준다.
        bean으로 등록해둔 javaMailSender 객체를 사용하여 이메일 send
     */
    public String sendSimpleMessage(String to) throws Exception {
        MimeMessage message = createMessage(to);
        try{
            //key, value, 유효시간 (email을 key로 한다.)
            redisUtil.setDataExpire(to, certNum, 60 * 5L); // redis에 저장(유효시간 5분 후 삭제된다)
            javaMailSender.send(message); // 메일 발송
        }catch(MailException es){
            redisUtil.deleteData(to);
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return certNum; //인증번호
    }

    // 이메일에 보낸 인증번호와 사용자가 보낸 인증번호와 같은지 비교한다.
    public boolean verifyEmail(String email, String value) throws Exception {
        boolean isEmail = redisUtil.checkAuth(email, value);
        if (isEmail) {
            redisUtil.deleteData(email);
        }
        return isEmail;
    }
}