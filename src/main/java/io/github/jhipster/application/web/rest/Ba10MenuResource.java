package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Ba10Menu;

import io.github.jhipster.application.repository.Ba10MenuRepository;
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
 * REST controller for managing Ba10Menu.
 */
@RestController
@RequestMapping("/api")
public class Ba10MenuResource {

    private final Logger log = LoggerFactory.getLogger(Ba10MenuResource.class);

    private static final String ENTITY_NAME = "ba10Menu";

    private final Ba10MenuRepository ba10MenuRepository;

    public Ba10MenuResource(Ba10MenuRepository ba10MenuRepository) {
        this.ba10MenuRepository = ba10MenuRepository;
    }

    /**
     * POST  /ba-10-menus : Create a new ba10Menu.
     *
     * @param ba10Menu the ba10Menu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ba10Menu, or with status 400 (Bad Request) if the ba10Menu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ba-10-menus")
    @Timed
    public ResponseEntity<Ba10Menu> createBa10Menu(@Valid @RequestBody Ba10Menu ba10Menu) throws URISyntaxException {
        log.debug("REST request to save Ba10Menu : {}", ba10Menu);
        if (ba10Menu.getId() != null) {
            throw new BadRequestAlertException("A new ba10Menu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ba10Menu result = ba10MenuRepository.save(ba10Menu);
        return ResponseEntity.created(new URI("/api/ba-10-menus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ba-10-menus : Updates an existing ba10Menu.
     *
     * @param ba10Menu the ba10Menu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ba10Menu,
     * or with status 400 (Bad Request) if the ba10Menu is not valid,
     * or with status 500 (Internal Server Error) if the ba10Menu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ba-10-menus")
    @Timed
    public ResponseEntity<Ba10Menu> updateBa10Menu(@Valid @RequestBody Ba10Menu ba10Menu) throws URISyntaxException {
        log.debug("REST request to update Ba10Menu : {}", ba10Menu);
        if (ba10Menu.getId() == null) {
            return createBa10Menu(ba10Menu);
        }
        Ba10Menu result = ba10MenuRepository.save(ba10Menu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ba10Menu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ba-10-menus : get all the ba10Menus.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ba10Menus in body
     */
    @GetMapping("/ba-10-menus")
    @Timed
    public List<Ba10Menu> getAllBa10Menus() {
        log.debug("REST request to get all Ba10Menus");
        return ba10MenuRepository.findAll();
        }

    /**
     * GET  /ba-10-menus/:id : get the "id" ba10Menu.
     *
     * @param id the id of the ba10Menu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ba10Menu, or with status 404 (Not Found)
     */
    @GetMapping("/ba-10-menus/{id}")
    @Timed
    public ResponseEntity<Ba10Menu> getBa10Menu(@PathVariable Long id) {
        log.debug("REST request to get Ba10Menu : {}", id);
        Ba10Menu ba10Menu = ba10MenuRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ba10Menu));
    }

    /**
     * DELETE  /ba-10-menus/:id : delete the "id" ba10Menu.
     *
     * @param id the id of the ba10Menu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ba-10-menus/{id}")
    @Timed
    public ResponseEntity<Void> deleteBa10Menu(@PathVariable Long id) {
        log.debug("REST request to delete Ba10Menu : {}", id);
        ba10MenuRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
