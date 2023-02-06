package com.ssafy.learnway.service.conversation;

import com.ssafy.learnway.domain.Language;
import com.ssafy.learnway.dto.conversation.ConvTransDto;
import com.ssafy.learnway.repository.language.LanguageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class TransService {

    @Value("${spring.papago.id}")
    private String clientId;

    @Value("${spring.papago.secret}")
    private String clientSecret;

    private final LanguageRepository languageRepository;

    public ConvTransDto getTransSentence(List<String> sentences, String lng, String studyLng){ //변환된 언어 코드로 보낸다.

        List<String> lngList = new ArrayList<>(); //모국어로 변역
        List<String> studyLngList = new ArrayList<>(); //학습 언어로 변역

        Language language = languageRepository.findByLanguageName(lng);
        Language studyLanguage = languageRepository.findByLanguageName(studyLng);

        if(language == null || studyLanguage == null){
            return null;
        }

        for(int i=0; i<sentences.size(); i++){
            // 한국어가 아닐때만 번역 진행 (파파고 api)
            if(!language.getLanguageCode().equals("ko")){
                lngList.add(response(sentences.get(i),language.getLanguageCode()));
            }else{
                lngList.add(sentences.get(i));
            }
            if(!studyLanguage.getLanguageCode().equals("ko")){
                studyLngList.add(response(sentences.get(i), studyLanguage.getLanguageCode()));
            }else{
                studyLngList.add(sentences.get(i));
            }
        }

        return ConvTransDto.builder()
                .lng(lngList)
                .studyLng(studyLngList)
                .build();
    }

    public String response(String sentence, String language){
        String apiURL = "https://openapi.naver.com/v1/papago/n2mt";
        String text;

        try {
            text = URLEncoder.encode(sentence, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("인코딩 실패", e);
        }

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);

        String responseBody = post(apiURL, requestHeaders, text, language);

        log.info(responseBody);
        return responseBody;
    }

    private static String post(String apiUrl, Map<String, String> requestHeaders, String text, String language){
        HttpURLConnection con = connect(apiUrl);
        String postParams = "source=ko&target="+language+"&text=" + text; //원본언어: 한국어 (ko) -> 목적언어: language
        try {
            con.setRequestMethod("POST");
            for(Map.Entry<String, String> header :requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            con.setDoOutput(true);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.write(postParams.getBytes());
                wr.flush();
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
                return readBody(con.getInputStream());
            } else {  // 에러 응답
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private static HttpURLConnection connect(String apiUrl){
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection)url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private static String readBody(InputStream body){
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                line = line.substring(line.indexOf("translatedText") +17);
                line = line.substring(0, line.indexOf("engineType") - 3);
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }
}
