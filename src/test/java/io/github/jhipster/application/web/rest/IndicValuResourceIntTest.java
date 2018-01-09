package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.IndicValu;
import io.github.jhipster.application.repository.IndicValuRepository;
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
 * Test class for the IndicValuResource REST controller.
 *
 * @see IndicValuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class IndicValuResourceIntTest {

    private static final Float DEFAULT_TI_VALU = 1F;
    private static final Float UPDATED_TI_VALU = 2F;

    private static final Float DEFAULT_NDAL_INF = 1F;
    private static final Float UPDATED_NDAL_INF = 2F;

    private static final Float DEFAULT_ND_VAL_SUP = 1F;
    private static final Float UPDATED_ND_VAL_SUP = 2F;

    @Autowired
    private IndicValuRepository indicValuRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restIndicValuMockMvc;

    private IndicValu indicValu;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IndicValuResource indicValuResource = new IndicValuResource(indicValuRepository);
        this.restIndicValuMockMvc = MockMvcBuilders.standaloneSetup(indicValuResource)
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
    public static IndicValu createEntity(EntityManager em) {
        IndicValu indicValu = new IndicValu()
            .tiValu(DEFAULT_TI_VALU)
            .ndalInf(DEFAULT_NDAL_INF)
            .ndValSup(DEFAULT_ND_VAL_SUP);
        return indicValu;
    }

    @Before
    public void initTest() {
        indicValu = createEntity(em);
    }

    @Test
    @Transactional
    public void createIndicValu() throws Exception {
        int databaseSizeBeforeCreate = indicValuRepository.findAll().size();

        // Create the IndicValu
        restIndicValuMockMvc.perform(post("/api/indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValu)))
            .andExpect(status().isCreated());

        // Validate the IndicValu in the database
        List<IndicValu> indicValuList = indicValuRepository.findAll();
        assertThat(indicValuList).hasSize(databaseSizeBeforeCreate + 1);
        IndicValu testIndicValu = indicValuList.get(indicValuList.size() - 1);
        assertThat(testIndicValu.getTiValu()).isEqualTo(DEFAULT_TI_VALU);
        assertThat(testIndicValu.getNdalInf()).isEqualTo(DEFAULT_NDAL_INF);
        assertThat(testIndicValu.getNdValSup()).isEqualTo(DEFAULT_ND_VAL_SUP);
    }

    @Test
    @Transactional
    public void createIndicValuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = indicValuRepository.findAll().size();

        // Create the IndicValu with an existing ID
        indicValu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIndicValuMockMvc.perform(post("/api/indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValu)))
            .andExpect(status().isBadRequest());

        // Validate the IndicValu in the database
        List<IndicValu> indicValuList = indicValuRepository.findAll();
        assertThat(indicValuList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTiValuIsRequired() throws Exception {
        int databaseSizeBeforeTest = indicValuRepository.findAll().size();
        // set the field null
        indicValu.setTiValu(null);

        // Create the IndicValu, which fails.

        restIndicValuMockMvc.perform(post("/api/indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValu)))
            .andExpect(status().isBadRequest());

        List<IndicValu> indicValuList = indicValuRepository.findAll();
        assertThat(indicValuList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNdalInfIsRequired() throws Exception {
        int databaseSizeBeforeTest = indicValuRepository.findAll().size();
        // set the field null
        indicValu.setNdalInf(null);

        // Create the IndicValu, which fails.

        restIndicValuMockMvc.perform(post("/api/indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValu)))
            .andExpect(status().isBadRequest());

        List<IndicValu> indicValuList = indicValuRepository.findAll();
        assertThat(indicValuList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNdValSupIsRequired() throws Exception {
        int databaseSizeBeforeTest = indicValuRepository.findAll().size();
        // set the field null
        indicValu.setNdValSup(null);

        // Create the IndicValu, which fails.

        restIndicValuMockMvc.perform(post("/api/indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValu)))
            .andExpect(status().isBadRequest());

        List<IndicValu> indicValuList = indicValuRepository.findAll();
        assertThat(indicValuList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllIndicValus() throws Exception {
        // Initialize the database
        indicValuRepository.saveAndFlush(indicValu);

        // Get all the indicValuList
        restIndicValuMockMvc.perform(get("/api/indic-valus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(indicValu.getId().intValue())))
            .andExpect(jsonPath("$.[*].tiValu").value(hasItem(DEFAULT_TI_VALU.doubleValue())))
            .andExpect(jsonPath("$.[*].ndalInf").value(hasItem(DEFAULT_NDAL_INF.doubleValue())))
            .andExpect(jsonPath("$.[*].ndValSup").value(hasItem(DEFAULT_ND_VAL_SUP.doubleValue())));
    }

    @Test
    @Transactional
    public void getIndicValu() throws Exception {
        // Initialize the database
        indicValuRepository.saveAndFlush(indicValu);

        // Get the indicValu
        restIndicValuMockMvc.perform(get("/api/indic-valus/{id}", indicValu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(indicValu.getId().intValue()))
            .andExpect(jsonPath("$.tiValu").value(DEFAULT_TI_VALU.doubleValue()))
            .andExpect(jsonPath("$.ndalInf").value(DEFAULT_NDAL_INF.doubleValue()))
            .andExpect(jsonPath("$.ndValSup").value(DEFAULT_ND_VAL_SUP.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingIndicValu() throws Exception {
        // Get the indicValu
        restIndicValuMockMvc.perform(get("/api/indic-valus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIndicValu() throws Exception {
        // Initialize the database
        indicValuRepository.saveAndFlush(indicValu);
        int databaseSizeBeforeUpdate = indicValuRepository.findAll().size();

        // Update the indicValu
        IndicValu updatedIndicValu = indicValuRepository.findOne(indicValu.getId());
        // Disconnect from session so that the updates on updatedIndicValu are not directly saved in db
        em.detach(updatedIndicValu);
        updatedIndicValu
            .tiValu(UPDATED_TI_VALU)
            .ndalInf(UPDATED_NDAL_INF)
            .ndValSup(UPDATED_ND_VAL_SUP);

        restIndicValuMockMvc.perform(put("/api/indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIndicValu)))
            .andExpect(status().isOk());

        // Validate the IndicValu in the database
        List<IndicValu> indicValuList = indicValuRepository.findAll();
        assertThat(indicValuList).hasSize(databaseSizeBeforeUpdate);
        IndicValu testIndicValu = indicValuList.get(indicValuList.size() - 1);
        assertThat(testIndicValu.getTiValu()).isEqualTo(UPDATED_TI_VALU);
        assertThat(testIndicValu.getNdalInf()).isEqualTo(UPDATED_NDAL_INF);
        assertThat(testIndicValu.getNdValSup()).isEqualTo(UPDATED_ND_VAL_SUP);
    }

    @Test
    @Transactional
    public void updateNonExistingIndicValu() throws Exception {
        int databaseSizeBeforeUpdate = indicValuRepository.findAll().size();

        // Create the IndicValu

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restIndicValuMockMvc.perform(put("/api/indic-valus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(indicValu)))
            .andExpect(status().isCreated());

        // Validate the IndicValu in the database
        List<IndicValu> indicValuList = indicValuRepository.findAll();
        assertThat(indicValuList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteIndicValu() throws Exception {
        // Initialize the database
        indicValuRepository.saveAndFlush(indicValu);
        int databaseSizeBeforeDelete = indicValuRepository.findAll().size();

        // Get the indicValu
        restIndicValuMockMvc.perform(delete("/api/indic-valus/{id}", indicValu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<IndicValu> indicValuList = indicValuRepository.findAll();
        assertThat(indicValuList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IndicValu.class);
        IndicValu indicValu1 = new IndicValu();
        indicValu1.setId(1L);
        IndicValu indicValu2 = new IndicValu();
        indicValu2.setId(indicValu1.getId());
        assertThat(indicValu1).isEqualTo(indicValu2);
        indicValu2.setId(2L);
        assertThat(indicValu1).isNotEqualTo(indicValu2);
        indicValu1.setId(null);
        assertThat(indicValu1).isNotEqualTo(indicValu2);
    }
}
