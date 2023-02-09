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
            <InterestSelect flag={flag} userinfo={userinfo} itdata={itdata} handleclose={handleclose} ChangeInterest={ChangeInterest}></InterestSelect>
    );
}
