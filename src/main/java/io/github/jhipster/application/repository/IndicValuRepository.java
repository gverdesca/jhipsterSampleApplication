package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.IndicValu;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the IndicValu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IndicValuRepository extends JpaRepository<IndicValu, Long> {

}
