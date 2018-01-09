package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.IndicValIn;

import io.github.jhipster.application.repository.IndicValInRepository;
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
 * REST controller for managing IndicValIn.
 */
@RestController
@RequestMapping("/api")
public class IndicValInResource {

    private final Logger log = LoggerFactory.getLogger(IndicValInResource.class);

    private static final String ENTITY_NAME = "indicValIn";

    private final IndicValInRepository indicValInRepository;

    public IndicValInResource(IndicValInRepository indicValInRepository) {
        this.indicValInRepository = indicValInRepository;
    }

    /**
     * POST  /indic-val-ins : Create a new indicValIn.
     *
     * @param indicValIn the indicValIn to create
     * @return the ResponseEntity with status 201 (Created) and with body the new indicValIn, or with status 400 (Bad Request) if the indicValIn has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/indic-val-ins")
    @Timed
    public ResponseEntity<IndicValIn> createIndicValIn(@Valid @RequestBody IndicValIn indicValIn) throws URISyntaxException {
        log.debug("REST request to save IndicValIn : {}", indicValIn);
        if (indicValIn.getId() != null) {
            throw new BadRequestAlertException("A new indicValIn cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IndicValIn result = indicValInRepository.save(indicValIn);
        return ResponseEntity.created(new URI("/api/indic-val-ins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /indic-val-ins : Updates an existing indicValIn.
     *
     * @param indicValIn the indicValIn to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated indicValIn,
     * or with status 400 (Bad Request) if the indicValIn is not valid,
     * or with status 500 (Internal Server Error) if the indicValIn couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/indic-val-ins")
    @Timed
    public ResponseEntity<IndicValIn> updateIndicValIn(@Valid @RequestBody IndicValIn indicValIn) throws URISyntaxException {
        log.debug("REST request to update IndicValIn : {}", indicValIn);
        if (indicValIn.getId() == null) {
            return createIndicValIn(indicValIn);
        }
        IndicValIn result = indicValInRepository.save(indicValIn);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, indicValIn.getId().toString()))
            .body(result);
    }

    /**
     * GET  /indic-val-ins : get all the indicValIns.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of indicValIns in body
     */
    @GetMapping("/indic-val-ins")
    @Timed
    public List<IndicValIn> getAllIndicValIns() {
        log.debug("REST request to get all IndicValIns");
        return indicValInRepository.findAll();
        }

    /**
     * GET  /indic-val-ins/:id : get the "id" indicValIn.
     *
     * @param id the id of the indicValIn to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the indicValIn, or with status 404 (Not Found)
     */
    @GetMapping("/indic-val-ins/{id}")
    @Timed
    public ResponseEntity<IndicValIn> getIndicValIn(@PathVariable Long id) {
        log.debug("REST request to get IndicValIn : {}", id);
        IndicValIn indicValIn = indicValInRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(indicValIn));
    }

    /**
     * DELETE  /indic-val-ins/:id : delete the "id" indicValIn.
     *
     * @param id the id of the indicValIn to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/indic-val-ins/{id}")
    @Timed
    public ResponseEntity<Void> deleteIndicValIn(@PathVariable Long id) {
        log.debug("REST request to delete IndicValIn : {}", id);
        indicValInRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
