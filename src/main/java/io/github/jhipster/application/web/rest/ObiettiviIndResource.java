package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.ObiettiviInd;

import io.github.jhipster.application.repository.ObiettiviIndRepository;
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
 * REST controller for managing ObiettiviInd.
 */
@RestController
@RequestMapping("/api")
public class ObiettiviIndResource {

    private final Logger log = LoggerFactory.getLogger(ObiettiviIndResource.class);

    private static final String ENTITY_NAME = "obiettiviInd";

    private final ObiettiviIndRepository obiettiviIndRepository;

    public ObiettiviIndResource(ObiettiviIndRepository obiettiviIndRepository) {
        this.obiettiviIndRepository = obiettiviIndRepository;
    }

    /**
     * POST  /obiettivi-inds : Create a new obiettiviInd.
     *
     * @param obiettiviInd the obiettiviInd to create
     * @return the ResponseEntity with status 201 (Created) and with body the new obiettiviInd, or with status 400 (Bad Request) if the obiettiviInd has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/obiettivi-inds")
    @Timed
    public ResponseEntity<ObiettiviInd> createObiettiviInd(@Valid @RequestBody ObiettiviInd obiettiviInd) throws URISyntaxException {
        log.debug("REST request to save ObiettiviInd : {}", obiettiviInd);
        if (obiettiviInd.getId() != null) {
            throw new BadRequestAlertException("A new obiettiviInd cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ObiettiviInd result = obiettiviIndRepository.save(obiettiviInd);
        return ResponseEntity.created(new URI("/api/obiettivi-inds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /obiettivi-inds : Updates an existing obiettiviInd.
     *
     * @param obiettiviInd the obiettiviInd to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated obiettiviInd,
     * or with status 400 (Bad Request) if the obiettiviInd is not valid,
     * or with status 500 (Internal Server Error) if the obiettiviInd couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/obiettivi-inds")
    @Timed
    public ResponseEntity<ObiettiviInd> updateObiettiviInd(@Valid @RequestBody ObiettiviInd obiettiviInd) throws URISyntaxException {
        log.debug("REST request to update ObiettiviInd : {}", obiettiviInd);
        if (obiettiviInd.getId() == null) {
            return createObiettiviInd(obiettiviInd);
        }
        ObiettiviInd result = obiettiviIndRepository.save(obiettiviInd);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, obiettiviInd.getId().toString()))
            .body(result);
    }

    /**
     * GET  /obiettivi-inds : get all the obiettiviInds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of obiettiviInds in body
     */
    @GetMapping("/obiettivi-inds")
    @Timed
    public List<ObiettiviInd> getAllObiettiviInds() {
        log.debug("REST request to get all ObiettiviInds");
        return obiettiviIndRepository.findAll();
        }

    /**
     * GET  /obiettivi-inds/:id : get the "id" obiettiviInd.
     *
     * @param id the id of the obiettiviInd to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the obiettiviInd, or with status 404 (Not Found)
     */
    @GetMapping("/obiettivi-inds/{id}")
    @Timed
    public ResponseEntity<ObiettiviInd> getObiettiviInd(@PathVariable Long id) {
        log.debug("REST request to get ObiettiviInd : {}", id);
        ObiettiviInd obiettiviInd = obiettiviIndRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(obiettiviInd));
    }

    /**
     * DELETE  /obiettivi-inds/:id : delete the "id" obiettiviInd.
     *
     * @param id the id of the obiettiviInd to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/obiettivi-inds/{id}")
    @Timed
    public ResponseEntity<Void> deleteObiettiviInd(@PathVariable Long id) {
        log.debug("REST request to delete ObiettiviInd : {}", id);
        obiettiviIndRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
