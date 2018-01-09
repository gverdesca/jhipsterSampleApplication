package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.IndicValInt;
import io.github.jhipster.application.repository.IndicValIntRepository;
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
 * Test class for the IndicValIntResource REST controller.
 *
 * @see IndicValIntResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class IndicValIntResourceIntTest {

    private static final Float DEFAULT_ND_VAL_INF = 1F;
    private static final Float UPDATED_ND_VAL_INF = 2F;

    private static final Float DEFAULT_ND_VAL_SUP = 1F;
    private static final Float UPDATED_ND_VAL_SUP = 2F;

    @Autowired
    private IndicValIntRepository indicValIntRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIndicValIntMockMvc;

    private IndicValInt indicValInt;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IndicValIntResource indicValIntResource = new IndicValIntResource(indicValIntRepository);
        this.restIndicValIntMockMvc = MockMvcBuilders.standaloneSetup(indicValIntResource)
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
    public static IndicValInt createEntity(EntityManager em) {
        IndicValInt indicValInt = new IndicValInt()
            .ndValInf(DEFAULT_ND_VAL_INF)
            .ndValSup(DEFAULT_ND_VAL_SUP);
        return indicValInt;
    }

    @Before
    public void initTest() {
        indicValInt = createEntity(em);
    }

    @Test
    @Transactional
    public void createIndicValInt() throws Exception {
        int databaseSizeBeforeCreate = indicValIntRepository.findAll().size();

        // Create the IndicValInt
        restIndicValIntMockMvc.perform(post("/api/indic-val-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValInt)))
            .andExpect(status().isCreated());

        // Validate the IndicValInt in the database
        List<IndicValInt> indicValIntList = indicValIntRepository.findAll();
        assertThat(indicValIntList).hasSize(databaseSizeBeforeCreate + 1);
        IndicValInt testIndicValInt = indicValIntList.get(indicValIntList.size() - 1);
        assertThat(testIndicValInt.getNdValInf()).isEqualTo(DEFAULT_ND_VAL_INF);
        assertThat(testIndicValInt.getNdValSup()).isEqualTo(DEFAULT_ND_VAL_SUP);
    }

    @Test
    @Transactional
    public void createIndicValIntWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = indicValIntRepository.findAll().size();

        // Create the IndicValInt with an existing ID
        indicValInt.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIndicValIntMockMvc.perform(post("/api/indic-val-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValInt)))
            .andExpect(status().isBadRequest());

        // Validate the IndicValInt in the database
        List<IndicValInt> indicValIntList = indicValIntRepository.findAll();
        assertThat(indicValIntList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNdValInfIsRequired() throws Exception {
        int databaseSizeBeforeTest = indicValIntRepository.findAll().size();
        // set the field null
        indicValInt.setNdValInf(null);

        // Create the IndicValInt, which fails.

        restIndicValIntMockMvc.perform(post("/api/indic-val-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValInt)))
            .andExpect(status().isBadRequest());

        List<IndicValInt> indicValIntList = indicValIntRepository.findAll();
        assertThat(indicValIntList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNdValSupIsRequired() throws Exception {
        int databaseSizeBeforeTest = indicValIntRepository.findAll().size();
        // set the field null
        indicValInt.setNdValSup(null);

        // Create the IndicValInt, which fails.

        restIndicValIntMockMvc.perform(post("/api/indic-val-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValInt)))
            .andExpect(status().isBadRequest());

        List<IndicValInt> indicValIntList = indicValIntRepository.findAll();
        assertThat(indicValIntList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIndicValInts() throws Exception {
        // Initialize the database
        indicValIntRepository.saveAndFlush(indicValInt);

        // Get all the indicValIntList
        restIndicValIntMockMvc.perform(get("/api/indic-val-ints?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(indicValInt.getId().intValue())))
            .andExpect(jsonPath("$.[*].ndValInf").value(hasItem(DEFAULT_ND_VAL_INF.doubleValue())))
            .andExpect(jsonPath("$.[*].ndValSup").value(hasItem(DEFAULT_ND_VAL_SUP.doubleValue())));
    }

    @Test
    @Transactional
    public void getIndicValInt() throws Exception {
        // Initialize the database
        indicValIntRepository.saveAndFlush(indicValInt);

        // Get the indicValInt
        restIndicValIntMockMvc.perform(get("/api/indic-val-ints/{id}", indicValInt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(indicValInt.getId().intValue()))
            .andExpect(jsonPath("$.ndValInf").value(DEFAULT_ND_VAL_INF.doubleValue()))
            .andExpect(jsonPath("$.ndValSup").value(DEFAULT_ND_VAL_SUP.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingIndicValInt() throws Exception {
        // Get the indicValInt
        restIndicValIntMockMvc.perform(get("/api/indic-val-ints/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIndicValInt() throws Exception {
        // Initialize the database
        indicValIntRepository.saveAndFlush(indicValInt);
        int databaseSizeBeforeUpdate = indicValIntRepository.findAll().size();

        // Update the indicValInt
        IndicValInt updatedIndicValInt = indicValIntRepository.findOne(indicValInt.getId());
        // Disconnect from session so that the updates on updatedIndicValInt are not directly saved in db
        em.detach(updatedIndicValInt);
        updatedIndicValInt
            .ndValInf(UPDATED_ND_VAL_INF)
            .ndValSup(UPDATED_ND_VAL_SUP);

        restIndicValIntMockMvc.perform(put("/api/indic-val-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIndicValInt)))
            .andExpect(status().isOk());

        // Validate the IndicValInt in the database
        List<IndicValInt> indicValIntList = indicValIntRepository.findAll();
        assertThat(indicValIntList).hasSize(databaseSizeBeforeUpdate);
        IndicValInt testIndicValInt = indicValIntList.get(indicValIntList.size() - 1);
        assertThat(testIndicValInt.getNdValInf()).isEqualTo(UPDATED_ND_VAL_INF);
        assertThat(testIndicValInt.getNdValSup()).isEqualTo(UPDATED_ND_VAL_SUP);
    }

    @Test
    @Transactional
    public void updateNonExistingIndicValInt() throws Exception {
        int databaseSizeBeforeUpdate = indicValIntRepository.findAll().size();

        // Create the IndicValInt

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIndicValIntMockMvc.perform(put("/api/indic-val-ints")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValInt)))
            .andExpect(status().isCreated());

        // Validate the IndicValInt in the database
        List<IndicValInt> indicValIntList = indicValIntRepository.findAll();
        assertThat(indicValIntList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIndicValInt() throws Exception {
        // Initialize the database
        indicValIntRepository.saveAndFlush(indicValInt);
        int databaseSizeBeforeDelete = indicValIntRepository.findAll().size();

        // Get the indicValInt
        restIndicValIntMockMvc.perform(delete("/api/indic-val-ints/{id}", indicValInt.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IndicValInt> indicValIntList = indicValIntRepository.findAll();
        assertThat(indicValIntList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IndicValInt.class);
        IndicValInt indicValInt1 = new IndicValInt();
        indicValInt1.setId(1L);
        IndicValInt indicValInt2 = new IndicValInt();
        indicValInt2.setId(indicValInt1.getId());
        assertThat(indicValInt1).isEqualTo(indicValInt2);
        indicValInt2.setId(2L);
        assertThat(indicValInt1).isNotEqualTo(indicValInt2);
        indicValInt1.setId(null);
        assertThat(indicValInt1).isNotEqualTo(indicValInt2);
    }
}
