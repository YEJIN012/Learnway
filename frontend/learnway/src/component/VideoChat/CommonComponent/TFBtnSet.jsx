import React from "react";
import styled from "styled-components";
import AllButton from '../../ui/AllButton';
import { useTranslation } from 'react-i18next';


const BtnBox = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    padding: 0.5vw;
`;

function TFBtnSet(props){

    const { t } = useTranslation();

    return(
        <BtnBox>
            <AllButton
                textValue={t('Send')}
                width="60%"
                height={props.height}
                fontSize={props.fontSize}
                textWeight="100"
                radius="15px"
                margin="0px"
                onClick={props.function_ok} />
        </BtnBox>
    );
} export default TFBtnSet;