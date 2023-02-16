import { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import flagData from "../../language/flagList.json";
import LanguageIcon from '@mui/icons-material/Language';


export default function LanguageBar() {
  const [Selected, setSelected] = useState("Language");
  const [optionList, setOptionList] = useState([]);
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      localStorage.setItem('language', lng);
  };

  const handleChangeSelect = (e) => {
        setSelected(e.target.value);
  };

  function dropdownBoxRenderer() {
        const flag = flagData.data; //국기 이미지 json으로 한번에

        const options = [];
            for (let i = 0; i < flag.length; i++) {
                options.push(
                    <MenuItem
                        key={flag[i].code}
                        onClick={() => {changeLanguage(flag[i].code);}} value={flag[i].name}>
                        {flag[i].name}
                    </MenuItem>
                    );
                }
            setOptionList(options);
        
    }

    useEffect(() => {
        dropdownBoxRenderer();
    }, []);

  return (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select-label"
        value={Selected}
        IconComponent={LanguageIcon}
        onChange={handleChangeSelect}
        sx={{color:"#91a8d0", height: "30px", opacity: "0.5", width: "100px" }}
      >
        {optionList}
      </Select>
  )
}



