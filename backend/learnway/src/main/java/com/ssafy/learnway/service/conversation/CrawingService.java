package com.ssafy.learnway.service.conversation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class CrawingService { // 오늘의 회화 크롤링
//    private static String url = "https://learn.dict.naver.com/conversation#/endic/"; //네이버 오늘의 회화 -> 동적 페이지 csr로 작동
    private static String url = "https://www.hackers.co.kr/?c=s_eng/eng_contents/I_others_english"; //해커스
    public List<String> crawling(LocalDate date) throws IOException {
//        url += date;
//        Map<String, List> result = new HashMap<>();

        // Jsoup는 정적인 페이지만 크롤링해서 받을 수 있다.
        Document document = Jsoup.connect(url).get();
        log.info(document.toString());
        Element title = document.select("#conv_tL1 b").first();
        List<String> list = new ArrayList<>();

        list.add(title.text());
        for(int i=2; i<6; i++){
            list.add(document.select("#conv_kor_t"+i+" span b").first().text().split(":")[1]);
//            log.info(list.get(i-2));
        }
//        result.put(title.text(), list);

        return list;
    }
}
