package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Ind02Std;

import io.github.jhipster.application.repository.Ind02StdRepository;
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
 * REST controller for managing Ind02Std.
 */
@RestController
@RequestMapping("/api")
public class Ind02StdResource {

    private final Logger log = LoggerFactory.getLogger(Ind02StdResource.class);

    private static final String ENTITY_NAME = "ind02Std";

    private final Ind02StdRepository ind02StdRepository;

    public Ind02StdResource(Ind02StdRepository ind02StdRepository) {
        this.ind02StdRepository = ind02StdRepository;
    }

    /**
     * POST  /ind-02-stds : Create a new ind02Std.
     *
     * @param ind02Std the ind02Std to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ind02Std, or with status 400 (Bad Request) if the ind02Std has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ind-02-stds")
    @Timed
    public ResponseEntity<Ind02Std> createInd02Std(@Valid @RequestBody Ind02Std ind02Std) throws URISyntaxException {
        log.debug("REST request to save Ind02Std : {}", ind02Std);
        if (ind02Std.getId() != null) {
            throw new BadRequestAlertException("A new ind02Std cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ind02Std result = ind02StdRepository.save(ind02Std);
        return ResponseEntity.created(new URI("/api/ind-02-stds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ind-02-stds : Updates an existing ind02Std.
     *
     * @param ind02Std the ind02Std to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ind02Std,
     * or with status 400 (Bad Request) if the ind02Std is not valid,
     * or with status 500 (Internal Server Error) if the ind02Std couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ind-02-stds")
    @Timed
    public ResponseEntity<Ind02Std> updateInd02Std(@Valid @RequestBody Ind02Std ind02Std) throws URISyntaxException {
        log.debug("REST request to update Ind02Std : {}", ind02Std);
        if (ind02Std.getId() == null) {
            return createInd02Std(ind02Std);
        }
        Ind02Std result = ind02StdRepository.save(ind02Std);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ind02Std.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ind-02-stds : get all the ind02Stds.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ind02Stds in body
     */
    @GetMapping("/ind-02-stds")
    @Timed
    public List<Ind02Std> getAllInd02Stds() {
        log.debug("REST request to get all Ind02Stds");
        return ind02StdRepository.findAll();
        }

    /**
     * GET  /ind-02-stds/:id : get the "id" ind02Std.
     *
     * @param id the id of the ind02Std to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ind02Std, or with status 404 (Not Found)
     */
    @GetMapping("/ind-02-stds/{id}")
    @Timed
    public ResponseEntity<Ind02Std> getInd02Std(@PathVariable Long id) {
        log.debug("REST request to get Ind02Std : {}", id);
        Ind02Std ind02Std = ind02StdRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ind02Std));
    }

    /**
     * DELETE  /ind-02-stds/:id : delete the "id" ind02Std.
     *
     * @param id the id of the ind02Std to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ind-02-stds/{id}")
    @Timed
    public ResponseEntity<Void> deleteInd02Std(@PathVariable Long id) {
        log.debug("REST request to delete Ind02Std : {}", id);
        ind02StdRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
