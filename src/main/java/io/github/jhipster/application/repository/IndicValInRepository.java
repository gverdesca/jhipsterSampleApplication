package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.IndicValIn;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the IndicValIn entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IndicValInRepository extends JpaRepository<IndicValIn, Long> {

}
