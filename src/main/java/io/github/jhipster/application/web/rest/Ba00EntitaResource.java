package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Ba00Entita;

import io.github.jhipster.application.repository.Ba00EntitaRepository;
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
 * REST controller for managing Ba00Entita.
 */
@RestController
@RequestMapping("/api")
public class Ba00EntitaResource {

    private final Logger log = LoggerFactory.getLogger(Ba00EntitaResource.class);

    private static final String ENTITY_NAME = "ba00Entita";

    private final Ba00EntitaRepository ba00EntitaRepository;

    public Ba00EntitaResource(Ba00EntitaRepository ba00EntitaRepository) {
        this.ba00EntitaRepository = ba00EntitaRepository;
    }

    /**
     * POST  /ba-00-entitas : Create a new ba00Entita.
     *
     * @param ba00Entita the ba00Entita to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ba00Entita, or with status 400 (Bad Request) if the ba00Entita has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ba-00-entitas")
    @Timed
    public ResponseEntity<Ba00Entita> createBa00Entita(@Valid @RequestBody Ba00Entita ba00Entita) throws URISyntaxException {
        log.debug("REST request to save Ba00Entita : {}", ba00Entita);
        if (ba00Entita.getId() != null) {
            throw new BadRequestAlertException("A new ba00Entita cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ba00Entita result = ba00EntitaRepository.save(ba00Entita);
        return ResponseEntity.created(new URI("/api/ba-00-entitas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ba-00-entitas : Updates an existing ba00Entita.
     *
     * @param ba00Entita the ba00Entita to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ba00Entita,
     * or with status 400 (Bad Request) if the ba00Entita is not valid,
     * or with status 500 (Internal Server Error) if the ba00Entita couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ba-00-entitas")
    @Timed
    public ResponseEntity<Ba00Entita> updateBa00Entita(@Valid @RequestBody Ba00Entita ba00Entita) throws URISyntaxException {
        log.debug("REST request to update Ba00Entita : {}", ba00Entita);
        if (ba00Entita.getId() == null) {
            return createBa00Entita(ba00Entita);
        }
        Ba00Entita result = ba00EntitaRepository.save(ba00Entita);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ba00Entita.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ba-00-entitas : get all the ba00Entitas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ba00Entitas in body
     */
    @GetMapping("/ba-00-entitas")
    @Timed
    public List<Ba00Entita> getAllBa00Entitas() {
        log.debug("REST request to get all Ba00Entitas");
        return ba00EntitaRepository.findAll();
        }

    /**
     * GET  /ba-00-entitas/:id : get the "id" ba00Entita.
     *
     * @param id the id of the ba00Entita to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ba00Entita, or with status 404 (Not Found)
     */
    @GetMapping("/ba-00-entitas/{id}")
    @Timed
    public ResponseEntity<Ba00Entita> getBa00Entita(@PathVariable Long id) {
        log.debug("REST request to get Ba00Entita : {}", id);
        Ba00Entita ba00Entita = ba00EntitaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ba00Entita));
    }

    /**
     * DELETE  /ba-00-entitas/:id : delete the "id" ba00Entita.
     *
     * @param id the id of the ba00Entita to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ba-00-entitas/{id}")
    @Timed
    public ResponseEntity<Void> deleteBa00Entita(@PathVariable Long id) {
        log.debug("REST request to delete Ba00Entita : {}", id);
        ba00EntitaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
