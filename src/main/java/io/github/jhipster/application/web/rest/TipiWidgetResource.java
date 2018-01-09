package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.TipiWidget;

import io.github.jhipster.application.repository.TipiWidgetRepository;
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
 * REST controller for managing TipiWidget.
 */
@RestController
@RequestMapping("/api")
public class TipiWidgetResource {

    private final Logger log = LoggerFactory.getLogger(TipiWidgetResource.class);

    private static final String ENTITY_NAME = "tipiWidget";

    private final TipiWidgetRepository tipiWidgetRepository;

    public TipiWidgetResource(TipiWidgetRepository tipiWidgetRepository) {
        this.tipiWidgetRepository = tipiWidgetRepository;
    }

    /**
     * POST  /tipi-widgets : Create a new tipiWidget.
     *
     * @param tipiWidget the tipiWidget to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipiWidget, or with status 400 (Bad Request) if the tipiWidget has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipi-widgets")
    @Timed
    public ResponseEntity<TipiWidget> createTipiWidget(@Valid @RequestBody TipiWidget tipiWidget) throws URISyntaxException {
        log.debug("REST request to save TipiWidget : {}", tipiWidget);
        if (tipiWidget.getId() != null) {
            throw new BadRequestAlertException("A new tipiWidget cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipiWidget result = tipiWidgetRepository.save(tipiWidget);
        return ResponseEntity.created(new URI("/api/tipi-widgets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipi-widgets : Updates an existing tipiWidget.
     *
     * @param tipiWidget the tipiWidget to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipiWidget,
     * or with status 400 (Bad Request) if the tipiWidget is not valid,
     * or with status 500 (Internal Server Error) if the tipiWidget couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipi-widgets")
    @Timed
    public ResponseEntity<TipiWidget> updateTipiWidget(@Valid @RequestBody TipiWidget tipiWidget) throws URISyntaxException {
        log.debug("REST request to update TipiWidget : {}", tipiWidget);
        if (tipiWidget.getId() == null) {
            return createTipiWidget(tipiWidget);
        }
        TipiWidget result = tipiWidgetRepository.save(tipiWidget);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipiWidget.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipi-widgets : get all the tipiWidgets.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipiWidgets in body
     */
    @GetMapping("/tipi-widgets")
    @Timed
    public List<TipiWidget> getAllTipiWidgets() {
        log.debug("REST request to get all TipiWidgets");
        return tipiWidgetRepository.findAll();
        }

    /**
     * GET  /tipi-widgets/:id : get the "id" tipiWidget.
     *
     * @param id the id of the tipiWidget to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipiWidget, or with status 404 (Not Found)
     */
    @GetMapping("/tipi-widgets/{id}")
    @Timed
    public ResponseEntity<TipiWidget> getTipiWidget(@PathVariable Long id) {
        log.debug("REST request to get TipiWidget : {}", id);
        TipiWidget tipiWidget = tipiWidgetRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tipiWidget));
    }

    /**
     * DELETE  /tipi-widgets/:id : delete the "id" tipiWidget.
     *
     * @param id the id of the tipiWidget to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipi-widgets/{id}")
    @Timed
    public ResponseEntity<Void> deleteTipiWidget(@PathVariable Long id) {
        log.debug("REST request to delete TipiWidget : {}", id);
        tipiWidgetRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
