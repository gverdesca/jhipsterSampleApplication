package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Obiettivi;

import io.github.jhipster.application.repository.ObiettiviRepository;
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
 * REST controller for managing Obiettivi.
 */
@RestController
@RequestMapping("/api")
public class ObiettiviResource {

    private final Logger log = LoggerFactory.getLogger(ObiettiviResource.class);

    private static final String ENTITY_NAME = "obiettivi";

    private final ObiettiviRepository obiettiviRepository;

    public ObiettiviResource(ObiettiviRepository obiettiviRepository) {
        this.obiettiviRepository = obiettiviRepository;
    }

    /**
     * POST  /obiettivis : Create a new obiettivi.
     *
     * @param obiettivi the obiettivi to create
     * @return the ResponseEntity with status 201 (Created) and with body the new obiettivi, or with status 400 (Bad Request) if the obiettivi has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/obiettivis")
    @Timed
    public ResponseEntity<Obiettivi> createObiettivi(@Valid @RequestBody Obiettivi obiettivi) throws URISyntaxException {
        log.debug("REST request to save Obiettivi : {}", obiettivi);
        if (obiettivi.getId() != null) {
            throw new BadRequestAlertException("A new obiettivi cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Obiettivi result = obiettiviRepository.save(obiettivi);
        return ResponseEntity.created(new URI("/api/obiettivis/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /obiettivis : Updates an existing obiettivi.
     *
     * @param obiettivi the obiettivi to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated obiettivi,
     * or with status 400 (Bad Request) if the obiettivi is not valid,
     * or with status 500 (Internal Server Error) if the obiettivi couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/obiettivis")
    @Timed
    public ResponseEntity<Obiettivi> updateObiettivi(@Valid @RequestBody Obiettivi obiettivi) throws URISyntaxException {
        log.debug("REST request to update Obiettivi : {}", obiettivi);
        if (obiettivi.getId() == null) {
            return createObiettivi(obiettivi);
        }
        Obiettivi result = obiettiviRepository.save(obiettivi);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, obiettivi.getId().toString()))
            .body(result);
    }

    /**
     * GET  /obiettivis : get all the obiettivis.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of obiettivis in body
     */
    @GetMapping("/obiettivis")
    @Timed
    public List<Obiettivi> getAllObiettivis() {
        log.debug("REST request to get all Obiettivis");
        return obiettiviRepository.findAll();
        }

    /**
     * GET  /obiettivis/:id : get the "id" obiettivi.
     *
     * @param id the id of the obiettivi to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the obiettivi, or with status 404 (Not Found)
     */
    @GetMapping("/obiettivis/{id}")
    @Timed
    public ResponseEntity<Obiettivi> getObiettivi(@PathVariable Long id) {
        log.debug("REST request to get Obiettivi : {}", id);
        Obiettivi obiettivi = obiettiviRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(obiettivi));
    }

    /**
     * DELETE  /obiettivis/:id : delete the "id" obiettivi.
     *
     * @param id the id of the obiettivi to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/obiettivis/{id}")
    @Timed
    public ResponseEntity<Void> deleteObiettivi(@PathVariable Long id) {
        log.debug("REST request to delete Obiettivi : {}", id);
        obiettiviRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
