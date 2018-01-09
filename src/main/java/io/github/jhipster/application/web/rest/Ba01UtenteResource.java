package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Ba01Utente;

import io.github.jhipster.application.repository.Ba01UtenteRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Ba01Utente.
 */
@RestController
@RequestMapping("/api")
public class Ba01UtenteResource {

    private final Logger log = LoggerFactory.getLogger(Ba01UtenteResource.class);

    private static final String ENTITY_NAME = "ba01Utente";

    private final Ba01UtenteRepository ba01UtenteRepository;

    public Ba01UtenteResource(Ba01UtenteRepository ba01UtenteRepository) {
        this.ba01UtenteRepository = ba01UtenteRepository;
    }

    /**
     * POST  /ba-01-utentes : Create a new ba01Utente.
     *
     * @param ba01Utente the ba01Utente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ba01Utente, or with status 400 (Bad Request) if the ba01Utente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ba-01-utentes")
    @Timed
    public ResponseEntity<Ba01Utente> createBa01Utente(@Valid @RequestBody Ba01Utente ba01Utente) throws URISyntaxException {
        log.debug("REST request to save Ba01Utente : {}", ba01Utente);
        if (ba01Utente.getId() != null) {
            throw new BadRequestAlertException("A new ba01Utente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ba01Utente result = ba01UtenteRepository.save(ba01Utente);
        return ResponseEntity.created(new URI("/api/ba-01-utentes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ba-01-utentes : Updates an existing ba01Utente.
     *
     * @param ba01Utente the ba01Utente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ba01Utente,
     * or with status 400 (Bad Request) if the ba01Utente is not valid,
     * or with status 500 (Internal Server Error) if the ba01Utente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ba-01-utentes")
    @Timed
    public ResponseEntity<Ba01Utente> updateBa01Utente(@Valid @RequestBody Ba01Utente ba01Utente) throws URISyntaxException {
        log.debug("REST request to update Ba01Utente : {}", ba01Utente);
        if (ba01Utente.getId() == null) {
            return createBa01Utente(ba01Utente);
        }
        Ba01Utente result = ba01UtenteRepository.save(ba01Utente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ba01Utente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ba-01-utentes : get all the ba01Utentes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ba01Utentes in body
     */
    @GetMapping("/ba-01-utentes")
    @Timed
    public List<Ba01Utente> getAllBa01Utentes() {
        log.debug("REST request to get all Ba01Utentes");
        return ba01UtenteRepository.findAll();
        }

    /**
     * GET  /ba-01-utentes/:id : get the "id" ba01Utente.
     *
     * @param id the id of the ba01Utente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ba01Utente, or with status 404 (Not Found)
     */
    @GetMapping("/ba-01-utentes/{id}")
    @Timed
    public ResponseEntity<Ba01Utente> getBa01Utente(@PathVariable Long id) {
        log.debug("REST request to get Ba01Utente : {}", id);
        Ba01Utente ba01Utente = ba01UtenteRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ba01Utente));
    }

    /**
     * DELETE  /ba-01-utentes/:id : delete the "id" ba01Utente.
     *
     * @param id the id of the ba01Utente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ba-01-utentes/{id}")
    @Timed
    public ResponseEntity<Void> deleteBa01Utente(@PathVariable Long id) {
        log.debug("REST request to delete Ba01Utente : {}", id);
        ba01UtenteRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
