package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Ba12Widget;

import io.github.jhipster.application.repository.Ba12WidgetRepository;
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
 * REST controller for managing Ba12Widget.
 */
@RestController
@RequestMapping("/api")
public class Ba12WidgetResource {

    private final Logger log = LoggerFactory.getLogger(Ba12WidgetResource.class);

    private static final String ENTITY_NAME = "ba12Widget";

    private final Ba12WidgetRepository ba12WidgetRepository;

    public Ba12WidgetResource(Ba12WidgetRepository ba12WidgetRepository) {
        this.ba12WidgetRepository = ba12WidgetRepository;
    }

    /**
     * POST  /ba-12-widgets : Create a new ba12Widget.
     *
     * @param ba12Widget the ba12Widget to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ba12Widget, or with status 400 (Bad Request) if the ba12Widget has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ba-12-widgets")
    @Timed
    public ResponseEntity<Ba12Widget> createBa12Widget(@Valid @RequestBody Ba12Widget ba12Widget) throws URISyntaxException {
        log.debug("REST request to save Ba12Widget : {}", ba12Widget);
        if (ba12Widget.getId() != null) {
            throw new BadRequestAlertException("A new ba12Widget cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ba12Widget result = ba12WidgetRepository.save(ba12Widget);
        return ResponseEntity.created(new URI("/api/ba-12-widgets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ba-12-widgets : Updates an existing ba12Widget.
     *
     * @param ba12Widget the ba12Widget to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ba12Widget,
     * or with status 400 (Bad Request) if the ba12Widget is not valid,
     * or with status 500 (Internal Server Error) if the ba12Widget couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ba-12-widgets")
    @Timed
    public ResponseEntity<Ba12Widget> updateBa12Widget(@Valid @RequestBody Ba12Widget ba12Widget) throws URISyntaxException {
        log.debug("REST request to update Ba12Widget : {}", ba12Widget);
        if (ba12Widget.getId() == null) {
            return createBa12Widget(ba12Widget);
        }
        Ba12Widget result = ba12WidgetRepository.save(ba12Widget);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ba12Widget.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ba-12-widgets : get all the ba12Widgets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ba12Widgets in body
     */
    @GetMapping("/ba-12-widgets")
    @Timed
    public List<Ba12Widget> getAllBa12Widgets() {
        log.debug("REST request to get all Ba12Widgets");
        return ba12WidgetRepository.findAll();
        }

    /**
     * GET  /ba-12-widgets/:id : get the "id" ba12Widget.
     *
     * @param id the id of the ba12Widget to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ba12Widget, or with status 404 (Not Found)
     */
    @GetMapping("/ba-12-widgets/{id}")
    @Timed
    public ResponseEntity<Ba12Widget> getBa12Widget(@PathVariable Long id) {
        log.debug("REST request to get Ba12Widget : {}", id);
        Ba12Widget ba12Widget = ba12WidgetRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ba12Widget));
    }

    /**
     * DELETE  /ba-12-widgets/:id : delete the "id" ba12Widget.
     *
     * @param id the id of the ba12Widget to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ba-12-widgets/{id}")
    @Timed
    public ResponseEntity<Void> deleteBa12Widget(@PathVariable Long id) {
        log.debug("REST request to delete Ba12Widget : {}", id);
        ba12WidgetRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
