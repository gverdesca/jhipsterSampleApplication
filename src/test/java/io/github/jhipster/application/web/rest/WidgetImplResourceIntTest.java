package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.WidgetImpl;
import io.github.jhipster.application.repository.WidgetImplRepository;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WidgetImplResource REST controller.
 *
 * @see WidgetImplResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class WidgetImplResourceIntTest {

    private static final String DEFAULT_DB_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_DB_TIPO = "BBBBBBBBBB";

    @Autowired
    private WidgetImplRepository widgetImplRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWidgetImplMockMvc;

    private WidgetImpl widgetImpl;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WidgetImplResource widgetImplResource = new WidgetImplResource(widgetImplRepository);
        this.restWidgetImplMockMvc = MockMvcBuilders.standaloneSetup(widgetImplResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WidgetImpl createEntity(EntityManager em) {
        WidgetImpl widgetImpl = new WidgetImpl()
            .dbTipo(DEFAULT_DB_TIPO);
        return widgetImpl;
    }

    @Before
    public void initTest() {
        widgetImpl = createEntity(em);
    }

    @Test
    @Transactional
    public void createWidgetImpl() throws Exception {
        int databaseSizeBeforeCreate = widgetImplRepository.findAll().size();

        // Create the WidgetImpl
        restWidgetImplMockMvc.perform(post("/api/widget-impls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(widgetImpl)))
            .andExpect(status().isCreated());

        // Validate the WidgetImpl in the database
        List<WidgetImpl> widgetImplList = widgetImplRepository.findAll();
        assertThat(widgetImplList).hasSize(databaseSizeBeforeCreate + 1);
        WidgetImpl testWidgetImpl = widgetImplList.get(widgetImplList.size() - 1);
        assertThat(testWidgetImpl.getDbTipo()).isEqualTo(DEFAULT_DB_TIPO);
    }

    @Test
    @Transactional
    public void createWidgetImplWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = widgetImplRepository.findAll().size();

        // Create the WidgetImpl with an existing ID
        widgetImpl.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWidgetImplMockMvc.perform(post("/api/widget-impls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(widgetImpl)))
            .andExpect(status().isBadRequest());

        // Validate the WidgetImpl in the database
        List<WidgetImpl> widgetImplList = widgetImplRepository.findAll();
        assertThat(widgetImplList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWidgetImpls() throws Exception {
        // Initialize the database
        widgetImplRepository.saveAndFlush(widgetImpl);

        // Get all the widgetImplList
        restWidgetImplMockMvc.perform(get("/api/widget-impls?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(widgetImpl.getId().intValue())))
            .andExpect(jsonPath("$.[*].dbTipo").value(hasItem(DEFAULT_DB_TIPO.toString())));
    }

    @Test
    @Transactional
    public void getWidgetImpl() throws Exception {
        // Initialize the database
        widgetImplRepository.saveAndFlush(widgetImpl);

        // Get the widgetImpl
        restWidgetImplMockMvc.perform(get("/api/widget-impls/{id}", widgetImpl.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(widgetImpl.getId().intValue()))
            .andExpect(jsonPath("$.dbTipo").value(DEFAULT_DB_TIPO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWidgetImpl() throws Exception {
        // Get the widgetImpl
        restWidgetImplMockMvc.perform(get("/api/widget-impls/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWidgetImpl() throws Exception {
        // Initialize the database
        widgetImplRepository.saveAndFlush(widgetImpl);
        int databaseSizeBeforeUpdate = widgetImplRepository.findAll().size();

        // Update the widgetImpl
        WidgetImpl updatedWidgetImpl = widgetImplRepository.findOne(widgetImpl.getId());
        // Disconnect from session so that the updates on updatedWidgetImpl are not directly saved in db
        em.detach(updatedWidgetImpl);
        updatedWidgetImpl
            .dbTipo(UPDATED_DB_TIPO);

        restWidgetImplMockMvc.perform(put("/api/widget-impls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWidgetImpl)))
            .andExpect(status().isOk());

        // Validate the WidgetImpl in the database
        List<WidgetImpl> widgetImplList = widgetImplRepository.findAll();
        assertThat(widgetImplList).hasSize(databaseSizeBeforeUpdate);
        WidgetImpl testWidgetImpl = widgetImplList.get(widgetImplList.size() - 1);
        assertThat(testWidgetImpl.getDbTipo()).isEqualTo(UPDATED_DB_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingWidgetImpl() throws Exception {
        int databaseSizeBeforeUpdate = widgetImplRepository.findAll().size();

        // Create the WidgetImpl

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWidgetImplMockMvc.perform(put("/api/widget-impls")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(widgetImpl)))
            .andExpect(status().isCreated());

        // Validate the WidgetImpl in the database
        List<WidgetImpl> widgetImplList = widgetImplRepository.findAll();
        assertThat(widgetImplList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWidgetImpl() throws Exception {
        // Initialize the database
        widgetImplRepository.saveAndFlush(widgetImpl);
        int databaseSizeBeforeDelete = widgetImplRepository.findAll().size();

        // Get the widgetImpl
        restWidgetImplMockMvc.perform(delete("/api/widget-impls/{id}", widgetImpl.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WidgetImpl> widgetImplList = widgetImplRepository.findAll();
        assertThat(widgetImplList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WidgetImpl.class);
        WidgetImpl widgetImpl1 = new WidgetImpl();
        widgetImpl1.setId(1L);
        WidgetImpl widgetImpl2 = new WidgetImpl();
        widgetImpl2.setId(widgetImpl1.getId());
        assertThat(widgetImpl1).isEqualTo(widgetImpl2);
        widgetImpl2.setId(2L);
        assertThat(widgetImpl1).isNotEqualTo(widgetImpl2);
        widgetImpl1.setId(null);
        assertThat(widgetImpl1).isNotEqualTo(widgetImpl2);
    }
}
