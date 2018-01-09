package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.IndicValInt;

import io.github.jhipster.application.repository.IndicValIntRepository;
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
 * REST controller for managing IndicValInt.
 */
@RestController
@RequestMapping("/api")
public class IndicValIntResource {

    private final Logger log = LoggerFactory.getLogger(IndicValIntResource.class);

    private static final String ENTITY_NAME = "indicValInt";

    private final IndicValIntRepository indicValIntRepository;

    public IndicValIntResource(IndicValIntRepository indicValIntRepository) {
        this.indicValIntRepository = indicValIntRepository;
    }

    /**
     * POST  /indic-val-ints : Create a new indicValInt.
     *
     * @param indicValInt the indicValInt to create
     * @return the ResponseEntity with status 201 (Created) and with body the new indicValInt, or with status 400 (Bad Request) if the indicValInt has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/indic-val-ints")
    @Timed
    public ResponseEntity<IndicValInt> createIndicValInt(@Valid @RequestBody IndicValInt indicValInt) throws URISyntaxException {
        log.debug("REST request to save IndicValInt : {}", indicValInt);
        if (indicValInt.getId() != null) {
            throw new BadRequestAlertException("A new indicValInt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        IndicValInt result = indicValIntRepository.save(indicValInt);
        return ResponseEntity.created(new URI("/api/indic-val-ints/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /indic-val-ints : Updates an existing indicValInt.
     *
     * @param indicValInt the indicValInt to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated indicValInt,
     * or with status 400 (Bad Request) if the indicValInt is not valid,
     * or with status 500 (Internal Server Error) if the indicValInt couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/indic-val-ints")
    @Timed
    public ResponseEntity<IndicValInt> updateIndicValInt(@Valid @RequestBody IndicValInt indicValInt) throws URISyntaxException {
        log.debug("REST request to update IndicValInt : {}", indicValInt);
        if (indicValInt.getId() == null) {
            return createIndicValInt(indicValInt);
        }
        IndicValInt result = indicValIntRepository.save(indicValInt);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, indicValInt.getId().toString()))
            .body(result);
    }

    /**
     * GET  /indic-val-ints : get all the indicValInts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of indicValInts in body
     */
    @GetMapping("/indic-val-ints")
    @Timed
    public List<IndicValInt> getAllIndicValInts() {
        log.debug("REST request to get all IndicValInts");
        return indicValIntRepository.findAll();
        }

    /**
     * GET  /indic-val-ints/:id : get the "id" indicValInt.
     *
     * @param id the id of the indicValInt to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the indicValInt, or with status 404 (Not Found)
     */
    @GetMapping("/indic-val-ints/{id}")
    @Timed
    public ResponseEntity<IndicValInt> getIndicValInt(@PathVariable Long id) {
        log.debug("REST request to get IndicValInt : {}", id);
        IndicValInt indicValInt = indicValIntRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(indicValInt));
    }

    /**
     * DELETE  /indic-val-ints/:id : delete the "id" indicValInt.
     *
     * @param id the id of the indicValInt to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/indic-val-ints/{id}")
    @Timed
    public ResponseEntity<Void> deleteIndicValInt(@PathVariable Long id) {
        log.debug("REST request to delete IndicValInt : {}", id);
        indicValIntRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
