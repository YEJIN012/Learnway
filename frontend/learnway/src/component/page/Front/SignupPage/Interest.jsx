import InterestSelect from "./InterestSelect";
import { useSelector } from "react-redux";

export default function Interest({
    flag,
    ChangeInterest,
    handleclose,
    userinfo,
}) {

    // 취향 정보를 redux store에서 받아오기
    const itdata = useSelector(state => state.UserInfoReducer.interests)
    
    return (
        <div>
            <h1>나는 취향설정이야</h1>
            <InterestSelect flag={flag} userinfo={userinfo} itdata={itdata} handleclose={handleclose} ChangeInterest={ChangeInterest}></InterestSelect>
        </div>
    );
}
