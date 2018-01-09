package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Ba01Utente;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Ba01Utente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Ba01UtenteRepository extends JpaRepository<Ba01Utente, Long> {

}
