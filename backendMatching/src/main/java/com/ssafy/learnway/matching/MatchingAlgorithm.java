package com.ssafy.learnway.matching;

import com.ssafy.learnway.dto.matching.MatchingRequestDto;
import com.ssafy.learnway.dto.matching.MatchingResponseDto;
import com.ssafy.learnway.dto.matching.WaitUser;
import com.ssafy.learnway.matching.MatchingWaitList;
import com.ssafy.learnway.matching.SendMatching;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.*;

@RequiredArgsConstructor
@Component
@Slf4j
public class MatchingAlgorithm {

    private final SendMatching sendMatching;

    private final MatchingWaitList matchingWaitList;

    static boolean succeed;

    static MatchingResponseDto matchingResponseDto = new MatchingResponseDto();

    static Map<Object, Object> result = new HashMap<>();

    public Map<Object, Object> algorithm(){
        log.info("matching algorithm start...");

        // 실제 매칭할 유저들 가져오기 (중간에 매칭하는 유저가 또 들어오는 걸 방지) -> n소요
        while(!matchingWaitList.getMatchingWaitList().isEmpty()){

            matchingWaitList.getMatchingList().add(matchingWaitList.getMatchingWaitList().poll());
        }
        
        //최소 N초 동안만 기다렸다가 모인 대기열(matchingWaitList.getMatchingList())을 가지고 랜덤 매칭을 진행한다!
        //matchingWaitList.getMatchingList() => matchingList : 실제로 매칭을 진행할 대기자들

        //서로에 대해 각각의 점수를 계산해야 하는 데 -> 최악 O(n^2) ..

        int weight = 0;

        for(int i=0; i<matchingWaitList.getMatchingList().size(); i++){

            log.info("매칭 성사 중 ... ");

            // 1. 상대방이 배우고자 하는 언어 - 모국어가 일치해야 한다.
            // 2. 관심사가 일치하면 +1을 하여 가중치가 +2가 되면 조건 만족 처리를 한다
            // 3. 나이가 +=10 사이이어야 한다.
            // 4. 대기열에 먼저 들어온 순서부터 우선적으론 판별하고 확인할 수 있어야 한다.

            WaitUser subjectUser = matchingWaitList.getMatchingList().get(i);
            int subjectUserWaitTurn = subjectUser.getMatchingTurn();
            subjectUser.setMatchingTurn(subjectUserWaitTurn+1); // 매칭 턴 횟수 증가

            log.info("sublastTurn - "+subjectUserWaitTurn);
            log.info("subturn - "+subjectUser.getMatchingTurn());

            MatchingRequestDto subject = subjectUser.getMatchingRequestDto(); // 매칭 기준 유저 정보


            out : for(int j=0; j<matchingWaitList.getMatchingList().size(); j++){
                WaitUser candidateuser = matchingWaitList.getMatchingList().get(j);
                //int candidateuserWaitTurn = subjectUser.getMatchingTurn();
                MatchingRequestDto candidate = candidateuser.getMatchingRequestDto(); // 상대방 유저 정보

                // TODO 중간에 나간 유저인지 확인

                for (int z=0; z<matchingWaitList.getBadList().size();z++)
                {
                    //log.info(subject.getSessionId()+" : "+ matchingWaitList.getBadList().get(z));
                    if(subject.getSessionId().equals(matchingWaitList.getBadList().get(z))){
                        log.info("매칭 유저 통신 불가.. 삭제 중..");
                        matchingWaitList.getMatchingList().remove(i); // subject 지우기
                        matchingWaitList.getBadList().remove(z);
                        i--;
                        z--;
                        break out;
                    }else if(candidate.getSessionId().equals(matchingWaitList.getBadList().get(z))){
                        log.info("매칭 유저 통신 불가.. 삭제 중..");
                        matchingWaitList.getMatchingList().remove(j); // candidate 지우기
                        matchingWaitList.getBadList().remove(z);
                        j--;
                        z--;
                        break out;
                    }
                }

                if(subject.getUserEmail() == candidate.getUserEmail()){
                    log.info("매칭 유저 동일");
                    continue; //중복으로 매칭 신청
                }

                // 언어 체크
                if(subject.getStudyId() != candidate.getLanguageId() || subject.getLanguageId() != candidate.getStudyId()){
                    log.info("언어 매칭 실패");
                    continue; //다음 사람
                }

                weight = 0;

                // 관심사 가중치 체크
                for(int interest : subject.getInterestId()){
                    for(int interest2 : candidate.getInterestId()){ // HashSet을 이용해서 최적화
                        log.info(interest + " : " + interest2);
//                        if(weight >=3) break;
                        if(interest == interest2) weight ++;
                    }
                }

                // 1,2,3턴은 취향 3개, 2개, 1 이상이 맞아야 성공. 4번째 턴 부터는 취향 상관없이 매칭!!!!
              if(subjectUserWaitTurn<=1){
                    if(weight <=3){
                        log.info("첫번째 턴 관심분야 매칭 실패");
                        break out;
                    }
                } else if (subjectUserWaitTurn<=2) {
                    if(weight <=2){
                        log.info("두 번째 턴 관심분야 매칭 실패");
                        break out;
                    }
                }  else if (subjectUserWaitTurn<=3) {
                    if(weight <=1){
                        log.info(" 세 번째 턴 관심분야 매칭 실패");
                        break out;
                    }
                }

                //나이 체크
                // 1,2,3턴은 나이 범위 10, 4번째는 상관없이 매칭
                if(subjectUserWaitTurn<=1){
                    if(Math.abs(subject.getAge() - candidate.getAge())>7){
                        break out;
                    }
                } else if (subjectUserWaitTurn<=1) {
                    if(Math.abs(subject.getAge() - candidate.getAge())>9){
                        break out;
                    }
                }  else if (subjectUserWaitTurn<=1) {
                    if(Math.abs(subject.getAge() - candidate.getAge())>11){
                        break out;
                    }
                }


                //모든 조건을 만족하면 서로 매칭
                matchingWaitList.getMatchingResultList().add(subjectUser);
                matchingWaitList.getMatchingResultList().add(candidateuser);

                if(i>j){
                    matchingWaitList.getMatchingList().remove(i);
                    matchingWaitList.getMatchingList().remove(j);
                }else{
                    matchingWaitList.getMatchingList().remove(j);
                    matchingWaitList.getMatchingList().remove(i);
                }

                i--;
                break;

            }
        }

        // 매칭 성사
        if(matchingWaitList.getMatchingResultList().size()>=2){
            log.info("매칭 성사");

            succeed = true;

            MatchingRequestDto user1 = matchingWaitList.getMatchingResultList().poll().getMatchingRequestDto();
            MatchingRequestDto user2 = matchingWaitList.getMatchingResultList().poll().getMatchingRequestDto();

            // 매칭 성사되면, 매칭 결과 main server 전송
            if(succeed){
                matchingResponseDto = MatchingResponseDto.builder()
                        .user1(user1).user2(user2).build();

                succeed = false; // 매칭 성사 여부 reset

                result.put("succeed", true);
                result.put("matchingResponseDto", matchingResponseDto);

                return result;
            }
        }

        result.put("succeed",false);
        return result;
    }
}
