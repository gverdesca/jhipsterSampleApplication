package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Obiettivi;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Obiettivi entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ObiettiviRepository extends JpaRepository<Obiettivi, Long> {

}
