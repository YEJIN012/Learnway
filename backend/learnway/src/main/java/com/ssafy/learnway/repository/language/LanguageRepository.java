package com.ssafy.learnway.repository.language;

import com.ssafy.learnway.domain.Interest;
import com.ssafy.learnway.domain.Language;
import com.ssafy.learnway.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LanguageRepository extends JpaRepository<Language, Integer> {
    Language findByLanguageId(int languageId);

    Language findByLanguageName(String languageName);
}
