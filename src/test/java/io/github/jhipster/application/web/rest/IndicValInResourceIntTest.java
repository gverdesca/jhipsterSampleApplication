package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.IndicValIn;
import io.github.jhipster.application.repository.IndicValInRepository;
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
 * Test class for the IndicValInResource REST controller.
 *
 * @see IndicValInResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class IndicValInResourceIntTest {

    private static final Float DEFAULT_ND_VAL_INF = 1F;
    private static final Float UPDATED_ND_VAL_INF = 2F;

    private static final Float DEFAULT_ND_VAL_SUP = 1F;
    private static final Float UPDATED_ND_VAL_SUP = 2F;

    @Autowired
    private IndicValInRepository indicValInRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIndicValInMockMvc;

    private IndicValIn indicValIn;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IndicValInResource indicValInResource = new IndicValInResource(indicValInRepository);
        this.restIndicValInMockMvc = MockMvcBuilders.standaloneSetup(indicValInResource)
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
    public static IndicValIn createEntity(EntityManager em) {
        IndicValIn indicValIn = new IndicValIn()
            .ndValInf(DEFAULT_ND_VAL_INF)
            .ndValSup(DEFAULT_ND_VAL_SUP);
        return indicValIn;
    }

    @Before
    public void initTest() {
        indicValIn = createEntity(em);
    }

    @Test
    @Transactional
    public void createIndicValIn() throws Exception {
        int databaseSizeBeforeCreate = indicValInRepository.findAll().size();

        // Create the IndicValIn
        restIndicValInMockMvc.perform(post("/api/indic-val-ins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValIn)))
            .andExpect(status().isCreated());

        // Validate the IndicValIn in the database
        List<IndicValIn> indicValInList = indicValInRepository.findAll();
        assertThat(indicValInList).hasSize(databaseSizeBeforeCreate + 1);
        IndicValIn testIndicValIn = indicValInList.get(indicValInList.size() - 1);
        assertThat(testIndicValIn.getNdValInf()).isEqualTo(DEFAULT_ND_VAL_INF);
        assertThat(testIndicValIn.getNdValSup()).isEqualTo(DEFAULT_ND_VAL_SUP);
    }

    @Test
    @Transactional
    public void createIndicValInWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = indicValInRepository.findAll().size();

        // Create the IndicValIn with an existing ID
        indicValIn.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIndicValInMockMvc.perform(post("/api/indic-val-ins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValIn)))
            .andExpect(status().isBadRequest());

        // Validate the IndicValIn in the database
        List<IndicValIn> indicValInList = indicValInRepository.findAll();
        assertThat(indicValInList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNdValInfIsRequired() throws Exception {
        int databaseSizeBeforeTest = indicValInRepository.findAll().size();
        // set the field null
        indicValIn.setNdValInf(null);

        // Create the IndicValIn, which fails.

        restIndicValInMockMvc.perform(post("/api/indic-val-ins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValIn)))
            .andExpect(status().isBadRequest());

        List<IndicValIn> indicValInList = indicValInRepository.findAll();
        assertThat(indicValInList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNdValSupIsRequired() throws Exception {
        int databaseSizeBeforeTest = indicValInRepository.findAll().size();
        // set the field null
        indicValIn.setNdValSup(null);

        // Create the IndicValIn, which fails.

        restIndicValInMockMvc.perform(post("/api/indic-val-ins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValIn)))
            .andExpect(status().isBadRequest());

        List<IndicValIn> indicValInList = indicValInRepository.findAll();
        assertThat(indicValInList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIndicValIns() throws Exception {
        // Initialize the database
        indicValInRepository.saveAndFlush(indicValIn);

        // Get all the indicValInList
        restIndicValInMockMvc.perform(get("/api/indic-val-ins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(indicValIn.getId().intValue())))
            .andExpect(jsonPath("$.[*].ndValInf").value(hasItem(DEFAULT_ND_VAL_INF.doubleValue())))
            .andExpect(jsonPath("$.[*].ndValSup").value(hasItem(DEFAULT_ND_VAL_SUP.doubleValue())));
    }

    @Test
    @Transactional
    public void getIndicValIn() throws Exception {
        // Initialize the database
        indicValInRepository.saveAndFlush(indicValIn);

        // Get the indicValIn
        restIndicValInMockMvc.perform(get("/api/indic-val-ins/{id}", indicValIn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(indicValIn.getId().intValue()))
            .andExpect(jsonPath("$.ndValInf").value(DEFAULT_ND_VAL_INF.doubleValue()))
            .andExpect(jsonPath("$.ndValSup").value(DEFAULT_ND_VAL_SUP.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingIndicValIn() throws Exception {
        // Get the indicValIn
        restIndicValInMockMvc.perform(get("/api/indic-val-ins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIndicValIn() throws Exception {
        // Initialize the database
        indicValInRepository.saveAndFlush(indicValIn);
        int databaseSizeBeforeUpdate = indicValInRepository.findAll().size();

        // Update the indicValIn
        IndicValIn updatedIndicValIn = indicValInRepository.findOne(indicValIn.getId());
        // Disconnect from session so that the updates on updatedIndicValIn are not directly saved in db
        em.detach(updatedIndicValIn);
        updatedIndicValIn
            .ndValInf(UPDATED_ND_VAL_INF)
            .ndValSup(UPDATED_ND_VAL_SUP);

        restIndicValInMockMvc.perform(put("/api/indic-val-ins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIndicValIn)))
            .andExpect(status().isOk());

        // Validate the IndicValIn in the database
        List<IndicValIn> indicValInList = indicValInRepository.findAll();
        assertThat(indicValInList).hasSize(databaseSizeBeforeUpdate);
        IndicValIn testIndicValIn = indicValInList.get(indicValInList.size() - 1);
        assertThat(testIndicValIn.getNdValInf()).isEqualTo(UPDATED_ND_VAL_INF);
        assertThat(testIndicValIn.getNdValSup()).isEqualTo(UPDATED_ND_VAL_SUP);
    }

    @Test
    @Transactional
    public void updateNonExistingIndicValIn() throws Exception {
        int databaseSizeBeforeUpdate = indicValInRepository.findAll().size();

        // Create the IndicValIn

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIndicValInMockMvc.perform(put("/api/indic-val-ins")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValIn)))
            .andExpect(status().isCreated());

        // Validate the IndicValIn in the database
        List<IndicValIn> indicValInList = indicValInRepository.findAll();
        assertThat(indicValInList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIndicValIn() throws Exception {
        // Initialize the database
        indicValInRepository.saveAndFlush(indicValIn);
        int databaseSizeBeforeDelete = indicValInRepository.findAll().size();

        // Get the indicValIn
        restIndicValInMockMvc.perform(delete("/api/indic-val-ins/{id}", indicValIn.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IndicValIn> indicValInList = indicValInRepository.findAll();
        assertThat(indicValInList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IndicValIn.class);
        IndicValIn indicValIn1 = new IndicValIn();
        indicValIn1.setId(1L);
        IndicValIn indicValIn2 = new IndicValIn();
        indicValIn2.setId(indicValIn1.getId());
        assertThat(indicValIn1).isEqualTo(indicValIn2);
        indicValIn2.setId(2L);
        assertThat(indicValIn1).isNotEqualTo(indicValIn2);
        indicValIn1.setId(null);
        assertThat(indicValIn1).isNotEqualTo(indicValIn2);
    }
}
